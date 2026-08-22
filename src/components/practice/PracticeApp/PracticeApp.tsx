"use client";

import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import { AnswerChoices } from "@/components/practice/AnswerChoices";
import { AnswerInput } from "@/components/practice/AnswerInput";
import { MistakeReview } from "@/components/practice/MistakeReview";
import { ResultsBar } from "@/components/practice/ResultsBar";
import { TopicBar } from "@/components/practice/TopicBar";
import { MatchingQuestion } from "@/components/nmt/MatchingQuestion";
import { Button } from "@/components/Button";
import { MathText } from "@/components/MathText";
import { serializeMatchingAnswer } from "@/helpers/checkTask";
import { smoothScrollTop } from "@/helpers/scroll";
import { usePractice } from "@/hooks/usePractice";
import css from "./PracticeApp.module.css";

export function PracticeApp() {
  const practice = usePractice();
  const goNextRef = useRef(practice.goNext);
  goNextRef.current = practice.goNext;
  const [confirmAbort, setConfirmAbort] = useState(false);
  const canGoNext = practice.phase === "revealed";
  const inSession = practice.phase === "answering" || practice.phase === "revealed";

  useEffect(() => {
    if (practice.phase === "answering" || practice.phase === "done" || practice.phase === "idle") {
      smoothScrollTop();
    }
  }, [practice.index, practice.phase]);

  useEffect(() => {
    if (practice.phase !== "revealed") return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Enter" || event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return;
      }
      event.preventDefault();
      goNextRef.current();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [practice.phase]);

  return (
    <div className={clsx(css.page, inSession && css.pageSession)}>
      <TopicBar
        topics={practice.topics}
        topicId={practice.topicId}
        taskTotal={practice.topic.tasks.length}
        disabled={practice.phase !== "idle"}
        inTest={practice.inTest}
        isUltimate={practice.isUltimate}
        endsAt={practice.endsAt}
        compact={inSession}
        onTopicChange={practice.handleTopicChange}
        onStartFull={practice.startFull}
        onStartUltimate={practice.startUltimate}
        onAbort={() => setConfirmAbort(true)}
        onExpire={practice.expire}
      />

      <main className={css.main}>
        {practice.phase === "idle" && (
          <div className={css.intro}>
            <p className={css.hint}>
              <strong>Звичайний</strong> — розбір після кожного завдання. Завдання ті самі, що в тренажері НМТ за цією
              темою.
            </p>
            <p className={css.hint}>
              <strong>Ultimate</strong> — до 20 випадкових завдань, 20 хвилин, без підказок; розбір помилок лише в кінці.
            </p>
          </div>
        )}

        {inSession && practice.current ? (
          <div className={css.session}>
            <section className={css.stage} aria-label="Поле тестування">
              <div className={css.stageTop}>
                <p className={css.counter}>
                  Завдання {practice.index + 1} з {practice.queueLength}
                </p>
                {!practice.isUltimate ? (
                  <Button
                    variant="start"
                    className={css.nextBtn}
                    disabled={!canGoNext}
                    onClick={practice.goNext}
                  >
                    {practice.isLast && canGoNext ? "Результат" : "Далі"}
                  </Button>
                ) : practice.phase === "answering" ? (
                  <button type="button" className={css.skip} onClick={practice.skip}>
                    Пропустити
                  </button>
                ) : null}
              </div>

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
                    compact
                    onSelect={practice.submitAnswer}
                  />
                ) : null}

                {practice.current.kind === "input" ? (
                  <AnswerInput
                    value={practice.inputValue}
                    revealed={practice.phase === "revealed"}
                    isCorrect={practice.lastCorrect}
                    disabled={practice.phase !== "answering"}
                    onChange={practice.setInputValue}
                    onSubmit={() => practice.submitAnswer(practice.inputValue)}
                  />
                ) : null}

                {practice.current.kind === "matching" &&
                practice.current.matchingLeft &&
                practice.current.matchingRight ? (
                  <div className={css.matching}>
                    <MatchingQuestion
                      left={practice.current.matchingLeft}
                      right={practice.current.matchingRight}
                      value={practice.matchingValue}
                      onChange={practice.setMatchingValue}
                      disabled={practice.phase !== "answering"}
                      instancePrefix={`practice-${practice.current.id}`}
                    />
                    {practice.phase === "answering" ? (
                      <Button
                        variant="start"
                        className={css.matchSubmit}
                        disabled={
                          !practice.current.matchingLeft.every((item) => practice.matchingValue[item.id])
                        }
                        onClick={() => practice.submitAnswer(serializeMatchingAnswer(practice.matchingValue))}
                      >
                        Перевірити
                      </Button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </section>

            {practice.phase === "revealed" ? (
              <section className={css.feedback} aria-live="polite">
                <p className={clsx(css.message, practice.lastCorrect ? css.ok : css.bad)}>
                  {practice.lastCorrect ? "Правильно!" : "Ще не так."}
                </p>
                {!practice.lastCorrect ? (
                  <p className={css.answerRow}>
                    <span className={css.answerLead}>Правильна відповідь:</span>{" "}
                    <MathText text={practice.current.correctLabel} />
                  </p>
                ) : null}
                <p className={css.explain}>
                  <MathText text={practice.current.explanation} />
                </p>
              </section>
            ) : null}
          </div>
        ) : null}

        {practice.phase === "done" ? (
          <div className={css.done}>
            <h1 className={css.title}>{practice.timedOut ? "Час вийшов" : "Тест завершено"}</h1>
            <p className={css.note}>
              {practice.mode === "mistakes"
                ? "Це була повторна спроба лише з помилками."
                : practice.isUltimate
                  ? `Ultimate: ${practice.stats.correct} з ${practice.stats.total} за ${practice.stats.spentLabel}. Розбір — нижче.`
                  : `Ви відповіли на всі ${practice.stats.total} завдань. Нижче — підсумок спроби.`}
            </p>
            <div className={css.actions}>
              <Button variant="start" onClick={practice.startFull}>
                Звичайний
              </Button>
              <Button onClick={practice.startUltimate}>Ultimate</Button>
              {practice.wrongCount > 0 ? (
                <Button onClick={practice.startMistakes}>Повторити помилки ({practice.wrongCount})</Button>
              ) : null}
            </div>
          </div>
        ) : null}

        <ResultsBar
          visible={practice.phase === "done"}
          correct={practice.stats.correct}
          total={practice.stats.total}
          averageLabel={practice.isUltimate ? practice.stats.spentLabel : practice.stats.averageLabel}
          averageCaption={practice.isUltimate ? "Час" : "Середній час відповіді"}
          accuracyPercentile={practice.stats.accuracyPercentile}
          speedPercentile={practice.stats.speedPercentile}
        />

        {practice.phase === "done" && practice.isUltimate ? <MistakeReview records={practice.records} /> : null}
      </main>

      {confirmAbort ? (
        <div className={css.overlay} role="dialog" aria-modal="true" aria-labelledby="abort-title">
          <div className={css.modal}>
            <h2 id="abort-title" className={css.modalTitle}>
              Завершити тестування?
            </h2>
            <p className={css.modalText}>
              Прогрес поточної спроби буде скинуто. Ви повернетесь до вибору теми.
            </p>
            <div className={css.modalActions}>
              <Button
                variant="start"
                onClick={() => {
                  setConfirmAbort(false);
                  practice.abortToTopics();
                }}
              >
                Так, завершити
              </Button>
              <Button onClick={() => setConfirmAbort(false)}>Повернутись</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
