import { Link, useParams, Navigate } from "react-router-dom";
import { PROJECTS, PERSON } from "@/data/content";
import { MaskedLines, Reveal } from "@/components/Reveal";

const slugOf = (t) => t.split(/[ :]/)[0].toLowerCase();

export default function CaseStudy() {
  const { slug } = useParams();
  const project = PROJECTS.find((p) => slugOf(p.title) === slug);
  if (!project) return <Navigate to="/" replace />;

  const Placeholder = ({ label, h = "h-56 sm:h-72" }) => (
    <div className={`border-2 border-dashed border-rule-light flex items-center justify-center ${h}`}>
      <p className="font-mono-np text-[9px] uppercase tracking-[0.3em] text-ink-soft text-center px-4">
        {label}
        <br />
        — being engraved —
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-paper text-ink" data-testid="case-study">
      {/* Slim folio bar */}
      <header className="px-4 sm:px-8 pt-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-ink pb-2 font-mono-np text-[9px] sm:text-[10px] uppercase tracking-widest text-ink-soft">
          <Link to="/" data-testid="case-home-link" className="hover:text-azure transition-colors">
            ← The Daily Algorithm
          </Link>
          <span className="hidden sm:inline">Case File · {slug}</span>
          <a href={`mailto:${PERSON.email}`} className="text-azure font-bold">
            Write to the desk
          </a>
        </div>
      </header>

      <main className="px-4 sm:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <span className="font-kicker text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-azure">
              Feature Article — Case Study
            </span>
          </Reveal>
          <MaskedLines
            lines={[project.title]}
            className="font-heading font-black leading-[1.0] tracking-tight text-3xl sm:text-5xl lg:text-6xl mt-3"
          />
          <Reveal delay={0.2}>
            <p className="font-kicker font-bold uppercase tracking-[0.18em] text-[11px] sm:text-xs text-pine mt-4 text-azure">
              {project.metrics}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {project.tags.map((t) => (
                <span key={t} className="font-mono-np text-[9px] uppercase tracking-widest border border-ink px-2 py-0.5">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="font-body text-lg sm:text-xl leading-relaxed justify-editorial mt-8 dropcap">
              {project.summary.replace(/##/g, "")} This sheet is the case file's front
              page — the full build log is being typeset.
            </p>
          </Reveal>

          {/* Placeholder figures */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
            <Reveal>
              <Placeholder label="Fig 1 — Architecture diagram" />
            </Reveal>
            <Reveal delay={0.1}>
              <Placeholder label="Fig 2 — Benchmark charts" />
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="border-2 border-ink p-5 sm:p-8 mt-10 bg-card">
              <p className="font-kicker font-bold uppercase tracking-[0.25em] text-[10px] text-azure border-b border-ink pb-2 mb-4">
                What the full case file will hold
              </p>
              <ul className="space-y-2.5 font-body text-[15px] leading-relaxed list-none">
                <li>— The architecture decisions and the trade-offs behind them</li>
                <li>— Benchmark methodology, raw numbers and honest failures</li>
                <li>— What broke in production and how it was fixed</li>
                <li>— What this correspondent would build differently next time</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-10">
              <a
                href={`mailto:${PERSON.email}?subject=${encodeURIComponent(`About ${project.title}`)}`}
                data-testid="case-cta-button"
                className="font-kicker font-bold uppercase tracking-[0.25em] text-xs bg-azure text-paper border border-azure px-8 py-3.5 hover:bg-transparent hover:text-azure hover:shadow-[6px_6px_0_#1A5D8F] hover:-translate-y-0.5 transition-all duration-200"
              >
                Ask the desk about this project →
              </a>
              <Link
                to="/"
                data-testid="case-back-link"
                className="font-kicker font-bold uppercase tracking-[0.25em] text-[11px] border border-ink px-5 py-2.5 hover:bg-ink hover:text-paper transition-colors duration-200"
              >
                ← Back to front page
              </Link>
            </div>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
