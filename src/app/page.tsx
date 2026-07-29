"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import HeroCanvas from "@/components/3d/HeroCanvas";

const pages = [
  { id: "home", name: "Home", component: Hero },
  { id: "about", name: "About", component: About },
  { id: "skills", name: "Skills", component: Skills },
  { id: "projects", name: "Projects", component: Projects },
  { id: "journey", name: "Journey", component: Experience },
  { id: "certificates", name: "Certificates", component: Certificates },
  { id: "contact", name: "Contact", component: Contact },
];

export default function Home() {
  const [activePage, setActivePage] = useState("home");

  return (
    <>
      <HeroCanvas />
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="min-h-screen relative z-10 flex flex-col">
        {pages.map((page) => {
          const Component = page.component;
          return <Component key={page.id} onNavigate={setActivePage} />;
        })}
      </main>
      <Footer />
    </>
  );
}
