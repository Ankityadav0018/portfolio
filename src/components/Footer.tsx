"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-12 bg-transparent border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back to top */}
        <div className="flex justify-center mb-8">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -4, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-500 hover:text-purple-400 hover:border-purple-500/30 transition-all"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent cursor-default"
          >
            AY
          </motion.div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Designed & developed by Ankit Yadav &copy; {new Date().getFullYear()}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-5">
            {[
              { icon: <FaGithub size={18} />, href: "https://github.com/Ankityadav0018", label: "GitHub" },
              { icon: <FaLinkedin size={18} />, href: "https://www.linkedin.com/in/ankit-yadav01/", label: "LinkedIn" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                whileHover={{ scale: 1.3, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 hover:text-purple-400 transition-colors duration-300"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
