import { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function smoothPath(pts) {
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

/* Organic wander: irregular phase + varying amplitude, launching from centre */
function buildPath(w, h) {
  const pad = Math.max(24, w * 0.045);
  const N = 20;
  const top = 60;
  const bottom = h - Math.max(220, h * 0.035);
  const pts = [];
  let phase = 0.5;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    const y = top + t * (bottom - top);
    phase += 1.15 + 0.65 * Math.sin(i * 2.31 + 0.8);
    const amp = w * (0.29 + 0.085 * Math.sin(i * 1.27 + 1.2));
    const launch = clamp(t / 0.07, 0, 1);
    const x = w / 2 + amp * Math.sin(phase) * launch;
    pts.push([clamp(x, pad, w - pad), y]);
  }
  return smoothPath(pts);
}

/* Two-tone 3/4-view line-art paper plane, nose pointing right (+x) */
const Plane = () => (
  <svg
    viewBox="0 0 72 64"
    width="72"
    height="64"
    fill="none"
    style={{ display: "block", overflow: "visible" }}
  >
    <g stroke="var(--ink)" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
      <path d="M70 30 L4 50 L38 30 Z" fill="#c9c3b2" />
      <path d="M70 30 L38 30 L44 58 Z" fill="#eee9da" />
      <path d="M70 30 L4 8 L38 30 Z" fill="#ffffff" />
      <path d="M70 30 L38 30" strokeWidth="1.6" />
      <path d="M4 8 L38 30" strokeWidth="1.2" opacity="0.45" />
      <path d="M4 50 L38 30" strokeWidth="1.2" opacity="0.6" />
      <path d="M14 55 q5 4 10 0 t10 0" strokeWidth="1.1" opacity="0.55" strokeLinecap="round" stroke="var(--azure)" />
    </g>
  </svg>
);

export default function PaperPlaneLayer() {
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const raf = useRef(0);
  const basePathRef = useRef(null);
  const [burst, setBurst] = useState(0);

  useEffect(() => {
    const measure = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setDims({
          w: document.documentElement.clientWidth,
          h: document.documentElement.scrollHeight,
        });
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 20, mass: 0.7 });

  // ---- Cinematic take-off: plane unfolds at the masthead and lifts off on load ----
  const introP = useMotionValue(REDUCED ? 1 : 0);
  const unfold = useMotionValue(REDUCED ? 1 : 0);
  const introScale = useMotionValue(REDUCED ? 1 : 2.1);
  const introOp = useMotionValue(REDUCED ? 1 : 0);

  useEffect(() => {
    if (REDUCED) return;
    const a = animate(introP, 1, { duration: 2.4, delay: 0.45, ease: [0.45, 0.05, 0.25, 1] });
    const b = animate(unfold, 1, { type: "spring", stiffness: 55, damping: 13, delay: 0.35 });
    const c = animate(introScale, 1, { duration: 2.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] });
    const d = animate(introOp, 1, { duration: 0.8, delay: 0.45 });
    return () => {
      a.stop();
      b.stop();
      c.stop();
      d.stop();
    };
  }, [introP, unfold, introScale, introOp]);

  // Flight position = whichever is further: scroll, or the take-off timeline
  const effP = useTransform([smooth, introP], ([s, i]) => Math.max(s, i * 0.05));
  const offsetDistance = useTransform(effP, (p) => `${p * 100}%`);
  const trailLength = useTransform(effP, [0, 1], [0.001, 1]);

  // 3D flight dynamics (all updated imperatively — zero re-renders on scroll)
  const bank = useMotionValue(0);
  const yaw = useMotionValue(0);
  const roll = useMotionValue(0);
  const scale = useMotionValue(1);
  const opacity = useMotionValue(1);
  const blurPx = useMotionValue(0);
  const shY = useMotionValue(3);
  const shB = useMotionValue(5);
  const zIdx = useMotionValue(50);
  const filter = useMotionTemplate`blur(${blurPx}px) drop-shadow(0 ${shY}px ${shB}px rgba(18,18,18,0.3))`;

  const path = useMemo(
    () => (dims.w > 0 && dims.h > 0 ? buildPath(dims.w, dims.h) : ""),
    [dims]
  );

  useMotionValueEvent(effP, "change", (p) => {
    const el = basePathRef.current;
    if (!el) return;
    const L = el.getTotalLength();
    if (!L) return;
    const e = Math.max(2, L * 0.0015);
    const pc = el.getPointAtLength(clamp(p - 0.002, 0, 1) * L);
    const pa = el.getPointAtLength(clamp(p, 0, 1) * L);
    const pb = el.getPointAtLength(clamp(p + 0.002, 0, 1) * L);
    const a1 = Math.atan2(pa.y - pc.y, pa.x - pc.x);
    const a2 = Math.atan2(pb.y - pa.y, pb.x - pa.x);
    let dA = a2 - a1;
    while (dA > Math.PI) dA -= 2 * Math.PI;
    while (dA < -Math.PI) dA += 2 * Math.PI;
    const curv = dA / (2 * e);
    bank.set(clamp(curv * 4200, -60, 60));
    const dx = pa.x - pc.x;
    const dy = pa.y - pc.y;
    const sp = Math.hypot(dx, dy) || 1;
    yaw.set((dx / sp) * -26);
    const d = 0.5 + 0.5 * Math.sin(p * Math.PI * 3.2 + 0.8);
    scale.set(0.7 + d * 0.55);
    opacity.set(0.45 + d * 0.55);
    blurPx.set((1 - d) * 2.2);
    shY.set(2 + d * 5);
    shB.set(3 + d * 7);
    zIdx.set(d > 0.45 ? 50 : 4);
  });

  // Compose intro + flight dynamics
  const rotateYTotal = useTransform([yaw, unfold], ([y, u]) => y + (1 - u) * -165);
  const rotateXTotal = useTransform([bank, roll], ([b, r]) => b + r);
  const scaleTotal = useTransform([scale, introScale], ([a, b]) => a * b);
  const opacityTotal = useTransform([opacity, introOp], ([a, b]) => a * b);

  // Tap-to-fly: barrel roll + speed lines
  const barrelRoll = () => {
    roll.set(0);
    animate(roll, 360, {
      duration: 0.95,
      ease: [0.45, 0, 0.55, 1],
      onComplete: () => roll.set(0),
    });
    setBurst((n) => n + 1);
  };

  if (!path) return null;
  const planeScale = dims.w < 640 ? 0.72 : 1;

  return (
    <div
      aria-hidden="true"
      className="absolute top-0 left-0 w-full pointer-events-none"
      style={{ height: dims.h }}
      data-testid="paper-plane-layer"
    >
      <svg
        width={dims.w}
        height={dims.h}
        className="absolute top-0 left-0 z-30"
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        fill="none"
      >
        <path
          ref={basePathRef}
          d={path}
          stroke="var(--ink)"
          strokeOpacity="0.22"
          strokeWidth="1.4"
          strokeDasharray="2 9"
          strokeLinecap="round"
        />
        <motion.path
          d={path}
          stroke="var(--ink)"
          strokeWidth="1.7"
          strokeLinecap="round"
          style={{ pathLength: trailLength, opacity: 0.65 }}
        />
      </svg>

      <div
        className="absolute top-0 left-0"
        style={{ transform: `scale(${planeScale})`, transformOrigin: "50% 50%", zIndex: zIdx }}
      >
        <motion.div
          data-testid="paper-plane"
          onClick={barrelRoll}
          role="button"
          aria-label="Paper plane — tap for a barrel roll"
          title="Tap me!"
          style={{
            offsetPath: `path("${path}")`,
            offsetDistance,
            offsetRotate: "auto",
            offsetAnchor: "center",
            position: "absolute",
            top: 0,
            left: 0,
            perspective: 700,
            pointerEvents: "auto",
            cursor: "pointer",
          }}
        >
          <motion.div
            className="relative"
            style={{
              rotateX: rotateXTotal,
              rotateY: rotateYTotal,
              scale: scaleTotal,
              opacity: opacityTotal,
              filter,
              transformStyle: "preserve-3d",
              willChange: "transform, filter, opacity",
            }}
          >
            {burst > 0 && (
              <div
                key={burst}
                className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ right: "100%", marginRight: 8 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="block bg-azure"
                    style={{ width: 16 + i * 11, height: 2, marginBottom: i === 2 ? 0 : 6 }}
                    initial={{ opacity: 0, x: 16, scaleX: 0.3 }}
                    animate={{ opacity: [0, 0.95, 0], x: -26 - i * 8, scaleX: 1 }}
                    transition={{ duration: 0.55, delay: i * 0.07, ease: "easeOut" }}
                  />
                ))}
              </div>
            )}
            <Plane />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
