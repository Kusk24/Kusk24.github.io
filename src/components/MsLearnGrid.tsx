"use client";
import { Trophy, Medal } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "@/lib/language";
import { MSLEARN_PROFILE_URL, type MsLearnData } from "@/lib/mslearn";

const HOST = "https://learn.microsoft.com";
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function Tile({
  title,
  icon,
  href,
  date,
  large,
}: {
  title: string;
  icon: string;
  href: string;
  date: string;
  large?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      title={title}
      className="glass-interactive flex items-center gap-3 rounded-[16px] px-3.5 py-3 no-underline"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt=""
        className="flex-none"
        style={{ width: large ? 46 : 38, height: large ? 46 : 38, objectFit: "contain" }}
        onError={(e) => (e.currentTarget.style.visibility = "hidden")}
      />
      <span className="flex min-w-0 flex-col gap-[2px]">
        <span
          className={`${large ? "text-[13.5px]" : "text-[12.5px]"} font-semibold leading-[1.3] tracking-[-0.01em]`}
          style={{
            color: "var(--text)",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
          }}
        >
          {title}
        </span>
        <span className="text-[11.5px]" style={{ color: "var(--text2)" }}>
          {date}
        </span>
      </span>
    </a>
  );
}

/**
 * Microsoft Learn achievements, fetched from the public Learn API at build
 * time (see src/lib/mslearn.ts) and shown as a mini-grid below the
 * certificate carousel.
 */
export default function MsLearnGrid({ data }: { data: MsLearnData }) {
  const { t } = useLanguage();
  const sorted = [...data.achievements].sort((a, b) =>
    b.grantedOn.localeCompare(a.grantedOn)
  );
  const trophies = sorted.filter((a) => a.category === "learningpaths");
  const badges = sorted.filter((a) => a.category !== "learningpaths");

  return (
    <Reveal className="mt-16">
      {/* Header */}
      <div className="mb-7 flex flex-wrap items-center gap-4">
        <span
          className="flex h-[52px] w-[52px] flex-none items-center justify-center overflow-hidden rounded-[14px] bg-white"
          style={{ boxShadow: "0 8px 24px -8px rgba(0,0,0,.5)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt=""
            style={{ width: 28, height: 28, objectFit: "contain", display: "block" }}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <span
            className="text-[19px] font-semibold tracking-[-0.015em]"
            style={{ color: "var(--text)" }}
          >
            Microsoft Learn
          </span>
          <span className="text-[13.5px]" style={{ color: "var(--text2)" }}>
            {t.msLevel} {data.currentLevel} · {data.totalXp.toLocaleString()} XP
          </span>
        </div>
        <a
          href={MSLEARN_PROFILE_URL}
          target="_blank"
          rel="noopener"
          className="glass-interactive inline-flex items-center gap-1.5 rounded-full px-[18px] py-[10px] text-[13px] font-semibold no-underline"
          style={{ color: "var(--text)" }}
        >
          {t.msViewProfile} ↗
        </a>
      </div>
      <p
        className="m-0 mb-8 max-w-[560px] text-[14.5px] leading-[1.6]"
        style={{ color: "var(--text2)" }}
      >
        {t.msLearnLead}
      </p>

      {/* Learning-path trophies */}
      <p
        className="m-0 mb-3.5 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: "var(--text2)" }}
      >
        <Trophy size={13} strokeWidth={2} />
        {t.msTrophiesLabel} · {trophies.length}
      </p>
      <div className="mb-9 grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-3">
        {trophies.map((a) => (
          <Tile
            key={a.title}
            title={a.title}
            icon={HOST + a.imageUrl}
            href={HOST + a.url}
            date={fmtDate(a.grantedOn)}
            large
          />
        ))}
      </div>

      {/* Module badges */}
      <p
        className="m-0 mb-3.5 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: "var(--text2)" }}
      >
        <Medal size={13} strokeWidth={2} />
        {t.msBadgesLabel} · {badges.length}
      </p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))] gap-3">
        {badges.map((a) => (
          <Tile
            key={a.title}
            title={a.title}
            icon={HOST + a.imageUrl}
            href={HOST + a.url}
            date={fmtDate(a.grantedOn)}
          />
        ))}
      </div>
    </Reveal>
  );
}
