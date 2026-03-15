"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { GraduationCap, Calendar, Trophy, Star, Zap, Target } from "lucide-react";

const journey = [
  {
    title: "3rd Year — Building & Shipping",
    place: "LPU",
    period: "2025 – Present",
    description:
      "Diving deep into AI/ML and full-stack development. Built RAG-based chatbots, GPT-2 fine-tuning, MLflow pipelines, and production-ready web apps. Exploring NLP, computer vision, and deploying ML models.",
    tags: ["Python", "FastAPI", "AI/ML", "LangChain", "MLflow"],
    icon: <Zap size={18} />,
    highlight: true,
  },
  {
    title: "2nd Year — Leveling Up",
    place: "LPU",
    period: "2024 – 2025",
    description:
      "Built multiple projects from scratch — room booking systems, campus management with face recognition, mental health prediction apps. Learned Django, Node.js, MongoDB, and started exploring machine learning.",
    tags: ["Django", "Node.js", "MongoDB", "EJS"],
    icon: <Target size={18} />,
    highlight: false,
  },
  {
    title: "1st Year — The Beginning",
    place: "LPU",
    period: "2023 – 2024",
    description:
      "Started my coding journey with HTML, CSS, and JavaScript. Built my first websites, discovered Python, and fell in love with programming. The spark that started it all! ⚡",
    tags: ["HTML/CSS", "JavaScript", "Python", "Git"],
    icon: <Star size={18} />,
    highlight: false,
  },
];

const achievements = [
  { emoji: "🚀", title: "15+ Projects", detail: "Built & shipped on GitHub" },
  { emoji: "🤖", title: "AI/ML Projects", detail: "RAG, GPT-2, MLflow pipelines" },
  { emoji: "🐍", title: "Python Focused", detail: "Primary language across repos" },
  { emoji: "🌐", title: "Full Stack Apps", detail: "Django, FastAPI, Node.js" },
  { emoji: "📜", title: "Certifications", detail: "Java, DSA" },
  { emoji: "🎯", title: "Problem Solver", detail: "DSA & algorithmic thinking" },
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredAchievement, setHoveredAchievement] = useState<number | null>(null);

  return (
    <section id="experience" className="relative py-24 bg-gray-900/50">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-purple-400 uppercase tracking-widest">
            Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              learning path
            </span>{" "}
            🎓
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            No job experience yet — but a journey full of building, learning, and growing every single day.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-20">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-cyan-500/50 to-transparent hidden md:block" />

          <div className="space-y-8">
            {journey.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                className="relative md:pl-20"
              >
                {/* Timeline dot */}
                <div className={`absolute left-6 top-8 w-5 h-5 rounded-full border-2 hidden md:flex items-center justify-center ${
                  item.highlight
                    ? "bg-purple-500/20 border-purple-400 shadow-lg shadow-purple-500/20"
                    : "bg-gray-950 border-purple-500"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${item.highlight ? "bg-purple-400 animate-pulse" : "bg-purple-400"}`} />
                </div>

                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`group p-8 rounded-2xl border transition-all duration-500 hover:shadow-lg cursor-default ${
                    item.highlight
                      ? "bg-gradient-to-br from-gray-900/80 to-purple-950/20 border-purple-500/30 hover:border-purple-400/50 hover:shadow-purple-500/10"
                      : "bg-gray-900/80 border-gray-800 hover:border-purple-500/30 hover:shadow-purple-500/5"
                  }`}
                >
                  {item.highlight && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 mb-4 text-[10px] font-semibold text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                      Current
                    </span>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                        {item.icon}
                        {item.title}
                      </h3>
                      <p className="text-purple-400 font-medium flex items-center gap-2 mt-1">
                        <GraduationCap size={16} />
                        {item.place}
                      </p>
                    </div>
                    <span className="flex items-center gap-2 text-sm text-gray-500 whitespace-nowrap">
                      <Calendar size={14} />
                      {item.period}
                    </span>
                  </div>

                  <p className="text-gray-400 leading-relaxed mb-4">{item.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-2">
            <Trophy size={24} className="text-yellow-400" />
            Achievements & Highlights
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.08 }}
                whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.2 } }}
                onHoverStart={() => setHoveredAchievement(index)}
                onHoverEnd={() => setHoveredAchievement(null)}
                className="group relative p-5 rounded-xl bg-gray-900/60 border border-gray-800 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 cursor-default text-center overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredAchievement === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative z-10">
                  <motion.span
                    className="text-3xl block mb-2"
                    animate={hoveredAchievement === index ? { scale: [1, 1.4, 1], rotate: [0, -15, 15, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {item.emoji}
                  </motion.span>
                  <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">{item.title}</h4>
                  <p className="text-xs text-gray-500">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
