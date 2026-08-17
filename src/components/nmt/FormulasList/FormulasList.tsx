"use client";

import { MathText } from "@/components/MathText";
import { formulas } from "@/data/formulas";
import css from "./FormulasList.module.css";

export function FormulasList() {
  const algebra = formulas.filter((item) => item.section === "algebra");
  const geometry = formulas.filter((item) => item.section === "geometry");

  return (
    <div className={css.wrap}>
      <section>
        <h2 className={css.title}>Алгебра</h2>
        <ul className={css.list}>
          {algebra.map((item) => (
            <li key={item.id}>
              {item.title}: <MathText text={`$${item.latex}$`} />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className={css.title}>Геометрія</h2>
        <ul className={css.list}>
          {geometry.map((item) => (
            <li key={item.id}>
              {item.title}: <MathText text={`$${item.latex}$`} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
