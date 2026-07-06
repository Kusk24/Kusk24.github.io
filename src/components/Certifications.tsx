"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Award, BadgeCheck, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";
import ContentImage from "./ContentImage";
import { useLanguage } from "@/lib/language";
import { certs } from "@/content/site";

export default function Certifications() {
  const { t } = useLanguage();
  const [cur, setCur] = useState(0);
  const hold = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const n = certs.length;

  const startTimer = useCallback(() => {
    clearInterval(timer.current);
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    timer.current = setInterval(() => {
      if (hold.current) return;
      setCur((i) => (i + 1) % n);
    }, 3800);
  }, [n]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timer.current);
  }, [startTimer]);

  const select = (i: number) => {
    setCur(i);
    startTimer();
  };

  return (
    <section id="certifications" className="relative z-[1] px-6 py-[150px]">
      <div className="mx-auto max-w-[1140px]">
        <Reveal className="mb-14">
          <p
            className="m-0 mb-3.5 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--accent)" }}
          >
            <Award size={15} strokeWidth={2} />
            {t.certSecOverline}
          </p>
          <h2 className="m-0 mb-4 text-[clamp(40px,5.5vw,68px)] font-bold leading-[1.05] tracking-[-0.035em]">
            {t.certsLabel}
          </h2>
          <p
            className="m-0 max-w-[560px] text-[16.5px] leading-[1.65]"
            style={{ color: "var(--text2)" }}
          >
            {t.certSecLead}
          </p>
        </Reveal>

        <div className="flex flex-wrap items-stretch gap-7">
          {/* Showcase card */}
          <Reveal
            y={40}
            className="box-border min-w-[min(460px,100%)] flex-[1.35_1_460px]"
          >
            <div
              onMouseEnter={() => (hold.current = true)}
              onMouseLeave={() => (hold.current = false)}
              className="flex h-full flex-col gap-4 rounded-[28px] border p-3.5"
              style={{
                background: "linear-gradient(180deg, var(--card), var(--bg2))",
                borderColor: "var(--line)",
                boxShadow: "0 40px 90px -50px rgba(0,0,0,.7)",
              }}
            >
              <div className="min-w-0 flex-1">
                {certs.map((cert, i) => (
                  <div
                    key={cert.name}
                    data-certslide=""
                    data-cur={i === cur ? "true" : "false"}
                    className="h-full flex-col"
                  >
                    <div
                      className="relative flex flex-1 flex-col overflow-hidden rounded-[20px] border"
                      style={{
                        borderColor: "var(--line)",
                        background: "var(--bg2)",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cert.logo}
                        alt=""
                        className="pointer-events-none absolute -bottom-[30px] -right-[34px] h-[210px] w-[210px] object-contain opacity-5"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-[120px] opacity-[0.14]"
                        style={{
                          background:
                            "radial-gradient(120% 100% at 20% 0%, var(--accent), transparent 60%)",
                        }}
                      />
                      <div className="relative flex items-start gap-3.5 px-[22px] pt-[22px]">
                        <span
                          className="flex h-[52px] w-[52px] flex-none items-center justify-center overflow-hidden rounded-[14px] bg-white"
                          style={{ boxShadow: "0 8px 24px -8px rgba(0,0,0,.5)" }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={cert.logo}
                            alt=""
                            style={{
                              width: 32,
                              height: 32,
                              objectFit: "contain",
                              display: "block",
                            }}
                            onError={(e) =>
                              (e.currentTarget.style.display = "none")
                            }
                          />
                        </span>
                        <div className="flex min-w-0 flex-1 flex-col gap-[3px] pt-[2px]">
                          <span
                            className="text-[18px] font-semibold leading-[1.25] tracking-[-0.015em]"
                            style={{ color: "var(--text)" }}
                          >
                            {cert.name}
                          </span>
                          <span
                            className="text-[13.5px]"
                            style={{ color: "var(--text2)" }}
                          >
                            {cert.org}
                            {cert.date && ` · ${cert.date}`}
                          </span>
                          {cert.verifyUrl && (
                            <a
                              href={cert.verifyUrl}
                              target="_blank"
                              rel="noopener"
                              onClick={(e) => e.stopPropagation()}
                              className="mt-[3px] inline-flex w-fit items-center gap-1 text-[12.5px] font-semibold no-underline"
                              style={{ color: "var(--accent)" }}
                            >
                              {t.certVerify} ↗
                            </a>
                          )}
                        </div>
                        <span
                          className="inline-flex flex-none items-center gap-1.5 whitespace-nowrap rounded-full border px-[11px] py-[5px] text-[11.5px] font-semibold tracking-[0.02em]"
                          style={{
                            color: "var(--accent)",
                            borderColor: "var(--accent)",
                          }}
                        >
                          <BadgeCheck size={13} strokeWidth={2.2} />
                          {t.certVerified}
                        </span>
                      </div>
                      <div className="relative px-[22px] pb-[22px] pt-4">
                        <ContentImage
                          src={cert.img}
                          alt={cert.name}
                          hint={cert.img.replace("/content/", "")}
                          radius={14}
                          fit="contain"
                          style={{ width: "100%", height: 230 }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3.5 px-2 pb-2 pt-[2px]">
                <button
                  onClick={() => select((cur - 1 + n) % n)}
                  title="Previous"
                  className="flex h-[38px] w-[38px] flex-none cursor-pointer items-center justify-center rounded-full border border-[var(--line)] text-[16px] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  style={{ background: "var(--card)", fontFamily: "inherit" }}
                >
                  ‹
                </button>
                <div className="flex flex-1 items-center gap-[7px]">
                  {certs.map((cert, i) => (
                    <button
                      key={cert.name}
                      data-certbar=""
                      data-cur={i === cur ? "true" : "false"}
                      onClick={() => select(i)}
                      title={cert.name}
                      className="h-[5px] max-w-[44px] flex-1 cursor-pointer rounded-[3px] border-none p-0"
                      style={{
                        background: "var(--line)",
                        transition: "background .5s ease, max-width .5s ease",
                      }}
                    />
                  ))}
                  <span
                    className="ml-1.5 text-[12px] tabular-nums"
                    style={{ color: "var(--text2)" }}
                  >
                    {cur + 1} / {n}
                  </span>
                </div>
                <button
                  onClick={() => select((cur + 1) % n)}
                  title="Next"
                  className="flex h-[38px] w-[38px] flex-none cursor-pointer items-center justify-center rounded-full border border-[var(--line)] text-[16px] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  style={{ background: "var(--card)", fontFamily: "inherit" }}
                >
                  ›
                </button>
              </div>
            </div>
          </Reveal>

          {/* Cert list */}
          <div className="flex min-w-[min(340px,100%)] flex-[1_1_340px] flex-col gap-3">
            {certs.map((cert, i) => (
              <Reveal key={cert.name} duration={0.7}>
                <div
                  data-certitem=""
                  data-cur={i === cur ? "true" : "false"}
                  onClick={() => select(i)}
                  className="flex cursor-pointer items-center gap-3.5 rounded-[16px] border border-[var(--line)] px-4 py-3.5 transition-colors hover:border-[var(--text2)]"
                  style={{ background: "var(--card)" }}
                >
                  <span
                    className="flex h-[42px] w-[42px] flex-none items-center justify-center overflow-hidden rounded-xl border bg-white"
                    style={{ borderColor: "var(--line)" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cert.logo}
                      alt=""
                      style={{
                        width: 27,
                        height: 27,
                        display: "block",
                        objectFit: "contain",
                      }}
                      onError={(e) => (e.currentTarget.style.display = "none")}
                    />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
                    <span
                      className="text-[14.5px] font-semibold tracking-[-0.01em]"
                      style={{ color: "var(--text)" }}
                    >
                      {cert.name}
                    </span>
                    <span className="text-[12.5px]" style={{ color: "var(--text2)" }}>
                      {cert.org}
                      {cert.date && ` · ${cert.date}`}
                    </span>
                  </span>
                  <ChevronRight
                    size={15}
                    strokeWidth={2}
                    className="flex-none opacity-45"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
