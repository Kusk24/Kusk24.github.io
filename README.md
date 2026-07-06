# kusk24.github.io

Personal portfolio of **Win Yu Maung** — Next.js 15 (App Router), TypeScript,
Tailwind CSS v4, statically exported and deployed to GitHub Pages.

Live at **https://kusk24.github.io**

Implements the Claude Design prototype in [docs/design/Portfolio.dc.html](docs/design/Portfolio.dc.html):
single-page portfolio with EN / ไทย / မြန်မာ language switching, dark/light
theme, animated star-field background, scroll-scrubbed featured projects,
filterable project grid with case-study modals, live GitHub repos, experience
timeline, rotating tech stack, and a certificate carousel.

## Editing content

**You rarely need to touch component code.** Text, links, images, and the
resume all live in two folders — see [docs/CONTENT.md](docs/CONTENT.md):

- `public/content/` — portrait, project screenshots, certificate photos, resume PDF (drop files in, they appear)
- `src/content/` — links and data (`site.ts`) + translated text (`locales/en.ts`, `th.ts`, `my.ts`)

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static export to out/
pnpm lint
```

## Deployment

Every push to `main` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml),
which builds the static export and publishes it to GitHub Pages.
(Repo setting: Settings → Pages → Source must be **GitHub Actions**.)
