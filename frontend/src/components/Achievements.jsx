import { motion } from "framer-motion";
import { ACHIEVEMENTS } from "@/data/content";
import { SectionHeading } from "@/components/Reveal";

export default function Achievements() {
  return (
    <section id="honours" className="relative z-10 px-4 sm:px-8 py-12 sm:py-20" data-testid="achievements-section">
      <div className="max-w-4xl mx-auto">
        <SectionHeading kicker="Public Notice — Gazette" title="Honours & Distinctions" />
        <div className="border-[3px] border-ink p-1.5 transition-all duration-300 hover:shadow-[10px_10px_0_#1A5D8F] hover:-translate-y-1" data-testid="honours-box">
          <div className="border border-ink px-5 sm:px-10 py-8 sm:py-10 bg-[#FFFFFF]">
            <p className="text-center font-masthead font-bold uppercase tracking-[0.3em] text-[11px] sm:text-sm mb-8">
              By order of the Editor — the following are hereby recorded
            </p>
            <ul className="divide-y divide-ink">
              {ACHIEVEMENTS.map(([title, detail], i) => (
                <motion.li
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex gap-4 sm:gap-6 py-5 -mx-3 px-3 transition-colors duration-300 hover:bg-paper2 cursor-default"
                >
                  <span className="font-mono-np font-bold text-azure text-xs pt-1 flex-none transition-transform duration-300 hover:scale-125">
                    0{i + 1}
                  </span>
                  <span className="font-heading font-black text-sm sm:text-base uppercase tracking-wide sm:w-1/2 leading-snug">
                    {title}
                  </span>
                  <span className="font-body text-sm sm:text-[15px] text-ink-soft sm:w-1/2 leading-relaxed">
                    {detail}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
