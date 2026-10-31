import type { Metadata } from "next";
import {
  Instrument_Sans,
  Noto_Sans_Myanmar,
  Noto_Sans_Thai,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider } from "@/lib/language";
import { profile } from "@/content/site";

const sans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-grotesk",
});
const thai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-thai",
});
const myanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mm",
});

const TITLE = "Win Yu Maung — Software Engineer | Full-Stack, Cloud & AI";
const DESCRIPTION =
  "Win Yu Maung is a software engineer in Thailand and CTO of GlowOps, building full-stack web, cloud and AI products with Next.js, TypeScript, Go and AWS.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: profile.name,
    locale: "en_US",
    type: "profile",
    firstName: "Win Yu",
    lastName: "Maung",
    username: profile.githubUser,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

// Applies the saved theme before first paint so there is no flash.
const themeInit = `try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sans.variable} ${grotesk.variable} ${thai.variable} ${myanmar.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        {/* Scroll-reveal content starts hidden and needs JS to appear. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
