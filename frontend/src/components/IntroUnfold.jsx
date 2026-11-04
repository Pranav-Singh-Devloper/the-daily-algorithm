import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plane } from "@/components/PaperPlaneLayer";

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* Layered press-run sound: launch whoosh + paper crinkles + settle thump.
   All synthesized — no audio assets. Silent if autoplay is blocked. */
function playPressSound() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    const t0 = ctx.currentTime + 0.05;

    // 1) Launch whoosh — filtered noise with a frequency sweep
    const dur = 1.2;
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 1.5);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 1.4;
    bp.frequency.setValueAtTime(220, t0);
    bp.frequency.exponentialRampToValueAtTime(2600, t0 + 0.45);
    bp.frequency.exponentialRampToValueAtTime(160, t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(0.5, t0 + 0.2);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(bp);
    bp.connect(g);
    g.connect(ctx.destination);
    src.start(t0);

    // 2) Paper crinkles — short bright noise ticks as the folds open
    for (let k = 0; k < 6; k++) {
      const cd = 0.035;
      const cb = ctx.createBuffer(1, Math.floor(ctx.sampleRate * cd), ctx.sampleRate);
      const cd0 = cb.getChannelData(0);
      for (let i = 0; i < cd0.length; i++) cd0[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / cd0.length, 2);
      const cs = ctx.createBufferSource();
      cs.buffer = cb;
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 1800 + Math.random() * 1500;
      const cg = ctx.createGain();
      const ct = t0 + 0.55 + k * 0.09 + Math.random() * 0.02;
      cg.gain.setValueAtTime(0.1 + Math.random() * 0.08, ct);
      cg.gain.exponentialRampToValueAtTime(0.0001, ct + cd);
      cs.connect(hp);
      hp.connect(cg);
      cg.connect(ctx.destination);
      cs.start(ct);
    }

    // 3) Settle thump — soft low body as the sheet flattens
    const o = ctx.createOscillator();
    o.type = "sine";
    const og = ctx.createGain();
    const tt = t0 + 2.1;
    o.frequency.setValueAtTime(120, tt);
    o.frequency.exponentialRampToValueAtTime(55, tt + 0.18);
    og.gain.setValueAtTime(0.0001, tt);
    og.gain.exponentialRampToValueAtTime(0.25, tt + 0.03);
    og.gain.exponentialRampToValueAtTime(0.0001, tt + 0.22);
    o.connect(og);
    og.connect(ctx.destination);
    o.start(tt);
    o.stop(tt + 0.3);
  } catch (e) {
    /* audio unavailable — stay silent */
  }
}

const DELAYS = [0.55, 0.38, 0.24, 0.24, 0.38, 0.55]; // inner folds open first

export default function IntroUnfold() {
  const [gone, setGone] = useState(REDUCED);

  useEffect(() => {
    if (REDUCED) return;
    const s = setTimeout(playPressSound, 80);
    const t = setTimeout(() => setGone(true), 3450);
    return () => {
      clearTimeout(s);
      clearTimeout(t);
    };
  }, []);

  if (gone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] cursor-pointer overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 1, 0] }}
      transition={{ duration: 3.3, times: [0, 0.82, 0.92, 1] }}
      onAnimationComplete={() => setGone(true)}
      onClick={() => setGone(true)}
      data-testid="intro-unfold"
    >
      {/* Dim the page behind the folded sheet, releasing as it opens */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.6, delay: 0.7, ease: "easeOut" }}
      />

      {/* The folded sheet — a six-panel accordion unfolding from the centre */}
      <div className="absolute inset-0 flex" style={{ perspective: 1600 }}>
        {Array.from({ length: 6 }).map((_, i) => {
          const left = i < 3;
          const d = 0.75 + DELAYS[i];
          return (
            <motion.div
              key={i}
              className="flex-1 relative"
              style={{ transformOrigin: left ? "right center" : "left center", transformStyle: "preserve-3d" }}
              initial={{ rotateY: left ? -178 : 178 }}
              animate={{ rotateY: 0 }}
              transition={{ type: "spring", stiffness: 64, damping: 15, delay: d }}
            >
              <motion.div
                className="absolute inset-0 bg-paper"
                initial={{ filter: "brightness(0.55)" }}
                animate={{ filter: "brightness(1)" }}
                transition={{ duration: 1.1, delay: d, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0"
                style={{
                  background: left
                    ? "linear-gradient(to left, rgba(0,0,0,0.5), transparent 65%)"
                    : "linear-gradient(to right, rgba(0,0,0,0.5), transparent 65%)",
                }}
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.3, delay: d, ease: "easeOut" }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Centre fold hairline, fading as the sheet flattens */}
      <motion.div
        className="absolute top-0 bottom-0 left-1/2 w-px bg-ink"
        initial={{ opacity: 0.35 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.4, delay: 0.8 }}
      />

      {/* The plane sweeps across and pulls the folds open behind it */}
      <motion.div
        className="absolute"
        initial={{ x: "-30vw", y: "16vh", scale: 0.7, rotate: -6 }}
        animate={{ x: "108vw", y: "6vh", scale: 1.25, rotate: 7 }}
        transition={{ duration: 1.7, delay: 0.5, ease: [0.5, 0, 0.35, 1] }}
      >
        <div className="relative">
          <Plane />
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute top-1/2 -translate-y-1/2 bg-paper"
              style={{ right: "100%", marginRight: 6 + i * 3, width: 16 + i * 9, height: 1.6 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{ duration: 0.8, delay: 0.7 + i * 0.15, ease: "easeOut" }}
            />
          ))}
        </div>
      </motion.div>

      {/* Title lockup — printed on the sheet, folding away with it */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none px-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.95, 1, 1, 1.05] }}
        transition={{ duration: 2.5, times: [0, 0.12, 0.62, 1], delay: 0.1 }}
      >
        <div className="text-center">
          <p className="font-mono-np text-[9px] sm:text-[10px] uppercase tracking-[0.45em] text-ink-soft">
            Vol. I — Special Internship Edition
          </p>
          <h1 className="font-masthead font-black uppercase text-3xl sm:text-5xl lg:text-6xl mt-3">
            The Daily Algorithm
          </h1>
          <p className="font-kicker font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs text-azure mt-3">
            Tonight's paper is unfolding
          </p>
        </div>
      </motion.div>

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.35))" }}
      />

      <p className="absolute bottom-6 left-0 right-0 text-center font-mono-np text-[9px] uppercase tracking-widest text-ink-soft">
        Click to unfold instantly
      </p>
    </motion.div>
  );
}
