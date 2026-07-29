"use client";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import TiltCard from "./ui/TiltCard";

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  link: string;
  image: string;
  skills: string[];
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Privacy and Security in Online Social Media",
    issuer: "Online Course Certification",
    date: "2025",
    link: "/certificates/privacy-and-security.pdf",
    image: "/images/certificates/privacy-and-security.png",
    skills: ["Privacy and Security", "Social Media"],
  },
  {
    id: 2,
    title: "CSE205 Certification",
    issuer: "NeoColab",
    date: "2025",
    link: "/certificates/cse205-neocolab.pdf",
    image: "/images/certificates/cse205-neocolab.png",
    skills: ["Data structure and algorith"],
  },
  {
    id: 3,
    title: "Introduction to OpenAI GPT Models",
    issuer: "Infosis",
    date: "2025",
    link: "/certificates/cert-1.pdf",
    image: "/images/certificates/cert-1.png",
    skills: ["Technical Assessment"],
  },
  {
    id: 4,
    title: "Introduction to Deep Learning",
    issuer: "Infosis",
    date: "2025",
    link: "/certificates/cert-2.pdf",
    image: "/images/certificates/cert-2.png",
    skills: ["Technical Assessment"],
  },
  {
    id: 5,
    title: "Introduction to Natural Language Processing",
    issuer: "Infosis",
    date: "2025",
    link: "/certificates/cert-3.pdf",
    image: "/images/certificates/cert-3.png",
    skills: ["Technical Assessment"],
  },
  {
    id: 6,
    title: "Prompt Engineering",
    issuer: "Infosis",
    date: "2025",
    link: "/certificates/cert-4.pdf",
    image: "/images/certificates/cert-4.png",
    skills: ["Technical Assessment"],
  }
];

function CertificateCard({ cert, index, isInView }: { cert: Certificate; index: number; isInView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
      className="h-full"
    >
      <TiltCard depth={20} className="h-full">
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 overflow-hidden transition-all duration-500 cursor-pointer h-full flex flex-col group shadow-xl hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
        >
          {/* 3D content wrapper */}
          <div style={{ transform: "translateZ(40px)" }} className="flex-1 flex flex-col h-full relative z-10 w-full">
            {/* Certificate Image Preview */}
            <div className="relative w-full h-48 overflow-hidden bg-white/5 border-b border-white/10">
              <motion.img
                src={cert.image}
                alt={cert.title}
                className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                animate={{ 
                  scale: hovered ? 1.05 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-transparent z-20 pointer-events-none" />
            </div>

            {/* Hover glow inside card */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />

            <div className="relative z-30 p-7 -mt-16 flex-1 flex flex-col">
              {/* Issuer Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full mb-5 shadow-xl self-start backdrop-blur-md">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span className="text-xs font-semibold text-gray-200 tracking-wide uppercase">{cert.issuer}</span>
              </div>

              <div className="flex items-start justify-between mb-4">
                <h3 className={`text-xl font-bold leading-snug transition-colors duration-300 ${hovered ? "text-purple-300" : "text-white"}`}>
                  {cert.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2 mb-6 flex-1">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-[11px] font-medium text-purple-300/90 bg-white/5 border border-white/10 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-white/10 mt-auto" style={{ transform: "translateZ(20px)" }}>
                <span className="flex items-center gap-1.5 text-xs font-bold text-gray-300">
                  <Calendar size={14} />
                  {cert.date}
                </span>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="group/link flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-all bg-white/5 px-4 py-2 rounded-lg border border-white/10 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/10"
                >
                  Open PDF <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function Certificates() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certificates" className="relative py-28 bg-transparent overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-bold text-purple-400 uppercase tracking-[0.2em]">
            Achievements
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mt-4 mb-6 tracking-tight">
            Licenses &{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
              Certifications
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Professional qualifications and completed courses validating my technical expertise and continuous learning journey.
          </p>
        </motion.div>

        <div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ perspective: "2000px" }}
        >
          {certificates.map((cert, index) => (
            <div key={cert.id} className="h-full">
              <CertificateCard cert={cert} index={index} isInView={isInView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
