"use client";
import { useEffect, useRef } from "react";

interface Star {
  hx: number;
  hy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
  o: number;
  tw: number;
  ph: number;
  hue: number;
  bright: boolean;
}

interface Nebula {
  x: number;
  y: number;
  r: number;
  hue: number;
  a: number;
  ph: number;
}

// Full-viewport star/nebula field with mouse repulsion, ported 1:1 from the
// design prototype's _initDots.
export default function BgCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0,
      H = 0;
    const stars: Star[] = [];
    const nebulae: Nebula[] = [];
    const HUES = [215, 230, 262, 285, 195];

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      cv.width = W * dpr;
      cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars.length = 0;
      nebulae.length = 0;
      const clusters = 5 + Math.round(W / 800);
      for (let c = 0; c < clusters; c++) {
        const cx = (0.06 + 0.88 * Math.random()) * W;
        const cy = (0.06 + 0.88 * Math.random()) * H;
        const spread = 60 + Math.random() * 150;
        const hue = HUES[Math.floor(Math.random() * HUES.length)];
        nebulae.push({
          x: cx,
          y: cy,
          r: spread * 2.4 + 90,
          hue,
          a: 0.05 + Math.random() * 0.07,
          ph: Math.random() * 6.283,
        });
        if (Math.random() < 0.5) {
          nebulae.push({
            x: cx + (Math.random() - 0.5) * spread * 1.6,
            y: cy + (Math.random() - 0.5) * spread * 1.6,
            r: spread * 1.3 + 60,
            hue: HUES[Math.floor(Math.random() * HUES.length)],
            a: 0.04 + Math.random() * 0.05,
            ph: Math.random() * 6.283,
          });
        }
        const n = 22 + Math.floor(Math.random() * 30);
        for (let i = 0; i < n; i++) {
          const a = Math.random() * Math.PI * 2;
          const r = Math.abs(Math.random() + Math.random() - 1) * spread * 1.4;
          const hx = cx + Math.cos(a) * r;
          const hy = cy + Math.sin(a) * r;
          stars.push({
            hx,
            hy,
            x: hx,
            y: hy,
            vx: 0,
            vy: 0,
            s: 0.5 + Math.random() * 1.3,
            o: 0.25 + Math.random() * 0.55,
            tw: 0.6 + Math.random() * 1.8,
            ph: Math.random() * 6.283,
            hue,
            bright: Math.random() < 0.07,
          });
        }
      }
      for (let i = 0; i < 60; i++) {
        const hx = Math.random() * W,
          hy = Math.random() * H;
        stars.push({
          hx,
          hy,
          x: hx,
          y: hy,
          vx: 0,
          vy: 0,
          s: 0.4 + Math.random() * 0.9,
          o: 0.1 + Math.random() * 0.3,
          tw: 0.5 + Math.random() * 1.5,
          ph: Math.random() * 6.283,
          hue: 220,
          bright: false,
        });
      }
    };
    build();

    const mouse = { x: -9999, y: -9999 };
    let t = 0;

    const draw = (animate: boolean) => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);
      const dark =
        document.documentElement.getAttribute("data-theme") !== "light";

      ctx.globalCompositeOperation = dark ? "lighter" : "source-over";
      for (const nb of nebulae) {
        const drift = Math.cos(t * 0.4 + nb.ph) * 10;
        const x = nb.x + drift,
          y = nb.y + Math.sin(t * 0.3 + nb.ph) * 8;
        const breathe = 1 + Math.sin(t * 0.5 + nb.ph) * 0.06;
        const r = nb.r * breathe;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        if (dark) {
          g.addColorStop(0, `hsla(${nb.hue},85%,62%,${nb.a})`);
          g.addColorStop(0.45, `hsla(${nb.hue},80%,55%,${nb.a * 0.45})`);
          g.addColorStop(1, `hsla(${nb.hue},80%,50%,0)`);
        } else {
          g.addColorStop(0, `hsla(${nb.hue},65%,55%,${nb.a * 0.55})`);
          g.addColorStop(1, `hsla(${nb.hue},65%,55%,0)`);
        }
        ctx.fillStyle = g;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      }

      for (const d of stars) {
        if (animate) {
          const dx = d.x - mouse.x,
            dy = d.y - mouse.y;
          const R = 150,
            dist2 = dx * dx + dy * dy;
          if (dist2 < R * R) {
            const dist = Math.sqrt(dist2) || 1;
            const f = (1 - dist / R) * 2.4;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
          d.vx += (d.hx - d.x) * 0.02;
          d.vy += (d.hy - d.y) * 0.02;
          d.vx *= 0.86;
          d.vy *= 0.86;
          d.x += d.vx;
          d.y += d.vy;
        }
        const ix = Math.cos(t * 1.1 + d.ph) * 0.5;
        const iy = Math.sin(t * 1.4 + d.ph) * 0.5;
        const twinkle = 0.65 + 0.35 * Math.sin(t * d.tw * 3 + d.ph);
        const alpha = Math.min(1, d.o * twinkle);
        const px = d.x + ix,
          py = d.y + iy;
        if (d.bright) {
          const gr = ctx.createRadialGradient(px, py, 0, px, py, d.s * 7);
          const core = dark ? "255,255,255" : "50,60,110";
          gr.addColorStop(0, `rgba(${core},${alpha * 0.5})`);
          gr.addColorStop(1, `rgba(${core},0)`);
          ctx.fillStyle = gr;
          ctx.fillRect(px - d.s * 7, py - d.s * 7, d.s * 14, d.s * 14);
        }
        ctx.beginPath();
        ctx.arc(px, py, d.bright ? d.s * 1.4 : d.s, 0, 6.2832);
        ctx.fillStyle = dark
          ? `hsla(${d.hue},60%,88%,${alpha})`
          : `hsla(${d.hue},45%,30%,${alpha * 0.8})`;
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    let raf = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let onMove: ((e: PointerEvent) => void) | undefined;
    let onResize: () => void;

    if (reduce) {
      draw(false);
      onResize = () => {
        build();
        draw(false);
      };
      window.addEventListener("resize", onResize);
    } else {
      onMove = (e: PointerEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      onResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(build, 200);
      };
      window.addEventListener("resize", onResize);

      const tick = () => {
        draw(true);
        raf = requestAnimationFrame(tick);
      };
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      if (onMove) window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      id="bg-dots"
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
