"use client";
import { useEffect, useRef } from "react";

/**
 * The hero headline with a looping pixelation reveal: a canvas overlay renders
 * the name blocky→sharp (ease-out ~1.25s), holds crisp ~2.6s, dissolves back
 * (~0.6s), and repeats. The underlying <h1> text goes transparent so only the
 * canvas shows. Ported from the design prototype's _initHeroPixel.
 *
 * The <h1> stays the real, measurable element (font/size/letter-spacing come
 * from getComputedStyle) so the canvas always matches the responsive type.
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
    let raf = 0;

    // Draw the offscreen name downscaled by `factor` then upscaled with
    // smoothing off — the blocky pixelation look.
    const draw = (off: HTMLCanvasElement, factor: number) => {
      const sw = Math.max(1, Math.round(cv.width * factor));
      const sh = Math.max(1, Math.round(cv.height * factor));
      const tmp = document.createElement("canvas");
      tmp.width = sw;
      tmp.height = sh;
      const tctx = tmp.getContext("2d");
      if (!tctx) return;
      tctx.imageSmoothingEnabled = true;
      tctx.drawImage(off, 0, 0, sw, sh);
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(tmp, 0, 0, sw, sh, 0, 0, cv.width, cv.height);
    };

    const render = (animate: boolean) => {
      if (raf) cancelAnimationFrame(raf);
      const rect = h1.getBoundingClientRect();
      const cs = getComputedStyle(h1);
      const W = Math.max(1, Math.ceil(rect.width));
      const H = Math.max(1, Math.ceil(rect.height));
      cv.style.width = W + "px";
      cv.style.height = H + "px";
      cv.width = Math.ceil(W * dpr);
      cv.height = Math.ceil(H * dpr);

      const off = document.createElement("canvas");
      off.width = cv.width;
      off.height = cv.height;
      const o = off.getContext("2d");
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
      // Gradient fill (white → soft blue) for a subtle metallic sheen in dark.
      // Light theme is handled by re-tinting below via the h1's own color.
      const light = document.documentElement.getAttribute("data-theme") === "light";
      const g = o.createLinearGradient(0, 0, 0, H);
      if (light) {
        g.addColorStop(0, "#1d1d1f");
        g.addColorStop(1, "#3a3a3f");
      } else {
        g.addColorStop(0, "#ffffff");
        g.addColorStop(1, "#d8e0ee");
      }
      o.fillStyle = g;
      o.fillText(name, W / 2, H / 2 + fs * 0.02);
      h1.style.color = "transparent";

      if (!animate || reduce) {
        ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(off, 0, 0);
        return;
      }

      // One full pixelate cycle every PERIOD ms: the name holds crisp, then
      // briefly dissolves into coarse pixels (T_OUT) and resolves back in
      // (T_IN), then stays sharp until the next cycle. Blockier start via a
      // low FMIN. The first cycle also plays the reveal on load.
      const PERIOD = 10000; // fire roughly every 10s
      const T_OUT = 650, // sharp → blocky
        T_IN = 2100, // blocky → sharp
        FMIN = 0.022;
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const easeIn = (t: number) => t * t * t;
      // Start the very first reveal immediately (offset so p begins at the
      // dissolve), then settle into the 10s cadence.
      const loopStart = performance.now() - (PERIOD - T_OUT - T_IN);

      const paintSharp = () => {
        ctx.clearRect(0, 0, cv.width, cv.height);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(off, 0, 0);
      };

      const frame = (now: number) => {
        const p = (now - loopStart) % PERIOD;
        let factor: number;
        if (p < T_OUT) {
          // dissolve out to blocky
          factor = 1 - easeIn(p / T_OUT) * (1 - FMIN);
        } else if (p < T_OUT + T_IN) {
          // resolve back to sharp
          factor = FMIN + easeOut((p - T_OUT) / T_IN) * (1 - FMIN);
        } else {
          // hold crisp until the next cycle
          factor = 1;
        }
        if (factor >= 0.999) paintSharp();
        else draw(off, factor);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    };

    // Fonts must be loaded before measuring, or the canvas renders a fallback.
    const start = () => render(true);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(start);
    } else {
      start();
    }

    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => render(true), 150);
    };
    window.addEventListener("resize", onResize);
    // Re-render on theme flip so the gradient re-tints.
    const observer = new MutationObserver(() => render(true));
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
