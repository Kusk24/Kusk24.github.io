"use client";
import { Mail, Phone } from "lucide-react";
import Reveal from "./Reveal";
import { useLanguage } from "@/lib/language";
import { useTheme } from "@/lib/theme";
import { linkedinIconUrl, monoIconUrl } from "@/lib/icons";
import { profile } from "@/content/site";

export default function Contact() {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const contacts = [
    {
      label: "GitHub",
      href: profile.githubUrl,
      icon: (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={monoIconUrl("github", theme)}
          alt=""
          style={{ width: 15, height: 15, display: "block" }}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      ),
    },
    {
      label: "LinkedIn",
      href: profile.linkedinUrl,
      icon: (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={linkedinIconUrl}
          alt=""
          style={{ width: 15, height: 15, display: "block" }}
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      ),
    },
    {
      label: profile.phoneDisplay,
      href: profile.phoneHref,
      icon: <Phone size={15} strokeWidth={2} />,
    },
  ];

  return (
    <section
      id="contact"
      className="relative z-[1] border-t px-6 pb-[90px] pt-[150px] text-center"
      style={{ background: "var(--bg2)", borderColor: "var(--line)" }}
    >
      <div className="mx-auto max-w-[900px]">
        <Reveal>
          <p
            className="m-0 mb-3.5 text-[13px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: "var(--accent)" }}
          >
            {t.contactOverline}
          </p>
          <h2 className="m-0 mb-[18px] text-[clamp(40px,6vw,76px)] font-bold leading-[1.05] tracking-[-0.035em]">
            {t.contactTitle}
          </h2>
          <p
            className="mx-auto mb-12 mt-0 max-w-[520px] text-[17px] leading-[1.65]"
            style={{ color: "var(--text2)" }}
          >
            {t.contactLead}
          </p>
        </Reveal>

        <Reveal as="span" delay={0.12} className="inline-block">
          <a
            href={`mailto:${profile.email}`}
            className="neon-underline relative inline-flex items-center gap-[0.4em] pb-[9px] text-[clamp(22px,4.2vw,46px)] font-bold tracking-[-0.025em] text-[var(--text)] no-underline transition-colors hover:text-[var(--accent)]"
            style={{ fontFamily: "var(--font-grotesk), sans-serif" }}
          >
            <Mail size="0.7em" strokeWidth={2} />
            {profile.email}
          </a>
        </Reveal>

        <Reveal y={24} delay={0.24} className="mt-[52px] flex flex-wrap justify-center gap-3">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-[22px] py-3 text-[14.5px] font-semibold text-[var(--text)] no-underline transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {c.icon}
              {c.label} ↗
            </a>
          ))}
        </Reveal>
      </div>

      <div
        className="mx-auto mt-[110px] flex max-w-[1200px] flex-wrap justify-between gap-3 border-t pt-7 text-[13px]"
        style={{ borderColor: "var(--line)", color: "var(--text2)" }}
      >
        <span>
          © {profile.copyrightYear} {profile.name}
        </span>
        <span>{t.footNote}</span>
      </div>
    </section>
  );
}
