import { useEffect, useState } from "react";
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
import NoBS from "@/components/NoBS";

export default function Home() {
  const [noBs, setNoBs] = useState(() => localStorage.getItem("view") === "nobs");

  useEffect(() => {
    localStorage.setItem("view", noBs ? "nobs" : "paper");
  }, [noBs]);

  if (noBs) return <NoBS onExit={() => setNoBs(false)} />;

  return (
    <div className="relative min-h-screen bg-paper text-ink" id="top">
      <div className="paper-grain" aria-hidden="true" />
      <PaperPlaneLayer />
      <Masthead onNoBs={() => setNoBs(true)} />
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
