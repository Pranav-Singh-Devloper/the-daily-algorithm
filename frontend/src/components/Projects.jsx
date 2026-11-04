import { PROJECTS } from "@/data/content";
import { MaskedLines, Reveal, SectionHeading } from "@/components/Reveal";
import { Rich } from "@/components/Rich";

const Tags = ({ tags }) => (
  <div className="flex flex-wrap gap-1.5 mt-4">
    {tags.map((t) => (
      <span
        key={t}
        className="font-mono-np text-[9px] uppercase tracking-widest border border-ink px-2 py-0.5 hover:bg-azure hover:text-paper hover:border-azure hover:-translate-y-0.5 transition-all duration-200 cursor-default"
      >
        {t}
      </span>
    ))}
  </div>
);

const Metric = ({ children }) => (
  <p className="font-kicker font-bold uppercase tracking-[0.18em] text-[11px] mt-4 pt-3 border-t border-ink text-azure">
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
        <article
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-b-2 border-ink pb-10 transition-all duration-300 hover:-translate-y-1"
          data-testid="project-featured"
        >
          <Reveal>
            <div className="halftone border border-ink relative group transition-all duration-300 hover:shadow-[10px_10px_0_#1A5D8F]">
              <span className="absolute top-0 left-0 z-10 bg-azure text-paper font-kicker font-bold uppercase tracking-[0.2em] text-[9px] sm:text-[10px] px-3 py-1.5">
                ★ Lead Story
              </span>
              <img
                src={lead.image}
                alt={lead.title}
                className="w-full h-[300px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </Reveal>
          <div className="flex flex-col justify-center">
            <Reveal delay={0.08}>
              <p className="font-kicker font-bold uppercase tracking-[0.25em] text-[10px] text-azure">
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
              <Rich text={lead.summary} className="font-body text-base sm:text-lg leading-relaxed justify-editorial mt-4" />
              <Tags tags={lead.tags} />
              <Metric>{lead.metrics}</Metric>
            </Reveal>
          </div>
        </article>

        {/* Secondary stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          {rest.map((p, i) => (
            <article
              key={p.title}
              data-testid={`project-card-${i}`}
              className="transition-all duration-300 hover:-translate-y-1 hover:shadow-[10px_10px_0_#1A5D8F] p-2 -m-2"
            >
              <Reveal>
                <div className="halftone border border-ink group">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-[240px] sm:h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="font-kicker font-bold uppercase tracking-[0.25em] text-[10px] text-azure mt-4">
                  {p.category}
                </p>
                <h3 className="font-heading font-black text-xl sm:text-2xl leading-snug tracking-tight mt-2">
                  {p.title}
                </h3>
                <Rich text={p.summary} className="font-body text-[15px] leading-relaxed justify-editorial mt-2" />
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
