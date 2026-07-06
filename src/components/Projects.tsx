"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownUp,
  Brain,
  Calendar,
  ChevronsDown,
  Cloud,
  Code,
  Gamepad2,
  Globe,
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

/** How many grid cards to show before "Show all projects" is clicked. */
const GRID_COLLAPSED = 6;

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
  const [expanded, setExpanded] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [open, setOpen] = useState(false);
  // Which featured project is "on stage" (front card). Driven by scroll on
  // desktop, by dot/thumbnail taps on mobile.
  const [featActive, setFeatActive] = useState(0);
  // Stage size, measured so the fanned-out card layout is pixel-exact.
  const [stageSize, setStageSize] = useState({ w: 1200, h: 540 });

  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

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
  const shownProjects = expanded
    ? gridProjects
    : gridProjects.slice(0, GRID_COLLAPSED);
  const active = projects[activeIdx] ?? projects[0];

  const nFeat = featured.length;

  // Scroll scrub: map progress through the tall #feat-wrap onto which featured
  // card is on stage. (Desktop only; mobile uses dots/thumbs.)
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const fw = wrapRef.current;
        if (!fw || window.innerWidth <= 780 || nFeat === 0) return;
        const total = fw.offsetHeight - window.innerHeight;
        const prog =
          total > 0
            ? Math.min(1, Math.max(0, -fw.getBoundingClientRect().top / total))
            : 0;
        const idx = Math.min(nFeat - 1, Math.floor(prog * nFeat));
        setFeatActive((cur) => (cur === idx ? cur : idx));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [nFeat]);

  // Measure the stage so the fanned card geometry is exact and responsive.
  useEffect(() => {
    const measure = () => {
      const el = stageRef.current;
      if (!el) return;
      const w = el.clientWidth || Math.min(1200, window.innerWidth - 48);
      const h = el.clientHeight || Math.min(window.innerHeight * 0.6, 540);
      setStageSize((cur) => (cur.w === w && cur.h === h ? cur : { w, h }));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll the page so a given featured card comes on stage (desktop), or just
  // switch it directly (mobile).
  const goFeatured = (i: number) => {
    const fw = wrapRef.current;
    if (fw && window.innerWidth > 780 && nFeat > 0) {
      const total = fw.offsetHeight - window.innerHeight;
      const top = window.scrollY + fw.getBoundingClientRect().top;
      window.scrollTo({
        top: Math.round(top + ((i + 0.5) / nFeat) * total),
        behavior: "smooth",
      });
    } else {
      setFeatActive(i);
    }
  };

  const openProject = (key: string) => {
    setActiveIdx(projects.findIndex((p) => p.key === key));
    setOpen(true);
  };

  // Fanned-card geometry for each featured project relative to the active one.
  const fActive = Math.min(featActive, Math.max(0, nFeat - 1));
  const { w: gW, h: gH } = stageSize;
  const Aw = Math.round(gW * 0.6);
  const Ah = gH;
  const fgap = 24;
  const zoneCx = (gW - Aw - fgap) / 2;
  const s0 = 0.44;
  const dS = 0.05;
  const railStag = Math.round(gW * 0.028);
  const vStag = Math.round(gH * 0.06);
  const fTrans =
    "transform .62s cubic-bezier(.22,1,.36,1), opacity .5s ease, filter .5s ease, box-shadow .5s ease, border-color .25s ease";

  const layerStyleFor = (i: number): React.CSSProperties => {
    const isActive = i === fActive;
    let x: number, y: number, s: number, op: number, z: number, fil: string, sh: string, rot: number;
    if (isActive) {
      x = gW - Aw;
      y = 0;
      s = 1;
      op = 1;
      z = 200;
      fil = "none";
      rot = 0;
      sh = "0 50px 110px -38px rgba(0,0,0,.85), inset 0 1px 0 rgba(255,255,255,.08)";
    } else {
      const d = ((((i - fActive) % nFeat) + nFeat) % nFeat) - 1;
      s = Math.max(0.16, s0 - d * dS);
      const cx = zoneCx - d * railStag;
      const cy = gH / 2 - d * vStag;
      x = Math.round(cx - Aw / 2);
      y = Math.round(cy - Ah / 2);
      op = Math.max(0.32, 1 - d * 0.16);
      z = 100 - d;
      rot = 6 + d * 2;
      fil = `brightness(${(1 - d * 0.1).toFixed(2)}) saturate(${(1 - d * 0.08).toFixed(2)})`;
      sh = "0 30px 60px -30px rgba(0,0,0,.72), inset 0 1px 0 rgba(255,255,255,.06)";
    }
    return {
      position: "absolute",
      top: 0,
      left: 0,
      width: Aw,
      height: Ah,
      transformOrigin: "center center",
      transform: `translate(${x}px, ${y}px) scale(${s}) rotateY(${rot}deg)`,
      opacity: op,
      zIndex: z,
      filter: fil,
      boxShadow: sh,
      border: "1px solid var(--line)",
      borderRadius: 26,
      overflow: "hidden",
      cursor: "pointer",
      background: "var(--card)",
      willChange: "transform",
      transition: fTrans,
    };
  };

  const pad2 = (n: number) => String(n).padStart(2, "0");
  const featActiveItem = featured[fActive] ?? featured[0];

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

      {/* Featured — sticky 3D stage; scroll brings each card to the front */}
      <div id="feat-wrap" ref={wrapRef} className="relative h-[320vh]">
        <div
          id="feat-sticky"
          className="sticky top-0 flex h-screen flex-col justify-center gap-[18px] overflow-hidden px-6"
        >
          {/* Header row: label + counter */}
          <div className="mx-auto box-border flex w-full max-w-[1200px] items-center justify-between gap-4">
            <span
              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--text2)" }}
            >
              <Sparkles size={14} strokeWidth={2} />
              {t.featuredLabel}
            </span>
            <span
              className="text-[13px] font-semibold tabular-nums tracking-[0.12em]"
              style={{
                fontFamily: "var(--font-grotesk), sans-serif",
                color: "var(--text2)",
              }}
            >
              {pad2(fActive + 1)} / {pad2(nFeat)}
            </span>
          </div>

          {/* Desktop: fanned 3D stage */}
          <div
            id="feat-stage"
            ref={stageRef}
            className="mx-auto box-border w-full max-w-[1200px]"
            style={{ position: "relative", height: "min(60vh, 540px)", perspective: 1600 }}
          >
            {featured.map((p, i) => {
              const isActive = i === fActive;
              return (
                <article
                  key={p.key}
                  onClick={() => (isActive ? openProject(p.key) : goFeatured(i))}
                  title={p.name}
                  className="hover:!border-[var(--accent)]"
                  style={layerStyleFor(i)}
                >
                  <ContentImage
                    src={p.img}
                    alt={p.name}
                    hint={p.imgHint}
                    style={{ width: "100%", height: "100%" }}
                  />
                  {isActive && (
                    <div
                      className="absolute left-4 top-4 inline-flex items-center gap-[7px] rounded-full border px-3.5 py-[7px] text-[11px] font-semibold uppercase tracking-[0.09em] text-white"
                      style={{
                        background: "rgba(0,0,0,.4)",
                        backdropFilter: "blur(10px)",
                        borderColor: "rgba(255,255,255,.2)",
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background: "var(--accent)",
                          boxShadow: "0 0 8px var(--accent)",
                        }}
                      />
                      {t.onStage}
                    </div>
                  )}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 px-[34px] py-[30px]"
                    style={{
                      background:
                        "linear-gradient(transparent, rgba(0,0,0,.4) 42%, rgba(0,0,0,.86))",
                    }}
                  >
                    <div className="mb-3.5 flex gap-[9px]">
                      <span
                        className="rounded-full border px-3.5 py-[5px] text-[12px] font-semibold text-white"
                        style={{
                          background: "rgba(255,255,255,.2)",
                          borderColor: "rgba(255,255,255,.14)",
                        }}
                      >
                        {p.platform}
                      </span>
                      <span
                        className="rounded-full border px-3.5 py-[5px] text-[12px] font-semibold text-white"
                        style={{
                          background: "rgba(255,255,255,.2)",
                          borderColor: "rgba(255,255,255,.14)",
                        }}
                      >
                        {p.type}
                      </span>
                    </div>
                    <h3 className="m-0 mb-[7px] text-[36px] font-bold leading-[1.02] tracking-[-0.025em] text-white">
                      {p.name}
                    </h3>
                    <p className="m-0 text-[16px] text-white/85">{p.sub}</p>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Mobile: single active card + thumbnail strip */}
          <div
            id="feat-mobile"
            className="mx-auto box-border w-full max-w-[1200px] flex-col gap-3.5"
            style={{ display: "none" }}
          >
            {featActiveItem && (
              <article
                onClick={() => openProject(featActiveItem.key)}
                className="relative w-full cursor-pointer overflow-hidden rounded-[22px] border border-[var(--line)]"
                style={{
                  height: "62vw",
                  maxHeight: 420,
                  background: "var(--card)",
                  boxShadow: "0 30px 70px -34px rgba(0,0,0,.72)",
                }}
              >
                <ContentImage
                  src={featActiveItem.img}
                  alt={featActiveItem.name}
                  hint={featActiveItem.imgHint}
                  style={{ width: "100%", height: "100%" }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 p-[22px]"
                  style={{ background: "linear-gradient(transparent, rgba(0,0,0,.86))" }}
                >
                  <div className="mb-2.5 flex gap-2">
                    <span className="rounded-full bg-white/20 px-[11px] py-1 text-[11px] font-semibold text-white">
                      {featActiveItem.platform}
                    </span>
                    <span className="rounded-full bg-white/20 px-[11px] py-1 text-[11px] font-semibold text-white">
                      {featActiveItem.type}
                    </span>
                  </div>
                  <h3 className="m-0 mb-1 text-[24px] font-bold tracking-[-0.02em] text-white">
                    {featActiveItem.name}
                  </h3>
                  <p className="m-0 text-[14px] text-white/85">{featActiveItem.sub}</p>
                </div>
              </article>
            )}
            <div className="flex gap-2.5 overflow-x-auto pb-1.5 pt-0.5 [-webkit-overflow-scrolling:touch]">
              {featured.map((p, i) => (
                <button
                  key={p.key}
                  data-featthumb=""
                  data-on={i === fActive ? "true" : "false"}
                  onClick={() => goFeatured(i)}
                  aria-label={p.name}
                  className="relative h-[76px] w-[112px] flex-none overflow-hidden rounded-[14px] border-2 border-transparent p-0"
                  style={{ background: "var(--card)" }}
                >
                  <ContentImage
                    src={p.img}
                    alt={p.name}
                    hint=""
                    style={{ width: "100%", height: "100%", opacity: 0.85 }}
                  />
                  <span
                    className="absolute inset-x-0 bottom-0 overflow-hidden text-ellipsis whitespace-nowrap px-2 py-[5px] text-left text-[10px] font-bold text-white"
                    style={{ background: "linear-gradient(transparent, rgba(0,0,0,.8))" }}
                  >
                    {p.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Footer row: scroll hint + dots */}
          <div className="mx-auto box-border flex w-full max-w-[1200px] flex-wrap items-center justify-between gap-4">
            <span
              className="inline-flex items-center gap-2 text-[12.5px]"
              style={{ color: "var(--text2)" }}
            >
              <ChevronsDown size={14} strokeWidth={2} />
              {t.scrollHint}
            </span>
            <div className="flex items-center gap-2">
              {featured.map((p, i) => (
                <button
                  key={p.key}
                  data-featdot=""
                  data-on={i === fActive ? "true" : "false"}
                  onClick={() => goFeatured(i)}
                  aria-label="Featured project"
                  className="h-[9px] w-[9px] rounded-full border-none p-0"
                  style={{
                    background: "var(--line)",
                    cursor: "pointer",
                    transition: "background .3s ease, width .3s ease",
                  }}
                />
              ))}
            </div>
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
                onClick={() => {
                  setFilter(k);
                  setExpanded(false);
                }}
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
          {shownProjects.map((p) => {
            const PlatIcon = PLATFORM_ICONS[p.platform] ?? Code;
            return (
              <Reveal
                key={p.key}
                duration={0.7}
                className="glass glass-interactive flex cursor-pointer flex-col gap-3.5 rounded-[20px] p-[22px]"
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

        {gridProjects.length > GRID_COLLAPSED && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[var(--line)] px-5 py-[11px] text-[14px] font-semibold text-[var(--text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{ background: "var(--card)", fontFamily: "inherit" }}
            >
              {expanded
                ? t.projShowLess
                : `${t.projShowMore} (${gridProjects.length})`}
            </button>
          </div>
        )}
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
          className="glass-strong relative max-h-[88vh] w-[min(720px,100%)] overflow-auto rounded-[26px]"
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
