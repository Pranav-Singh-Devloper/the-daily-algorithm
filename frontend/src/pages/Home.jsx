import { Toaster } from "@/components/ui/sonner";
import PaperPlaneLayer from "@/components/PaperPlaneLayer";
import Masthead from "@/components/Masthead";
import About from "@/components/About";
import Experiences from "@/components/Experiences";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Skills from "@/components/Skills";
import ResumeSnapshot from "@/components/ResumeSnapshot";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-paper text-ink" id="top">
      <div className="paper-grain" aria-hidden="true" />
      <PaperPlaneLayer />
      <Masthead />
      <main>
        <About />
        <Experiences />
        <Projects />
        <Achievements />
        <Skills />
        <ResumeSnapshot />
        <Contact />
      </main>
      <Footer />
      <Toaster position="bottom-center" />
    </div>
  );
}
