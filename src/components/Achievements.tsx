"use client";
import React from 'react';
import { motion } from 'framer-motion';

const locations = ["Imphal", "Kurukshetra", "Srinagar"];

export default function Achievements() {
  return (
    <section className="py-32 px-6 md:px-24 bg-navy-800 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 0% 100%, #6366F1 0%, transparent 40%)' }} />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-text-heading mb-6">
          Beyond <span className="text-cyan-400">Code</span>
        </h2>
        <p className="text-text-body font-light max-w-2xl mx-auto mb-16 text-lg">
          Discipline and teamwork extend beyond the editor. Proud representative at the SGFI National Level Football Championship across multiple venues.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {locations.map((loc, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="px-8 py-4 rounded-2xl bg-card-bg border border-violet-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.1)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:border-cyan-400/50 flex items-center justify-center gap-3 cursor-default"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-text-heading font-medium tracking-wide">{loc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
