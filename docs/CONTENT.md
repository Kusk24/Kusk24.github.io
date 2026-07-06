# Editing the site's content

Everything you'd ever want to change lives in **two folders**, both named `content`:

| What | Where |
|---|---|
| **Images & resume** (files) | [`public/content/`](../public/content/) |
| **Links, text, data** (code) | [`src/content/`](../src/content/) |

Change a file, commit, push — GitHub Actions rebuilds and deploys the site automatically.

## 1. Images & resume — `public/content/`

Drop files with these exact names and they appear on the site (a placeholder is
shown wherever a file is still missing):

| File | Shows up as |
|---|---|
| `portrait.jpg` | Hero photo under your name (≈800×960+) |
| `Win-Yu-Maung-Resume.pdf` | The résumé download buttons (nav + hero) |
| `projects/augo.png` | AUGO — featured card + case-study modal |
| `projects/motopedia.png` | MotoPedia — featured card + modal |
| `projects/space-shooter.png` | Space Shooter — featured card + modal |
| `projects/gamerental.png` | GameRental — featured card + modal |
| `certs/aws-cloud-foundations.png` | Certificate photo in the carousel |
| `certs/aws-cloud-developing.png` | Certificate photo in the carousel |
| `certs/aws-cloud-operations.png` | Certificate photo in the carousel |
| `certs/huawei-cloud-developer.png` | Certificate photo in the carousel |

Prefer other filenames/formats (e.g. `.jpg`)? Fine — just update the matching
path in `src/content/site.ts`.

## 2. Links & data — `src/content/site.ts`

One file holds every link and language-independent fact:

- `profile` — email, phone, GitHub/LinkedIn URLs, resume path, name, copyright year
- `projects` — each project's GitHub link, image, date, platform/type tags, tech chips, featured flag
- `certs` — certificate names, orgs, logos, photo paths
- `techStack` — the tiles in the tech grid
- `github` — which repos to hide from "Latest on GitHub", how many to show
- `education` — GPA numbers

## 3. Translated text — `src/content/locales/`

All on-screen wording, one file per language: `en.ts`, `th.ts`, `my.ts`.
The three files have identical structure (typed by `src/content/types.ts`),
so edit the same field in all three to keep languages in sync.

### Adding a project

1. Add an entry to `projects` in `src/content/site.ts` (link, image path, tags, tech).
2. Add the matching text entry **at the same position** in the `projects` array
   of `en.ts`, `th.ts`, and `my.ts`.
3. Drop the image into `public/content/projects/`.

### Adding a certificate

Add an entry to `certs` in `site.ts` and drop the photo into `public/content/certs/`.
Names/orgs stay in English in every language (as designed).
