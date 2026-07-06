"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, Download } from "lucide-react";
import Reveal from "./Reveal";
import ContentImage from "./ContentImage";
import { useLanguage } from "@/lib/language";
import { profile } from "@/content/site";

/** Typewriter for the hero overline — types, holds, deletes, moves on. */
function useTypewriter(phrases: string[]) {
  const [typed, setTyped] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTyped(phrases[0] ?? "");
      return;
    }
    let i = 0; // phrase index
    let c = 0; // char count
    let deleting = false;

    const tick = () => {
      const full = phrases[i % phrases.length];
      if (!deleting) {
        c++;
        if (c >= full.length) {
          setTyped(full);
          deleting = true;
          timer.current = setTimeout(tick, 1400);
          return;
        }
      } else {
        c--;
        if (c <= 0) {
          deleting = false;
          i++;
          c = 0;
          setTyped("");
          timer.current = setTimeout(tick, 260);
          return;
        }
      }
      setTyped(full.slice(0, c));
      timer.current = setTimeout(tick, deleting ? 34 : 62);
    };

    setTyped("");
    timer.current = setTimeout(tick, 400);
    return () => clearTimeout(timer.current);
  }, [phrases]);

  return typed;
}

export default function Hero() {
  const { t } = useLanguage();
  const typed = useTypewriter(t.typedPhrases);
  const parRef = useRef<HTMLDivElement>(null);

  // Parallax drift + fade of the hero copy while scrolling away.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = parRef.current;
        if (!el) return;
        const y = window.scrollY;
        el.style.transform = `translate3d(0,${y * 0.28}px,0)`;
        el.style.opacity = String(Math.max(0, 1 - y / 620));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative z-[1] box-border flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-10 pt-[140px] text-center"
    >
      <div ref={parRef} style={{ willChange: "transform, opacity" }}>
        <Reveal
          as="p"
          y={30}
          className="mb-5 min-h-[1.2em] text-[clamp(12px,1.4vw,15px)] font-semibold uppercase tracking-[0.16em]"
          style={{ color: "var(--accent)", margin: "0 0 20px" }}
        >
          {typed}
          <span
            className="ml-[3px] inline-block h-[1.05em] w-[0.5em] align-[-0.14em]"
            style={{
              background: "var(--accent)",
              animation: "caretBlink 1.05s steps(1) infinite",
            }}
          />
        </Reveal>
        <Reveal
          as="h1"
          y={40}
          duration={0.9}
          delay={0.1}
          className="m-0 text-[clamp(54px,11vw,150px)] font-bold leading-[1.02] tracking-[-0.045em]"
        >
          {profile.name}
        </Reveal>
        <Reveal
          as="p"
          y={30}
          delay={0.22}
          className="mx-auto mb-10 mt-7 max-w-[620px] text-[clamp(17px,2vw,21px)] leading-[1.65]"
          style={{ color: "var(--text2)" }}
        >
          {t.heroTagline}
        </Reveal>
        <Reveal
          y={24}
          delay={0.34}
          className="flex flex-wrap justify-center gap-3.5"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-[9px] rounded-full px-[30px] py-[15px] text-[15.5px] font-semibold text-white no-underline transition-[filter] hover:brightness-[1.12]"
            style={{ background: "var(--accent)" }}
          >
            <ArrowDown size={15} strokeWidth={2.4} />
            {t.ctaProjects}
          </a>
          <a
            href={profile.resumePath}
            download={profile.resumeFileName}
            className="inline-flex items-center gap-[9px] rounded-full border border-[var(--line)] px-[30px] py-[15px] text-[15.5px] font-semibold no-underline transition-colors hover:border-[var(--text2)]"
            style={{ color: "var(--text)" }}
          >
            <Download size={15} strokeWidth={2.4} />
            {t.ctaResume}
          </a>
        </Reveal>
      </div>

      <Reveal y={60} duration={1} delay={0.45} className="mt-[76px]">
        <ContentImage
          src={profile.portrait}
          alt={profile.name}
          hint={profile.portraitHint}
          radius={32}
          style={{
            width: "min(400px, 84vw)",
            height: 480,
            boxShadow: "0 40px 100px -30px rgba(0,0,0,.5)",
          }}
        />
      </Reveal>

      <div
        className="mt-14 text-[20px]"
        style={{
          color: "var(--text2)",
          animation: "cueBob 2.2s ease-in-out infinite",
        }}
      >
        ↓
      </div>
    </section>
  );
}
