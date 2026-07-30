import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certificates />
      <Contact />
    </main>
  );
}
