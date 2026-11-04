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
import IntroUnfold from "@/components/IntroUnfold";

export default function Home() {
  const [noBs, setNoBs] = useState(() => localStorage.getItem("view") === "nobs");

  useEffect(() => {
    localStorage.setItem("view", noBs ? "nobs" : "paper");
  }, [noBs]);

  // Cursor-reactive paper: sheen follows the pointer, texture drifts with it
  useEffect(() => {
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = document.documentElement.style;
        el.setProperty("--mx", `${e.clientX}px`);
        el.setProperty("--my", `${e.clientY}px`);
        el.setProperty("--px", ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
        el.setProperty("--py", ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (noBs) return <NoBS onExit={() => setNoBs(false)} />;

  return (
    <div className="relative min-h-screen bg-paper text-ink" id="top">
      <IntroUnfold />
      <div className="paper-texture" aria-hidden="true" />
      <div className="paper-sheen" aria-hidden="true" />
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
