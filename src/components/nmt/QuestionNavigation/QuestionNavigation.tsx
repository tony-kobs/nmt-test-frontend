"use client";

import { clsx } from "clsx";
import type { AnswerValue } from "@/types/test";
import css from "./QuestionNavigation.module.css";

export function QuestionNavigation({
  count,
  currentIndex,
  answers,
  flagged,
  questionIds,
  onSelect,
}: {
  count: number;
  currentIndex: number;
  answers: Record<string, AnswerValue>;
  flagged: string[];
  questionIds: string[];
  onSelect: (index: number) => void;
}) {
  return (
    <div className={css.list}>
      {Array.from({ length: count }, (_, index) => {
        const id = questionIds[index];
        const answered = Boolean(answers[id] && hasValue(answers[id]));
        const isFlagged = flagged.includes(id);
        const isCurrent = index === currentIndex;
        return (
          <button
            key={id}
            type="button"
            className={clsx(
              css.item,
              isCurrent && css.current,
              !isCurrent && isFlagged && css.flagged,
              !isCurrent && !isFlagged && answered && css.answered,
            )}
            onClick={() => onSelect(index)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}

function hasValue(answer: AnswerValue) {
  if (answer.type === "single") return Boolean(answer.value);
  if (answer.type === "short") return Boolean(answer.value.trim());
  return Object.values(answer.value).some(Boolean);
}
