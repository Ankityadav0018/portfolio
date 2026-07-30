"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';

const NeuralMeshBackground = dynamic(() => import('./3d/NeuralMeshBackground'), { ssr: false });
const AbstractDataSphere = dynamic(() => import('./3d/AbstractDataSphere'), { ssr: false });

export default function Hero() {
  return (
    <section id="hero" className="relative w-full h-screen flex items-center justify-between px-6 md:px-24 overflow-hidden bg-navy-900">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
          <ambientLight intensity={0.2} />
          <NeuralMeshBackground />
        </Canvas>
      </div>
      
      {/* 3D Hero Object */}
      <div className="absolute right-[-10%] md:right-10 top-1/2 -translate-y-1/2 w-full max-w-lg aspect-square z-10 hidden lg:block opacity-80 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 10, 10]} intensity={2} />
          <AbstractDataSphere />
        </Canvas>
      </div>

      <div className="relative z-20 flex flex-col items-start space-y-6 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-cyan-400 text-sm font-medium tracking-wide shadow-[0_0_15px_rgba(34,211,238,0.1)]"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22D3EE]" />
          <span>System Online</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-text-heading leading-tight"
        >
          Engineering <span className="bg-clip-text text-transparent bg-accent-gradient drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]">Intelligence</span><br />
          Into Reality
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-text-body font-light max-w-2xl"
        >
          I&apos;m an AI/ML Engineer & B.Tech CSE student specializing in predictive modeling, computer vision, and scalable full-stack architectures.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 pt-4"
        >
          <a href="#projects" className="group relative px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-lg overflow-hidden transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)]">
            <span className="relative z-10 flex items-center gap-2">
              View Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          
          <a href="/resume/GeneralCVAnkit.pdf" download="Ankit_Yadav_Resume.pdf" target="_blank" rel="noopener noreferrer" className="group px-8 py-4 bg-card-bg border border-card-border hover:border-violet-500/50 hover:bg-violet-500/10 text-text-heading font-medium rounded-lg transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md">
            Download Resume <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
