# Docs

- [CONTENT.md](./CONTENT.md) — **how to change the site's text, links, images, and resume** (the only file you need day-to-day)
- [design/Portfolio.dc.html](./design/Portfolio.dc.html) — the original Claude Design prototype this site implements (the design spec)
- [design/nextjs-handoff.md](./design/nextjs-handoff.md) — the designer's Next.js handoff notes

## Implementation notes (where this build deviates from the handoff)

The handoff suggests `next-intl` locale routing (`/en /th /my`) and Framer Motion. This build instead matches the **prototype's actual behavior**:

- **Language switching is client-side** (instant segmented control, persisted in `localStorage`) — no locale routes. Reason: the site deploys to GitHub Pages as a static export, where next-intl's middleware cannot run; the prototype also switches languages without changing the URL.
- **Animations use the prototype's own mechanics** (IntersectionObserver reveals, rAF scroll parallax/scrub, CSS keyframes) rather than Framer Motion — identical visual result, zero extra dependencies.
