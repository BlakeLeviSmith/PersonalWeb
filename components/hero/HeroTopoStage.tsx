"use client";

import { useState, type ReactNode } from "react";
import { TopoSelector } from "./TopoSelector";

export type TopoMode = "topo" | "streets" | "both";

type HeroTopoStageProps = {
  children: ReactNode;
};

/**
 * Holds the hero's topo-layer state and the (removable) selector. The big
 * topo SVG is passed in as `children` so it stays a server component. The
 * chosen mode lands on `data-topo-mode`, which globals.css uses to show or
 * hide the contour / street layers. Default is "both"; deleting <TopoSelector>
 * leaves the hero on "both" with no other change.
 */
export function HeroTopoStage({ children }: HeroTopoStageProps) {
  const [mode, setMode] = useState<TopoMode>("both");

  return (
    <div data-topo-mode={mode} className="absolute inset-0">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-[0.5] md:w-[64%] md:opacity-100"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 26%)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 26%)",
        }}
      >
        {children}
      </div>
      <TopoSelector mode={mode} onChange={setMode} />
    </div>
  );
}
