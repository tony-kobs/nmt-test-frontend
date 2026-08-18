"use client";

import { BackButton } from "@/components/BackButton";
import { Button, buttonCss } from "@/components/Button";
import { MistakeReview } from "@/components/nmt/MistakeReview";
import { PageLayout } from "@/components/PageLayout";
import { StatsGrid } from "@/components/StatsGrid";
import { MODE_LABEL } from "@/constants";
import { formatDuration } from "@/helpers/formatTime";
import { CATEGORY_LABELS } from "@/types/question";
import type { TestResult } from "@/types/result";
import css from "./ResultSummary.module.css";

export function ResultSummary({
  result,
  onRestart,
  onRetryQuestion,
}: {
  result: TestResult;
  onRestart: () => void;
  onRetryQuestion: (questionId: string) => void;
}) {
  return (
    <PageLayout>
      <header className={css.top}>
        <BackButton href="/" />
        <span>{MODE_LABEL[result.mode]}</span>
      </header>

      <main className={css.main}>
        <h1 className={css.title}>Твій результат</h1>
        <p className={css.score}>
          {result.testScore} з {result.maxScore} тестових балів
        </p>
        <Button variant="start" className={buttonCss.offset} onClick={onRestart}>
          Пройти ще раз
        </Button>

        <StatsGrid
          left={
            <>
              <p>
                Правильних відповідей: {result.correct} з {result.correct + result.incorrect + result.skipped}
              </p>
              <p>Час: {formatDuration(result.durationMs)}</p>
            </>
          }
          right={
            <>
              <p>
                {result.rating
                  ? `Рейтинг: ${result.rating} з 200`
                  : result.maxScore === 32
                    ? "Поріг 5 балів не подолано"
                    : "Рейтинг лише для повного НМТ"}
              </p>
              <p>
                Неправильні: {result.incorrect}, пропущені: {result.skipped}
              </p>
            </>
          }
        />

        <div className={css.topics}>
          {result.topicStats.map((item) => {
            const percent = item.total === 0 ? 0 : Math.round((item.correct / item.total) * 100);
            return (
              <p key={item.category} className={css.topic}>
                {CATEGORY_LABELS[item.category]}: {percent}%
              </p>
            );
          })}
        </div>

        <div className={css.review}>
          <MistakeReview items={result.review} onRetry={onRetryQuestion} />
        </div>
      </main>
    </PageLayout>
  );
}
