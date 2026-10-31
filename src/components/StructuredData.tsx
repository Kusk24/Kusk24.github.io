import { profile } from "@/content/site";
import { dictionaries } from "@/content/locales";

/**
 * schema.org data that tells search engines who this page is about. Keep it to
 * facts already shown on the page, and leave out phone and email on purpose.
 */
export default function StructuredData() {
  const { th, my } = dictionaries;
  const personId = `${profile.siteUrl}/#person`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${profile.siteUrl}/#profile`,
        url: `${profile.siteUrl}/`,
        name: `${profile.name} — Software Engineer`,
        inLanguage: "en",
        mainEntity: { "@id": personId },
      },
      {
        "@type": "WebSite",
        "@id": `${profile.siteUrl}/#website`,
        url: `${profile.siteUrl}/`,
        name: profile.name,
        inLanguage: ["en", "th", "my"],
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        alternateName: [
          "Win Yu",
          profile.githubUser,
          th.brandName,
          my.brandName,
        ],
        url: `${profile.siteUrl}/`,
        image: `${profile.siteUrl}${profile.portrait}`,
        jobTitle: "Software Engineer",
        description:
          "Software engineer in Thailand and CTO of GlowOps, building full-stack web, cloud and AI products.",
        sameAs: [profile.githubUrl, profile.linkedinUrl],
        worksFor: {
          "@type": "Organization",
          name: "GlowOps",
          url: "https://glowops.codeblue.software",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: dictionaries.en.eduSchool,
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: dictionaries.en.eduDegree,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pak Kret",
          addressRegion: "Nonthaburi",
          addressCountry: "TH",
        },
        knowsAbout: [
          "Full-stack web development",
          "Next.js",
          "React",
          "TypeScript",
          "Go",
          "Python",
          "PostgreSQL",
          "AWS",
          "Terraform",
          "Docker",
          "CI/CD",
          "AI agent workflows",
        ],
        knowsLanguage: ["en", "my"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
