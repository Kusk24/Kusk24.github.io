"use client";
import { useEffect, useRef } from "react";

/**
 * The hero headline with a pixel-assembly reveal. The RESTING state is the real
 * crisp font (Space Grotesk, drawn sharp) — the pixel blocks are only a
 * transition. Each cycle:
 *   1. square blocks fly in from scattered offsets and settle onto the glyph
 *      grid (assemble),
 *   2. the blocks resolve into the crisp real text,
 *   3. the sharp name holds,
 *   4. the name shatters back into scattered blocks — then repeat.
 *
 * The underlying <h1> text is transparent; the canvas draws both the blocks and
 * the sharp text. The <h1> stays the measurable element (font metrics via
 * getComputedStyle) so everything matches the responsive type.
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

    const CELL = 11; // block size in CSS px

    // Cycle timing (ms). The loop NEVER goes empty: it rests on the crisp name,
    // then periodically ripples into blocks and straight back —
    //   hold sharp → shatter to blocks → reassemble → morph to sharp → (repeat).
    const PERIOD = 8000;
    const T_HOLD = 4600; // crisp name rests (always readable)
    const T_SHATTER = 700; // crisp text → scattered blocks
    const T_ASSEMBLE = 1500; // blocks fly back onto the grid
    const T_MORPH = 500; // settled blocks → crisp text cross-fade

    let raf = 0;

    interface Cell {
      x: number; // final block position (device px)
      y: number;
      bw: number;
      bh: number;
      shade: number; // glyph coverage 0..1
      ox: number; // scatter offset the block flies in from
      oy: number;
      delay: number; // 0..1 stagger within the assemble/shatter window
    }

    let cells: Cell[] = [];
    let W = 0;
    let H = 0;
    let light = false;
    let sharp: HTMLCanvasElement | null = null; // pre-rendered crisp text

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
      const fs = parseFloat(cs.fontSize);
      const font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;

      // 1) Crisp text layer (the resting look) — white→soft-blue in dark,
      //    dark grey in light, matching the original headline sheen.
      sharp = document.createElement("canvas");
      sharp.width = cv.width;
      sharp.height = cv.height;
      const sc = sharp.getContext("2d");
      if (!sc) return;
      sc.scale(dpr, dpr);
      sc.textAlign = "center";
      sc.textBaseline = "middle";
      sc.font = font;
      try {
        (sc as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing =
          cs.letterSpacing;
      } catch {}
      const g = sc.createLinearGradient(0, 0, 0, H);
      if (light) {
        g.addColorStop(0, "#1d1d1f");
        g.addColorStop(1, "#3a3a3f");
      } else {
        g.addColorStop(0, "#ffffff");
        g.addColorStop(1, "#d8e0ee");
      }
      sc.fillStyle = g;
      sc.fillText(name, W / 2, H / 2 + fs * 0.02);

      // 2) Sample the same text (flat white) into grid cells for the blocks.
      const off = document.createElement("canvas");
      off.width = cv.width;
      off.height = cv.height;
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return;
      o.scale(dpr, dpr);
      o.textAlign = "center";
      o.textBaseline = "middle";
      o.font = font;
      try {
        (o as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing =
          cs.letterSpacing;
      } catch {}
      o.fillStyle = "#fff";
      o.fillText(name, W / 2, H / 2 + fs * 0.02);

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
          for (let y = y0; y < y1; y += 2) {
            for (let x = x0; x < x1; x += 2) {
              sum += data[(y * off.width + x) * 4 + 3];
              count++;
            }
          }
          const shade = count ? sum / (count * 255) : 0;
          if (shade > 0.14) {
            const ang = Math.random() * Math.PI * 2;
            const dist = (26 + Math.random() * 90) * dpr;
            cells.push({
              x: x0,
              y: y0,
              bw: x1 - x0,
              bh: y1 - y0,
              shade,
              ox: Math.cos(ang) * dist, // fly in from a random direction
              oy: Math.sin(ang) * dist,
              delay: Math.random(), // scattered arrival, not a clean wipe
            });
          }
        }
      }

      h1.style.color = "transparent";
    };

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeIn = (t: number) => t * t * t;
    const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

    const drawSharp = (alpha: number) => {
      if (!sharp) return;
      ctx.globalAlpha = alpha;
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(sharp, 0, 0);
      ctx.globalAlpha = 1;
    };

    // Blocks flying toward (dir=+1) or away from (dir=-1) their cells.
    // prog 0..1; at prog=1 blocks sit exactly on the grid.
    const drawBlocks = (prog: number, dir: 1 | -1, alpha = 1) => {
      ctx.imageSmoothingEnabled = false;
      const gap = Math.max(1, Math.round(1 * dpr));
      const lum = light ? "29,29,31" : "245,245,247";
      for (const c of cells) {
        // Stagger each block within a 0.55-wide window by its delay.
        const local =
          dir === 1
            ? clamp01((prog - c.delay * 0.55) / 0.45)
            : clamp01((prog - c.delay * 0.55) / 0.45);
        const settle = dir === 1 ? easeOut(local) : 1 - easeIn(local);
        // settle: 1 = on grid, 0 = fully scattered.
        const t = dir === 1 ? settle : settle;
        const ox = c.ox * (1 - t);
        const oy = c.oy * (1 - t);
        const a = (dir === 1 ? local : 1 - easeIn(local)) * alpha;
        if (a <= 0.01) continue;
        ctx.fillStyle = `rgba(${lum},${a * (0.55 + c.shade * 0.45)})`;
        ctx.fillRect(c.x + ox, c.y + oy, c.bw - gap, c.bh - gap);
      }
    };

    let loopStart = performance.now();

    const frame = (now: number) => {
      const p = (now - loopStart) % PERIOD;
      ctx.clearRect(0, 0, cv.width, cv.height);

      const tShatterEnd = T_HOLD + T_SHATTER;
      const tAssembleEnd = tShatterEnd + T_ASSEMBLE;

      if (p < T_HOLD) {
        // crisp name rests — always readable
        drawSharp(1);
      } else if (p < tShatterEnd) {
        // crisp text ripples apart into blocks (text stays mostly present)
        const s = (p - T_HOLD) / T_SHATTER;
        drawSharp(1 - easeIn(s) * 0.85);
        drawBlocks(1 - s, -1);
      } else if (p < tAssembleEnd) {
        // blocks fly back onto the grid
        drawBlocks((p - tShatterEnd) / T_ASSEMBLE, 1);
      } else {
        // settled blocks cross-fade back to crisp text (loop ends on sharp)
        const m = (p - tAssembleEnd) / T_MORPH;
        drawBlocks(1, 1, 1 - m);
        drawSharp(easeOut(m));
      }
      raf = requestAnimationFrame(frame);
    };

    // First load plays the assemble as the intro: offset the clock so the very
    // first frame is the start of the "blocks fly in" phase, not the hold.
    let firstRun = true;
    const start = () => {
      build();
      if (reduce) {
        drawSharp(1); // static crisp text, no animation
        return;
      }
      if (firstRun) {
        // begin at the assemble phase (tShatterEnd = T_HOLD + T_SHATTER)
        loopStart = performance.now() - (T_HOLD + T_SHATTER);
        firstRun = false;
      } else {
        loopStart = performance.now();
      }
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(frame);
    };

    // Paint the first frame immediately so the name is never blank. If the
    // display font isn't loaded yet, wait for it (avoids sampling a fallback);
    // otherwise start right away. Either way the intro assemble plays once.
    const fontsReady =
      !document.fonts || document.fonts.status === "loaded";
    if (fontsReady) {
      start();
    } else {
      // draw a provisional assemble now, then rebuild with the real font
      start();
      document.fonts.ready.then(() => {
        firstRun = true;
        start();
      });
    }

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(start, 150);
    };
    window.addEventListener("resize", onResize);
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
