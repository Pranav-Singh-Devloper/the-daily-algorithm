import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ACHIEVEMENTS } from "@/data/content";
import { SectionHeading } from "@/components/Reveal";

function thump() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    const t0 = ctx.currentTime + 0.02;
    const o = ctx.createOscillator();
    o.type = "sine";
    const g = ctx.createGain();
    o.frequency.setValueAtTime(95, t0);
    o.frequency.exponentialRampToValueAtTime(48, t0 + 0.16);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.3, t0 + 0.025);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.28);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(t0);
    o.stop(t0 + 0.32);
  } catch (e) {
    /* silent */
  }
}

export default function Achievements() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    if (inView && !stamped) {
      setStamped(true);
      thump();
    }
  }, [inView, stamped]);

  return (
    <section id="honours" className="relative z-10 px-4 sm:px-8 py-12 sm:py-20" data-testid="achievements-section">
      <div className="max-w-4xl mx-auto">
        <SectionHeading kicker="Public Notice — Gazette" title="Honours & Distinctions" />
        <div ref={ref} className="relative">
          {stamped && (
            <motion.div
              initial={{ scale: 2.6, opacity: 0, rotate: -26 }}
              animate={{ scale: 1, opacity: 0.95, rotate: -12 }}
              transition={{ type: "spring", stiffness: 330, damping: 17 }}
              className="absolute -top-5 -right-2 sm:-right-6 z-20 border-[3px] border-azure text-azure rounded-[3px] px-3 sm:px-4 py-1.5 text-center pointer-events-none select-none"
              style={{
                boxShadow: "inset 0 0 0 1.5px var(--azure), 0 0 0 1px rgba(26,93,143,0.3)",
                background: "rgba(26,93,143,0.07)",
              }}
              data-testid="hire-stamp"
            >
              <p className="font-kicker font-black uppercase tracking-[0.16em] text-sm sm:text-lg leading-none">
                Approved
              </p>
              <p className="font-mono-np uppercase tracking-[0.2em] text-[8px] sm:text-[9px] mt-1 leading-none">
                For hiring · The AI/ML Desk
              </p>
            </motion.div>
          )}
          <div
            className="border-[3px] border-ink p-1.5 bg-card transition-all duration-300 hover:shadow-[10px_10px_0_#1A5D8F] hover:-translate-y-1"
            data-testid="honours-box"
          >
            <div className="border border-ink px-5 sm:px-10 py-8 sm:py-10">
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
      </div>
    </section>
  );
}
