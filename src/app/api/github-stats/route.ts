import { NextResponse } from "next/server";

const GITHUB_USERNAME = "Ankityadav0018";

const TECH_KEYWORDS = [
  "python", "django", "fastapi", "flask", "streamlit", "langchain",
  "mlflow", "tensorflow", "pytorch", "scikit", "pandas", "numpy",
  "react", "next", "node", "express", "typescript", "javascript",
  "html", "css", "tailwind", "docker", "redis", "postgresql",
  "mongodb", "sqlite", "git", "n8n", "ejs", "api", "ml", "ai",
  "nlp", "opencv", "selenium", "beautifulsoup", "celery",
];

// In-memory cache to avoid hitting GitHub rate limits
let cache: { data: { repos: number; projects: number; technologies: number }; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export async function GET() {
  // Return cached data if fresh
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json(cache.data);
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`,
      {
        headers: { Accept: "application/vnd.github.v3+json" },
        next: { revalidate: 3600 }, // Next.js fetch cache: 1 hour
      }
    );

    if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);

    const repos = await res.json();
    if (!Array.isArray(repos)) throw new Error("Invalid response");

    const nonFork = repos.filter((r: { fork: boolean }) => !r.fork);

    // Collect primary languages
    const languages = new Set<string>();
    nonFork.forEach((r: { language: string | null }) => {
      if (r.language) languages.add(r.language);
    });

    // Scan repo names + descriptions for tech keywords
    const foundTech = new Set<string>();
    nonFork.forEach((r: { name: string; description: string | null; language: string | null }) => {
      const text = `${r.name} ${r.description || ""} ${r.language || ""}`.toLowerCase();
      TECH_KEYWORDS.forEach((kw) => {
        if (text.includes(kw)) foundTech.add(kw);
      });
    });

    const data = {
      repos: nonFork.length,
      projects: nonFork.length,
      technologies: Math.max(languages.size, foundTech.size),
    };

    // Store in cache
    cache = { data, timestamp: Date.now() };

    return NextResponse.json(data);
  } catch {
    // Fallback: real values from your GitHub profile
    const fallback = { repos: 15, projects: 15, technologies: 10 };
    return NextResponse.json(fallback);
  }
}
