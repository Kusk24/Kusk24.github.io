"use client";
import { useEffect, useRef } from "react";

/**
 * The hero headline rendered as a true block mosaic: the name is sampled into a
 * fixed grid of square cells, and each cell is drawn as a solid hard-edged
 * block (monochrome — like a mechanical flip-tile wall). The blocks BUILD UP
 * progressively in a scattered order, pause when the word is fully formed, then
 * clear and build again — every PERIOD ms.
 *
 * The underlying <h1> text goes transparent so only the canvas mosaic shows.
 * The <h1> stays the real, measurable element (font/size/letter-spacing from
 * getComputedStyle) so the mosaic always matches the responsive type.
 */
export default function HeroPixelName({ name }: { name: string }) {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const h1 = h1Ref.current;
    const cv = cvRef.current;
    if (!h1 || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Target on-screen block size in CSS px. Smaller = finer mosaic.
    const CELL = 15;

    // Animation timing (ms).
    const PERIOD = 10000; // full cycle: build → hold → clear → wait
    const T_BUILD = 2600; // blocks appear one wave at a time
    const T_HOLD = 4200; // fully-formed word rests
    const T_CLEAR = 900; // blocks drop away

    let raf = 0;

    interface Cell {
      cx: number; // block column (device px origin)
      cy: number;
      bw: number; // block width/height (device px)
      bh: number;
      shade: number; // 0..1 coverage of the glyph in this cell
      order: number; // 0..1 reveal position in the build sequence
    }

    let cells: Cell[] = [];
    let W = 0;
    let H = 0;
    let light = false;

    const build = () => {
      const rect = h1.getBoundingClientRect();
      const cs = getComputedStyle(h1);
      W = Math.max(1, Math.ceil(rect.width));
      H = Math.max(1, Math.ceil(rect.height));
      cv.style.width = W + "px";
      cv.style.height = H + "px";
      cv.width = Math.ceil(W * dpr);
      cv.height = Math.ceil(H * dpr);

      light = document.documentElement.getAttribute("data-theme") === "light";

      // Render the name to an offscreen canvas at device resolution.
      const off = document.createElement("canvas");
      off.width = cv.width;
      off.height = cv.height;
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return;
      o.scale(dpr, dpr);
      o.textAlign = "center";
      o.textBaseline = "middle";
      const fs = parseFloat(cs.fontSize);
      o.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
      try {
        (o as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing =
          cs.letterSpacing;
      } catch {}
      o.fillStyle = "#fff";
      o.fillText(name, W / 2, H / 2 + fs * 0.02);

      // Sample average alpha per grid cell → block coverage.
      const data = o.getImageData(0, 0, off.width, off.height).data;
      const cellPx = Math.max(2, Math.round(CELL * dpr));
      const cols = Math.ceil(off.width / cellPx);
      const rows = Math.ceil(off.height / cellPx);

      cells = [];
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const x0 = gx * cellPx;
          const y0 = gy * cellPx;
          const x1 = Math.min(off.width, x0 + cellPx);
          const y1 = Math.min(off.height, y0 + cellPx);
          let sum = 0;
          let count = 0;
          // Subsample the cell (every 2px) for speed.
          for (let y = y0; y < y1; y += 2) {
            for (let x = x0; x < x1; x += 2) {
              sum += data[(y * off.width + x) * 4 + 3];
              count++;
            }
          }
          const shade = count ? sum / (count * 255) : 0;
          if (shade > 0.14) {
            cells.push({
              cx: x0,
              cy: y0,
              bw: x1 - x0,
              bh: y1 - y0,
              shade,
              // Build order: left-to-right sweep with a little scatter so it
              // reads as blocks assembling, not a wipe.
              order:
                (gx / cols) * 0.7 + Math.random() * 0.3,
            });
          }
        }
      }

      h1.style.color = "transparent";
    };

    // Draw all cells whose reveal position is <= progress (0..1). `fade`
    // controls edge softness of the newest blocks so they pop rather than blur.
    const drawBuild = (progress: number) => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.imageSmoothingEnabled = false;
      const gap = Math.max(1, Math.round(1 * dpr)); // seam between blocks
      for (const c of cells) {
        if (c.order > progress) continue;
        // Newly-arrived blocks (within a small window) fade/scale in quickly.
        const age = Math.min(1, (progress - c.order) / 0.06);
        const alpha = age; // 0→1 as the block settles
        // Monochrome block: white in dark theme, near-black in light theme.
        // Brighter glyph coverage → more opaque block.
        const lum = light ? 29 : 245;
        ctx.fillStyle = `rgba(${lum},${light ? 29 : 247},${light ? 31 : 247},${
          alpha * (0.55 + c.shade * 0.45)
        })`;
        ctx.fillRect(c.cx, c.cy, c.bw - gap, c.bh - gap);
      }
    };

    const drawClear = (progress: number) => {
      // progress 0→1 removes blocks (reverse order = last-in first-out feel).
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.imageSmoothingEnabled = false;
      const gap = Math.max(1, Math.round(1 * dpr));
      for (const c of cells) {
        // Each block disappears at its own moment during the clear.
        if (1 - c.order < progress) continue;
        const lum = light ? 29 : 245;
        ctx.fillStyle = `rgba(${lum},${light ? 29 : 247},${light ? 31 : 247},${
          0.55 + c.shade * 0.45
        })`;
        ctx.fillRect(c.cx, c.cy, c.bw - gap, c.bh - gap);
      }
    };

    const easeInOut = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    let loopStart = performance.now();

    const frame = (now: number) => {
      const p = (now - loopStart) % PERIOD;
      if (p < T_BUILD) {
        drawBuild(easeInOut(p / T_BUILD));
      } else if (p < T_BUILD + T_HOLD) {
        drawBuild(1); // fully formed, resting
      } else if (p < T_BUILD + T_HOLD + T_CLEAR) {
        drawClear(easeInOut((p - T_BUILD - T_HOLD) / T_CLEAR));
      } else {
        // brief empty beat before the next build
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      build();
      if (reduce) {
        drawBuild(1); // static, fully formed
        return;
      }
      loopStart = performance.now();
      raf = requestAnimationFrame(frame);
    };

    // Fonts must be loaded before measuring, or the mosaic samples a fallback.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(start);
    } else {
      start();
    }

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(start, 150);
    };
    window.addEventListener("resize", onResize);
    // Rebuild on theme flip so block color re-tints.
    const observer = new MutationObserver(() => start());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, [name]);

  return (
    <h1
      ref={h1Ref}
      id="hero-name"
      className="relative m-0 text-[clamp(54px,11vw,150px)] font-bold leading-[1.02] tracking-[-0.045em]"
    >
      {name}
      <canvas
        ref={cvRef}
        id="hero-pixel"
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-full"
      />
    </h1>
  );
}
