import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskedLines } from "@/components/Reveal";

export default function PullQuote() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const markY = useTransform(scrollYProgress, [0, 1], ["-16%", "16%"]);

  return (
    <section ref={ref} className="relative z-10 px-4 sm:px-8 py-16 sm:py-28 overflow-hidden" data-testid="pull-quote">
      <div className="max-w-4xl mx-auto text-center relative">
        <motion.span
          style={{ y: markY }}
          aria-hidden="true"
          className="absolute -top-8 sm:-top-14 left-1/2 -translate-x-1/2 font-heading font-black text-[9rem] sm:text-[13rem] leading-none text-azure opacity-15 select-none pointer-events-none"
        >
          &ldquo;
        </motion.span>
        <MaskedLines
          lines={["Models impress in notebooks.", "Engineers impress in production."]}
          className="font-heading italic font-semibold text-2xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight"
        />
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className="h-px w-12 bg-azure" />
          <p className="font-kicker font-bold uppercase tracking-[0.25em] text-[10px] sm:text-xs text-ink-soft">
            The correspondent's working thesis
          </p>
          <span className="h-px w-12 bg-azure" />
        </div>
      </div>
    </section>
  );
}
