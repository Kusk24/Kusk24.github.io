// Build-time fetch of the Microsoft Learn achievements shown under the
// certificate carousel. Runs during `next build` (the site is statically
// exported), so the data refreshes on every deploy — including the weekly
// scheduled rebuild in .github/workflows/deploy.yml. If the Learn API is
// unreachable at build time, the committed snapshot keeps the build green.
import snapshot from "@/content/mslearn-snapshot.json";

/** Stable user id of the Learn profile (learn.microsoft.com/users/winyumaung-9659). */
const UID = "167821a5-4387-47b7-b006-7a5ce84fff37";

export const MSLEARN_PROFILE_URL =
  "https://learn.microsoft.com/en-us/users/winyumaung-9659/achievements";

export interface MsAchievement {
  /** "learningpaths" (trophy), "modules" or "courses" (badge). */
  category: string;
  title: string;
  /** Relative to learn.microsoft.com. */
  imageUrl: string;
  /** Relative link to the learning path / module. */
  url: string;
  /** ISO date the achievement was earned. */
  grantedOn: string;
}

export interface MsLearnData {
  totalXp: number;
  currentLevel: number;
  achievements: MsAchievement[];
}

export async function fetchMsLearn(): Promise<MsLearnData> {
  try {
    const [aRes, xRes] = await Promise.all([
      fetch(`https://learn.microsoft.com/api/achievements/user/${UID}?locale=en-us`),
      fetch(`https://learn.microsoft.com/api/achievements/xp/${UID}`),
    ]);
    if (!aRes.ok || !xRes.ok) throw new Error(`${aRes.status}/${xRes.status}`);
    const a = (await aRes.json()) as { achievements: MsAchievement[] };
    const x = (await xRes.json()) as { totalXp: number; currentLevel: number };
    return {
      totalXp: x.totalXp,
      currentLevel: x.currentLevel,
      achievements: a.achievements.map(
        ({ category, title, imageUrl, url, grantedOn }) => ({
          category,
          title,
          imageUrl,
          url,
          grantedOn,
        })
      ),
    };
  } catch {
    return snapshot as MsLearnData;
  }
}
