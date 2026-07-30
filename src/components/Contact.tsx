"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Mail, ArrowUp } from 'lucide-react';
import { Canvas } from '@react-three/fiber';

const NeuralMeshBackground = dynamic(() => import('./3d/NeuralMeshBackground'), { ssr: false });

export default function Contact() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="relative py-32 px-6 md:px-24 bg-navy-900 overflow-hidden flex flex-col items-center">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <NeuralMeshBackground />
        </Canvas>
      </div>

      <div className="relative z-10 w-full max-w-2xl bg-card-bg border border-card-border backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(99,102,241,0.1)]">
        <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-2 text-center">
          Initialize <span className="text-violet-500">Connection</span>
        </h2>
        <p className="text-text-body text-center mb-8 font-light">
          Open to roles in AI/ML Engineering and Full-Stack Development.
        </p>
        
        <form className="flex flex-col gap-4" onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as HTMLFormElement;
          const name = (target.elements[0] as HTMLInputElement).value;
          const body = (target.elements[2] as HTMLTextAreaElement).value;
          window.location.href = `mailto:ankitrao0018@gmail.com?subject=Portfolio Contact from ${name}&body=${body}`;
        }}>
          <input 
            type="text" 
            placeholder="Name" 
            required
            className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-text-heading placeholder-text-body focus:outline-none focus:border-cyan-400 transition-colors"
          />
          <input 
            type="email" 
            placeholder="Email" 
            required
            className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-text-heading placeholder-text-body focus:outline-none focus:border-cyan-400 transition-colors"
          />
          <textarea 
            placeholder="Message Payload" 
            rows={4}
            required
            className="w-full bg-navy-800 border border-white/10 rounded-lg px-4 py-3 text-text-heading placeholder-text-body focus:outline-none focus:border-cyan-400 transition-colors resize-none"
          />
          <button 
            type="submit" 
            className="w-full py-4 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]"
          >
            Transmit Data
          </button>
        </form>

        <div className="flex justify-center gap-6 mt-12">
          <a href="https://github.com/Ankityadav0018" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-navy-800 border border-white/5 text-text-body hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300">
            <FaGithub size={24} />
          </a>
          <a href="https://www.linkedin.com/in/ankit-yadav01/" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-navy-800 border border-white/5 text-text-body hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300">
            <FaLinkedin size={24} />
          </a>
          <a href="mailto:ankitrao0018@gmail.com" className="p-3 rounded-full bg-navy-800 border border-white/5 text-text-body hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300">
            <Mail size={24} />
          </a>
        </div>
      </div>

      <button 
        onClick={scrollToTop}
        className="mt-16 relative z-10 flex flex-col items-center gap-2 text-text-body hover:text-cyan-400 transition-colors group"
      >
        <div className="p-3 rounded-full border border-white/10 group-hover:border-cyan-400/50 bg-card-bg">
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </div>
        <span className="text-xs uppercase tracking-widest font-mono">Return 0</span>
      </button>
    </section>
  );
}
