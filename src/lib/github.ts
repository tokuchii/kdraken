import { Project } from "./types";

const GITHUB_USERNAME = "tokuchii";

const liveUrls: Record<string, string> = {
  "kdraken": "https://kdraken.vercel.app",
  "oasis-gym": "https://oasis-gym.vercel.app",
  "farmex": "https://www.leadsfarmex.com/",
  "leads": "https://leadsagri.com/",
  "copypastev1": "https://copypastev1.vercel.app",
  "mpdc": "https://malvedaproperties.com/",
};

const projectDescriptions: Record<string, string> = {
  "kdraken": "A personal portfolio showcasing projects and skills with a clean, responsive design.",
  "oasis-gym": "A fitness platform for managing workouts, tracking progress, and scheduling training sessions.",
  "farmex": "An agriculture platform for managing farm operations, tracking crops, and optimizing harvests.",
  "leads": "A lead management system for tracking prospects, managing customer relationships, and streamlining sales.",
  "admin-burger-shop": "A food ordering system for managing menu items, processing orders, and tracking inventory.",
  "burger-shop1": "A customer-facing burger shop ordering interface with responsive design.",
  "copypastev1": "A clipboard utility for managing text snippets and streamlining copy-paste workflows.",
  "mpdc": "A property management web application built with Vue and PHP.",
};

const featuredRepos = new Set([
  "kdraken",
  "oasis-gym",
  "farmex",
  "leads",
  "mpdc",
]);

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  topics: string[];
  created_at: string;
  pushed_at: string;
  default_branch: string;
}

interface GitHubLanguages {
  [key: string]: number;
}

const fallbackProjects: Project[] = [
  {
    id: "oasis-gym",
    title: "Oasis Gym",
    description: "A fitness platform for managing workouts, tracking progress, and scheduling training sessions.",
    tags: ["Vue", "TypeScript", "CSS"],
    links: { github: "https://github.com/tokuchii/oasis-gym", live: "https://oasis-gym.vercel.app" },
    featured: true,
    category: "fullstack",
    accentIndex: 0,
  },
  {
    id: "farmex",
    title: "Farmex",
    description: "An agriculture platform for managing farm operations, tracking crops, and optimizing harvests.",
    tags: ["JavaScript", "TypeScript", "CSS"],
    links: { github: "https://github.com/tokuchii/farmex", live: "https://www.leadsfarmex.com/" },
    featured: true,
    category: "fullstack",
    accentIndex: 1,
  },
  {
    id: "leads",
    title: "Leads",
    description: "A lead management system for tracking prospects, managing customer relationships, and streamlining sales.",
    tags: ["Vue", "PHP", "CSS"],
    links: { github: "https://github.com/tokuchii/leads", live: "https://leadsagri.com/" },
    featured: true, 
    category: "fullstack",
    accentIndex: 2,
  },
  {
    id: "kdraken",
    title: "Kdraken",
    description: "A personal portfolio showcasing projects and skills with a clean, responsive design.",
    tags: ["TypeScript", "Next.js", "Tailwind CSS"],
    links: { github: "https://github.com/tokuchii/kdraken", live: "https://kdraken.vercel.app" },
    featured: true,
    category: "frontend",
    accentIndex: 3,
  },
  {
    id: "admin-burger-shop",
    title: "Admin Burger Shop",
    description: "A food ordering system for managing menu items, processing orders, and tracking inventory.",
    tags: ["JavaScript", "HTML", "CSS"],
    links: { github: "https://github.com/tokuchii/admin-burger-shop" },
    category: "frontend",
    accentIndex: 4,
  },
  {
    id: "burger-shop1",
    title: "Burger Shop",
    description: "A customer-facing burger shop ordering interface with responsive design.",
    tags: ["JavaScript", "HTML", "CSS"],
    links: { github: "https://github.com/tokuchii/burger-shop1" },
    category: "frontend",
    accentIndex: 0,
  },
  {
    id: "copypastev1",
    title: "CopyPaste v1",
    description: "A clipboard utility for managing text snippets and streamlining copy-paste workflows.",
    tags: ["TypeScript", "CSS", "JavaScript"],
    links: { github: "https://github.com/tokuchii/copypastev1", live: "https://copypastev1.vercel.app" },
    category: "frontend",
    accentIndex: 1,
  },
  {
    id: "mpdc",
    title: "MPDC",
    description: "A property management web application built with Vue and PHP.",
    tags: ["Vue", "PHP", "TypeScript"],
    links: { github: "https://github.com/tokuchii/mpdc", live: "https://malvedaproperties.com/" },
    featured: true,
    category: "fullstack",
    accentIndex: 2,
  },
];

