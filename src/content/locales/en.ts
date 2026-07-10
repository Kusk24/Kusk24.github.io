import type { Dict } from "../types";

const en: Dict = {
  brandName: "Win Yu Maung",
  brandNick: "Win Yu",
  navProjects: "Projects",
  navExp: "Experience",
  navStack: "Stack",
  navCerts: "Certificates",
  navAbout: "About",
  navContact: "Contact",
  navResume: "Résumé",

  typedPhrases: [
    "Software Engineer",
    "Full-Stack Web Developer",
    "DevOps · Cloud",
    "Mobile Developer",
    "AI-Assisted Development",
  ],
  heroTagline:
    "Software engineer focused on full-stack web and DevOps — from Next.js frontends to cloud infrastructure on AWS — and I build mobile apps as well, from SwiftUI and Jetpack Compose to React Native.",
  ctaProjects: "View projects",
  ctaResume: "Download résumé",

  projOverline: "Selected work",
  projTitle: "Projects",
  projLead:
    "Featured builds up front — swipe through them — then browse everything below, filtered by type or platform.",
  featuredLabel: "Featured",
  onStage: "On stage",
  scrollHint: "Scroll to move through featured work",
  allTitle: "All projects",
  allLead:
    "Personal, team, and organization work — click any project for the full case study.",
  filterAll: "All",
  sortLabel: "Sort",
  sortNewest: "Newest first",
  sortOldest: "Oldest first",
  projShowMore: "Show all projects",
  projShowLess: "Show fewer",
  viewCase: "View case study",
  overviewLabel: "Overview",
  roleLabel: "My part",
  ghLabel: "View source on GitHub",
  moreGh: "More projects on GitHub",

  archTitle: "Latest on GitHub",
  archLead: "My most recent repositories, pulled live.",
  seeMoreGh: "See more",
  seeLessGh: "Show less",
  seeAllGh: "All repositories",
  archFail: "Couldn’t load repos right now — see everything on GitHub",

  expOverline: "Track record",
  expTitle: "Experience & education",
  eduLabel: "Education",
  certsLabel: "Certificates",
  gpaLabel: "GPA",
  eduSchool: "Assumption University of Thailand",
  eduDegree: "B.Sc. Computer Science — Software Engineering concentration",
  eduPeriod: "June 2023 – October 2026 (expected)",

  stackOverline: "Tools of the trade",
  stackTitle: "Tech stack & languages",
  stackLead:
    "The languages, frameworks, and platforms I reach for — lighting up one at a time.",

  certSecOverline: "Credentials",
  certSecLead:
    "Cloud certifications, rotating on their own — click any one to bring it into focus.",
  certVerified: "Verified",
  certVerify: "Verify",

  aboutOverline: "Beyond the code",
  aboutTitle: "About me",
  aboutP1:
    "I got into software by wanting to build things I could actually hold — an iOS app my friends could open, a game with a boss fight, a backend that didn’t fall over.",
  aboutP2:
    "Three years into my CS degree at Assumption University, that curiosity has become a habit of picking up whatever stack the problem needs: Swift one semester, Flask and PostgreSQL the next, AWS in between. I also work fluently with AI — pairing with coding agents to build, review, and ship faster without letting quality slip. Outside the terminal I keep a disciplined gym routine — consistency there and consistency in engineering feel like the same muscle.",
  aboutFacts: [
    { label: "Based in Samut Prakan, Thailand", ic: "map-pin" },
    { label: "Burmese — native", ic: "languages" },
    { label: "English — fluent", ic: "languages" },
    { label: "TrueLAB Runway 2026 finalist", ic: "trophy" },
    { label: "Fluent in AI-assisted development", ic: "sparkles" },
  ],

  contactOverline: "Get in touch",
  contactTitle: "Let’s build something.",
  contactLead:
    "Open to software engineering roles and internships — full-stack web, DevOps, or mobile.",
  footNote: "English · ไทย · မြန်မာ — designed & built by Win Yu Maung",

  experience: [
    {
      org: "GlowOps — CodeBlue Team",
      role: "Project CTO / Technical Lead",
      period: "April 2026 – Present",
      desc: "TrueLAB Open Innovation Runway 2026 finalist. Leading a LINE-first AI operations copilot for beauty & wellness SMEs — system architecture, integrations, AI workflows, and the staff approval hub.",
    },
    {
      org: "Schedjuice Company Limited",
      role: "Frontend Developer Intern",
      period: "August – October 2025",
      desc: "Shipped features for an education-automation platform in Next.js and Tailwind CSS; collaborated through GitHub on issue fixes, UI refinement, and product development.",
    },
  ],

  projects: [
    {
      name: "AUGO",
      sub: "iOS · Social media with AR interaction",
      desc: "Team-built iOS social app where students capture AR collectibles around campus — holographic cards, live leaderboard, campus map, and announcements.",
      role: "AR camera with device-motion tracking, auth with Keychain, and a modular design using SPM libraries.",
    },
    {
      name: "MotoPedia",
      sub: "Android · Wikipedia for motorcycles",
      desc: "Android encyclopedia for motorcycles: browse specs, find dealers on Google Maps, and switch languages on the fly.",
      role: "Team project — MVVM architecture with Jetpack Compose and Firebase sync.",
    },
    {
      name: "Space Shooter",
      sub: "Java · Game development",
      desc: "Vertical and side-scrolling shooter with animated sprites, boss battles, and power-ups.",
      role: "Levels load from CSV maps with progressive difficulty, sound effects, and a scoring dashboard.",
    },
    {
      name: "GameRental Backend",
      sub: "Flask · PostgreSQL REST API",
      desc: "RESTful API powering a game-rental service — customers, staff, and admins each get role-based access control.",
      role: "Designed the PostgreSQL schema and the Flask + SQLAlchemy endpoints.",
    },
    {
      name: "JTrax Admin",
      sub: "Next.js · School-management admin portal",
      desc: "Super-admin and branch-admin portals for the JTrax attendance platform — manage branches, teachers, students, classes, and credits.",
      role: "Team project — built the admin web app in Next.js and Tailwind.",
    },
    {
      name: "JTrax Web App",
      sub: "Next.js · Student/teacher/parent portal",
      desc: "Student, teacher, and parent web app for JTrax — attendance check-in, schedules, records, and profiles.",
      role: "Team project — implemented the check-in flow and record views.",
    },
    {
      name: "JTrax Backend",
      sub: "Go · Attendance & management API",
      desc: "School attendance and management API — auth, multi-role permissions, courses, classes, and attendance tracking.",
      role: "Team project — built API endpoints and role-based permissions in Go.",
    },
    {
      name: "JTrax Mobile App",
      sub: "React Native · Student/teacher/parent app",
      desc: "Student, teacher, and parent mobile app for JTrax — attendance check-in, schedules, records, and profiles.",
      role: "Team project — built the cross-platform mobile client in React Native.",
    },
    {
      name: "SpringBoard",
      sub: "AI · Spring Boot modernization tool",
      desc: "AI-powered Spring Boot modernization tool built with IBM Bob IDE and watsonx.ai — analyzes a repo, detects migration risks, and refactors 2.x to 3.x.",
      role: "Team project — integrated the IBM Granite model and analysis workflow.",
    },
    {
      name: "IceBreaker",
      sub: "Web · A special site for T3",
      desc: "A small, personal web page — the special IceBreaker site for the one and only T3.",
      role: "Solo project — hand-built with HTML, CSS, and JavaScript.",
    },
    {
      name: "CPU Scheduling",
      sub: "Java · OS scheduling algorithms",
      desc: "Operating-systems assignment implementing and comparing CPU scheduling algorithms.",
      role: "Solo project — implemented the scheduling logic in Java.",
    },
    {
      name: "Clothing E-commerce",
      sub: "Next.js · Full-stack shop",
      desc: "Full-stack clothing e-commerce shop built for the Web App Development course, using Next.js, Tailwind, and Express.js.",
      role: "Team project — built storefront and API layers.",
    },
    {
      name: "Water Billing System",
      sub: "JavaScript · Subscription billing",
      desc: "Water subscription billing system built as the software-testing course term project, with a focus on test coverage.",
      role: "Team project — implemented billing logic and its test suite.",
    },
    {
      name: "Tank 1990",
      sub: "Unity · 2.5D retro remake",
      desc: "Final term project for Game Design and Development — recreating the retro Tank 1990 game as a 2.5D game in Unity.",
      role: "Team project — built gameplay and level mechanics in Unity / C#.",
    },
    {
      name: "Spending Tracker",
      sub: "JavaScript · Personal finance",
      desc: "Project 01 of Web App Development — a spending tracker for logging and reviewing expenses.",
      role: "Solo project — built the tracking UI and logic.",
    },
    {
      name: "Lambda CRUD Functions",
      sub: "AWS · Serverless CRUD API",
      desc: "AWS Lambda CRUD functions backing Project 02 — employee create, read, update, and delete methods.",
      role: "Solo project — authored the Lambda handlers.",
    },
    {
      name: "Database Term Project",
      sub: "Web · Database course project",
      desc: "Term project for the database course — a data-backed web application.",
      role: "Team project — designed the schema and queries.",
    },
    {
      name: "iOS Term Project",
      sub: "Swift · iOS course project (duo)",
      desc: "Term project for the iOS App Development course, built as a duo.",
      role: "Team project — built app screens and logic in Swift.",
    },
  ],
};

export default en;
