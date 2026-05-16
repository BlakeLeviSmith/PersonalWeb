"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Display string, e.g. "400", "50K+", "30,000+", "0.79", "93%". */
  value: string;
  className?: string;
  duration?: number;
};

/** Split a display string into its leading number and trailing suffix. */
function parse(value: string) {
  const match = value.match(/^([\d.,]+)(.*)$/);
  if (!match) {
    return { target: 0, suffix: value, separated: false, decimals: 0 };
  }
  const raw = match[1].replace(/,/g, "");
  const separated = match[1].includes(",");
  const dot = raw.indexOf(".");
  const decimals = dot === -1 ? 0 : raw.length - dot - 1;
  return {
    target: parseFloat(raw) || 0,
    suffix: match[2],
    separated,
    decimals,
  };
}

function format(n: number, separated: boolean, decimals: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: separated || n >= 1000,
  });
}

/**
 * Animates a number from zero when it scrolls into view. Handles thousands
 * separators and decimals. Honors reduced motion by snapping to the value.
 */
export function CountUp({ value, className, duration = 1.7 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const reduce = useReducedMotion();
  const { target, suffix, separated, decimals } = parse(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, target, reduce, duration]);

  return (
    <span ref={ref} className={className}>
      {format(display, separated, decimals)}
      {suffix}
    </span>
  );
}
