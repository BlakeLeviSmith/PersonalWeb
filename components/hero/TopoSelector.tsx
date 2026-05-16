"use client";

import type { TopoMode } from "./HeroTopoStage";

const OPTIONS: { value: TopoMode; label: string }[] = [
  { value: "topo", label: "Topo" },
  { value: "streets", label: "Streets" },
  { value: "both", label: "Both" },
];

type TopoSelectorProps = {
  mode: TopoMode;
  onChange: (mode: TopoMode) => void;
};

/**
 * A small three-way control for the hero visual. Absolutely positioned, so it
 * affects no other layout — remove this component and the hero stays on its
 * "both" default.
 */
export function TopoSelector({ mode, onChange }: TopoSelectorProps) {
  return (
    <div className="pointer-events-auto absolute right-5 top-[88px] z-30 flex items-center gap-1 rounded-full border border-sand bg-surface/85 p-1 backdrop-blur-sm md:right-12">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={mode === option.value}
          className={`rounded-full px-3 py-1.5 text-[10.5px] uppercase tracking-[0.1em] transition-colors duration-200 ${
            mode === option.value
              ? "bg-contrast text-canvas"
              : "text-stone hover:text-ink"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
