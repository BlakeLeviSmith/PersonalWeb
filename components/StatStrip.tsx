import type { ProjectStat } from "@/lib/content";
import { CountUp } from "./motion/CountUp";

type StatStripProps = {
  stats: ProjectStat[];
  className?: string;
};

/** A project stat strip — numbers in display serif, hairline dividers between. */
export function StatStrip({ stats, className }: StatStripProps) {
  return (
    <div className={`flex border-t border-sand pt-8 ${className ?? ""}`}>
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex-1 ${i > 0 ? "border-l border-sand pl-5" : ""}`}
        >
          <span className="nums block font-serif text-[40px] leading-none tracking-[-0.03em] text-ink">
            <CountUp value={stat.value} />
          </span>
          <span className="mt-2.5 block text-caption uppercase tracking-caption text-stone">
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}
