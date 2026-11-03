import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PERSON, ABOUT_BODY, AT_A_GLANCE } from "@/data/content";
import { MaskedLines, Reveal } from "@/components/Reveal";

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="front-page" ref={ref} className="relative z-10 px-4 sm:px-8 pt-12 sm:pt-20" data-testid="about-section">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <span className="font-kicker text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-neutral-600">
            Front Page — Special Report
          </span>
        </Reveal>
        <MaskedLines
          lines={[
            "ASPIRING AI ENGINEER",
            "SEEKS INTERNSHIP IN",
            "MACHINE LEARNING",
          ]}
          className="font-heading font-black leading-[1.02] tracking-tight text-3xl sm:text-5xl lg:text-6xl mt-3"
        />
        <Reveal delay={0.25}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-4 border-y border-[#121212] py-2">
            <p className="font-kicker font-bold uppercase tracking-[0.18em] text-[11px] sm:text-xs">
              By the Special Correspondent — {PERSON.name}
            </p>
            <p className="font-mono-np uppercase tracking-widest text-[9px] sm:text-[10px] text-neutral-600">
              {PERSON.school}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mt-8 sm:mt-10">
          {/* Portrait column */}
          <Reveal className="lg:col-span-4" delay={0.1}>
            <figure>
              <div className="halftone border border-[#121212]" data-testid="portrait-figure">
                <motion.img
                  src={PERSON.portrait}
                  alt={`Portrait of ${PERSON.name}`}
                  style={{ y: imgY }}
                  className="w-full h-[340px] sm:h-[420px] object-cover scale-[1.14]"
                  loading="eager"
                />
              </div>
              <figcaption className="font-mono-np text-[9px] sm:text-[10px] uppercase tracking-widest text-neutral-600 mt-2 leading-relaxed">
                FIG 1.1 — The correspondent reviewing training curves in the intelligence laboratory.
              </figcaption>
            </figure>
            <div className="border-2 border-[#121212] mt-6 p-4" data-testid="at-a-glance">
              <p className="font-kicker font-bold uppercase tracking-[0.25em] text-xs border-b border-[#121212] pb-2 mb-3">
                At a Glance
              </p>
              <dl className="space-y-3">
                {AT_A_GLANCE.map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono-np text-[9px] uppercase tracking-widest text-neutral-500">{k}</dt>
                    <dd className="font-body text-sm leading-snug">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          {/* Editorial body */}
          <div className="lg:col-span-8 columns-1 sm:columns-2 gap-10 [column-rule:1px_solid_#D2CEC4]">
            {ABOUT_BODY.map((p, i) => (
              <Reveal key={i} delay={0.12 * i} className="break-inside-avoid mb-6">
                <p className={`font-body text-base sm:text-lg leading-relaxed justify-editorial text-neutral-900 ${i === 0 ? "dropcap" : ""}`}>
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.3} className="break-inside-avoid">
              <p className="font-kicker font-bold uppercase tracking-[0.2em] text-[11px] text-right">
                — filed from the ML desk, continued overleaf
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
