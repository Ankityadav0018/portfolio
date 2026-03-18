"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Github, Eye, Star, GitFork, Loader2, AlertCircle, RefreshCw } from "lucide-react";

// ⚡ CHANGE THIS TO YOUR GITHUB USERNAME
const GITHUB_USERNAME = "Ankityadav0018";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
  updated_at: string;
  readmeDescription?: string;
}

const languageColors: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3776AB",
  HTML: "#E34F26",
  CSS: "#1572B6",
  EJS: "#A91E50",
  Java: "#ED8B00",
  "C++": "#00599C",
  C: "#A8B9CC",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Ruby: "#CC342D",
  PHP: "#777BB4",
  Swift: "#FA7343",
  Kotlin: "#A97BFF",
  Dart: "#0175C2",
  Shell: "#89E051",
  Vue: "#4FC08D",
  SCSS: "#C6538C",
};

const gradients = [
  "from-purple-500/20 to-pink-500/20",
  "from-cyan-500/20 to-blue-500/20",
  "from-green-500/20 to-emerald-500/20",
  "from-orange-500/20 to-yellow-500/20",
  "from-violet-500/20 to-fuchsia-500/20",
  "from-rose-500/20 to-red-500/20",
  "from-teal-500/20 to-cyan-500/20",
  "from-amber-500/20 to-orange-500/20",
  "from-indigo-500/20 to-purple-500/20",
];

const repoEmojis = ["🚀", "⚡", "🔥", "💡", "🎯", "✨", "🛠️", "🌟", "💻", "🎨", "📦", "🤖"];

function getTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

/**
 * Fetches the README for a repo and extracts a clean description from it.
 * Looks for the first meaningful paragraph after the title.
 */
