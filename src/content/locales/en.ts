import type { Dict } from "../types";

const en: Dict = {
  navProjects: "Projects",
  navExp: "Experience",
  navStack: "Stack",
  navAbout: "About",
  navContact: "Contact",
  navResume: "Résumé",

  typedPhrases: [
    "Computer Science Student",
    "Software Engineer",
    "Web · Mobile · Cloud Developer",
  ],
  heroTagline:
    "I build for web, mobile, and cloud — from SwiftUI and Jetpack Compose apps to Flask backends running on AWS.",
  ctaProjects: "View projects",
  ctaResume: "Download résumé",

  projOverline: "Selected work",
  projTitle: "Projects",
  projLead:
    "Featured builds up front — swipe through them — then browse everything below, filtered by type or platform.",
  featuredLabel: "Featured",
  scrollHint: "Scroll to move through featured work",
  allTitle: "All projects",
  allLead:
    "Personal, team, and organization work — click any project for the full case study.",
  filterAll: "All",
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

  aboutOverline: "Beyond the code",
  aboutTitle: "About me",
  aboutP1:
    "I got into software by wanting to build things I could actually hold — an iOS app my friends could open, a game with a boss fight, a backend that didn’t fall over.",
  aboutP2:
    "Three years into my CS degree at Assumption University, that curiosity has become a habit of picking up whatever stack the problem needs: Swift one semester, Flask and PostgreSQL the next, AWS in between. Outside the terminal I keep a disciplined gym routine — consistency there and consistency in engineering feel like the same muscle.",
  aboutFacts: [
    { label: "Based in Samut Prakan, Thailand", ic: "map-pin" },
    { label: "Burmese — native", ic: "languages" },
    { label: "English — fluent", ic: "languages" },
    { label: "TrueLAB Runway 2026 finalist", ic: "trophy" },
  ],

  contactOverline: "Get in touch",
  contactTitle: "Let’s build something.",
  contactLead:
    "Open to software engineering internships — web, mobile, backend, or cloud.",
  footNote: "English · ไทย · မြန်မာ — designed & built by me",

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
  ],
};

export default en;
