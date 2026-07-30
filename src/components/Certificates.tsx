"use client";
import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from './ui/TiltCard';
import { ExternalLink, Calendar, CheckCircle2 } from "lucide-react";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  link: string;
  skills: string[];
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Privacy and Security in Online Social Media",
    issuer: "Online Course Certification",
    date: "2025",
    link: "/certificates/privacy-and-security.pdf",
    skills: ["Privacy and Security", "Social Media"],
  },
  {
    id: 2,
    title: "CSE205 Certification",
    issuer: "NeoColab",
    date: "2025",
    link: "/certificates/cse205-neocolab.pdf",
    skills: ["Data structure and algorith"],
  },
  {
    id: 3,
    title: "Introduction to OpenAI GPT Models",
    issuer: "Infosys",
    date: "2025",
    link: "/certificates/cert-1.pdf",
    skills: ["Technical Assessment"],
  },
  {
    id: 4,
    title: "Introduction to Deep Learning",
    issuer: "Infosys",
    date: "2025",
    link: "/certificates/cert-2.pdf",
    skills: ["Technical Assessment"],
  },
  {
    id: 5,
    title: "Introduction to Natural Language Processing",
    issuer: "Infosys",
    date: "2025",
    link: "/certificates/cert-3.pdf",
    skills: ["Technical Assessment"],
  },
  {
    id: 6,
    title: "Prompt Engineering",
    issuer: "Infosys",
    date: "2025",
    link: "/certificates/cert-4.pdf",
    skills: ["Technical Assessment"],
  },
  {
    id: 7,
    title: "AI Certification",
    issuer: "Certification",
    date: "2025",
    link: "/certificates/ai certificate.pdf",
    skills: ["Artificial Intelligence"],
  },
  {
    id: 8,
    title: "Database Management Systems (DBMS)",
    issuer: "Certification",
    date: "2025",
    link: "/certificates/dbms.pdf",
    skills: ["Databases", "SQL"],
  },
  {
    id: 9,
    title: "Specialized Certification",
    issuer: "Certification",
    date: "2025",
    link: "/certificates/83e35f0a-a7d2-4887-8542-06f86f6a11fa.pdf",
    skills: ["Technical Achievement"],
  }
];

export default function Certificates() {
  return (
    <section className="py-32 px-6 md:px-24 bg-navy-800 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 0% 100%, #6366F1 0%, transparent 40%)' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-heading mb-6">
            Licenses & <span className="text-cyan-400">Certifications</span>
          </h2>
          <p className="text-text-body font-light max-w-2xl mx-auto text-lg">
            Professional qualifications and completed courses validating my technical expertise and continuous learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <TiltCard key={cert.id} className="h-full">
              <div className="bg-navy-900 border border-card-border rounded-2xl p-8 h-full flex flex-col group-hover:border-violet-500/30 transition-colors duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-5 shadow-sm self-start">
                  <CheckCircle2 size={13} className="text-cyan-400" />
                  <span className="text-xs font-semibold text-text-heading tracking-wide uppercase">{cert.issuer}</span>
                </div>
                
                <h3 className="text-xl font-bold text-text-heading mb-4 flex-1">{cert.title}</h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {cert.skills.map((skill, i) => (
                    <span key={i} className="px-2 py-1 text-[11px] font-medium text-text-body bg-navy-800 border border-white/5 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-5 border-t border-white/5">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-text-body">
                    <Calendar size={14} />
                    {cert.date}
                  </span>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-all bg-cyan-400/5 px-4 py-2 rounded-lg border border-cyan-400/20 hover:bg-cyan-400/10 hover:border-cyan-400/50"
                  >
                    Open PDF <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
