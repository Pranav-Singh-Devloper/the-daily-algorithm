import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

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
    <g stroke="#121212" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
      {/* far wing — shaded, tilted away */}
      <path d="M70 30 L4 50 L38 30 Z" fill="#c9c3b2" />
      {/* keel — mid tone, folds under */}
      <path d="M70 30 L38 30 L44 58 Z" fill="#eee9da" />
      {/* near wing — paper white, catches light */}
      <path d="M70 30 L4 8 L38 30 Z" fill="#ffffff" />
      {/* fold highlights */}
      <path d="M70 30 L38 30" strokeWidth="1.6" />
      <path d="M4 8 L38 30" strokeWidth="1.2" opacity="0.45" />
      <path d="M4 50 L38 30" strokeWidth="1.2" opacity="0.6" />
      {/* motion whisker on trailing edge */}
      <path d="M14 55 q5 4 10 0 t10 0" strokeWidth="1.1" opacity="0.4" strokeLinecap="round" />
    </g>
  </svg>
);

export default function PaperPlaneLayer() {
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const raf = useRef(0);
  const basePathRef = useRef(null);

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
  const offsetDistance = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const trailLength = useTransform(smooth, [0, 1], [0.001, 1]);

  // 3D flight dynamics (all updated imperatively — zero re-renders on scroll)
  const bank = useMotionValue(0); // roll into turns
  const yaw = useMotionValue(0); // nose toward/away from viewer
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

  useMotionValueEvent(smooth, "change", (p) => {
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
    const curv = dA / (2 * e); // rad per px of arc
    bank.set(clamp(curv * 4200, -60, 60));
    const dx = pa.x - pc.x;
    const dy = pa.y - pc.y;
    const sp = Math.hypot(dx, dy) || 1;
    yaw.set((dx / sp) * -26);
    // Depth cycle: two full passes from foreground into the distance
    const d = 0.5 + 0.5 * Math.sin(p * Math.PI * 3.2 + 0.8);
    scale.set(0.7 + d * 0.55);
    opacity.set(0.45 + d * 0.55);
    blurPx.set((1 - d) * 2.2);
    shY.set(2 + d * 5);
    shB.set(3 + d * 7);
    zIdx.set(d > 0.45 ? 50 : 4);
  });

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
          stroke="#121212"
          strokeOpacity="0.28"
          strokeWidth="1.4"
          strokeDasharray="2 9"
          strokeLinecap="round"
        />
        <motion.path
          d={path}
          stroke="#121212"
          strokeWidth="1.7"
          strokeLinecap="round"
          style={{ pathLength: trailLength, opacity: 0.8 }}
        />
      </svg>

      <div
        className="absolute top-0 left-0"
        style={{ transform: `scale(${planeScale})`, transformOrigin: "50% 50%" }}
      >
        <motion.div
          data-testid="paper-plane"
          style={{
            offsetPath: `path("${path}")`,
            offsetDistance,
            offsetRotate: "auto",
            offsetAnchor: "center",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: zIdx,
            perspective: 700,
          }}
        >
          <motion.div
            style={{
              rotateX: bank,
              rotateY: yaw,
              scale,
              opacity,
              filter,
              transformStyle: "preserve-3d",
              willChange: "transform, filter, opacity",
            }}
          >
            <Plane />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
