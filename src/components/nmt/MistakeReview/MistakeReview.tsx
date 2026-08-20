"use client";

import { Button, buttonCss } from "@/components/Button";
import { MathText } from "@/components/MathText";
import type { ReviewItem } from "@/types/result";
import css from "./MistakeReview.module.css";

export function MistakeReview({
  items,
  onRetry,
}: {
  items: ReviewItem[];
  onRetry: (questionId: string) => void;
}) {
  const mistakes = items.filter((item) => !item.isCorrect);
  if (mistakes.length === 0) {
    return <p className={css.ok}>Усі завдання виконано правильно.</p>;
  }

  return (
    <section className={css.section}>
      <h2 className={css.heading}>Розбір помилок</h2>
      <div className={css.list}>
        {mistakes.map((item, index) => (
          <article key={item.questionId} className={css.card}>
            <p className={css.badge}>
              Помилка {index + 1} з {mistakes.length}
            </p>
            <p>
              <MathText text={item.question} />
            </p>
            <p className={css.yours}>
              Твоя відповідь: <MathText text={item.userLabel} />
            </p>
            <p className={css.correct}>
              Правильна відповідь: <MathText text={item.correctLabel} />
            </p>
            <p className={css.note}>
              Пояснення: <MathText text={item.explanation} />
            </p>
            {item.formula ? (
              <p className={css.formula}>
                Формула: <MathText text={`$${item.formula}$`} />
              </p>
            ) : null}
            <Button className={buttonCss.retry} onClick={() => onRetry(item.questionId)}>
              Повторити це завдання
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
