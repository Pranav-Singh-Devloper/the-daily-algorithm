import { SKILLS } from "@/data/content";
import { Reveal, SectionHeading } from "@/components/Reveal";

export default function Skills() {
  return (
    <section id="almanac" className="relative z-10 px-4 sm:px-8 py-12 sm:py-20" data-testid="skills-section">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="The Engineer's Almanac" title="Tools of the Trade" />
        <div
          className="grid grid-cols-1 md:grid-cols-3 border border-[#121212] divide-y md:divide-y-0 md:divide-x divide-[#121212] bg-white transition-all duration-300 hover:shadow-[10px_10px_0_#136A58] hover:-translate-y-1"
          data-testid="skills-grid"
        >
          {SKILLS.map((cat, i) => (
            <Reveal key={cat.category} delay={i * 0.12} className="p-5 sm:p-7">
              <p className="font-kicker font-bold uppercase tracking-[0.22em] text-xs border-b border-[#121212] pb-2 mb-4">
                {cat.category}
              </p>
              <ul className="space-y-2.5">
                {cat.skills.map((s) => (
                  <li key={s} className="skill-item font-body text-[15px] flex items-start cursor-default">
                    <span className="tickbox" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="text-center font-mono-np text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-500 mt-4">
            Registry current as of press time — additions under active research
          </p>
        </Reveal>
      </div>
    </section>
  );
}
