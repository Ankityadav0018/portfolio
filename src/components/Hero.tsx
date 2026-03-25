"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowDown, Sparkles, FileText } from "lucide-react";
import Photo from "./Photo";

// Local link to your CV/Resume
const RESUME_LINK = "/resume/Ankit_cv.pdf";

const roles = [
  "Python Developer",
  "AI/ML Enthusiast",
  "Full Stack Developer",
  "Open Source Builder",
  "Problem Solver",
];

const floatingIcons: string[] = [];

function useTypewriter(words: string[], speed = 100, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(current.slice(0, text.length + 1));
          if (text.length + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pause);
          }
        } else {
          setText(current.slice(0, text.length - 1));
          if (text.length === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [text, wordIndex, isDeleting, words, speed, pause]);

  return text;
}

export default function Hero({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const typedText = useTypewriter(roles, 80, 1800);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [githubStats, setGithubStats] = useState({
    repos: 0,
    projects: 0,
    technologies: 0,
  });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch from our own API route — server-side cached, no rate limit issues
        const res = await fetch("/api/github-stats");
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        setGithubStats({
          repos: data.repos || 15,
          projects: data.projects || 15,
          technologies: data.technologies || 10,
        });
      } catch {
        // Fallback if even our own API fails
        setGithubStats({ repos: 15, projects: 15, technologies: 10 });
      }
    }
    fetchStats();
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="pointer-events-none fixed inset-0 z-30 opacity-20 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168,85,247,0.15), transparent 40%)`,
        }}
      />

      <div className="absolute inset-0 bg-gray-950">
        {/* Background glow effects removed for cleaner look */}
      </div>

      {floatingIcons.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none select-none"
          initial={{
            x: `${10 + (i * 11) % 80}vw`,
            y: `${10 + (i * 13) % 80}vh`,
            opacity: 0,
          }}
          animate={{
            y: [`${10 + (i * 13) % 80}vh`, `${5 + (i * 7) % 50}vh`, `${15 + (i * 11) % 70}vh`],
            x: [`${10 + (i * 11) % 80}vw`, `${15 + (i * 9) % 70}vw`, `${10 + (i * 11) % 80}vw`],
            opacity: [0, 0.4, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          {icon}
        </motion.div>
      ))}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-full">
            <Sparkles size={14} className="animate-spin" style={{ animationDuration: "3s" }} />
            Computer Science Undergraduate &bull; Developer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Hi, I&apos;m{" "}
          <motion.span
            className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent inline-block"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Ankit Yadav
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 mb-4 h-8"
        >
          <span className="text-purple-400">{typedText}</span>
          <span className="animate-pulse text-purple-400">|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base md:text-lg text-gray-500 mb-10 max-w-2xl mx-auto"
        >
          Building production-grade applications with Python, AI/ML,
          and modern web technologies. Focused on machine learning, NLP, and full-stack development.
        </motion.p>

        {/* Add your profile photo here */}
        <Photo 
          src="/images/profile.png"  
          alt="Ankit Yadav" 
          size="md"
          showGlow={true}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center justify-center gap-8 mb-10 flex-wrap"
        >
          {[
            { label: "Projects Built", value: githubStats.projects, suffix: "+" },
            { label: "Technologies", value: githubStats.technologies, suffix: "+" },
            { label: "GitHub Repos", value: githubStats.repos, suffix: "" },
          ].map((stat) => (
            <AnimatedCounter key={stat.label} {...stat} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168,85,247,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate?.("projects")}
            className="px-8 py-3.5 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-full transition-all duration-300"
          >
            View My Projects
          </motion.button>
          <motion.a
            href={RESUME_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-2"
          >
            <FileText size={18} />
            Resume
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05, borderColor: "rgba(168,85,247,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate?.("contact")}
            className="px-8 py-3.5 border border-gray-700 text-gray-300 font-semibold rounded-full transition-all duration-300 flex items-center gap-2"
          >
            Get In Touch
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-6"
        >
          {[
            { icon: <FaGithub size={22} />, href: "https://github.com/Ankityadav0018", label: "GitHub" },
            { icon: <FaLinkedin size={22} />, href: "https://www.linkedin.com/in/ankit-yadav01/", label: "LinkedIn" },
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              whileHover={{ scale: 1.3, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-500 hover:text-purple-400 transition-colors duration-300"
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>
      </div>


    </section>
  );
}

function AnimatedCounter({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    // Wait until we get a real value (> 0), then animate once
    if (value <= 0 || hasAnimated.current) return;
    hasAnimated.current = true;

    let current = 0;
    const duration = 1500; // 1.5 seconds total
    const steps = 30;
    const increment = value / steps;
    const intervalMs = duration / steps;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [value]);

  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -2 }}
      className="text-center cursor-default"
    >
      <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
        {count}{suffix}
      </div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </motion.div>
  );
}
