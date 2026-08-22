"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { MathText } from "@/components/MathText";
import { formulas, type FormulaItem, type FormulaSection } from "@/data/formulas";
import css from "./FormulasList.module.css";

type Group = { subsection: string; items: FormulaItem[] };

type SectionConfig = { key: FormulaSection; label: string; accent: string };

const SECTIONS: SectionConfig[] = [
  { key: "algebra", label: "Алгебра", accent: css.algebra },
  { key: "geometry", label: "Геометрія", accent: css.geometry },
];

function groupBySection(section: FormulaSection, query: string): Group[] {
  const normalized = query.trim().toLowerCase();
  const groups = new Map<string, FormulaItem[]>();

  for (const item of formulas) {
    if (item.section !== section) continue;

    if (normalized) {
      const matchesTitle = item.title.toLowerCase().includes(normalized);
      const matchesSubsection = item.subsection.toLowerCase().includes(normalized);
      if (!matchesTitle && !matchesSubsection) continue;
    }

    const list = groups.get(item.subsection) ?? [];
    list.push(item);
    groups.set(item.subsection, list);
  }

  return Array.from(groups.entries()).map(([subsection, items]) => ({ subsection, items }));
}

export function FormulasList() {
  const [query, setQuery] = useState("");

  const sections = useMemo(
    () => SECTIONS.map((section) => ({ ...section, groups: groupBySection(section.key, query) })),
    [query],
  );

  const hasResults = sections.some((section) => section.groups.length > 0);

  return (
    <div className={css.wrap}>
      <div className={css.searchRow}>
        <label htmlFor="formula-search" className={css.searchLabel}>
          Пошук формули
        </label>
        <input
          id="formula-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Наприклад, дискримінант або площа"
          className={css.searchInput}
          autoComplete="off"
        />
      </div>

      {hasResults ? (
        <div className={css.grid}>
          {sections.map((section) =>
            section.groups.length === 0 ? null : (
              <section key={section.key} className={css.column}>
                <h2 className={clsx(css.sectionTitle, section.accent)}>{section.label}</h2>
                <div className={css.cards}>
                  {section.groups.map((group) => (
                    <article key={group.subsection} className={clsx(css.card, section.accent)}>
                      <h3 className={css.cardTitle}>{group.subsection}</h3>
                      <ul className={css.rows}>
                        {group.items.map((item) => (
                          <li key={item.id} className={css.row}>
                            <span className={css.rowTitle}>{item.title}</span>
                            <MathText text={`$${item.latex}$`} className={css.rowFormula} />
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>
            ),
          )}
        </div>
      ) : (
        <p className={css.empty}>Формул за запитом «{query}» не знайдено.</p>
      )}
    </div>
  );
}
