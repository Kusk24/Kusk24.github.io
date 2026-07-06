"use client";
import { Code, Languages, MapPin, Trophy } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "@/lib/language";

const FACT_ICONS: Record<string, typeof Code> = {
  "map-pin": MapPin,
  languages: Languages,
  trophy: Trophy,
};

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative z-[1] px-6 py-[160px]">
      <div className="mx-auto max-w-[780px]">
        <Reveal className="mb-10">
          <p
            className="m-0 mb-3.5 text-[13px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--accent)" }}
          >
            {t.aboutOverline}
          </p>
          <h2 className="m-0 text-[clamp(40px,5.5vw,68px)] font-bold leading-[1.05] tracking-[-0.035em]">
            {t.aboutTitle}
          </h2>
        </Reveal>
        <Reveal
          as="p"
          y={36}
          delay={0.1}
          className="m-0 mb-7 text-[clamp(21px,2.5vw,28px)] font-medium leading-[1.55] tracking-[-0.01em]"
        >
          {t.aboutP1}
        </Reveal>
        <Reveal
          as="p"
          y={36}
          delay={0.2}
          className="m-0 mb-10 text-[17.5px] leading-[1.7]"
          style={{ color: "var(--text2)" }}
        >
          {t.aboutP2}
        </Reveal>
        <Reveal delay={0.3} className="flex flex-wrap gap-2.5">
          {t.aboutFacts.map((fact) => {
            const Icon = FACT_ICONS[fact.ic] ?? Code;
            return (
              <span
                key={fact.label}
                className="inline-flex items-center gap-2 rounded-full border px-[18px] py-[9px] text-[13.5px]"
                style={{ borderColor: "var(--line)", color: "var(--text2)" }}
              >
                <Icon size={14} strokeWidth={2} />
                {fact.label}
              </span>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
