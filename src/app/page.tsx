import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Expertise from "@/components/sections/Expertise";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Journey from "@/components/sections/Journey";
import BeyondCode from "@/components/sections/BeyondCode";
import Contact from "@/components/sections/Contact";

/**
 * Home page — Server Component.
 *
 * The PortraitCanvas lives in layout.tsx so it persists across all sections
 * without ever re-mounting. This file simply composes the sections.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <Projects />
      <Experience />
      <Journey />
      <BeyondCode />
      <Contact />
    </>
  );
}
