import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLocation } from "react-router-dom";

/* Fountain-pen cursor: nib anchored at the pointer, leans into clicks,
   lifts over interactive elements, fades over text fields. Fine pointers only. */
export default function PenCursor() {
  const { pathname } = useLocation();
  const newspaper = pathname === "/";
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 560, damping: 42, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 560, damping: 42, mass: 0.35 });
  const [press, setPress] = useState(false);
  const [hot, setHot] = useState(false);
  const [dim, setDim] = useState(false);
  const [fine, setFine] = useState(false);
  const [ink, setInk] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(mq.matches);
    if (!mq.matches) return;
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target;
      const el = t?.closest?.("a,button,[role='button'],label");
      const field = t?.closest?.("input,textarea,select");
      setHot(!!el);
      setDim(!!field);
    };
    const down = () => {
      setPress(true);
      setInk((n) => n + 1);
    };
    const up = () => setPress(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [x, y]);

  if (!fine || !newspaper) return null;

  return (
    <>
      <motion.div className="fixed left-0 top-0 z-[90] pointer-events-none" style={{ x: sx, y: sy }}>
        <motion.div
          style={{ marginLeft: -20, marginTop: -46, transformOrigin: "20px 46px", rotate: -32 }}
          animate={{
            scale: press ? 0.85 : hot ? 1.15 : 1,
            opacity: dim ? 0.2 : 1,
            rotate: press ? -27 : -32,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
        >
          <svg
            width="40"
            height="48"
            viewBox="0 0 40 48"
            fill="none"
            style={{ display: "block", filter: "drop-shadow(0 1px 2px rgba(18,18,18,0.28))" }}
          >
            {/* nib body — upright, curved shoulders, tip at (20,46) */}
            <path
              d="M20 46 L7.5 12 Q11.5 4.5 20 4.5 Q28.5 4.5 32.5 12 Z"
              fill="var(--ink)"
              stroke="var(--paper)"
              strokeWidth="1.1"
              strokeLinejoin="round"
            />
            {/* sheen along the left shoulder */}
            <path d="M11 13 Q14 8 18.5 6.5" stroke="var(--paper)" strokeWidth="1" opacity="0.4" fill="none" />
            {/* breather hole + slit */}
            <circle cx="20" cy="18" r="2.4" fill="var(--paper)" />
            <line x1="20" y1="21" x2="20" y2="34" stroke="var(--paper)" strokeWidth="1.3" />
            {/* base fold where nib meets the (hidden) grip */}
            <rect x="11" y="9.5" width="18" height="2" rx="1" fill="var(--azure)" transform="rotate(0 20 10)" />
          </svg>
        </motion.div>
      </motion.div>
      {/* ink ripple on nib press */}
      {ink > 0 && (
        <motion.div
          key={ink}
          className="fixed rounded-full border-2 border-azure pointer-events-none z-[89]"
          style={{ x: sx, y: sy, width: 10, height: 10, marginLeft: -5, marginTop: -5 }}
          initial={{ scale: 0.6, opacity: 0.75 }}
          animate={{ scale: 3.4, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}
    </>
  );
}
