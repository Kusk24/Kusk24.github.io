"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Layers } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "@/lib/language";
import { useTheme } from "@/lib/theme";
import { monoIconUrl } from "@/lib/icons";
import { techStack } from "@/content/site";

export default function TechStack() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [lit, setLit] = useState(0);
  const hold = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const startTimer = useCallback(() => {
    clearInterval(timer.current);
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    timer.current = setInterval(() => {
      if (hold.current) return;
      setLit((i) => (i + 1) % techStack.length);
    }, 1200);
  }, []);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timer.current);
  }, [startTimer]);

  return (
    <section id="stack" className="relative z-[1] px-6 py-[150px]">
      <div className="mx-auto max-w-[1140px]">
        <Reveal className="mb-14 max-w-[640px]">
          <p
            className="m-0 mb-3.5 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--accent)" }}
          >
            <Layers size={15} strokeWidth={2} />
            {t.stackOverline}
          </p>
          <h2 className="m-0 mb-4 text-[clamp(40px,5.5vw,68px)] font-bold leading-[1.05] tracking-[-0.035em]">
            {t.stackTitle}
          </h2>
          <p
            className="m-0 text-[16.5px] leading-[1.65]"
            style={{ color: "var(--text2)" }}
          >
            {t.stackLead}
          </p>
        </Reveal>

        <div
          onMouseEnter={() => (hold.current = true)}
          onMouseLeave={() => (hold.current = false)}
          className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(122px,1fr))]"
        >
          {techStack.map((tech, i) => (
            <Reveal
              key={tech.name + i}
              y={28}
              duration={0.7}
              className="box-border"
            >
              <div
                data-techtile=""
                data-lit={i === lit ? "true" : "false"}
                onMouseEnter={() => {
                  setLit(i);
                  startTimer();
                }}
                className="box-border flex cursor-default flex-col items-center gap-3 rounded-[20px] border px-3 py-6"
                style={{ background: "var(--card)", borderColor: "var(--line)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tech.icon ?? monoIconUrl(tech.slug, theme)}
                  alt={tech.name}
                  style={{
                    width: 42,
                    height: 42,
                    display: "block",
                    objectFit: "contain",
                  }}
                  onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                />
                <span
                  data-techname=""
                  className="text-center text-[13px] font-medium leading-[1.3]"
                  style={{ color: "var(--text2)" }}
                >
                  {tech.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
