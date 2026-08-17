"use client";

import css from "./ShortAnswerQuestion.module.css";

export function ShortAnswerQuestion({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Впишіть відповідь"
      className={css.input}
      autoComplete="off"
    />
  );
}
