"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 0"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [100, 0, 0, -100]);

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-24 bg-navy-800 border-y border-white/5">
      {/* Decorative scatter dots/grid */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #6366F1 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <motion.div 
        style={{ opacity, y }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center space-y-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-text-heading">
          Bridging <span className="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Data</span> & <span className="text-violet-500 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]">Architecture</span>
        </h2>
        
        <p className="text-xl text-text-body font-light leading-relaxed">
          I am driven by the challenge of transforming raw data into actionable intelligence. 
          My focus lies at the intersection of Machine Learning and Full-Stack Engineering — building 
          robust predictive models (LightGBM, PyTorch) and deploying them within scalable, 
          high-performance architectures (Node.js, Flutter, Redis).
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-12">
          {[
            { label: "Models Trained", value: "50+" },
            { label: "Projects Shipped", value: "12" },
            { label: "Global Rank", value: "Top 5%" }
          ].map((stat, i) => (
            <div key={i} className="p-8 rounded-2xl bg-card-bg border border-card-border backdrop-blur-md flex flex-col items-center justify-center space-y-3 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300">
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-accent-gradient">{stat.value}</span>
              <span className="text-text-body text-sm uppercase tracking-wider font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
