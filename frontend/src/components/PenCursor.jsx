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
          style={{ marginLeft: -30, marginTop: -79, transformOrigin: "30px 79px", rotate: -38 }}
          animate={{
            scale: press ? 0.85 : hot ? 1.12 : 1,
            opacity: dim ? 0.2 : 1,
            rotate: press ? -34 : -38,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 24 }}
        >
          <svg width="60" height="80" viewBox="0 0 60 80" fill="none" style={{ display: "block" }}>
            <path d="M22 0 L38 0 L39 38 L21 38 Z" fill="var(--ink)" />
            <rect x="21" y="6" width="18" height="3.5" fill="var(--azure)" />
            <rect x="21" y="38" width="18" height="12" fill="var(--azure)" />
            <path d="M30 79 L21 50 L39 50 Z" fill="var(--ink)" stroke="var(--paper)" strokeWidth="1" />
            <circle cx="30" cy="60" r="2.2" fill="var(--paper)" />
            <line x1="30" y1="62.5" x2="30" y2="70" stroke="var(--paper)" strokeWidth="1" />
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
