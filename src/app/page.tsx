import NavBar from "./components/ui/NavBar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import SkillsAndGithub from "./components/sections/SkillsAndGithub";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <About />
        <Projects />
        <SkillsAndGithub />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
