"use client";
import React from 'react';
import TiltCard from './ui/TiltCard';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: "Traffic Demand Prediction",
    type: "Machine Learning Flagship",
    description: "Developed a LightGBM model utilizing geohash and timestamp features for high-accuracy traffic prediction. Implemented hierarchical fallback encoding for cold-start scenarios and lag features to exploit high autocorrelation.",
    metrics: "Reduced MAPE by 15% compared to baseline",
    tech: ["Python", "LightGBM", "Pandas", "Geohash", "Scikit-Learn"],
    github: "#",
    demo: "#"
  },
  {
    title: "KaamKaaz (Antigravity)",
    type: "Full-Stack Architecture",
    description: "Hyperlocal daily-wage worker platform featuring 14-language support and distance-based job filtering. Built scalable microservice-like backend with real-time sockets and robust background job processing.",
    metrics: "Handles 1000+ concurrent connections",
    tech: ["Flutter", "Node.js", "MongoDB", "Redis", "BullMQ", "Socket.io"],
    github: "#",
    demo: "#"
  },
  {
    title: "Predictive Maintenance System",
    type: "Infosys Internship",
    description: "AI plant diagnosis system identifying potential equipment failures before they occur. Processed large-scale industrial IoT data streams for real-time anomaly detection.",
    metrics: "92% Anomaly Detection Accuracy",
    tech: ["PyTorch", "IoT", "Time-Series Analysis", "Python"],
    github: "#",
    demo: "#"
  }
];

export default function Projects() {
  return (
    <section className="relative py-32 px-6 md:px-24 bg-navy-800 border-y border-white/5">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 100% 100%, #22D3EE 10%, transparent 50%)' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-text-heading mb-16">
          Featured <span className="text-cyan-400">Implementations</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <TiltCard key={idx} className="h-full">
              <div className="bg-navy-900 border border-card-border rounded-2xl p-8 h-full flex flex-col justify-between group-hover:border-violet-500/30 transition-colors duration-300">
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-violet-500 bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">
                      {proj.type}
                    </span>
                    <div className="flex gap-3">
                      <a href={proj.github} className="text-text-body hover:text-cyan-400 transition-colors"><FaGithub size={20} /></a>
                      <a href={proj.demo} className="text-text-body hover:text-cyan-400 transition-colors"><ExternalLink size={20} /></a>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-text-heading mb-4">{proj.title}</h3>
                  <p className="text-text-body font-light text-sm leading-relaxed mb-6">
                    {proj.description}
                  </p>
                  
                  <div className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-lg border border-cyan-400/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    {proj.metrics}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="text-xs font-medium text-text-body bg-navy-800 px-2 py-1 rounded border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
