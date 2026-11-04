import { motion, useScroll, useSpring } from "framer-motion";

export default function PressProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-azure origin-left z-[60]"
      style={{ scaleX: w, boxShadow: "0 0 8px rgba(26,93,143,0.55)" }}
      data-testid="press-progress"
    />
  );
}
