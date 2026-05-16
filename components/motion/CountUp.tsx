"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** Display string, e.g. "400", "50K+", "30,000+", "6 neighborhoods". */
  value: string;
  className?: string;
  duration?: number;
};

/** Split a display string into its leading number and trailing suffix. */
function parse(value: string) {
  const match = value.match(/^([\d,]+)(.*)$/);
  if (!match) {
    return { target: 0, suffix: value, separated: false };
  }
  const separated = match[1].includes(",");
  const target = parseInt(match[1].replace(/,/g, ""), 10);
  return { target, suffix: match[2], separated };
}

function format(n: number, separated: boolean) {
  if (separated || n >= 1000) {
    return n.toLocaleString("en-US");
  }
  return String(n);
}

/**
 * Animates an oversized number from zero when it scrolls into view. Honors
 * reduced motion by snapping straight to the final value.
 */
export function CountUp({ value, className, duration = 1.7 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const reduce = useReducedMotion();
  const { target, suffix, separated } = parse(value);
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
      {format(Math.round(display), separated)}
      {suffix}
    </span>
  );
}
