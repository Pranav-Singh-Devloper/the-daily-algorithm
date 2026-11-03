import { motion } from "framer-motion";
import { PERSON, EDUCATION, EXPERIENCES, PROJECTS, ACHIEVEMENTS, SKILLS } from "@/data/content";
import { Reveal, SectionHeading } from "@/components/Reveal";

export default function ResumeSnapshot() {
  const printIt = () => window.print();

  return (
    <section id="resume" className="relative z-10 px-4 sm:px-8 py-12 sm:py-20" data-testid="resume-snapshot-section">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="Clippings Desk — Clip & Keep" title="The Résumé Snapshot" />

        <Reveal>
          <div className="print-snapshot border-2 border-[#121212] bg-white" data-testid="resume-snapshot">
            <div className="flex items-center justify-between gap-3 border-b-2 border-[#121212] bg-pine text-[#F9F7F1] px-4 py-2">
              <span className="font-kicker font-bold uppercase tracking-[0.25em] text-[10px] sm:text-[11px]">
                Curriculum Vitæ — everything a recruiter needs on one sheet
              </span>
              <button
                type="button"
                onClick={printIt}
                data-testid="print-snapshot-button"
                className="font-kicker font-bold uppercase tracking-[0.2em] text-[10px] bg-[#F9F7F1] text-pine border border-[#F9F7F1] px-3 py-1 hover:bg-[#121212] hover:text-[#F9F7F1] hover:border-[#121212] transition-colors duration-200 flex-none"
              >
                Print / Save PDF
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#121212]">
              {/* Column 1: who + education + contact */}
              <div className="p-5 sm:p-6">
                <p className="font-heading font-black text-xl leading-tight">{PERSON.name}</p>
                <p className="font-kicker font-bold uppercase tracking-[0.2em] text-[10px] text-pine mt-1">
                  AI/ML · GenAI · Deep Learning — Class of 2028
                </p>

                <p className="font-kicker font-bold uppercase tracking-[0.2em] text-[10px] border-b border-[#121212] pb-1 mt-5 mb-3">
                  Education
                </p>
                <ul className="space-y-2.5">
                  {EDUCATION.map(([deg, inst, meta]) => (
                    <li key={deg}>
                      <p className="font-body text-[13px] leading-snug font-semibold">{deg}</p>
                      <p className="font-body text-[12px] text-neutral-600 leading-snug">{inst}</p>
                      <p className="font-mono-np text-[9px] uppercase tracking-widest text-pine">{meta}</p>
                    </li>
                  ))}
                </ul>

                <p className="font-kicker font-bold uppercase tracking-[0.2em] text-[10px] border-b border-[#121212] pb-1 mt-5 mb-3">
                  Reach the Desk
                </p>
                <ul className="space-y-1 font-mono-np text-[10px] leading-relaxed break-all">
                  <li>✉ {PERSON.email}</li>
                  <li>☎ {PERSON.phone}</li>
                </ul>
              </div>

              {/* Column 2: experience */}
              <div className="p-5 sm:p-6">
                <p className="font-kicker font-bold uppercase tracking-[0.2em] text-[10px] border-b border-[#121212] pb-1 mb-3">
                  Experience
                </p>
                <ul className="space-y-4">
                  {EXPERIENCES.map((x) => (
                    <li key={x.role}>
                      <p className="font-heading font-black text-[14px] leading-snug">{x.role}</p>
                      <p className="font-body italic text-[12px]">{x.org}</p>
                      <p className="font-mono-np text-[9px] uppercase tracking-widest text-pine">{x.period}</p>
                      <p className="font-body text-[12px] leading-snug text-neutral-700 mt-1">{x.summary.replace(/##/g, "").slice(0, 190)}…</p>
                    </li>
                  ))}
                </ul>

                <p className="font-kicker font-bold uppercase tracking-[0.2em] text-[10px] border-b border-[#121212] pb-1 mt-5 mb-3">
                  Honours
                </p>
                <ul className="space-y-1.5">
                  {ACHIEVEMENTS.map(([t]) => (
                    <li key={t} className="font-body text-[12px] leading-snug">• {t}</li>
                  ))}
                </ul>
              </div>

              {/* Column 3: projects + skills */}
              <div className="p-5 sm:p-6">
                <p className="font-kicker font-bold uppercase tracking-[0.2em] text-[10px] border-b border-[#121212] pb-1 mb-3">
                  Projects
                </p>
                <ul className="space-y-3">
                  {PROJECTS.map((p) => (
                    <li key={p.title}>
                      <p className="font-heading font-black text-[13px] leading-snug">{p.title}</p>
                      <p className="font-mono-np text-[9px] uppercase tracking-widest text-pine">{p.metrics}</p>
                    </li>
                  ))}
                </ul>

                <p className="font-kicker font-bold uppercase tracking-[0.2em] text-[10px] border-b border-[#121212] pb-1 mt-5 mb-3">
                  Tools of the Trade
                </p>
                <ul className="space-y-2">
                  {SKILLS.map((c) => (
                    <li key={c.category}>
                      <p className="font-mono-np text-[9px] uppercase tracking-widest text-neutral-500">{c.category}</p>
                      <p className="font-body text-[12px] leading-snug">{c.skills.join(" · ")}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
