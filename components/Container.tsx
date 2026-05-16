import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** The shared editorial measure: centered, capped at 1280px. */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-content px-6 md:px-12 lg:px-20 ${className ?? ""}`}>
      {children}
    </div>
  );
}
