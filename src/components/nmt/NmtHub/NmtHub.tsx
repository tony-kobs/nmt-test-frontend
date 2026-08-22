"use client";

import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/Button";
import { PageLayout } from "@/components/PageLayout";
import { Select } from "@/components/Select";
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
        <div className={css.bar}>
          <BackButton href="/" />
          <label className={css.label}>
            <span className={css.fixed}>Обери режим:</span>
            <Select
              instanceId="nmt-mode"
              value={hub.mode}
              onChange={(value) => hub.setMode(value as HubMode)}
              wide
              disabledValues={hub.hasFullTest ? [] : ["weak"]}
              options={HUB_MODES.map((item) => ({ value: item.id, label: item.title }))}
            />
          </label>
          <div className={css.toolbar}>
            <Button variant="start" onClick={hub.start} disabled={hub.mode === "weak" && !hub.hasFullTest}>
              Старт
            </Button>
          </div>
        </div>
        {hub.error ? <p className={css.error}>{hub.error}</p> : null}
      </header>

      {hub.session ? (
        <div className={css.resume}>
          <span>
            Є незавершений тест
            {hub.session.variantTitle ? `: ${hub.session.variantTitle}` : ""}.
          </span>
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

        {hub.mode === "full" ? (
          <label className={css.variantBox}>
            <span className={css.variantLabel}>Варіант завдань</span>
            <Select
              instanceId="nmt-variant"
              value={hub.variantId}
              onChange={hub.setVariantId}
              wide
              options={hub.variantOptions}
            />
            <p className={css.lockHint}>
              Пройдено {hub.completedCount} з {hub.variantTotal}. У тесті зверху буде назва варіанта.
            </p>
          </label>
        ) : null}

        <div className={css.modes}>
          {HUB_MODES.map((item) => {
            const locked = item.id === "weak" && !hub.hasFullTest;
            return (
              <Button
                key={item.id}
                variant="cell"
                selected={hub.mode === item.id}
                disabled={locked}
                title={locked ? "Спочатку пройди повний НМТ" : undefined}
                onClick={() => hub.launch(item.id)}
              >
                {item.title}
              </Button>
            );
          })}
        </div>
        {!hub.hasFullTest ? (
          <p className={css.lockHint}>«Слабкі теми» стануть активними після першого повного НМТ.</p>
        ) : null}

        <StatsGrid
          className={css.stats}
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
                {hub.hasFullTest && hub.weak[0]
                  ? `Слабка тема: ${hub.weak[0].label} (${hub.weak[0].percent}%)`
                  : hub.hasFullTest
                    ? "Слабкі теми з’являться після помилок у тесті"
                    : "Слабкі теми — після повного НМТ"}
              </p>
            </>
          }
        />
      </main>
    </PageLayout>
  );
}