export async function fetchRepos(): Promise<Project[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    if (!res.ok) {
      console.warn("GitHub API rate limited, using fallback projects");
      return fallbackProjects;
    }

    const repos: GitHubRepo[] = await res.json();

    if (repos.length === 0) {
      return fallbackProjects;
    }

    const projects = await Promise.all(
      repos.map(async (repo, index) => {
        let tags: string[] = [];

        if (repo.language) {
          tags.push(repo.language);
        }

        try {
          const langRes = await fetch(repo.languages_url, {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
          });
          if (langRes.ok) {
            const languages: GitHubLanguages = await langRes.json();
            tags = Object.entries(languages)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 4)
              .map(([lang]) => lang);
          }
        } catch {
          // Use fallback from repo.language
        }

        const description = projectDescriptions[repo.name] || repo.description || generateDescription(repo.name, tags, repo.topics);

        const category = detectCategory(tags, repo.topics);

        return {
          id: repo.name,
          title: repo.name
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
          description,
          tags,
          links: {
            github: repo.html_url,
            ...(liveUrls[repo.name] ? { live: liveUrls[repo.name] } : repo.homepage ? { live: repo.homepage } : {}),
          },
          featured: featuredRepos.has(repo.name),
          category,
          accentIndex: index % 5,
        };
      })
    );

    return projects;
  } catch (error) {
    console.error("Error fetching repos:", error);
    return fallbackProjects;
  }
}

function extractDescription(readme: string): string {
  const lines = readme.split("\n").filter((l) => l.trim());

  for (const line of lines) {
    const cleaned = line.replace(/^#+\s*/, "").replace(/[*_`]/g, "").trim();
    if (
      cleaned.length > 20 &&
      cleaned.length < 200 &&
      !cleaned.startsWith("http") &&
      !cleaned.includes("|") &&
      !cleaned.includes("```")
    ) {
      return cleaned;
    }
  }

  return "";
}

function generateDescription(name: string, tags: string[], topics: string[]): string {
  const displayName = name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const techStack = tags.slice(0, 2).join(" and ") || "modern technologies";

  const categoryKeywords = [...topics, ...tags.map((t) => t.toLowerCase())];

  if (categoryKeywords.some((k) => ["gym", "fitness", "workout", "exercise", "health"].includes(k))) {
    return `A fitness platform for managing workouts, tracking progress, and scheduling training sessions.`;
  }

  if (categoryKeywords.some((k) => ["farm", "agriculture", "crop", "harvest", "farming"].includes(k))) {
    return `An agriculture platform for managing farm operations, tracking crops, and optimizing harvests.`;
  }

  if (categoryKeywords.some((k) => ["burger", "food", "restaurant", "order", "shop", "menu"].includes(k))) {
    return `A food ordering system for managing menu items, processing orders, and tracking inventory.`;
  }

  if (categoryKeywords.some((k) => ["lead", "crm", "customer", "client", "sales"].includes(k))) {
    return `A lead management system for tracking prospects, managing customer relationships, and streamlining sales.`;
  }

  if (categoryKeywords.some((k) => ["clipboard", "copy", "paste", "text", "utility"].includes(k))) {
    return `A clipboard utility for managing text snippets and streamlining copy-paste workflows.`;
  }

  if (categoryKeywords.some((k) => ["portfolio", "personal", "blog", "resume"].includes(k))) {
    return `A personal portfolio showcasing projects and skills with a clean, responsive design.`;
  }

  if (categoryKeywords.some((k) => ["property", "real estate", "mpdc", "building"].includes(k))) {
    return `A property management web application for tracking buildings, units, and tenants.`;
  }

  if (categoryKeywords.some((k) => ["vue", "react", "next.js", "nuxt"].includes(k))) {
    return `A web application built with ${techStack}.`;
  }

  return `A project built with ${techStack}.`;
}

function detectCategory(
  tags: string[],
  topics: string[]
): "frontend" | "backend" | "fullstack" | "opensource" {
  const all = [...tags, ...topics].map((t) => t.toLowerCase());

  const frontendFrameworks = ["react", "vue", "next.js", "nuxt", "svelte", "angular", "html", "css", "tailwind css", "scss"];
  const backendLanguages = ["php", "python", "ruby", "java", "go", "rust", "c#"];
  const backendFrameworks = ["node.js", "express", "laravel", "django", "flask", "rails", "spring", "prisma", "graphql"];
  const databaseKeywords = ["sql", "mongodb", "postgresql", "mysql", "redis", "firebase", "supabase"];

  const hasFrontend = all.some(t => frontendFrameworks.some(f => t.includes(f)));
  const hasBackend = all.some(t => [...backendLanguages, ...backendFrameworks].some(b => t.includes(b)));
  const hasDatabase = all.some(t => databaseKeywords.some(d => t.includes(d)));

  if (hasFrontend && (hasBackend || hasDatabase)) {
    return "fullstack";
  }

  if (hasFrontend) {
    return "frontend";
  }

  if (hasBackend) {
    return "backend";
  }

  return "frontend";
}
