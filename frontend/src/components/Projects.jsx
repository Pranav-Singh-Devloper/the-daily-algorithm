import { PROJECTS } from "@/data/content";
import { MaskedLines, Reveal, SectionHeading } from "@/components/Reveal";

const Tags = ({ tags }) => (
  <div className="flex flex-wrap gap-1.5 mt-4">
    {tags.map((t) => (
      <span
        key={t}
        className="font-mono-np text-[9px] uppercase tracking-widest border border-[#121212] px-2 py-0.5"
      >
        {t}
      </span>
    ))}
  </div>
);

const Metric = ({ children }) => (
  <p className="font-kicker font-bold uppercase tracking-[0.18em] text-[11px] mt-4 pt-3 border-t border-[#121212]">
    {children}
  </p>
);

export default function Projects() {
  const [lead, ...rest] = PROJECTS;
  const [leadName, leadSub = ""] = lead.title.split(": ");
  const subWords = leadSub.split(" ");
  const leadLines = [
    `${leadName}:`,
    ...Array.from({ length: Math.ceil(subWords.length / 3) }, (_, i) =>
      subWords.slice(i * 3, i * 3 + 3).join(" ")
    ),
  ];
  return (
    <section id="features" className="relative z-10 px-4 sm:px-8 py-12 sm:py-20" data-testid="projects-section">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="Featured Dispatches" title="Investigations in Machine Intelligence" />

        {/* Lead story */}
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-b-2 border-[#121212] pb-10" data-testid="project-featured">
          <Reveal>
            <div className="halftone border border-[#121212]">
              <img src={lead.image} alt={lead.title} className="w-full h-[300px] sm:h-[420px] object-cover" loading="lazy" />
            </div>
          </Reveal>
          <div className="flex flex-col justify-center">
            <Reveal delay={0.08}>
              <p className="font-kicker font-bold uppercase tracking-[0.25em] text-[10px] text-neutral-500">
                {lead.category}
              </p>
            </Reveal>
            <MaskedLines
              as="h3"
              lines={leadLines}
              className="font-heading font-black text-2xl sm:text-3xl lg:text-4xl leading-[1.05] tracking-tight mt-3"
              delay={0.1}
            />
            <Reveal delay={0.25}>
              <p className="font-body text-base sm:text-lg leading-relaxed justify-editorial mt-4">
                {lead.summary}
              </p>
              <Tags tags={lead.tags} />
              <Metric>{lead.metrics}</Metric>
            </Reveal>
          </div>
        </article>

        {/* Secondary stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {rest.map((p, i) => (
            <article key={p.title} data-testid={`project-card-${i}`}>
              <Reveal>
                <div className="halftone border border-[#121212]">
                  <img src={p.image} alt={p.title} className="w-full h-[240px] sm:h-[300px] object-cover" loading="lazy" />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-kicker font-bold uppercase tracking-[0.25em] text-[10px] text-neutral-500 mt-4">
                  {p.category}
                </p>
                <h3 className="font-heading font-black text-xl sm:text-2xl leading-snug tracking-tight mt-2">
                  {p.title}
                </h3>
                <p className="font-body text-[15px] leading-relaxed justify-editorial mt-2">{p.summary}</p>
                <Tags tags={p.tags} />
                <Metric>{p.metrics}</Metric>
              </Reveal>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
