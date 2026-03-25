"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Github, Eye, Star, GitFork } from "lucide-react";

const GITHUB_USERNAME = "Ankityadav0018";

// ⚡ Custom project images for top repos
// The keys here MUST match the 'name' property in the projectsData array below
const projectImages: Record<string, string> = {
  "portfolio": "/images/projects/portfolio.png",
  "Campus-Management-System": "/images/projects/campus-management.png",
  "Booking-system": "/images/projects/booking-system.png",
  "FastApi": "/images/projects/fastapi.png",
  "whatsapp-bot-n8n": "/images/projects/whatsapp-bot.png",
  "mlflow": "/images/projects/mlflow.png",
};

export interface Project {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

// ⚡ ADD YOUR PROJECTS HERE
// You can manually add GitHub links, descriptions, and other details.
const projectsData: Project[] = [
  {
    id: 1,
    name: "portfolio",
    description: "Personal portfolio website built with Next.js and Tailwind CSS. Features an ultra-premium UI with 3D tilt effects and dynamic components.",
    html_url: "https://github.com/Ankityadav0018/portfolio",
    homepage: "https://ankityadav.vercel.app", 
    language: "TypeScript",
    stargazers_count: 5,
    forks_count: 1,
    topics: ["nextjs", "react", "tailwindcss", "portfolio"],
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Campus-Management-System",
    description: "A comprehensive campus management system to handle student records, faculty information, and administrative tasks efficiently.",
    html_url: "https://github.com/Ankityadav0018/Campus-Management-System",
    homepage: "",
    language: "TypeScript",
    stargazers_count: 3,
    forks_count: 0,
    topics: ["management-system", "campus"],
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Booking-system",
    description: "An advanced booking system application allowing users to reserve slots, manage appointments, and handle payments seamlessly.",
    html_url: "https://github.com/Ankityadav0018/Booking-system",
    homepage: "",
    language: "JavaScript",
    stargazers_count: 2,
    forks_count: 1,
    topics: ["booking", "reservation"],
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "FastApi",
    description: "High-performance API built using FastAPI, showcasing asynchronous request handling, database integration, and robust validation.",
    html_url: "https://github.com/Ankityadav0018/FastApi",
    homepage: "",
    language: "Python",
    stargazers_count: 4,
    forks_count: 2,
    topics: ["fastapi", "python", "backend"],
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: "whatsapp-bot-n8n",
    description: "Automated WhatsApp bot powered by n8n workflows. Handles customer inquiries, sends notifications, and integrates with CRM systems.",
    html_url: "https://github.com/Ankityadav0018/whatsapp-bot-n8n",
    homepage: "",
    language: "JavaScript",
    stargazers_count: 6,
    forks_count: 3,
    topics: ["bot", "automation", "n8n", "whatsapp"],
    updated_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: "mlflow",
    description: "Machine learning workflow implementation using MLflow for tracking experiments, packaging code, and deploying models.",
    html_url: "https://github.com/Ankityadav0018/mlflow",
    homepage: "",
    language: "Python",
    stargazers_count: 2,
    forks_count: 0,
    topics: ["machine-learning", "mlflow", "data-science"],
    updated_at: new Date().toISOString(),
  }
];

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

const repoEmojis: string[] = ["🚀", "⚡", "💡", "🛠️", "🌟", "🔥"];

function getTimeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const repos = projectsData;
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
            Featured{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            A selection of projects I have developed and deployed.
          </p>
        </motion.div>

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
                  <div className={`relative w-full h-44 overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]}`}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <Github size={32} className="text-gray-500/60" />
                      {repo.language && (
                        <span className="text-xs font-medium text-gray-400/60 uppercase tracking-wider">{repo.language}</span>
                      )}
                    </div>
                    <img
                      src={projectImages[repo.name] || `https://socialify.git.ci/${GITHUB_USERNAME}/${repo.name}/image?language=1&name=1&owner=1&theme=Dark&font=Inter`}
                      alt={repo.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 z-10"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-20" />
                  </div>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10 p-7">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        {repoEmojis.length > 0 && (
                          <motion.span
                            className="text-2xl shrink-0"
                            animate={hoveredProject === index ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
                            transition={{ duration: 0.5 }}
                          >
                            {repoEmojis[index % repoEmojis.length]}
                          </motion.span>
                        )}
                        <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                          {repo.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-gray-400 mb-4 leading-relaxed text-sm line-clamp-3 min-h-[3.75rem]">
                      {repo.description || "No description provided."}
                    </p>

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
      </div>
    </section>
  );
}
