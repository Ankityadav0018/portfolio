"use client";
import React from 'react';
import TiltCard from './ui/TiltCard';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: "Campus Management System",
    type: "TypeScript",
    description: "A comprehensive campus management system to handle student records, faculty information, and administrative tasks efficiently.",
    metrics: "3 Stars",
    tech: ["TypeScript", "Management-System", "Campus"],
    github: "https://github.com/Ankityadav0018/Campus-Management-System",
    demo: "#"
  },
  {
    title: "Booking System",
    type: "JavaScript",
    description: "An advanced booking system application allowing users to reserve slots, manage appointments, and handle payments seamlessly.",
    metrics: "2 Stars",
    tech: ["JavaScript", "Booking", "Reservation"],
    github: "https://github.com/Ankityadav0018/Booking-system",
    demo: "#"
  },
  {
    title: "FastAPI",
    type: "Python",
    description: "High-performance API built using FastAPI, showcasing asynchronous request handling, database integration, and robust validation.",
    metrics: "4 Stars",
    tech: ["FastAPI", "Python", "Backend"],
    github: "https://github.com/Ankityadav0018/FastApi",
    demo: "#"
  },
  {
    title: "WhatsApp Bot (n8n)",
    type: "JavaScript",
    description: "Automated WhatsApp bot powered by n8n workflows. Handles customer inquiries, sends notifications, and integrates with CRM systems.",
    metrics: "6 Stars",
    tech: ["Bot", "Automation", "n8n", "WhatsApp"],
    github: "https://github.com/Ankityadav0018/whatsapp-bot-n8n",
    demo: "#"
  },
  {
    title: "MLflow",
    type: "Python",
    description: "Machine learning workflow implementation using MLflow for tracking experiments, packaging code, and deploying models.",
    metrics: "2 Stars",
    tech: ["Machine-Learning", "MLflow", "Data-Science"],
    github: "https://github.com/Ankityadav0018/mlflow",
    demo: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6 md:px-24 bg-navy-800 border-y border-white/5">
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
