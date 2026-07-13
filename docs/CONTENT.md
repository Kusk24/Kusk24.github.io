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
| `portrait.png` | Hero photo under your name (≈800×960+) |
| `Win-Yu-Maung-Resume.pdf` | The résumé download buttons (nav + hero) |
| `projects/glowops.png` | GlowOps — featured card + case-study modal (Staff Hub dashboard shot) |
| `projects/glowops-console.png` | GlowOps modal gallery — admin console shot |
| `projects/glowops-line.png` | GlowOps modal gallery — LINE booking chat shot |
| `projects/jtrax.png` | JTrax — featured card + modal (admin dashboard EN) |
| `projects/jtrax-th.png` | JTrax modal gallery — Thai dashboard shot |
| `projects/jtrax-mobile.png` | JTrax modal gallery — teacher mobile profile |
| `projects/augo.png` | AUGO — featured card + modal (admin panel shot) |
| `projects/augo-map.png` | AUGO modal gallery — campus map (light) |
| `projects/augo-map-dark.png` | AUGO modal gallery — campus map (dark) |
| `projects/springboard.png` | SpringBoard — featured card + modal |
| `projects/motopedia.png` | MotoPedia — grid card + modal |
| `projects/space-shooter.png` | Space Shooter — grid card + modal |
| `projects/gamerental.png` | GameRental — grid card + modal |
| `projects/ice-breaker.png` | IceBreaker — grid card + modal |
| `projects/cpu-scheduling.png` | CPU Scheduling — grid card + modal |
| `projects/web-ecommerce.png` | Clothing E-commerce — grid card + modal |
| `projects/water-billing.png` | Water Billing System — grid card + modal |
| `projects/tank-1990.png` | Tank 1990 — grid card + modal |
| `projects/spending-tracker.png` | Spending Tracker — grid card + modal |
| `projects/lambda-crud.png` | Lambda CRUD Functions — grid card + modal |
| `projects/database-term.png` | Database Term Project — grid card + modal |
| `projects/ios-term.png` | iOS Term Project — grid card + modal |
| `certs/aws-cloud-foundations.png` | Certificate photo in the carousel |
| `certs/aws-cloud-developing.png` | Certificate photo in the carousel |
| `certs/aws-cloud-operations.png` | Certificate photo in the carousel |
| `certs/huawei-cloud-developer.png` | Certificate photo in the carousel |
| `certs/ibm-dev-day-bob.png` | Certificate photo in the carousel (IBM Dev Day: Bob Edition) |

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

1. Add an entry to `projects` in `src/content/site.ts` (link, image path,
   `when` date, tags, tech). Set `featured: true` to promote it into the big
   horizontal showcase up top, or `false` to keep it in the "All projects" grid.
2. Add the matching text entry **at the same position** in the `projects` array
   of `en.ts`, `th.ts`, and `my.ts`.
3. Drop the image into `public/content/projects/` (see the table above for the
   filename — it's `projects/<key>.png`).
4. If the project is one of your own GitHub repos, add its repo name (lowercase)
   to `github.skipRepos` in `site.ts` so it doesn't also appear in the live
   "Latest on GitHub" list.

### Project dates & sorting

Each project's `when` is a `"M/YYYY"` string (e.g. `"2/2025"`). It's shown on
every grid card and in the case-study modal formatted as `Feb 2025`, and it
drives the **Sort** dropdown next to the filters ("Newest first" — the default —
and "Oldest first"). Keep the `M/YYYY` format so sorting stays correct.

### Adding a certificate

Add an entry to `certs` in `site.ts` and drop the photo into `public/content/certs/`.
Names/orgs stay in English in every language (as designed). Two optional fields:

- `date` — issue date like `"Feb 2025"`, shown next to the org.
- `verifyUrl` — a public verification link (e.g. a Credly badge `public_url`);
  renders a "Verify ↗" link on the showcase card.
