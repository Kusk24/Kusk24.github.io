"use client";
import { GraduationCap } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "@/lib/language";
import { education } from "@/content/site";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section
      id="experience"
      className="relative z-[1] border-y px-6 py-[150px]"
      style={{ background: "var(--bg2)", borderColor: "var(--line)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <Reveal className="mb-16">
          <p
            className="m-0 mb-3.5 text-[13px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--accent)" }}
          >
            {t.expOverline}
          </p>
          <h2 className="m-0 text-[clamp(40px,5.5vw,68px)] font-bold leading-[1.05] tracking-[-0.035em]">
            {t.expTitle}
          </h2>
        </Reveal>

        <div className="flex flex-wrap items-start gap-14">
          {/* Timeline */}
          <div className="flex min-w-[min(420px,100%)] flex-[1.4_1_420px] flex-col">
            {t.experience.map((job) => (
              <Reveal
                key={job.org + job.period}
                y={40}
                className="relative border-l pb-[52px] pl-[34px]"
                style={{ borderColor: "var(--line)" }}
              >
                <span
                  className="absolute -left-[5px] top-1.5 h-[9px] w-[9px] rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                <p className="m-0 mb-1.5 text-[13px]" style={{ color: "var(--text2)" }}>
                  {job.period}
                </p>
                <h3 className="m-0 mb-1 text-[22px] font-bold tracking-[-0.015em]">
                  {job.role}
                </h3>
                <p
                  className="m-0 mb-3 text-[15px] font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  {job.org}
                </p>
                <p
                  className="m-0 max-w-[560px] text-[15.5px] leading-[1.65]"
                  style={{ color: "var(--text2)" }}
                >
                  {job.desc}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Education card */}
          <div className="flex min-w-[min(320px,100%)] flex-[1_1_320px] flex-col gap-6">
            <Reveal
              y={40}
              delay={0.1}
              className="rounded-[26px] border p-9"
              style={{ background: "var(--card)", borderColor: "var(--line)" }}
            >
              <p
                className="m-0 mb-[18px] flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "var(--text2)" }}
              >
                <GraduationCap size={15} strokeWidth={2} />
                {t.eduLabel}
              </p>
              <h3 className="m-0 mb-1.5 text-[21px] font-bold tracking-[-0.015em]">
                {t.eduSchool}
              </h3>
              <p
                className="m-0 mb-1 text-[15px] leading-[1.55]"
                style={{ color: "var(--text2)" }}
              >
                {t.eduDegree}
              </p>
              <p className="m-0 mb-7 text-[13.5px]" style={{ color: "var(--text2)" }}>
                {t.eduPeriod}
              </p>
              <div className="flex items-baseline gap-2.5">
                <span
                  className="text-[60px] font-bold leading-none tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-grotesk), sans-serif" }}
                >
                  {education.gpa}
                </span>
                <span
                  className="text-[20px] font-medium"
                  style={{ color: "var(--text2)" }}
                >
                  / {education.gpaOutOf} {t.gpaLabel}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
