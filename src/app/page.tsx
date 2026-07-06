import BgCanvas from "@/components/BgCanvas";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Certifications from "@/components/Certifications";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <BgCanvas />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <TechStack />
        <Certifications />
        <About />
        <Contact />
      </main>
    </>
  );
}
