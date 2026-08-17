"use client";

import { BackButton } from "@/components/BackButton";
import { PageLayout } from "@/components/PageLayout";
import { StatsGrid } from "@/components/StatsGrid";
import { MODE_LABEL } from "@/constants";
import { formatDuration } from "@/helpers/formatTime";
import { useAppSelector } from "@/redux/hooks";
import css from "./ResultsHistory.module.css";

export function ResultsHistory() {
  const history = useAppSelector((state) => state.results.history);
  const last = history[0];

  return (
    <PageLayout>
      <header className={css.top}>
        <BackButton href="/nmt" />
        <span>Мої результати</span>
      </header>

      <main className={css.main}>
        <h1 className={css.title}>Історія спроб</h1>
        {history.length === 0 ? (
          <p className={css.empty}>Ще немає збережених спроб. Пройдіть тест і результат з’явиться тут.</p>
        ) : (
          <>
            <StatsGrid
              left={
                <>
                  <p>
                    Останній результат: {last.testScore} з {last.maxScore}
                  </p>
                  <p>Час: {formatDuration(last.durationMs)}</p>
                </>
              }
              right={
                <>
                  <p>{last.rating ? `Рейтинг: ${last.rating} з 200` : "Рейтинг після повного НМТ"}</p>
                  <p>Усього спроб: {history.length}</p>
                </>
              }
            />
            <div className={css.list}>
              {history.map((item) => (
                <p key={item.id} className={css.item}>
                  {new Date(item.date).toLocaleDateString("uk-UA")} · {MODE_LABEL[item.mode]} · {item.testScore}/
                  {item.maxScore} · {formatDuration(item.durationMs)}
                </p>
              ))}
            </div>
          </>
        )}
      </main>
    </PageLayout>
  );
}
