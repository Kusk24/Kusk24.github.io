"use client";
import { Download } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { useTheme } from "@/lib/theme";
import { profile } from "@/content/site";
import type { Lang } from "@/content/types";

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "th", label: "ไทย" },
  { code: "my", label: "မြန်မာ" },
];

export default function Nav() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { href: "#projects", label: t.navProjects },
    { href: "#experience", label: t.navExp },
    { href: "#stack", label: t.navStack },
    { href: "#about", label: t.navAbout },
    { href: "#contact", label: t.navContact },
  ];

  return (
    <nav
      className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between gap-4 border-b px-7 py-3"
      style={{
        background: "var(--nav)",
        borderColor: "var(--line)",
        backdropFilter: "blur(20px) saturate(1.6)",
        WebkitBackdropFilter: "blur(20px) saturate(1.6)",
      }}
    >
      <a
        href="#top"
        className="whitespace-nowrap text-[16px] font-bold tracking-[-0.02em] no-underline"
        style={{
          fontFamily: "var(--font-grotesk), sans-serif",
          color: "var(--text)",
        }}
      >
        {profile.name}
      </a>

      <div className="hidden items-center gap-[26px] min-[880px]:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-[13.5px] text-[var(--text2)] no-underline transition-colors hover:text-[var(--text)]"
          >
            {l.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-[2px] rounded-full border p-[3px]"
          style={{ borderColor: "var(--line)" }}
        >
          {LANGS.map((l) => (
            <button
              key={l.code}
              data-lbtn=""
              data-on={lang === l.code ? "true" : "false"}
              onClick={() => setLang(l.code)}
              className="cursor-pointer rounded-full border-none bg-transparent px-3 py-[5px] text-[12px] font-semibold"
              style={{ color: "var(--text2)", fontFamily: "inherit" }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={toggleTheme}
          title="Toggle theme"
          className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full border border-[var(--line)] bg-transparent text-[15px] leading-none transition-colors hover:border-[var(--text2)]"
          style={{ color: "var(--text)" }}
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>

        <a
          href={profile.resumePath}
          download={profile.resumeFileName}
          className="inline-flex items-center gap-[7px] whitespace-nowrap rounded-full px-4 py-2 text-[12.5px] font-semibold no-underline transition-opacity hover:opacity-85"
          style={{ background: "var(--text)", color: "var(--bg)" }}
        >
          <Download size={13} strokeWidth={2.4} />
          {t.navResume}
        </a>
      </div>
    </nav>
  );
}
