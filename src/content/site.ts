// ─────────────────────────────────────────────────────────────────────────────
// EDIT ME — all links, images, and language-independent data live here.
// Translated text lives in src/content/locales/{en,th,my}.ts.
// Image files live in public/content/ — see docs/CONTENT.md for the filenames.
// ─────────────────────────────────────────────────────────────────────────────
import type { CertMeta, ProjectMeta, TechItem } from "./types";

export const profile = {
  name: "Win Yu Maung",
  email: "winyumg2003a@gmail.com",
  phoneDisplay: "(+66) 96 101 6972",
  phoneHref: "tel:+66961016972",
  githubUser: "Kusk24",
  githubUrl: "https://github.com/Kusk24",
  githubReposUrl: "https://github.com/Kusk24?tab=repositories",
  linkedinUrl: "https://www.linkedin.com/in/win-yu-maung-06747827b",
  /** Drop your resume PDF at public/content/Win-Yu-Maung-Resume.pdf */
  resumePath: "/content/Win-Yu-Maung-Resume.pdf",
  resumeFileName: "Win-Yu-Maung-Resume.pdf",
  /** Drop your photo at public/content/portrait.jpg (400×480 or larger). */
  portrait: "/content/portrait.jpg",
  portraitHint: "portrait.jpg",
  copyrightYear: "2026",
};

export const education = {
  gpa: "3.72",
  gpaOutOf: "4.0",
};

/**
 * Projects. Order matters: locales/{en,th,my}.ts each have a `projects`
 * array whose Nth entry is the translated text for the Nth project here.
 */
export const projects: ProjectMeta[] = [
  {
    key: "augo",
    img: "/content/projects/augo.png",
    imgHint: "projects/augo.png",
    link: "https://github.com/Kusk24/AuGo",
    when: "2/2025",
    platform: "iOS",
    type: "Team",
    featured: true,
    tech: ["SwiftUI", "Firebase", "AR / Core Motion", "Swift Package Manager"],
  },
  {
    key: "motopedia",
    img: "/content/projects/motopedia.png",
    imgHint: "projects/motopedia.png",
    link: "https://github.com/Kusk24/Android-Term-Project",
    when: "2/2024",
    platform: "Android",
    type: "Team",
    featured: true,
    tech: ["Kotlin", "Jetpack Compose", "Firebase", "Google Maps"],
  },
  {
    key: "space-shooter",
    img: "/content/projects/space-shooter.png",
    imgHint: "projects/space-shooter.png",
    link: "https://github.com/Kusk24/Game_Design_Development_Project1",
    when: "1/2025",
    platform: "Game",
    type: "Personal",
    featured: true,
    tech: ["Java", "Game loop & sprites", "CSV level maps"],
  },
  {
    key: "gamerental",
    img: "/content/projects/gamerental.png",
    imgHint: "projects/gamerental.png",
    link: "https://github.com/SoePhonePyae/Database-Backend",
    when: "2/2024",
    platform: "Backend",
    type: "Team",
    featured: true,
    tech: ["Flask", "PostgreSQL", "SQLAlchemy", "REST"],
  },
];

/** Certificates shown in the carousel (names/orgs stay in English, as designed). */
export const certs: CertMeta[] = [
  {
    name: "AWS Academy Cloud Foundations",
    org: "Amazon Web Services",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    img: "/content/certs/aws-cloud-foundations.png",
  },
  {
    name: "AWS Academy Cloud Developing",
    org: "Amazon Web Services",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    img: "/content/certs/aws-cloud-developing.png",
  },
  {
    name: "AWS Academy Cloud Operations",
    org: "Amazon Web Services",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    img: "/content/certs/aws-cloud-operations.png",
  },
  {
    name: "Huawei Cloud Developer",
    org: "Huawei Cloud",
    logo: "https://cdn.simpleicons.org/huawei",
    img: "/content/certs/huawei-cloud-developer.png",
  },
];

/** Tech-stack tiles (grid order). */
export const techStack: TechItem[] = [
  { name: "Swift", slug: "swift" },
  { name: "Kotlin", slug: "kotlin" },
  { name: "Java", slug: "openjdk" },
  { name: "Python", slug: "python" },
  { name: "JavaScript", slug: "javascript" },
  { name: "TypeScript", slug: "typescript" },
  { name: "C++", slug: "cplusplus" },
  { name: "Dart", slug: "dart" },
  { name: "SwiftUI", slug: "swift" },
  { name: "Jetpack Compose", slug: "jetpackcompose" },
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "Flask", slug: "flask" },
  { name: "Firebase", slug: "firebase" },
  { name: "PostgreSQL", slug: "postgresql" },
  {
    name: "AWS",
    slug: "amazonwebservices",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "Docker", slug: "docker" },
];

/** "Latest on GitHub" — fetched live from the GitHub API in the browser. */
export const github = {
  username: "Kusk24",
  /** Repos to hide (lowercase) — e.g. ones already shown as featured projects. */
  skipRepos: [
    "augo",
    "android-term-project",
    "game_design_development_project1",
    "database-backend",
    "kusk24",
    "kusk24.github.io",
  ],
  maxRepos: 16,
  collapsedCount: 4,
};
