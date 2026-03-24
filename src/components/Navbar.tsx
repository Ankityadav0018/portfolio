"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const RESUME_LINK = "https://drive.google.com/file/d/1tB3srkwsHWvaQfp2DnECAwMJjBLg2jAq/view?usp=drive_link";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Journey", id: "journey" },
  { name: "Certificates", id: "certificates" },
  { name: "Contact", id: "contact" },
  { name: "Resume", href: RESUME_LINK, external: true },
];

export default function Navbar({ 
  activePage, 
  setActivePage 
}: { 
  activePage: string; 
  setActivePage: (page: string) => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", handleScroll);
  }

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-950/80 backdrop-blur-lg shadow-lg shadow-purple-500/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.button
          onClick={() => handleNavClick("home")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
        >
          AY
        </motion.button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <button
                  onClick={() => handleNavClick(link.id!)}
                  className={`text-sm font-medium relative group transition-colors ${
                    activePage === link.id
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all ${
                      activePage === link.id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <motion.button
          className="md:hidden text-gray-300"
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-950/95 backdrop-blur-lg border-t border-gray-800"
          >
            <ul className="flex flex-col items-center gap-4 py-6">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <button
                      onClick={() => handleNavClick(link.id!)}
                      className={`text-base font-medium transition-colors ${
                        activePage === link.id
                          ? "text-purple-400"
                          : "text-gray-300 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </button>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
