"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('Home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple scroll spy logic
      const sections = navLinks.map(link => document.querySelector(link.href) as HTMLElement);
      let currentSection = 'Home';
      
      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 200) {
            currentSection = navLinks.find(l => l.href === `#${section.id}`)?.name || 'Home';
          }
        }
      });
      
      setActive(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-6 transition-all duration-300 ${scrolled ? 'pt-4' : 'pt-6'}`}
    >
      <nav className="flex items-center gap-1 md:gap-2 px-4 py-3 bg-navy-900/50 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setActive(link.name)}
            className="relative px-4 py-2 text-sm font-medium transition-colors hidden md:block group"
          >
            <span className={`relative z-10 ${active === link.name ? 'text-white' : 'text-text-body group-hover:text-cyan-400'}`}>
              {link.name}
            </span>
            {active === link.name && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-white/10 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </a>
        ))}
        
        {/* Mobile only minimal nav (just contact) */}
        <div className="md:hidden flex gap-2">
           <a
            href="#contact"
            className="relative px-6 py-2 text-sm font-medium text-white bg-violet-600 rounded-full"
          >
            Connect
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
