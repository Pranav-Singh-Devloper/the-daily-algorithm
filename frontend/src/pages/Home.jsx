import PaperPlaneLayer from "@/components/PaperPlaneLayer";
import Masthead from "@/components/Masthead";
import About from "@/components/About";
import Experiences from "@/components/Experiences";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#F9F7F1] text-[#121212]" id="top">
      <div className="paper-grain" aria-hidden="true" />
      <PaperPlaneLayer />
      <Masthead />
      <main>
        <About />
        <Experiences />
        <Projects />
        <Achievements />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
