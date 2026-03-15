"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Code2, Palette, Rocket, GraduationCap, BookOpen, Trophy } from "lucide-react";

const highlights = [
  {
    icon: <Code2 size={28} />,
    title: "Builder",
    description: "Love turning ideas into real products. From AI chatbots to booking systems and ML pipelines — I ship things.",
    emoji: "🛠️",
  },
  {
    icon: <Palette size={28} />,
    title: "AI/ML Explorer",
    description: "Passionate about machine learning, NLP, and RAG systems. Built GPT-2 fine-tuning, MLflow pipelines, and AI-powered apps.",
    emoji: "🤖",
  },
  {
    icon: <Rocket size={28} />,
    title: "Fast Learner",
    description: "Picked up Python, FastAPI, Django, and ML frameworks through self-learning and building real-world projects.",
    emoji: "⚡",
  },
];

const quickFacts = [
  { icon: <GraduationCap size={18} />, text: "3rd Year @ LPU" },
  { icon: <BookOpen size={18} />, text: "Self-taught Developer" },
  { icon: <Trophy size={18} />, text: "15+ GitHub Projects" },
  { icon: <Code2 size={18} />, text: "Python & AI/ML Focused" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="about" className="relative py-24 bg-gray-950">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-purple-400 uppercase tracking-widest">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            A student who{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              loves to build
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          I’m a Computer Science student passionate about AI, Machine Learning, 
          and modern web technologies. I enjoy building projects that combine data, algorithms, 
          and user-friendly interfaces. Through hands-on development and continuous learning, 
          I aim to create innovative solutions and grow as a developer. For me, every project is 
          an opportunity to learn, experiment, and improve. 🚀
          </p>
        </motion.div>

        {/* Quick facts pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-14"
        >
          {quickFacts.map((fact, i) => (
            <motion.span
              key={fact.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-300 bg-gray-900/60 border border-gray-800 rounded-full hover:border-purple-500/30 hover:text-purple-300 transition-all cursor-default"
            >
              <span className="text-purple-400">{fact.icon}</span>
              {fact.text}
            </motion.span>
          ))}
        </motion.div>

        {/* Interactive highlight cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-purple-500/30 transition-all duration-500 hover:shadow-lg hover:shadow-purple-500/10 cursor-default overflow-hidden"
            >
              {/* Background glow on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCard === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <motion.span
                    className="text-3xl"
                    animate={hoveredCard === index ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    {item.emoji}
                  </motion.span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-300 transition-colors">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
