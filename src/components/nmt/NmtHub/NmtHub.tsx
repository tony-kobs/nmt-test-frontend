"use client";

import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { PageLayout } from "@/components/PageLayout";
import { Select, selectCss } from "@/components/Select";
import { StatsGrid } from "@/components/StatsGrid";
import { HUB_MODES } from "@/constants";
import { useNmtHub } from "@/hooks/useNmtHub";
import type { HubMode } from "@/types/test";
import css from "./NmtHub.module.css";

export function NmtHub() {
  const hub = useNmtHub();

  return (
    <PageLayout>
      <header className={css.header}>
        <div className={css.row}>
          <BackButton href="/" />
          <label className={css.label}>
            <span className={css.fixed}>Обери режим:</span>
            <Select
              instanceId="nmt-mode"
              value={hub.mode}
              onChange={(value) => hub.setMode(value as HubMode)}
              wide
              options={HUB_MODES.map((item) => ({ value: item.id, label: item.title }))}
            />
          </label>
        </div>
        <div className={css.toolbar}>
          <span>Пройти</span>
          <span className={selectCss.countBox}>
            {hub.mode === "practice" || hub.mode === "weak" ? "—" : "22"}
          </span>
          <span>завдань</span>
          <Button variant="start" onClick={hub.start}>
            Старт
          </Button>
        </div>
        {hub.error ? <p className={css.error}>{hub.error}</p> : null}
      </header>

      {hub.session ? (
        <div className={css.resume}>
          <span>Є незавершений тест.</span>
          <Button variant="start" onClick={hub.continueTest}>
            Продовжити
          </Button>
          <Button variant="ghost" onClick={hub.cancelSession}>
            Скасувати
          </Button>
        </div>
      ) : null}

      <main className={css.main}>
        <h1 className={css.title}>НМТ 2026</h1>
        <p className={css.lead}>{hub.selected.description}</p>

        <div className={css.modes}>
          {HUB_MODES.map((item) => (
            <Button key={item.id} variant="cell" selected={hub.mode === item.id} onClick={() => hub.launch(item.id)}>
              {item.title}
            </Button>
          ))}
        </div>

        <StatsGrid
          left={
            <>
              <p>
                Правильних відповідей:{" "}
                {hub.last ? `${hub.last.correct} з ${hub.last.correct + hub.last.incorrect + hub.last.skipped}` : "—"}
              </p>
              <p>Останній результат: {hub.last ? `${hub.last.testScore} з ${hub.last.maxScore}` : "ще немає"}</p>
            </>
          }
          right={
            <>
              <p>{hub.last?.rating ? `Рейтинг: ${hub.last.rating} з 200` : "Рейтинг 100–200 після повного НМТ"}</p>
              <p>
                {hub.weak[0]
                  ? `Слабка тема: ${hub.weak[0].label} (${hub.weak[0].percent}%)`
                  : "Слабкі теми з’являться після спроб"}
              </p>
            </>
          }
        />
      </main>
    </PageLayout>
  );
}
