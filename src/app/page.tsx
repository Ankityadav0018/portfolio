"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const pages = [
  { id: "home", name: "Home", component: Hero },
  { id: "about", name: "About", component: About },
  { id: "skills", name: "Skills", component: Skills },
  { id: "projects", name: "Projects", component: Projects },
  { id: "journey", name: "Journey", component: Experience },
  { id: "contact", name: "Contact", component: Contact },
];

export default function Home() {
  const [activePage, setActivePage] = useState("home");

  const CurrentComponent = pages.find((p) => p.id === activePage)?.component || Hero;

  return (
    <>
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
