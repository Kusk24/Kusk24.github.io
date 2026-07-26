// Shapes of the editable content. If you add a field here, add it to
// site.ts (shared data) or to all three files in locales/ (translated text).

export type Lang = "en" | "th" | "my";

/** Text that changes per language. One file per language in src/content/locales/. */
export interface Dict {
  /** Full name as shown in the nav logo, localized per language. */
  brandName: string;
  /** Short nickname shown in parentheses after the name in the nav logo. */
  brandNick: string;
  navProjects: string;
  navExp: string;
  navStack: string;
  navCerts: string;
  navAbout: string;
  navContact: string;
  navResume: string;

  typedPhrases: string[];
  heroTagline: string;
  ctaProjects: string;
  ctaResume: string;

  projOverline: string;
  projTitle: string;
  projLead: string;
  featuredLabel: string;
  onStage: string;
  scrollHint: string;
  allTitle: string;
  allLead: string;
  filterAll: string;
  sortLabel: string;
  sortNewest: string;
  sortOldest: string;
  projShowMore: string;
  projShowLess: string;
  viewCase: string;
  overviewLabel: string;
  roleLabel: string;
  ghLabel: string;
  reposLabel: string;
  privateLabel: string;
  publicLabel: string;
  moreGh: string;

  archTitle: string;
  archLead: string;
  seeMoreGh: string;
  seeLessGh: string;
  seeAllGh: string;
  archFail: string;

  expOverline: string;
  expTitle: string;
  eduLabel: string;
  certsLabel: string;
  gpaLabel: string;
  eduSchool: string;
  eduDegree: string;
  eduPeriod: string;

  stackOverline: string;
  stackTitle: string;
  stackLead: string;

  certSecOverline: string;
  certSecLead: string;
  certVerified: string;
  certVerify: string;

  /** Microsoft Learn mini-grid under the certificate carousel. */
  msLearnLead: string;
  msTrophiesLabel: string;
  msBadgesLabel: string;
  msViewProfile: string;
  msLevel: string;

  aboutOverline: string;
  aboutTitle: string;
  aboutP1: string;
  aboutP2: string;
  aboutFacts: { label: string; ic: string }[];

  contactOverline: string;
  contactTitle: string;
  contactLead: string;
  footNote: string;

  /** Localized text of each work-experience entry (top = most recent). */
  experience: { period: string; role: string; org: string; desc: string }[];

  /**
   * Localized text of each project. Order must match `projects` in site.ts
   * (same index = same project).
   */
  projects: { name: string; sub: string; desc: string; role: string }[];
}

/** One GitHub repository belonging to a project. */
export interface RepoLink {
  /** Short label shown in the repo list, e.g. "glowops-backend". */
  name: string;
  url: string;
  /** Private repos stay listed (in case they go public later) with a lock badge. */
  private?: boolean;
}

/** Language-independent data for one project (links, images, tags). */
export interface ProjectMeta {
  /** Stable id, also the image filename under public/content/projects/. */
  key: string;
  /** Path (under public/) of the project image. Drop the file in and it appears. */
  img: string;
  /** Short hint shown in the placeholder while the image file is missing. */
  imgHint: string;
  /** GitHub (or live) URL the case study links to. */
  link: string;
  /** e.g. "2/2025" — shown in the case-study modal. */
  when: string;
  platform: "iOS" | "Android" | "Web" | "Backend" | "Game" | "Cloud" | "ML/AI";
  type: "Personal" | "Team" | "Organization";
  /** Featured projects appear in the big horizontal showcase. */
  featured: boolean;
  /** Tech chips (kept in English in every language, as designed). */
  tech: string[];
  /**
   * All repositories of a multi-repo project. When present, the case-study
   * modal lists them (with public/private badges) instead of the single
   * `link` button.
   */
  repos?: RepoLink[];
  /**
   * Extra screenshots shown in the case-study modal below the write-up.
   * Paths under public/ — drop the files in and they appear; missing files
   * are hidden automatically.
   */
  gallery?: string[];
}

export interface CertMeta {
  name: string;
  org: string;
  /** Organization logo URL (shown on the white tile). */
  logo: string;
  /** Path (under public/) of the certificate photo. Drop the file in and it appears. */
  img: string;
  /** Issue date, e.g. "Feb 2025" (kept in English in every language). */
  date?: string;
  /** Public verification URL (e.g. a Credly badge). Shown as a "Verify" link. */
  verifyUrl?: string;
}

export interface TechItem {
  name: string;
  /** simpleicons.org slug used to fetch the logo (theme-aware color). */
  slug: string;
  /** Optional explicit icon URL that overrides the slug. */
  icon?: string;
}
