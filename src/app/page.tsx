import BgCanvas from "@/components/BgCanvas";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import Certifications from "@/components/Certifications";
import MsLearnGrid from "@/components/MsLearnGrid";
import About from "@/components/About";
import Contact from "@/components/Contact";
import StructuredData from "@/components/StructuredData";
import KeepHashInView from "@/components/KeepHashInView";
import { fetchMsLearn } from "@/lib/mslearn";

export default async function Home() {
  // Fetched at build time (static export) — refreshed on every deploy.
  const msLearn = await fetchMsLearn();

  return (
    <>
      <StructuredData />
      <KeepHashInView />
      <BgCanvas />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <TechStack />
        <Certifications>
          <MsLearnGrid data={msLearn} />
        </Certifications>
        <About />
        <Contact />
      </main>
    </>
  );
}
