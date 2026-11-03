import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

// Counts the numeric part of a stat string up when scrolled into view,
// preserving any prefix/suffix ("~300ms" -> "~0ms" ... "~300ms").
export const CountUp = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const match = String(value).match(/[\d.]+/);
  const num = match ? parseFloat(match[0]) : null;
  const template = String(value);
  const [display, setDisplay] = useState(num === null ? template : template.replace(match[0], "0"));

  useEffect(() => {
    if (num === null || !inView) return;
    const controls = animate(0, num, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) =>
        setDisplay(
          template.replace(match[0], Number.isInteger(num) ? String(Math.round(v)) : v.toFixed(1))
        ),
    });
    return () => controls.stop();
  }, [inView, num, template, match]);

  return <span ref={ref}>{display}</span>;
};
