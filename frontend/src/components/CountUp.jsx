import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

// Counts the numeric part of a stat string up when scrolled into view,
// preserving any prefix/suffix ("~300ms" -> "~0ms" ... "~300ms").
export const CountUp = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const parsed = useMemo(() => {
    const m = String(value).match(/[\d.]+/);
    if (!m) return null;
    const num = parseFloat(m[0]);
    return { template: String(value), token: m[0], num, isInt: Number.isInteger(num) };
  }, [value]);
  const [display, setDisplay] = useState(parsed ? parsed.template.replace(parsed.token, "0") : value);

  useEffect(() => {
    if (!parsed || !inView) return;
    const { template, token, num, isInt } = parsed;
    const controls = animate(0, num, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) =>
        setDisplay(template.replace(token, isInt ? String(Math.round(v)) : v.toFixed(1))),
      onComplete: () => setDisplay(template),
    });
    return () => controls.stop();
  }, [inView, parsed]);

  return <span ref={ref}>{display}</span>;
};
