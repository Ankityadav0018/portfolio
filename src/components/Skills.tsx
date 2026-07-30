"use client";
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';

const MLSkillOrbit = dynamic(() => import('./3d/MLSkillOrbit'), { ssr: false });

const categories = [
  {
    title: "AI / Machine Learning",
    skills: ["Python", "LightGBM", "PyTorch", "TensorFlow", "Feature Engineering", "Computer Vision (SIFT, ORB, HOG)", "NLP", "Model Evaluation"]
  },
  {
    title: "Full-Stack Development",
    skills: ["Flutter", "Dart", "Node.js", "Express", "MongoDB", "React", "Next.js", "TypeScript"]
  },
  {
    title: "Infrastructure & Tools",
    skills: ["Firebase", "Supabase", "Redis", "BullMQ", "Socket.io", "Cloudinary", "Docker", "Git"]
  }
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-32 px-6 md:px-24 bg-navy-900 min-h-screen flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden">
      <div className="w-full md:w-1/2 relative z-20" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-text-heading mb-12">
            Architecture <span className="text-violet-500">&</span> Stack
          </h2>
          
          <div className="space-y-12">
            {categories.map((cat, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-xl font-semibold text-cyan-400 tracking-wide">{cat.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {cat.skills.map((skill, j) => (
                    <span 
                      key={j} 
                      className="px-4 py-2 rounded-lg bg-card-bg border border-card-border text-text-body text-sm hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-white hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-300 backdrop-blur-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="w-full md:w-1/2 h-[500px] md:h-[800px] relative z-10 opacity-80 pointer-events-none">
        <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <MLSkillOrbit />
        </Canvas>
      </div>
    </section>
  );
}
