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
    { href: "#certifications", label: t.navCerts },
    { href: "#about", label: t.navAbout },
    { href: "#contact", label: t.navContact },
  ];

  return (
    <nav
      className="glass fixed inset-x-0 top-0 z-[100] flex items-center justify-between gap-2 px-3 py-3 min-[480px]:px-4 min-[880px]:gap-4 min-[880px]:px-7"
      style={{ borderInline: "none", borderTop: "none", borderRadius: 0 }}
    >
      <a
        href="#top"
        className="whitespace-nowrap text-[14px] font-bold tracking-[-0.02em] no-underline min-[480px]:text-[16px]"
        style={{
          fontFamily: "var(--font-grotesk), sans-serif",
          color: "var(--text)",
        }}
      >
        {t.brandName}{" "}
        <span
          className="hidden min-[640px]:inline"
          style={{ color: "var(--text2)", fontWeight: 500 }}
        >
          ({t.brandNick})
        </span>
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

      <div className="flex items-center gap-1.5 min-[480px]:gap-3">
        <div className="glass flex items-center gap-[2px] rounded-full p-[3px]">
          {LANGS.map((l) => (
            <button
              key={l.code}
              data-lbtn=""
              data-on={lang === l.code ? "true" : "false"}
              onClick={() => setLang(l.code)}
              className="cursor-pointer rounded-full border-none bg-transparent px-2 py-[5px] text-[12px] font-semibold min-[480px]:px-3"
              style={{ color: "var(--text2)", fontFamily: "inherit" }}
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={toggleTheme}
          title="Toggle theme"
          className="glass glass-interactive flex h-[34px] w-[34px] flex-none cursor-pointer items-center justify-center rounded-full bg-transparent text-[15px] leading-none"
          style={{ color: "var(--text)" }}
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>

        <a
          href={profile.resumePath}
          download={profile.resumeFileName}
          title={t.navResume}
          className="inline-flex items-center gap-[7px] whitespace-nowrap rounded-full px-3 py-2 text-[12.5px] font-semibold no-underline transition-opacity hover:opacity-85 min-[880px]:px-4"
          style={{ background: "var(--text)", color: "var(--bg)" }}
        >
          <Download size={13} strokeWidth={2.4} />
          <span className="hidden min-[400px]:inline">{t.navResume}</span>
        </a>
      </div>
    </nav>
  );
}
