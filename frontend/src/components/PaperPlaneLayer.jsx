import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

function buildPath(w, h) {
  const pad = Math.max(30, w * 0.055);
  const minX = pad;
  const maxX = w - pad;
  const steps = 12;
  const top = 70;
  const bottom = h - Math.max(220, h * 0.035);
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const y = top + t * (bottom - top);
    const sway = w * 0.04 * Math.sin(i * 1.9 + 0.6);
    const x = i % 2 === 0 ? minX + Math.abs(sway) : maxX - Math.abs(sway);
    pts.push([x, y]);
  }
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

const Plane = ({ size }) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    fill="none"
    stroke="#121212"
    strokeWidth="1.7"
    strokeLinejoin="round"
    strokeLinecap="round"
    style={{ display: "block", filter: "drop-shadow(0 1px 0 rgba(18,18,18,0.25))" }}
  >
    <path d="M3 25 L45 6 L29 43 L21 29 Z" fill="#F9F7F1" />
    <path d="M45 6 L21 29" />
    <path d="M21 29 L19.5 40 L26 33.5" />
    <path d="M8 40 q4 3 8 0 t8 0" strokeWidth="1" opacity="0.5" />
  </svg>
);

export default function PaperPlaneLayer() {
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const raf = useRef(0);

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
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.6 });
  const offsetDistance = useTransform(smooth, [0, 1], ["0%", "100%"]);
  const trailLength = useTransform(smooth, [0, 1], [0.001, 1]);
  const planeScale = dims.w < 640 ? 0.8 : 1;

  const path = useMemo(
    () => (dims.w > 0 && dims.h > 0 ? buildPath(dims.w, dims.h) : ""),
    [dims]
  );

  if (!path) return null;

  return (
    <div
      aria-hidden="true"
      className="absolute top-0 left-0 w-full pointer-events-none z-30"
      style={{ height: dims.h }}
      data-testid="paper-plane-layer"
    >
      <svg
        width={dims.w}
        height={dims.h}
        className="absolute top-0 left-0"
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        fill="none"
      >
        <path d={path} stroke="#121212" strokeOpacity="0.3" strokeWidth="1.4" strokeDasharray="2 9" strokeLinecap="round" />
        <motion.path
          d={path}
          stroke="#121212"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{ pathLength: trailLength, opacity: 0.85 }}
        />
      </svg>
      <motion.div
        style={{
          offsetPath: `path("${path}")`,
          offsetDistance,
          offsetRotate: "auto",
          offsetAnchor: "center",
          position: "absolute",
          top: 0,
          left: 0,
          transform: `scale(${planeScale})`,
        }}
        data-testid="paper-plane"
      >
        <Plane size={52} />
      </motion.div>
    </div>
  );
}
