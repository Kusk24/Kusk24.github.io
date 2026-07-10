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

const SITE_URL = "https://kusk24.github.io";
const TITLE = "Win Yu Maung — Software Engineer";
const DESCRIPTION =
  "Software engineer focused on full-stack web and DevOps — from Next.js frontends to cloud infrastructure on AWS — plus mobile apps in SwiftUI, Jetpack Compose, and React Native.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Win Yu Maung",
    type: "website",
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
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
