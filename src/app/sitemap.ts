import type { MetadataRoute } from "next";
import { profile } from "@/content/site";

// Required for metadata routes under output: "export".
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${profile.siteUrl}/` }];
}
