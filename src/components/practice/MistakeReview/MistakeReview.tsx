"use client";

import { MathText } from "@/components/MathText";
import { topics } from "@/data/practiceTopics";
import { matchingAnswerLabel } from "@/helpers/checkTask";
import type { AnswerRecord, Task } from "@/types/practice";
import css from "./MistakeReview.module.css";

function findTask(taskId: string): Task | undefined {
  for (const topic of topics) {
    const task = topic.tasks.find((item) => item.id === taskId);
    if (task) return task;
  }
  return undefined;
}

export function MistakeReview({ records }: { records: AnswerRecord[] }) {
  const mistakes = records.filter((record) => !record.isCorrect);
  if (mistakes.length === 0) {
    return <p className={css.ok}>Усі завдання виконано правильно.</p>;
  }

  return (
    <section className={css.section}>
      <h2 className={css.heading}>Розбір помилок</h2>
      <div className={css.list}>
        {mistakes.map((record, index) => {
          const task = findTask(record.taskId);
          if (!task) return null;
          const yours =
            task.kind === "matching"
              ? matchingAnswerLabel(task, record.userAnswer)
              : record.userAnswer.trim() || "пропущено";
          return (
            <article key={`${record.taskId}-${index}`} className={css.card}>
              <p className={css.badge}>
                Помилка {index + 1} з {mistakes.length}
              </p>
              <p className={css.title}>
                <MathText text={task.title} />
              </p>
              <p>
                <MathText text={task.prompt} />
              </p>
              <p className={css.answer}>
                <span className={css.answerLead}>Твоя відповідь</span>
                <span className={`${css.answerValue} ${css.answerBad}`}>
                  <MathText text={yours} />
                </span>
              </p>
              <p className={css.answer}>
                <span className={css.answerLead}>Правильна відповідь</span>
                <span className={`${css.answerValue} ${css.answerOk}`}>
                  <MathText text={task.correctLabel} />
                </span>
              </p>
              <p className={css.note}>
                <MathText text={task.explanation} />
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
