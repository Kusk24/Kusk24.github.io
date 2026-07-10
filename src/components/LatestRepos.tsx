"use client";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { useLanguage } from "@/lib/language";
import { useTheme } from "@/lib/theme";
import { monoIconUrl, techIconUrl } from "@/lib/icons";
import { github, profile } from "@/content/site";

interface Repo {
  name: string;
  desc: string;
  lang: string;
  url: string;
  year: string;
}

// Cache the GitHub response so repeat visits don't spend the unauthenticated
// rate limit (60 req/hr per IP); a stale cache still beats the error state.
const CACHE_KEY = "gh-repos-v1";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function readCache(): { at: number; repos: Repo[] } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.repos)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export default function LatestRepos() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const cached = readCache();
    if (cached && Date.now() - cached.at < CACHE_TTL) {
      const raf = requestAnimationFrame(() => setRepos(cached.repos));
      return () => cancelAnimationFrame(raf);
    }
    fetch(
      `https://api.github.com/users/${github.username}/repos?per_page=100&sort=pushed`
    )
      .then((r) => {
        if (!r.ok) throw new Error(`http ${r.status}`);
        return r.json();
      })
      .then(
        (list: {
          fork: boolean;
          name: string;
          description: string | null;
          language: string | null;
          html_url: string;
          pushed_at: string;
        }[]) => {
          const repos = list
            .filter(
              (r) => !r.fork && !github.skipRepos.includes(r.name.toLowerCase())
            )
            .sort(
              (a, b) =>
                new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
            )
            .slice(0, github.maxRepos)
            .map((r) => ({
              name: r.name.replace(/[-_]/g, " "),
              desc: r.description || "View on GitHub",
              lang: r.language || "Code",
              url: r.html_url,
              year: String(new Date(r.pushed_at).getFullYear()),
            }));
          setRepos(repos);
          try {
            localStorage.setItem(
              CACHE_KEY,
              JSON.stringify({ at: Date.now(), repos })
            );
          } catch {}
        }
      )
      .catch(() => {
        // Rate-limited or offline: show yesterday's list over an error link.
        if (cached) setRepos(cached.repos);
        else setFailed(true);
      });
  }, []);

  const shown = repos
    ? expanded
      ? repos
      : repos.slice(0, github.collapsedCount)
    : [];

  return (
    <div className="mx-auto mt-20 max-w-[1200px] px-6">
      <Reveal className="mb-7">
        <h3 className="m-0 mb-2 text-[clamp(24px,3vw,32px)] font-bold tracking-[-0.02em]">
          {t.archTitle}
        </h3>
        <p className="m-0 text-[15px]" style={{ color: "var(--text2)" }}>
          {t.archLead}
        </p>
      </Reveal>

      {failed && (
        <p className="m-0 text-[15px]">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener"
            className="font-semibold no-underline"
            style={{ color: "var(--accent)" }}
          >
            {t.archFail} ↗
          </a>
        </p>
      )}

      {repos && repos.length > 0 && (
        <>
          <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr))]">
            {shown.map((r) => {
              const icon = techIconUrl(r.lang, theme);
              return (
                <Reveal key={r.url} duration={0.7} className="flex">
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener"
                    className="glass glass-interactive flex w-full flex-col gap-2.5 rounded-[18px] p-[22px] no-underline"
                    style={{ color: "var(--text)" }}
                  >
                    <div className="flex items-center justify-between gap-2.5">
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[15.5px] font-semibold tracking-[-0.01em]">
                        {r.name}
                      </span>
                      <span
                        className="flex-none text-[13px]"
                        style={{ color: "var(--text2)" }}
                      >
                        ↗
                      </span>
                    </div>
                    <span
                      className="min-h-[42px] text-[13.5px] leading-[1.55]"
                      style={{ color: "var(--text2)" }}
                    >
                      {r.desc}
                    </span>
                    <span
                      className="mt-auto flex items-center gap-[7px] text-[12.5px]"
                      style={{ color: "var(--text2)" }}
                    >
                      {icon && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={icon}
                          alt=""
                          style={{ width: 13, height: 13, display: "block" }}
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                        />
                      )}
                      {r.lang}
                      <span className="ml-auto">{r.year}</span>
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3.5">
            {repos.length > github.collapsedCount && (
              <button
                onClick={() => setExpanded((v) => !v)}
                className="glass inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-[11px] text-[14px] font-semibold text-[var(--text)] transition-colors hover:text-[var(--accent)]"
                style={{ fontFamily: "inherit" }}
              >
                {expanded ? t.seeLessGh : t.seeMoreGh}
              </button>
            )}
            <a
              href={profile.githubReposUrl}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--text2)] no-underline transition-colors hover:text-[var(--accent)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={monoIconUrl("github", theme)}
                alt=""
                style={{ width: 16, height: 16, display: "block" }}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              {t.seeAllGh} ↗
            </a>
          </div>
        </>
      )}
    </div>
  );
}
