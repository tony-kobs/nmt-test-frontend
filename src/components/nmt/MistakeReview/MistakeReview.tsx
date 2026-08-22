"use client";

import { Button, buttonCss } from "@/components/Button";
import { MathText } from "@/components/MathText";
import type { ReviewItem } from "@/types/result";
import css from "./MistakeReview.module.css";

function AnswerBlock({
  lead,
  text,
  tone,
}: {
  lead: string;
  text: string;
  tone: "bad" | "ok";
}) {
  return (
    <p className={css.answer}>
      <span className={css.answerLead}>{lead}</span>
      <span className={`${css.answerValue} ${tone === "ok" ? css.answerOk : css.answerBad}`}>
        <MathText text={text} />
      </span>
    </p>
  );
}

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
              {item.earned > 0 && item.earned < item.maxPoints
                ? `Частково: ${item.earned} з ${item.maxPoints}`
                : `Помилка ${index + 1} з ${mistakes.length}`}
            </p>
            <p>
              <MathText text={item.question} />
            </p>
            <p className={css.points}>
              Нараховано: {item.earned} з {item.maxPoints}
            </p>
            <AnswerBlock lead="Твоя відповідь" text={item.userLabel} tone="bad" />
            <AnswerBlock lead="Правильна відповідь" text={item.correctLabel} tone="ok" />
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
