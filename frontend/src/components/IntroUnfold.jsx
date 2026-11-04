import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Plane } from "@/components/PaperPlaneLayer";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* Synthesized paper-whoosh — no audio asset needed */
function whoosh() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    const dur = 1.1;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 1.1;
    const t = ctx.currentTime;
    filter.frequency.setValueAtTime(280, t);
    filter.frequency.exponentialRampToValueAtTime(2200, t + 0.5);
    filter.frequency.exponentialRampToValueAtTime(180, t + dur);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.4, t + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
  } catch (e) {
    /* audio unavailable — stay silent */
  }
}

const DELAYS = [0.78, 0.56, 0.56, 0.8];

export default function IntroUnfold() {
  const [gone, setGone] = useState(REDUCED);
  const played = useRef(false);

  useEffect(() => {
    if (REDUCED) return;
    const s = setTimeout(whoosh, 200);
    const t = setTimeout(() => setGone(true), 2700);
    return () => {
      clearTimeout(s);
      clearTimeout(t);
    };
  }, []);

  if (gone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] cursor-pointer"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 1, 0] }}
      transition={{ duration: 2.7, times: [0, 0.72, 0.9, 1] }}
      onAnimationComplete={() => setGone(true)}
      onClick={() => setGone(true)}
      data-testid="intro-unfold"
    >
      <div className="absolute inset-0 flex" style={{ perspective: 1400 }}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={`flex-1 bg-paper intro-panel ${i === 1 ? "gap-l" : i === 2 ? "gap-r" : ""}`}
            style={{ transformOrigin: i < 2 ? "right center" : "left center" }}
            initial={{ rotateY: i < 2 ? -86 : 86, opacity: 0.95 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 1.0, delay: DELAYS[i], ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </div>

      <motion.div
        className="absolute top-[16%]"
        initial={{ x: "-25vw", y: -30, rotate: -6 }}
        animate={{ x: "105vw", y: 60, rotate: 10 }}
        transition={{ duration: 1.5, delay: 0.15, ease: [0.5, 0, 0.3, 1] }}
      >
        <div style={{ transform: "scale(1.7)" }}>
          <Plane />
        </div>
      </motion.div>

      <p className="absolute bottom-6 left-0 right-0 text-center font-mono-np text-[9px] uppercase tracking-widest text-ink-soft">
        Click to unfold instantly
      </p>
    </motion.div>
  );
}
