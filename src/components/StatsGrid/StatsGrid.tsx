import type { ReactNode } from "react";
import css from "./StatsGrid.module.css";

export function StatsGrid({ left, right }: { left: ReactNode; right: ReactNode }) {
  return (
    <section className={css.grid}>
      <div className={css.col}>{left}</div>
      <div className={css.col}>{right}</div>
    </section>
  );
}

export { css as statsCss };
