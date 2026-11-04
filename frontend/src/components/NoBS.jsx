import { PERSON, HIGHLIGHTS, EXPERIENCES, PROJECTS, SKILLS, ACHIEVEMENTS, EDUCATION } from "@/data/content";

const strip = (s) => s.replace(/##/g, "");

const Stat = ({ value, label, i }) => (
  <div className="border border-rule-light p-4" data-testid={`nobs-stat-${i}`}>
    <p className="text-2xl font-extrabold text-azure">{value}</p>
    <p className="text-[13px] leading-snug text-ink-soft mt-1">{label}</p>
  </div>
);

const Chip = ({ label, href, testid }) => (
  <a
    href={href}
    target={href?.startsWith("mailto") || href?.startsWith("tel") || !href || href === "#" ? undefined : "_blank"}
    rel="noreferrer"
    data-testid={testid}
    className="border border-ink px-4 py-2 text-sm font-semibold hover:bg-azure hover:text-paper hover:border-azure transition-colors duration-200"
  >
    {label}
  </a>
);

const H = ({ children }) => (
  <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-ink-soft border-b border-rule-light pb-2 mb-4">
    {children}
  </h2>
);

export default function NoBS({ onExit }) {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans-np" data-testid="nobs-root">
      <div className="max-w-3xl mx-auto px-5 py-10 sm:py-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight" data-testid="nobs-name">
              {PERSON.name}
            </h1>
            <p className="text-azure font-semibold mt-1.5">
              AI/ML Engineer — LLM systems · Multi-agent · RAG · Deep Learning
            </p>
            <p className="text-sm text-ink-soft mt-2 leading-relaxed">
              B.Tech CS & AI, Newton School of Technology (Class of 2028).
              Open to AI/ML & GenAI internships.
            </p>
          </div>
          <button
            type="button"
            onClick={onExit}
            data-testid="nobs-exit-button"
            className="flex-none font-mono-np text-[10px] uppercase tracking-widest border border-ink px-3 py-2 hover:bg-ink hover:text-paper transition-colors duration-200 cursor-pointer"
          >
            Theatrics on →
          </button>
        </div>

        {/* Contact */}
        <div className="flex flex-wrap gap-2.5 mt-6">
          <Chip label="Email me" href={`mailto:${PERSON.email}`} testid="nobs-contact-email" />
          <Chip label={PERSON.phone} href={`tel:${PERSON.phone.replace(/\s/g, "")}`} testid="nobs-contact-phone" />
          <Chip label="GitHub — on request" testid="nobs-contact-github" />
          <Chip label="LinkedIn — on request" testid="nobs-contact-linkedin" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
          {HIGHLIGHTS.map((h, i) => (
            <Stat key={i} value={h.value} label={h.label} i={i} />
          ))}
        </div>

        {/* Experience */}
        <div className="mt-12">
          <H>Experience</H>
          <div className="space-y-7">
            {EXPERIENCES.map((x) => (
              <div key={x.role} data-testid={`nobs-experience-${x.role.includes("LLM") ? 0 : 1}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-bold">{x.role} · {x.org}</p>
                  <p className="text-xs text-ink-soft font-mono-np uppercase tracking-widest">{x.period}</p>
                </div>
                <p className="text-[15px] leading-relaxed mt-2">{strip(x.summary)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mt-12">
          <H>Projects</H>
          <div className="space-y-6">
            {PROJECTS.map((p, i) => (
              <div key={p.title} data-testid={`nobs-project-${i}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-bold">{p.title}</p>
                  <p className="text-xs text-azure font-semibold">{p.metrics}</p>
                </div>
                <p className="text-[15px] leading-relaxed mt-1.5">{strip(p.summary)}</p>
                <p className="text-xs text-ink-soft mt-1.5">{p.tags.join(" · ")}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-12">
          <H>Skills</H>
          <div className="space-y-3">
            {SKILLS.map((c) => (
              <p key={c.category} className="text-[15px] leading-relaxed">
                <span className="font-bold">{c.category}: </span>
                {c.skills.join(", ")}
              </p>
            ))}
          </div>
        </div>

        {/* Education + Achievements */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <H>Education</H>
            <ul className="space-y-3">
              {EDUCATION.map(([deg, inst, meta]) => (
                <li key={deg} className="text-sm leading-snug">
                  <p className="font-semibold">{deg}</p>
                  <p className="text-ink-soft">{inst}</p>
                  <p className="text-xs text-azure font-mono-np">{meta}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <H>Achievements</H>
            <ul className="space-y-2">
              {ACHIEVEMENTS.map(([t, d]) => (
                <li key={t} className="text-sm leading-snug">
                  <span className="font-semibold">{t}</span>
                  <span className="text-ink-soft"> — {d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 border-t border-rule-light pt-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-lg font-bold">Hiring for an AI team?</p>
          <a
            href={`mailto:${PERSON.email}?subject=Internship%20Inquiry`}
            data-testid="nobs-cta-button"
            className="bg-azure text-paper font-semibold px-6 py-3 hover:opacity-90 transition-opacity duration-200"
          >
            Email {PERSON.shortName} →
          </a>
        </div>
        <p className="text-xs text-ink-soft mt-10 text-center">
          © 2026 {PERSON.name} · The full newspaper edition is one toggle away.
        </p>
      </div>
    </div>
  );
}
