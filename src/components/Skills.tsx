"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  FaNodeJs, FaPython, FaGitAlt, FaDocker, FaHtml5, FaCss3Alt, FaJava,
} from "react-icons/fa";
import {
  SiJavascript, SiTailwindcss,
  SiMongodb, SiPostgresql, SiFirebase,
  SiExpress, SiVercel, SiDjango, SiFastapi, SiStreamlit,
  SiMlflow, SiLangchain, SiFlask, SiN8N,
} from "react-icons/si";

const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: <FaPython />, level: 90, color: "#3776AB" },
      { name: "JavaScript", icon: <SiJavascript />, level: 75, color: "#F7DF1E" },
      { name: "Java", icon: <FaJava />, level: 60, color: "#ED8B00" },
      { name: "HTML5", icon: <FaHtml5 />, level: 90, color: "#E34F26" },
      { name: "CSS3", icon: <FaCss3Alt />, level: 80, color: "#1572B6" },
    ],
  },
  {
    title: "AI/ML & Data",
    skills: [
      { name: "MLflow", icon: <SiMlflow />, level: 75, color: "#0194E2" },
      { name: "LangChain", icon: <SiLangchain />, level: 70, color: "#1C3C3C" },
      { name: "Streamlit", icon: <SiStreamlit />, level: 75, color: "#FF4B4B" },
      { name: "Flask", icon: <SiFlask />, level: 65, color: "#ffffff" },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "FastAPI", icon: <SiFastapi />, level: 80, color: "#009688" },
      { name: "Django", icon: <SiDjango />, level: 75, color: "#092E20" },
      { name: "Node.js", icon: <FaNodeJs />, level: 70, color: "#339933" },
      { name: "Express", icon: <SiExpress />, level: 65, color: "#ffffff" },
      { name: "MongoDB", icon: <SiMongodb />, level: 70, color: "#47A248" },
      { name: "PostgreSQL", icon: <SiPostgresql />, level: 55, color: "#4169E1" },
      { name: "Firebase", icon: <SiFirebase />, level: 60, color: "#FFCA28" },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", icon: <FaGitAlt />, level: 80, color: "#F05032" },
      { name: "Docker", icon: <FaDocker />, level: 45, color: "#2496ED" },
      { name: "n8n", icon: <SiN8N />, level: 55, color: "#EA4B71" },
      { name: "Vercel", icon: <SiVercel />, level: 70, color: "#ffffff" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 65, color: "#06B6D4" },
    ],
  },
];

function SkillCard({ skill, delay, isInView }: { skill: typeof skillCategories[0]["skills"][0]; delay: number; isInView: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col items-center gap-3 p-5 rounded-xl bg-gray-900/80 border border-gray-800 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 cursor-default overflow-hidden"
    >
      {/* Animated background fill on hover */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-500/10 to-transparent"
        initial={{ height: "0%" }}
        animate={{ height: isHovered ? `${skill.level}%` : "0%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-3">
        <motion.span
          className="text-3xl transition-colors duration-300"
          style={{ color: isHovered ? skill.color : undefined }}
          animate={isHovered ? { rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {skill.icon}
        </motion.span>
        <span className="text-sm text-gray-400 group-hover:text-white transition-colors font-medium">
          {skill.name}
        </span>

        {/* Proficiency indicator */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={isHovered ? { opacity: 1, width: "100%" } : { opacity: 0, width: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${skill.color}, rgba(168,85,247,0.8))` }}
              initial={{ width: "0%" }}
              animate={isHovered ? { width: `${skill.level}%` } : { width: "0%" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
          </div>
          <motion.span
            className="text-[10px] text-gray-500 mt-1 block text-center"
            initial={{ opacity: 0 }}
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          >
            {skill.level}%
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-24 bg-gray-900/50">
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-purple-400 uppercase tracking-widest">
            Skills
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-6">
            My{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              tech toolkit
            </span>{" "}
            🧰
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Hover over each skill to see my proficiency level. Always learning, always growing!
          </p>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + catIdx * 0.15 }}
            >
              <h3 className="text-lg font-semibold text-gray-300 mb-5 flex items-center gap-2">
                <span className="w-8 h-px bg-gradient-to-r from-purple-500 to-transparent" />
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {category.skills.map((skill, idx) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    delay={0.3 + catIdx * 0.1 + idx * 0.05}
                    isInView={isInView}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
