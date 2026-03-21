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
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative flex flex-col items-center justify-center gap-4 p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-gray-800/50 hover:border-purple-500/80 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 cursor-default overflow-hidden min-h-[200px]"
    >
      {/* Animated gradient background on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-cyan-500/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Particle effect circles */}
      {isHovered && (
        <>
          <motion.div
            className="absolute w-20 h-20 rounded-full border border-purple-400/30 top-1/2 left-1/2"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ x: "-50%", y: "-50%" }}
          />
          <motion.div
            className="absolute w-32 h-32 rounded-full border border-cyan-400/20 top-1/2 left-1/2"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
            style={{ x: "-50%", y: "-50%" }}
          />
        </>
      )}

      {/* Floating particles */}
      {isHovered && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-purple-400"
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
              }}
              animate={{
                x: Math.cos((i / 5) * Math.PI * 2) * 60,
                y: Math.sin((i / 5) * Math.PI * 2) * 60,
                opacity: 0,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      <div className="relative z-10 flex flex-col items-center gap-4 w-full">
        {/* Large Interactive Icon */}
        <motion.div
          className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-900/50 border border-gray-700/50 group-hover:border-purple-400/60 group-hover:from-gray-700/80 group-hover:to-purple-900/30 transition-all duration-300 shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-500/30"
          animate={isHovered ? { 
            scale: [1, 1.15, 1.1],
            rotateZ: [0, -5, 5, 0]
          } : { 
            scale: 1,
            rotateZ: 0
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.span
            className="text-5xl transition-colors duration-300 drop-shadow-lg"
            style={{ color: isHovered ? skill.color : '#9CA3AF' }}
            animate={isHovered ? {
              textShadow: `0 0 20px ${skill.color}40, 0 0 40px ${skill.color}20`
            } : {
              textShadow: "0 0 0px transparent"
            }}
          >
            {skill.icon}
          </motion.span>

          {/* Glow ring on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-2xl border-2"
              style={{ borderColor: skill.color }}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.3, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          )}
        </motion.div>

        {/* Skill Name */}
        <motion.span 
          className="text-sm font-bold text-gray-300 group-hover:text-white transition-colors text-center tracking-wide"
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {skill.name}
        </motion.span>

        {/* Proficiency Level - Always Visible */}
        <div className="w-full mt-2">
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: delay + 0.2 }}
            />
          </div>
          {/* Percentage Text */}
          <p className="text-center text-xs font-semibold text-purple-400">
            {skill.level}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-24 bg-gray-950">
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
            Technical{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              proficiencies
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            A comprehensive overview of my technical skills and proficiency levels.
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
              <h3 className="text-lg font-semibold text-gray-200 mb-5 flex items-center gap-2">
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
