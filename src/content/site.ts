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
  facebookUrl: "https://www.facebook.com/win.yu.67488",
  instagramUrl: "https://www.instagram.com/_seannez",
  /** LINE ID link — the ~ prefix opens the add-friend page for the ID. */
  lineUrl: "https://line.me/ti/p/~kusk24",
  /** Drop your resume PDF at public/content/Win-Yu-Maung-Resume.pdf */
  resumePath: "/content/Win-Yu-Maung-Resume.pdf",
  resumeFileName: "Win-Yu-Maung-Resume.pdf",
  /** Drop your photo at public/content/portrait.png (400×480 or larger). */
  portrait: "/content/portrait.png",
  portraitHint: "portrait.png",
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
    key: "glowops",
    img: "/content/projects/glowops.png",
    imgHint: "projects/glowops.png",
    link: "https://github.com/CodeBlueTeam",
    when: "4/2026",
    platform: "ML/AI",
    type: "Team",
    featured: true,
    tech: [
      "Next.js",
      "TypeScript",
      "LINE Messaging API",
      "Terraform",
      "AWS",
    ],
    repos: [
      {
        name: "glowops-backend",
        url: "https://github.com/CodeBlueTeam/glowops-backend",
        private: true,
      },
      {
        name: "glowops-staff-hub",
        url: "https://github.com/CodeBlueTeam/glowops-staff-hub",
        private: true,
      },
      {
        name: "glowops-console",
        url: "https://github.com/CodeBlueTeam/glowops-console",
        private: true,
      },
      {
        name: "glowops-line-bot",
        url: "https://github.com/CodeBlueTeam/glowops-line-bot",
        private: true,
      },
      {
        name: "glowops-infra",
        url: "https://github.com/CodeBlueTeam/glowops-infra",
        private: true,
      },
      {
        name: "second-brain-template",
        url: "https://github.com/CodeBlueTeam/second-brain-template",
        private: true,
      },
    ],
  },
  {
    key: "jtrax",
    img: "/content/projects/jtrax.png",
    imgHint: "projects/jtrax.png",
    link: "https://github.com/Kusk24/jtrax-web-app",
    when: "7/2026",
    platform: "Web",
    type: "Team",
    featured: true,
    tech: ["Go", "Next.js", "TypeScript", "React Native", "Expo"],
    repos: [
      { name: "jtrax-admin", url: "https://github.com/Kusk24/jtrax-admin" },
      { name: "jtrax-web-app", url: "https://github.com/Kusk24/jtrax-web-app" },
      { name: "jtrax-backend", url: "https://github.com/Kusk24/jtrax-backend" },
      {
        name: "jtrax-mobile-app",
        url: "https://github.com/Kusk24/jtrax-mobile-app",
      },
      { name: "jtrax-docs", url: "https://github.com/Kusk24/jtrax-docs" },
    ],
  },
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
    repos: [
      { name: "AuGo", url: "https://github.com/Kusk24/AuGo" },
      {
        name: "augo-admin-dashboard",
        url: "https://github.com/khinyadanarmoe/augo-admin-dashboard",
      },
    ],
  },
  {
    key: "springboard",
    img: "/content/projects/springboard.png",
    imgHint: "projects/springboard.png",
    link: "https://github.com/IBM-Bob-Au-Team/SpringBoard",
    when: "5/2026",
    platform: "ML/AI",
    type: "Team",
    featured: true,
    tech: ["TypeScript", "Spring Boot", "IBM watsonx.ai"],
    repos: [
      {
        name: "SpringBoard",
        url: "https://github.com/IBM-Bob-Au-Team/SpringBoard",
      },
    ],
  },

  // ── Not featured — appear in the "All projects" grid. Set featured: true
  //    to promote any of these into the showcase up top.
  {
    key: "motopedia",
    img: "/content/projects/motopedia.png",
    imgHint: "projects/motopedia.png",
    link: "https://github.com/Kusk24/Android-Term-Project",
    when: "2/2024",
    platform: "Android",
    type: "Team",
    featured: false,
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
    featured: false,
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
    featured: false,
    tech: ["Flask", "PostgreSQL", "SQLAlchemy", "REST"],
  },
  {
    key: "ice-breaker",
    img: "/content/projects/ice-breaker.png",
    imgHint: "projects/ice-breaker.png",
    link: "https://github.com/Kusk24/ice-breaker",
    when: "3/2026",
    platform: "Web",
    type: "Personal",
    featured: false,
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    key: "cpu-scheduling",
    img: "/content/projects/cpu-scheduling.png",
    imgHint: "projects/cpu-scheduling.png",
    link: "https://github.com/Kusk24/CPU-Scheduling-Algorithm",
    when: "12/2025",
    platform: "Backend",
    type: "Personal",
    featured: false,
    tech: ["Java"],
  },
  {
    key: "web-ecommerce",
    img: "/content/projects/web-ecommerce.png",
    imgHint: "projects/web-ecommerce.png",
    link: "https://github.com/Kusk24/Project02-Web-App-Development",
    when: "8/2025",
    platform: "Web",
    type: "Team",
    featured: false,
    tech: ["Next.js", "Tailwind", "Express.js"],
  },
  {
    key: "water-billing",
    img: "/content/projects/water-billing.png",
    imgHint: "projects/water-billing.png",
    link: "https://github.com/Kusk24/Water-Subscription-Billing-System",
    when: "9/2025",
    platform: "Web",
    type: "Team",
    featured: false,
    tech: ["JavaScript", "Software Testing"],
  },
  {
    key: "tank-1990",
    img: "/content/projects/tank-1990.png",
    imgHint: "projects/tank-1990.png",
    link: "https://github.com/Kusk24/GameDesignDevelopment_Project2",
    when: "8/2025",
    platform: "Game",
    type: "Team",
    featured: false,
    tech: ["Unity", "C#"],
  },
  {
    key: "spending-tracker",
    img: "/content/projects/spending-tracker.png",
    imgHint: "projects/spending-tracker.png",
    link: "https://github.com/Kusk24/Project-01-Spending-Tracker",
    when: "7/2025",
    platform: "Web",
    type: "Personal",
    featured: false,
    tech: ["JavaScript"],
  },
  {
    key: "lambda-crud",
    img: "/content/projects/lambda-crud.png",
    imgHint: "projects/lambda-crud.png",
    link: "https://github.com/Kusk24/Lambda-Functions-For-Project02",
    when: "3/2025",
    platform: "Cloud",
    type: "Personal",
    featured: false,
    tech: ["AWS", "JavaScript"],
  },
  {
    key: "database-term",
    img: "/content/projects/database-term.png",
    imgHint: "projects/database-term.png",
    link: "https://github.com/Kusk24/DataBase-Term-Project",
    when: "1/2025",
    platform: "Web",
    type: "Team",
    featured: false,
    tech: ["JavaScript", "SQL"],
  },
  {
    key: "ios-term",
    img: "/content/projects/ios-term.png",
    imgHint: "projects/ios-term.png",
    link: "https://github.com/Kusk24/Term-Project-iOS-App-Development",
    when: "8/2024",
    platform: "iOS",
    type: "Team",
    featured: false,
    tech: ["Swift"],
  },
];

