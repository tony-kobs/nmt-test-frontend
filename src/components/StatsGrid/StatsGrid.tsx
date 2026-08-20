import type { ReactNode } from "react";
import { clsx } from "clsx";
import css from "./StatsGrid.module.css";

export function StatsGrid({
  left,
  right,
  className,
}: {
  left: ReactNode;
  right: ReactNode;
  className?: string;
}) {
  return (
    <section className={clsx(css.grid, className)}>
      <div className={css.col}>{left}</div>
      <div className={css.col}>{right}</div>
    </section>
  );
}

export { css as statsCss };