async function fetchReadmeDescription(repoName: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/main/README.md`
    );
    if (!res.ok) return null;
    const text = await res.text();
    return extractDescription(text);
  } catch {
    return null;
  }
}

function extractDescription(markdown: string): string | null {
  const lines = markdown.split("\n");
  const descriptionLines: string[] = [];
  let foundTitle = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Skip empty lines before we find content
    if (!line) {
      // If we already have description content, a blank line means we're done
      if (descriptionLines.length > 0) break;
      continue;
    }

    // Skip markdown headings
    if (line.startsWith("#")) {
      // If we already collected description, stop at next heading
      if (descriptionLines.length > 0) break;
      foundTitle = true;
      continue;
    }

    // Skip common non-description lines
    if (
      line.startsWith("---") ||
      line.startsWith("```") ||
      line.startsWith("|") ||
      line.startsWith("![") ||
      line.startsWith("- [") || // table of contents links
      line.match(/^\*\*Course[:;]/) ||
      line.match(/^\*\*Character[:;]/) ||
      line.match(/^>\s*\*\*/) ||
      line.match(/^>\s*Course/) ||
      line.match(/^FM:\s/) ||
      line.startsWith("[![")
    ) {
      if (descriptionLines.length > 0) break;
      continue;
    }

    // Skip blockquotes that look like metadata
    if (line.startsWith(">")) {
      if (descriptionLines.length > 0) break;
      continue;
    }

    // This looks like a real description line
    if (foundTitle || descriptionLines.length > 0) {
      // Clean markdown formatting
      const clean = line
        .replace(/\*\*(.*?)\*\*/g, "$1") // bold
        .replace(/\*(.*?)\*/g, "$1") // italic
        .replace(/\[(.*?)\]\(.*?\)/g, "$1") // links
        .replace(/`(.*?)`/g, "$1") // inline code
        .replace(/<[^>]+>/g, "") // html tags
        .trim();

      if (clean.length > 10) {
        descriptionLines.push(clean);
        // Collect up to ~200 chars
        if (descriptionLines.join(" ").length >= 180) break;
      }
    }
  }

  if (descriptionLines.length === 0) return null;

  let desc = descriptionLines.join(" ").trim();
  // Truncate nicely at ~200 chars
  if (desc.length > 200) {
    desc = desc.substring(0, 200).replace(/\s+\S*$/, "") + "...";
  }
  return desc;
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const fetchRepos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`,
        {
          headers: { Accept: "application/vnd.github.v3+json" },
        }
      );
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const data: GitHubRepo[] = await res.json();
      // Filter out forks, sort by stars then updated
      const filtered = data
        .filter((r) => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

      setRepos(filtered);

      // Fetch README descriptions in parallel for all repos
      const readmePromises = filtered.map(async (repo) => {
        const readmeDesc = await fetchReadmeDescription(repo.name);
        return { id: repo.id, readmeDescription: readmeDesc };
      });

      const readmeResults = await Promise.all(readmePromises);

      setRepos((prev) =>
        prev.map((repo) => {
          const match = readmeResults.find((r) => r.id === repo.id);
          return match?.readmeDescription
            ? { ...repo, readmeDescription: match.readmeDescription }
            : repo;
        })
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch repos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRepos();
  }, [fetchRepos]);

  const displayedRepos = showAll ? repos : repos.slice(0, 6);

  return (
    <section id="projects" className="relative py-24 bg-gray-950">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-purple-400 uppercase tracking-widest">
            Projects
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              GitHub repos
            </span>{" "}
            🚀
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Live from GitHub — these are the projects I&apos;ve been building and shipping.
          </p>
        </motion.div>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Loader2 size={36} className="text-purple-400" />
            </motion.div>
            <p className="text-gray-500 text-sm">Fetching repos from GitHub...</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <AlertCircle size={36} className="text-red-400" />
            <p className="text-gray-400 text-sm">{error}</p>
            <motion.button
              onClick={fetchRepos}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full hover:bg-purple-500/20 transition-all"
            >
              <RefreshCw size={14} /> Retry
            </motion.button>
          </div>
        )}

        {/* Repos grid */}
        {!loading && !error && (
          <>
            {repos.length === 0 ? (
              <p className="text-center text-gray-500 py-20">No public repos found.</p>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedRepos.map((repo, index) => (
                    <motion.div
                      key={repo.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.06 }}
                      whileHover={{ y: -8, transition: { duration: 0.3 } }}
                      onHoverStart={() => setHoveredProject(index)}
                      onHoverEnd={() => setHoveredProject(null)}
                      onClick={() => window.open(repo.html_url, '_blank')}
                      className="group relative rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/30 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 cursor-pointer"
                    >
                      {/* Gradient top bar */}
                      <div className={`h-1 w-full bg-gradient-to-r ${gradients[index % gradients.length]}`} />

                      {/* Hover glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredProject === index ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className="relative z-10 p-7">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <motion.span
                              className="text-2xl shrink-0"
                              animate={hoveredProject === index ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
                              transition={{ duration: 0.5 }}
                            >
                              {repoEmojis[index % repoEmojis.length]}
                            </motion.span>
                            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                              {repo.name}
                            </h3>
                          </div>
                        </div>

                        {/* Description — from README or fallback to repo description */}
                        <p className="text-gray-400 mb-4 leading-relaxed text-sm line-clamp-3 min-h-[3.75rem]">
                          {repo.readmeDescription || repo.description || "No description provided."}
                        </p>

                        {/* Language + stats row */}
                        <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                          {repo.language && (
                            <span className="flex items-center gap-1.5">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ backgroundColor: languageColors[repo.language] || "#8b8b8b" }}
                              />
                              {repo.language}
                            </span>
                          )}
                          {repo.stargazers_count > 0 && (
                            <span className="flex items-center gap-1">
                              <Star size={12} className="text-yellow-500" />
                              {repo.stargazers_count}
                            </span>
                          )}
                          {repo.forks_count > 0 && (
                            <span className="flex items-center gap-1">
                              <GitFork size={12} />
                              {repo.forks_count}
                            </span>
                          )}
                          <span className="ml-auto">{getTimeAgo(repo.updated_at)}</span>
                        </div>

                        {/* Topics / tags */}
                        {repo.topics && repo.topics.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {repo.topics.slice(0, 4).map((topic) => (
                              <span
                                key={topic}
                                className="px-2.5 py-1 text-[11px] font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full"
                              >
                                {topic}
                              </span>
                            ))}
                            {repo.topics.length > 4 && (
                              <span className="px-2.5 py-1 text-[11px] font-medium text-gray-500 bg-gray-800/50 rounded-full">
                                +{repo.topics.length - 4}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-800/50">
                          <span className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-400 bg-gray-800/50 rounded-lg group-hover:text-white group-hover:bg-gray-800 transition-all">
                            <Github size={14} /> View Repo
                          </span>
                          {repo.homepage && (
                            <a
                              href={repo.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-purple-300 bg-purple-500/10 rounded-lg hover:bg-purple-500/20 transition-all hover:scale-105 active:scale-95"
                            >
                              <Eye size={14} /> Live Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Show More / Less button */}
                {repos.length > 6 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center mt-10"
                  >
                    <motion.button
                      onClick={() => setShowAll(!showAll)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 text-sm font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full hover:bg-purple-500/20 transition-all"
                    >
                      {showAll ? "Show Less" : `Show All ${repos.length} Repos`}
                    </motion.button>
                  </motion.div>
                )}

                {/* GitHub profile link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}
                  className="flex justify-center mt-6"
                >
                  <a
                    href={`https://github.com/${GITHUB_USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-purple-400 transition-colors flex items-center gap-2"
                  >
                    <Github size={16} />
                    View full GitHub profile →
                  </a>
                </motion.div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
