"use client";

import { AnswerChoices } from "@/components/practice/AnswerChoices";
import { AnswerInput } from "@/components/practice/AnswerInput";
import { ResultsBar } from "@/components/practice/ResultsBar";
import { TopicBar } from "@/components/practice/TopicBar";
import { Button } from "@/components/Button";
import { MathText } from "@/components/MathText";
import { clsx } from "clsx";
import { usePractice } from "@/hooks/usePractice";
import css from "./PracticeApp.module.css";

export function PracticeApp() {
  const practice = usePractice();

  return (
    <div className={css.page}>
      <TopicBar
        topics={practice.topics}
        topicId={practice.topicId}
        taskCount={practice.taskCount}
        maxCount={practice.maxCount}
        disabled={practice.inTest}
        onTopicChange={practice.handleTopicChange}
        onTaskCountChange={practice.setTaskCount}
        onStart={practice.startTest}
        onBack={practice.resetToIdle}
      />

      <main className={css.main}>
        {practice.phase === "idle" && (
          <p className={css.hint}>
            Оберіть тему, кількість завдань і натисніть «Старт». Відповідь фіксується одразу: можна обрати варіант або
            вписати значення.
          </p>
        )}

        {(practice.phase === "answering" || practice.phase === "revealed") && practice.current && (
          <>
            <p className={css.counter}>
              Завдання {practice.index + 1} з {practice.queueLength}
            </p>
            <h1 className={css.title}>
              <MathText text={practice.current.title} />
            </h1>
            <p className={css.prompt}>
              <MathText text={practice.current.prompt} />
            </p>

            <div className={css.body}>
              {practice.current.kind === "choice" && practice.current.options ? (
                <AnswerChoices
                  options={practice.current.options}
                  selected={practice.selectedOption}
                  correct={practice.current.correct}
                  revealed={practice.phase === "revealed"}
                  disabled={practice.phase !== "answering"}
                  onSelect={practice.submitAnswer}
                />
              ) : (
                <AnswerInput
                  value={practice.inputValue}
                  revealed={practice.phase === "revealed"}
                  isCorrect={practice.lastCorrect}
                  disabled={practice.phase !== "answering"}
                  onChange={practice.setInputValue}
                  onSubmit={() => practice.submitAnswer(practice.inputValue)}
                />
              )}
            </div>

            {practice.phase === "revealed" && (
              <div className={css.feedback}>
                <p className={clsx(css.message, practice.lastCorrect ? css.ok : css.bad)}>
                  {practice.lastCorrect
                    ? "Правильно!"
                    : `Неправильно. Правильна відповідь: ${practice.current.correctLabel}`}
                </p>
                <Button onClick={practice.goNext}>{practice.isLast ? "Показати результат" : "Далі"}</Button>
              </div>
            )}
          </>
        )}

        {practice.phase === "done" && (
          <div className={css.done}>
            <h1 className={css.title}>Тест завершено</h1>
            <p className={css.note}>Ви відповіли на всі {practice.stats.total} завдань. Нижче — підсумок спроби.</p>
            <Button variant="start" onClick={practice.startTest}>
              Пройти ще раз
            </Button>
          </div>
        )}

        <ResultsBar
          visible={practice.phase === "done"}
          correct={practice.stats.correct}
          total={practice.stats.total}
          averageLabel={practice.stats.averageLabel}
          accuracyPercentile={practice.stats.accuracyPercentile}
          speedPercentile={practice.stats.speedPercentile}
        />
      </main>
    </div>
  );
}
