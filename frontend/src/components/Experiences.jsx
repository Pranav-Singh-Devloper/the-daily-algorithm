import { EXPERIENCES } from "@/data/content";
import { Reveal, SectionHeading } from "@/components/Reveal";

export default function Experiences() {
  return (
    <section id="dispatches" className="relative z-10 px-4 sm:px-8 py-12 sm:py-20" data-testid="experiences-section">
      <div className="max-w-6xl mx-auto">
        <SectionHeading kicker="Dispatches from the Field" title="Classified Experience Ads" />
        <div className="grid grid-cols-1 md:grid-cols-3 border border-[#121212]" data-testid="experience-grid">
          {EXPERIENCES.map((x, i) => (
            <Reveal
              key={x.role}
              delay={i * 0.12}
              className={`p-5 sm:p-6 border-[#121212] ${
                i < EXPERIENCES.length - 1 ? "md:border-r" : ""
              } border-b md:border-b-0 last:border-b-0 ${i < EXPERIENCES.length - 1 ? "border-b" : ""}`}
              testid={`experience-card-${i}`}
            >
              <p className="font-kicker font-bold uppercase tracking-[0.22em] text-[10px] text-neutral-500">
                Situation Wanted · No. {i + 1}
              </p>
              <h3 className="font-heading font-black text-lg sm:text-xl leading-snug mt-2">{x.role}</h3>
              <p className="font-body italic text-sm mt-1">{x.org}</p>
              <div className="border-t border-b border-[#D2CEC4] py-1.5 my-3 flex justify-between font-mono-np text-[9px] uppercase tracking-widest text-neutral-700">
                <span>{x.period}</span>
                <span>{x.location}</span>
              </div>
              <p className="font-body text-sm sm:text-[15px] leading-relaxed justify-editorial">
                {x.summary}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
