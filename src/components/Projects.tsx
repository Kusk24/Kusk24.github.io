"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownUp,
  Brain,
  Calendar,
  Cloud,
  Code,
  Gamepad2,
  Globe,
  MousePointer2,
  Server,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import Reveal from "./Reveal";
import ContentImage from "./ContentImage";
import LatestRepos from "./LatestRepos";
import { useLanguage } from "@/lib/language";
import { useTheme } from "@/lib/theme";
import { techIconUrl } from "@/lib/icons";
import { profile, projects as projectMeta } from "@/content/site";

const PLATFORM_ICONS: Record<string, typeof Code> = {
  iOS: Smartphone,
  Android: Smartphone,
  Web: Globe,
  Backend: Server,
  Game: Gamepad2,
  Cloud: Cloud,
  "ML/AI": Brain,
};

type SortKey = "newest" | "oldest";

/** Turn a "M/YYYY" string into a sortable number (year * 12 + month). */
function whenValue(when: string): number {
  const [m, y] = when.split("/").map((n) => parseInt(n, 10));
  if (!y || !m) return 0;
  return y * 12 + m;
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** "2/2025" → "Feb 2025" (falls back to the raw string if unparseable). */
function formatWhen(when: string): string {
  const [m, y] = when.split("/").map((n) => parseInt(n, 10));
  if (!y || !m || m < 1 || m > 12) return when;
  return `${MONTHS[m - 1]} ${y}`;
}

function TechChip({
  label,
  icon,
  large,
}: {
  label: string;
  icon: string | null;
  large?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border ${
        large ? "gap-[7px] px-[13px] py-[6px] text-[12.5px]" : "gap-[6px] px-[11px] py-[5px] text-[11.5px]"
      }`}
      style={{ borderColor: "var(--line)", color: "var(--text2)" }}
    >
      {icon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={icon}
          alt=""
          style={{ width: large ? 13 : 12, height: large ? 13 : 12, display: "block" }}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      )}
      {label}
    </span>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState<SortKey>("newest");
  const [activeIdx, setActiveIdx] = useState(0);
  const [open, setOpen] = useState(false);

  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Merge language-independent meta with the current language's text.
  const projects = useMemo(
    () =>
      projectMeta.map((m, i) => ({
        ...m,
        ...(t.projects[i] ?? { name: m.key, sub: "", desc: "", role: "" }),
        techIcons: m.tech.map((n) => ({ label: n, icon: techIconUrl(n, theme) })),
      })),
    [t, theme]
  );
  const featured = projects.filter((p) => p.featured);

  const filters = useMemo(() => {
    const uniq = (a: string[]) => a.filter((v, i) => a.indexOf(v) === i);
    return [
      "All",
      ...uniq(projectMeta.map((m) => m.type)),
      ...uniq(projectMeta.map((m) => m.platform)),
    ];
  }, []);
  const gridProjects = useMemo(() => {
    const list = projects.filter(
      (p) => filter === "All" || p.type === filter || p.platform === filter
    );
    return [...list].sort((a, b) => {
      const diff = whenValue(b.when) - whenValue(a.when);
      return sort === "newest" ? diff : -diff;
    });
  }, [projects, filter, sort]);
  const active = projects[activeIdx] ?? projects[0];

  // Horizontal scrub: the sticky track translates with scroll progress.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const fw = wrapRef.current;
        const ft = trackRef.current;
        if (!fw || !ft || window.innerWidth <= 780) return;
        const total = fw.offsetHeight - window.innerHeight;
        const prog =
          total > 0
            ? Math.min(1, Math.max(0, -fw.getBoundingClientRect().top / total))
            : 0;
        const dist = Math.max(0, ft.scrollWidth - window.innerWidth + 48);
        ft.style.transform = `translate3d(${-prog * dist}px,0,0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const openProject = (key: string) => {
    setActiveIdx(projects.findIndex((p) => p.key === key));
    setOpen(true);
  };

  const ActivePlatIcon = PLATFORM_ICONS[active.platform] ?? Code;

  return (
    <section id="projects" className="relative z-[1] px-6 pb-[120px] pt-[150px]">
      {/* Header */}
      <div className="mx-auto mb-11 max-w-[1200px] px-6">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[660px]">
            <p
              className="m-0 mb-3.5 text-[13px] font-semibold uppercase tracking-[0.16em]"
              style={{ color: "var(--accent)" }}
            >
              {t.projOverline}
            </p>
            <h2 className="m-0 mb-[18px] text-[clamp(40px,5.5vw,68px)] font-bold leading-[1.05] tracking-[-0.035em]">
              {t.projTitle}
            </h2>
            <p
              className="m-0 text-[16.5px] leading-[1.65]"
              style={{ color: "var(--text2)" }}
            >
              {t.projLead}
            </p>
          </div>
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 whitespace-nowrap text-[15px] font-semibold no-underline"
            style={{ color: "var(--accent)" }}
          >
            {t.moreGh} ↗
          </a>
        </Reveal>
      </div>

      {/* Featured — sticky horizontal scrub */}
      <div id="feat-wrap" ref={wrapRef} className="relative h-[240vh]">
        <div
          id="feat-sticky"
          className="sticky top-0 flex h-screen flex-col justify-center gap-[22px] overflow-hidden"
        >
          <div className="mx-auto box-border w-full max-w-[1200px] px-6">
            <span
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--text2)" }}
            >
              <Sparkles size={14} strokeWidth={2} />
              {t.featuredLabel}
            </span>
          </div>
          <div
            id="feat-track"
            ref={trackRef}
            className="flex gap-7 px-6"
            style={{ willChange: "transform" }}
          >
            {featured.map((p) => (
              <article
                key={p.key}
                onClick={() => openProject(p.key)}
                className="relative flex-none cursor-pointer overflow-hidden rounded-[26px] border border-[var(--line)] transition-colors hover:border-[var(--accent)]"
                style={{
                  width: "clamp(300px, 64vw, 700px)",
                  height: "min(64vh, 580px)",
                  background: "var(--card)",
                }}
              >
                <ContentImage
                  src={p.img}
                  alt={p.name}
                  hint={p.imgHint}
                  style={{ width: "100%", height: "100%" }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 px-7 py-[26px]"
                  style={{
                    background: "linear-gradient(transparent, rgba(0,0,0,.82))",
                  }}
                >
                  <div className="mb-3 flex gap-2">
                    <span className="rounded-full bg-white/[.18] px-[11px] py-1 text-[11px] font-semibold text-white">
                      {p.platform}
                    </span>
                    <span className="rounded-full bg-white/[.18] px-[11px] py-1 text-[11px] font-semibold text-white">
                      {p.type}
                    </span>
                  </div>
                  <h3 className="m-0 mb-[5px] text-[clamp(22px,2.6vw,30px)] font-bold tracking-[-0.02em] text-white">
                    {p.name}
                  </h3>
                  <p className="m-0 text-[14px] text-white/[.82]">{p.sub}</p>
                </div>
              </article>
            ))}
          </div>
          <div
            className="mx-auto box-border flex w-full max-w-[1200px] items-center gap-2 px-6 text-[12.5px]"
            style={{ color: "var(--text2)" }}
          >
            <MousePointer2 size={14} strokeWidth={2} />
            {t.scrollHint}
          </div>
        </div>
      </div>

      {/* All projects */}
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal className="mb-6 mt-[90px]">
          <h3 className="m-0 mb-2 text-[clamp(26px,3.2vw,36px)] font-bold tracking-[-0.025em]">
            {t.allTitle}
          </h3>
          <p className="m-0 text-[15.5px]" style={{ color: "var(--text2)" }}>
            {t.allLead}
          </p>
        </Reveal>

        <Reveal
          y={20}
          duration={0.7}
          className="mb-[30px] flex flex-wrap items-center justify-between gap-x-4 gap-y-3"
        >
          <div className="flex flex-wrap gap-[9px]">
            {filters.map((k) => (
              <button
                key={k}
                data-filter=""
                data-on={filter === k ? "true" : "false"}
                onClick={() => setFilter(k)}
                className="cursor-pointer rounded-full border border-[var(--line)] bg-transparent px-4 py-2 text-[13px] font-semibold text-[var(--text2)] transition-colors hover:border-[var(--text2)] hover:text-[var(--text)]"
                style={{ fontFamily: "inherit" }}
              >
                {k === "All" ? t.filterAll : k}
              </button>
            ))}
          </div>
          <label
            className="ml-auto inline-flex items-center gap-2 whitespace-nowrap text-[13px] font-semibold"
            style={{ color: "var(--text2)" }}
          >
            <ArrowDownUp size={15} strokeWidth={2} />
            <span className="sr-only sm:not-sr-only">{t.sortLabel}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="cursor-pointer rounded-full border border-[var(--line)] bg-transparent px-3 py-2 text-[13px] font-semibold text-[var(--text)] transition-colors hover:border-[var(--text2)]"
              style={{ fontFamily: "inherit", background: "var(--card)" }}
            >
              <option value="newest">{t.sortNewest}</option>
              <option value="oldest">{t.sortOldest}</option>
            </select>
          </label>
        </Reveal>

        <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
          {gridProjects.map((p) => {
            const PlatIcon = PLATFORM_ICONS[p.platform] ?? Code;
            return (
              <Reveal
                key={p.key}
                duration={0.7}
                className="flex cursor-pointer flex-col gap-3.5 rounded-[20px] border border-[var(--line)] p-[22px] transition-colors hover:border-[var(--accent)]"
                style={{ background: "var(--card)" }}
              >
                <div
                  onClick={() => openProject(p.key)}
                  className="flex h-full flex-col gap-3.5"
                >
                  <div className="flex items-center justify-between gap-2.5">
                    <span
                      className="inline-flex items-center gap-2 text-[12px] font-semibold"
                      style={{ color: "var(--text2)" }}
                    >
                      <PlatIcon size={15} strokeWidth={2} />
                      {p.platform}
                    </span>
                    <span
                      className="rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.03em]"
                      style={{ color: "var(--accent)", borderColor: "var(--line)" }}
                    >
                      {p.type}
                    </span>
                  </div>
                  <span
                    className="inline-flex items-center gap-1.5 text-[12px]"
                    style={{ color: "var(--text2)" }}
                  >
                    <Calendar size={13} strokeWidth={2} />
                    {formatWhen(p.when)}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="m-0 text-[20px] font-bold tracking-[-0.015em]">
                      {p.name}
                    </h3>
                    <p
                      className="m-0 line-clamp-2 text-[14px] leading-[1.55]"
                      style={{ color: "var(--text2)" }}
                    >
                      {p.desc}
                    </p>
                  </div>
                  <div className="mt-auto flex flex-wrap gap-[7px]">
                    {p.techIcons.map((tag) => (
                      <TechChip key={tag.label} label={tag.label} icon={tag.icon} />
                    ))}
                  </div>
                  <span
                    className="mt-[2px] inline-flex items-center gap-1.5 text-[13px] font-semibold"
                    style={{ color: "var(--accent)" }}
                  >
                    {t.viewCase} →
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Latest on GitHub */}
      <LatestRepos />

      {/* Case-study modal */}
      <div
        data-projmodal=""
        data-open={open ? "true" : "false"}
        onClick={() => setOpen(false)}
        className="fixed inset-0 z-[300] box-border flex items-center justify-center bg-black/60 p-6"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div
          data-projcard=""
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[88vh] w-[min(720px,100%)] overflow-auto rounded-[26px] border"
          style={{
            background: "var(--card)",
            borderColor: "var(--line)",
            boxShadow: "0 40px 100px -30px rgba(0,0,0,.7)",
          }}
        >
          <button
            onClick={() => setOpen(false)}
            title="Close"
            className="absolute right-4 top-4 z-[2] flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[var(--line)] text-[14px] text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            style={{ background: "var(--card)", fontFamily: "inherit" }}
          >
            <X size={14} strokeWidth={2.4} />
          </button>
          <ContentImage
            src={active.img}
            alt={active.name}
            hint={active.imgHint}
            style={{
              width: "100%",
              height: 240,
              borderBottom: "1px solid var(--line)",
            }}
          />
          <div className="px-8 pb-8 pt-7">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-[7px] rounded-full border px-3 py-[5px] text-[12px] font-semibold"
                style={{ color: "var(--text2)", borderColor: "var(--line)" }}
              >
                <ActivePlatIcon size={14} strokeWidth={2} />
                {active.platform}
              </span>
              <span
                className="rounded-full border px-3 py-[5px] text-[12px] font-semibold"
                style={{ color: "var(--accent)", borderColor: "var(--accent)" }}
              >
                {active.type}
              </span>
              <span
                className="ml-auto inline-flex items-center gap-1.5 text-[12.5px]"
                style={{ color: "var(--text2)" }}
              >
                <Calendar size={13} strokeWidth={2} />
                {formatWhen(active.when)}
              </span>
            </div>
            <h3 className="m-0 mb-1.5 text-[28px] font-bold tracking-[-0.02em]">
              {active.name}
            </h3>
            <p
              className="m-0 mb-[22px] text-[14.5px] font-semibold"
              style={{ color: "var(--accent)" }}
            >
              {active.sub}
            </p>
            <p
              className="m-0 mb-1.5 text-[11.5px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: "var(--text2)" }}
            >
              {t.overviewLabel}
            </p>
            <p className="m-0 mb-5 text-[15.5px] leading-[1.65]">{active.desc}</p>
            <p
              className="m-0 mb-1.5 text-[11.5px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: "var(--text2)" }}
            >
              {t.roleLabel}
            </p>
            <p className="m-0 mb-[22px] text-[15.5px] leading-[1.65]">
              {active.role}
            </p>
            <div className="mb-[26px] flex flex-wrap gap-2">
              {active.techIcons.map((tag) => (
                <TechChip key={tag.label} label={tag.label} icon={tag.icon} large />
              ))}
            </div>
            <a
              href={active.link}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-[14.5px] font-semibold no-underline transition-opacity hover:opacity-85"
              style={{ background: "var(--text)", color: "var(--bg)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cdn.simpleicons.org/github/${theme === "dark" ? "0a0a0a" : "fbfbfd"}`}
                alt=""
                style={{ width: 15, height: 15, display: "block" }}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              {t.ghLabel} ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
