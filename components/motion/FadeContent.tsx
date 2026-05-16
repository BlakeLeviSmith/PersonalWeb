"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeContentProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel distance before settling. */
  y?: number;
};

/**
 * Section reveal — fades and lifts content into place on scroll. Longer and
 * softer than library defaults: motion reveals content, it does not perform.
 */
export function FadeContent({
  children,
  className,
  delay = 0,
  y = 26,
}: FadeContentProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
