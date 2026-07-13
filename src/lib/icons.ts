// Brand-logo URLs (simpleicons / devicon CDNs), matching the design prototype.
// Mono icons are tinted per theme via the color path segment.

const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

/** simpleicons logo in the current theme's text color. */
export function monoIconUrl(slug: string, theme: "dark" | "light"): string {
  const color = theme === "dark" ? "f5f5f7" : "1d1d1f";
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

const TECH_SLUGS: Record<string, string> = {
  SwiftUI: "swift",
  Swift: "swift",
  "Swift Package Manager": "swift",
  "AR / Core Motion": "apple",
  Kotlin: "kotlin",
  "Jetpack Compose": "jetpackcompose",
  Firebase: "firebase",
  "Google Maps": "googlemaps",
  Flask: "flask",
  PostgreSQL: "postgresql",
  SQLAlchemy: "sqlalchemy",
  Python: "python",
  JavaScript: "javascript",
  TypeScript: "typescript",
  HTML: "html5",
  CSS: "css",
  Shell: "gnubash",
  Dart: "dart",
  "Jupyter Notebook": "jupyter",
  C: "c",
  Go: "go",
  PHP: "php",
  Ruby: "ruby",
  "Next.js": "nextdotjs",
  React: "react",
  "React Native": "react",
  Expo: "expo",
  Tailwind: "tailwindcss",
  "Express.js": "express",
  Terraform: "terraform",
  Unity: "unity",
  "Spring Boot": "springboot",
  "LINE Messaging API": "line",
};

/** Icon URL for a tech/chip/repo-language name; null when there is no logo. */
export function techIconUrl(
  name: string,
  theme: "dark" | "light"
): string | null {
  if (name === "Java") return `${DEV}java/java-original.svg`;
  if (name === "C#") return `${DEV}csharp/csharp-original.svg`;
  if (name === "C++") return `${DEV}cplusplus/cplusplus-original.svg`;
  const slug = TECH_SLUGS[name];
  return slug ? monoIconUrl(slug, theme) : null;
}

export const linkedinIconUrl = `${DEV}linkedin/linkedin-original.svg`;
