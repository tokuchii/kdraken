import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = process.env.GITHUB_TOKEN;

    // 🔹 Fetch only repos you own
    const res = await fetch(
      "https://api.github.com/user/repos?per_page=100&affiliation=owner",
      {
        headers: {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!res.ok) throw new Error("GitHub API error");

    // 🔹 Filter out forks here
    const repos = (await res.json()).filter((repo: any) => !repo.fork);

    // 🔹 Aggregate languages + frameworks + repo counts
const languageTotals: Record<string, number> = {}; // bytes
const repoLanguageCount: Record<string, number> = {}; // repo count
const frameworkTotals: Record<string, number> = {};

await Promise.all(
  repos.map(async (repo: any) => {
    const owner = repo.owner.login;

    try {
      // Languages breakdown (bytes of code per language)
      const langRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo.name}/languages`,
        { headers: { Authorization: `token ${token}` } }
      );

      if (langRes.ok) {
        const langs = await langRes.json();
        let counted = new Set<string>(); // prevent double-counting per repo
        for (const [lang, bytes] of Object.entries(langs)) {
          languageTotals[lang] = (languageTotals[lang] || 0) + (bytes as number);

          // count repo only once per language
          if (!counted.has(lang)) {
            repoLanguageCount[lang] = (repoLanguageCount[lang] || 0) + 1;
            counted.add(lang);
          }
        }
      }

      // Repo topics (used as frameworks/libraries)
      const topicsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo.name}/topics`,
        {
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.mercy-preview+json",
          },
        }
      );

      if (topicsRes.ok) {
        const { names } = await topicsRes.json();
        for (const topic of names || []) {
          frameworkTotals[topic] = (frameworkTotals[topic] || 0) + 1;
        }
      }
    } catch (err) {
      console.error(`Error fetching details for ${repo.name}:`, err);
    }
  })
);

// Calculate percentages
const totalBytes = Object.values(languageTotals).reduce((a, b) => a + b, 0);

const languages = Object.entries(languageTotals).map(([lang, bytes]) => ({
  language: lang,
  count: bytes,
  percent: totalBytes ? Math.round((bytes / totalBytes) * 100) : 0,
  repos: repoLanguageCount[lang] || 0, // 👈 add repo count per language
}));

const frameworks = Object.entries(frameworkTotals).map(([fw, count]) => ({
  framework: fw,
  count,
}));

return NextResponse.json({ repos, languages, frameworks });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub repos" },
      { status: 500 }
    );
  }
}
