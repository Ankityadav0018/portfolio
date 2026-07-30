"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const experiences = [
  {
    title: "3rd Year — Building & Shipping",
    company: "LPU",
    date: "2025 - Present",
    desc: "Diving deep into AI/ML and full-stack development. Built RAG-based chatbots, GPT-2 fine-tuning, MLflow pipelines, and production-ready web apps."
  },
  {
    title: "2nd Year — Leveling Up",
    company: "LPU",
    date: "2024 - 2025",
    desc: "Built multiple projects from scratch — room booking systems, campus management with face recognition, mental health prediction apps."
  },
  {
    title: "1st Year — The Beginning",
    company: "LPU",
    date: "2023 - 2024",
    desc: "Started coding with HTML, CSS, and JavaScript. Built initial web projects, discovered Python, and developed a deep interest in programming."
  }
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-6 md:px-24 bg-navy-900 relative">
      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        <h2 className="text-4xl md:text-5xl font-bold text-text-heading mb-16">
          Career <span className="text-violet-500">Trajectory</span>
        </h2>
        
        <div className="relative border-l border-violet-500/30 pl-8 space-y-12">
          {/* Animated line */}
          <motion.div 
            initial={{ height: 0 }}
            animate={isInView ? { height: '100%' } : { height: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 left-[-1px] w-[2px] bg-accent-gradient origin-top shadow-[0_0_10px_#8B5CF6]"
          />

          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: idx * 0.2 + 0.5 }}
              className="relative"
            >
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-navy-900 border-2 border-cyan-400 shadow-[0_0_10px_#22D3EE]" />
              
              <div className="bg-card-bg border border-card-border p-6 rounded-2xl hover:border-violet-500/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.1)] transition-all duration-300 backdrop-blur-sm">
                <span className="text-cyan-400 font-mono text-sm mb-2 block">{exp.date}</span>
                <h3 className="text-2xl font-bold text-text-heading">{exp.title}</h3>
                <h4 className="text-violet-400 text-lg mb-4">{exp.company}</h4>
                <p className="text-text-body font-light leading-relaxed">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
