# Next.js Handoff — Win Yu Maung Portfolio

The live prototype (`Portfolio.dc.html`) is the design spec. This doc maps it to a production Next.js build.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4** — dark mode via `class` strategy
- **Framer Motion** — scroll reveals + parallax (simpler than GSAP for this scope; swap in GSAP ScrollTrigger only if you add pinned/scrubbed scenes)
- **next-intl** — EN / TH / MM locale routing (`/en`, `/th`, `/my`)

## Setup

```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --eslint
cd portfolio
npm i framer-motion next-intl
```

## Project structure

```
src/
  app/
    [locale]/
      layout.tsx        # locale provider + theme class + nav/footer
      page.tsx          # all sections (single-page)
  components/
    Nav.tsx             # fixed, backdrop-blur, lang segmented control, theme toggle
    Hero.tsx
    ProjectCard.tsx
    ExperienceTimeline.tsx
    EducationCard.tsx
    Contact.tsx
    Reveal.tsx          # shared scroll-reveal wrapper
    ThemeToggle.tsx
  messages/
    en.json  th.json  my.json   # copy the string payloads from Portfolio.dc.html
  middleware.ts         # next-intl locale routing
public/
  resume/Win-Yu-Maung-Resume.pdf
  projects/…            # screenshots / GIFs
```

## Design tokens (globals.css)

```css
:root       { --bg:#fbfbfd; --bg2:#f5f5f7; --card:#fff;    --text:#1d1d1f; --text2:rgba(29,29,31,.64);   --line:rgba(0,0,0,.09);    --accent:#0071e3; }
.dark:root, .dark { --bg:#0a0a0a; --bg2:#101012; --card:#151517; --text:#f5f5f7; --text2:rgba(245,245,247,.62); --line:rgba(255,255,255,.1); --accent:#2997ff; }
```

Font: system stack (`-apple-system, BlinkMacSystemFont, "Segoe UI"`) + `Noto Sans Thai` + `Noto Sans Myanmar` via `next/font/google`. Hero headline: `clamp(54px, 11vw, 150px)`, weight 700, tracking `-0.045em`.

## Layout (app/[locale]/layout.tsx)

```tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Noto_Sans_Thai, Noto_Sans_Myanmar } from 'next/font/google';
import Nav from '@/components/Nav';

const thai = Noto_Sans_Thai({ subsets: ['thai'], variable: '--font-thai' });
const mm = Noto_Sans_Myanmar({ subsets: ['myanmar'], weight: ['400','500','600','700'], variable: '--font-mm' });

export default async function LocaleLayout({ children, params }: {
  children: React.ReactNode; params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <html lang={locale} className={`${thai.variable} ${mm.variable}`} suppressHydrationWarning>
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased transition-colors duration-500">
        <NextIntlClientProvider messages={messages}>
          <Nav />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Theme toggle: set/remove `.dark` on `<html>`, persist in `localStorage`, read pre-paint via an inline script in `<head>` to avoid flash.

## Hero (components/Hero.tsx)

```tsx
'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

const ease = [0.2, 0.6, 0.2, 1] as const;
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

export default function Hero() {
  const t = useTranslations('hero');
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 224]);       // parallax drift
  const opacity = useTransform(scrollY, [0, 620], [1, 0]);   // fade on scroll

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-36 text-center">
      <motion.div style={{ y, opacity }}>
        <motion.p {...fadeUp(0)} className="mb-5 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
          {t('role')}
        </motion.p>
        <motion.h1 {...fadeUp(0.1)} className="text-[clamp(54px,11vw,150px)] font-bold leading-[1.02] tracking-[-0.045em]">
          Win Yu Maung
        </motion.h1>
        <motion.p {...fadeUp(0.22)} className="mx-auto mt-7 max-w-[620px] text-lg leading-relaxed text-[var(--text2)]">
          {t('tagline')}
        </motion.p>
        <motion.div {...fadeUp(0.34)} className="mt-10 flex flex-wrap justify-center gap-3.5">
          <a href="#projects" className="rounded-full bg-[var(--accent)] px-8 py-4 font-semibold text-white hover:brightness-110">
            {t('ctaProjects')}
          </a>
          <a href="/resume/Win-Yu-Maung-Resume.pdf" download className="rounded-full border border-[var(--line)] px-8 py-4 font-semibold">
            {t('ctaResume')}
          </a>
        </motion.div>
      </motion.div>
      <motion.div {...fadeUp(0.45)} className="mt-19">
        <img src="/portrait.jpg" alt="Win Yu Maung" className="h-[480px] w-[400px] rounded-[32px] object-cover shadow-2xl" />
      </motion.div>
    </section>
  );
}
```

## Scroll reveals everywhere else

One shared wrapper, used by every section (matches the prototype's IntersectionObserver behavior):

```tsx
'use client';
import { motion } from 'framer-motion';

export default function Reveal({ children, delay = 0, className }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.9, ease: [0.2, 0.6, 0.2, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
```

Respect `prefers-reduced-motion` via Framer's `useReducedMotion()`.

## i18n notes

- Copy the three full string payloads (en/th/my) out of `Portfolio.dc.html` → `messages/*.json`.
- `middleware.ts` from next-intl handles `/en /th /my` routing; the nav segmented control just calls `router.replace(pathname, { locale })`.
- Keep tech-stack chips and project names in English across locales (as in the prototype).
- Burmese needs looser line-height (`leading-relaxed` minimum); already handled globally in the prototype.

## Sticky projects layout

Left column (`Projects` heading + lead) is `sticky top-28 self-start` inside a two-column flex; cards stack in the right column and reveal one by one. Collapses naturally on mobile via `flex-wrap`.