/** Certificates shown in the carousel (names/orgs stay in English, as designed). */
export const certs: CertMeta[] = [
  {
    name: "AWS Academy Cloud Foundations",
    org: "Amazon Web Services",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    img: "/content/certs/aws-cloud-foundations.png",
    date: "Feb 2025",
    verifyUrl:
      "https://www.credly.com/badges/2aaffd4d-760b-4d2e-bb69-1ec3d07d7ee0/public_url",
  },
  {
    name: "AWS Academy Cloud Developing",
    org: "Amazon Web Services",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    img: "/content/certs/aws-cloud-developing.png",
    date: "Feb 2025",
    verifyUrl:
      "https://www.credly.com/badges/a73b7c03-5a14-48a7-9dc9-66ab65b3186e/public_url",
  },
  {
    name: "AWS Academy Cloud Operations",
    org: "Amazon Web Services",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    img: "/content/certs/aws-cloud-operations.png",
    date: "Feb 2026",
    verifyUrl:
      "https://www.credly.com/badges/ed2c3f4f-4c0f-4ce1-9ddf-6d0f37354043/public_url",
  },
  {
    name: "Huawei Cloud Developer (HCCDA)",
    org: "Huawei Cloud",
    logo: "https://cdn.simpleicons.org/huawei",
    img: "/content/certs/huawei-cloud-developer.png",
    date: "Valid until Oct 2028",
    verifyUrl:
      "https://drive.google.com/file/d/1QFTSLfrQftHymM4K95YwaJKA6-N3voE3/view",
  },
];

/** Tech-stack tiles (grid order). */
export const techStack: TechItem[] = [
  // Languages
  { name: "Swift", slug: "swift" },
  { name: "Kotlin", slug: "kotlin" },
  { name: "Java", slug: "openjdk" },
  { name: "Python", slug: "python" },
  { name: "Go", slug: "go" },
  { name: "JavaScript", slug: "javascript" },
  { name: "TypeScript", slug: "typescript" },
  { name: "C++", slug: "cplusplus" },
  {
    name: "C#",
    slug: "csharp",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
  },
  { name: "Dart", slug: "dart" },
  { name: "HTML5", slug: "html5" },
  { name: "CSS", slug: "css" },
  // Frameworks & UI
  { name: "SwiftUI", slug: "swift" },
  { name: "Jetpack Compose", slug: "jetpackcompose" },
  { name: "React", slug: "react" },
  { name: "React Native", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "Expo", slug: "expo" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "Express.js", slug: "express" },
  { name: "Flask", slug: "flask" },
  { name: "Spring Boot", slug: "springboot" },
  { name: "Unity", slug: "unity" },
  // Data, cloud & tooling
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
    // Now shown as curated cards in the "All projects" grid.
    "jtrax-admin",
    "jtrax-web-app",
    "jtrax-backend",
    "jtrax-mobile-app",
    "jtrax-docs",
    "springboard",
    "ice-breaker",
    "cpu-scheduling-algorithm",
    "project02-web-app-development",
    "water-subscription-billing-system",
    "gamedesigndevelopment_project2",
    "project-01-spending-tracker",
    "lambda-functions-for-project02",
    "database-term-project",
    "term-project-ios-app-development",
  ],
  maxRepos: 16,
  collapsedCount: 4,
};
