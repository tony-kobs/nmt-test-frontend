"use client";

import { MathText } from "@/components/MathText";
import { Select } from "@/components/Select";
import type { MatchingItem } from "@/types/question";
import css from "./MatchingQuestion.module.css";

const EMPTY_MATCH = "__empty__";

export function MatchingQuestion({
  left,
  right,
  value,
  onChange,
}: {
  left: MatchingItem[];
  right: MatchingItem[];
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
}) {
  return (
    <div className={css.wrap}>
      <div className={css.col}>
        {left.map((item) => (
          <label key={item.id} className={css.row}>
            <span className={css.id}>{item.id}.</span>
            <span className={css.text}>
              <MathText text={item.text} />
            </span>
            <Select
              instanceId={`match-${item.id}`}
              value={value[item.id] || EMPTY_MATCH}
              onChange={(chosen) =>
                onChange({ ...value, [item.id]: chosen === EMPTY_MATCH ? "" : chosen })
              }
              narrow
              placeholder="—"
              options={[
                { value: EMPTY_MATCH, label: "—" },
                ...right.map((choice) => ({ value: choice.id, label: choice.id })),
              ]}
            />
          </label>
        ))}
      </div>
      <div className={css.col}>
        {right.map((item) => (
          <p key={item.id} className={css.card}>
            <span className={css.strong}>{item.id}.</span> <MathText text={item.text} />
          </p>
        ))}
      </div>
    </div>
  );
}
