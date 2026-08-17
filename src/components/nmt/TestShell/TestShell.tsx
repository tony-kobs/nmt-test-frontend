"use client";

import { AnswerOptions } from "@/components/nmt/AnswerOptions";
import { FormulasList } from "@/components/nmt/FormulasList";
import { MatchingQuestion } from "@/components/nmt/MatchingQuestion";
import { QuestionNavigation } from "@/components/nmt/QuestionNavigation";
import { ResultSummary } from "@/components/nmt/ResultSummary";
import { ShortAnswerQuestion } from "@/components/nmt/ShortAnswerQuestion";
import { Timer } from "@/components/nmt/Timer";
import { BackButton } from "@/components/BackButton";
import { Button, ButtonLink, buttonCss } from "@/components/Button";
import { Loader } from "@/components/Loader";
import { MathText } from "@/components/MathText";
import { PageLayout } from "@/components/PageLayout";
import { MODE_LABEL, TIMER_WARNING_MS } from "@/constants";
import { useNmtTest } from "@/hooks/useNmtTest";
import css from "./TestShell.module.css";

export function TestShell() {
  const test = useNmtTest();

  if (!test.session && !test.result) {
    return (
      <PageLayout>
        <header className={css.row}>
          <BackButton href="/nmt" />
          <span>НМТ 2026</span>
        </header>
        <main className={css.main}>
          <h1 className={css.title}>Тест не знайдено</h1>
          <p className={css.lead}>Немає активної спроби. Поверніться на тренажер і натисніть «Старт».</p>
          <ButtonLink href="/nmt" className={buttonCss.offset}>
            На тренажер
          </ButtonLink>
        </main>
      </PageLayout>
    );
  }

  if (test.result) {
    return (
      <ResultSummary
        result={test.result}
        onRestart={() => test.restartSameMode(test.result!)}
        onRetryQuestion={test.retryQuestion}
      />
    );
  }

  const session = test.session;
  if (!session) {
    return (
      <PageLayout>
        <Loader label="Завантаження тесту…" />
      </PageLayout>
    );
  }

  const question = session.questions[session.currentIndex];
  const answer = session.answers[question.id];
  const flagged = session.flagged.includes(question.id);
  const total = session.questions.length;
  const title = MODE_LABEL[session.mode];

  return (
    <PageLayout>
      <header className={css.top}>
        <div className={css.row}>
          <BackButton href="/nmt" />
          <div className={css.titleRow}>
            <span className={css.mode}>{title}</span>
            {session.endsAt ? <Timer endsAt={session.endsAt} onExpire={test.onExpire} /> : <span />}
          </div>
        </div>
        <div className={css.toolbar}>
          <span>
            Завдання {session.currentIndex + 1} з {total}
          </span>
          <Button onClick={() => test.flag(question.id)}>{flagged ? "Зняти позначку" : "Позначити"}</Button>
          <Button variant="start" onClick={() => test.setConfirmFinish(true)}>
            Завершити
          </Button>
        </div>
      </header>

      <main className={css.main}>
        <p className={css.kind}>
          {question.type === "matching"
            ? "Встановлення відповідності"
            : question.type === "short"
              ? "Коротка відповідь"
              : "Одна правильна відповідь"}
        </p>
        <h1 className={css.title}>Завдання {session.currentIndex + 1}</h1>
        <p className={css.prompt}>
          <MathText text={question.question} />
        </p>

        <div className={css.body}>
          {question.type === "single" && question.options ? (
            <AnswerOptions
              options={question.options}
              value={answer?.type === "single" ? answer.value : undefined}
              onChange={(value) => test.saveAnswer(question.id, { type: "single", value })}
            />
          ) : null}
          {question.type === "matching" && question.matchingLeft && question.matchingRight ? (
            <MatchingQuestion
              left={question.matchingLeft}
              right={question.matchingRight}
              value={answer?.type === "matching" ? answer.value : {}}
              onChange={(value) => test.saveAnswer(question.id, { type: "matching", value })}
            />
          ) : null}
          {question.type === "short" ? (
            <ShortAnswerQuestion
              value={answer?.type === "short" ? answer.value : ""}
              onChange={(value) => test.saveAnswer(question.id, { type: "short", value })}
            />
          ) : null}
        </div>

        <div className={css.nav}>
          <Button onClick={() => test.go(session.currentIndex - 1)} disabled={session.currentIndex === 0}>
            Назад
          </Button>
          <Button
            onClick={() => {
              if (session.currentIndex === total - 1) {
                test.finish(session);
                return;
              }
              test.go(session.currentIndex + 1);
            }}
          >
            Далі
          </Button>
          {session.allowFormulas ? (
            <Button onClick={() => test.setShowFormulas((value) => !value)}>Формули</Button>
          ) : null}
        </div>

        {session.endsAt && session.endsAt - Date.now() <= TIMER_WARNING_MS ? (
          <p className={css.warn}>До завершення менше 5 хвилин. Після закінчення часу тест закриється сам.</p>
        ) : null}

        <div className={css.pager}>
          <QuestionNavigation
            count={total}
            currentIndex={session.currentIndex}
            answers={session.answers}
            flagged={session.flagged}
            questionIds={session.questions.map((item) => item.id)}
            onSelect={test.go}
          />
        </div>

        {test.showFormulas ? (
          <div className={css.formulas}>
            <FormulasList />
          </div>
        ) : null}
      </main>

      {test.confirmFinish ? (
        <div className={css.overlay}>
          <div className={css.modal}>
            <h2 className={css.modalTitle}>Завершити тест?</h2>
            <p className={css.modalText}>Невідповідені завдання буде зараховано як пропущені.</p>
            <div className={css.modalActions}>
              <Button variant="start" onClick={() => test.finish(session)}>
                Так, завершити
              </Button>
              <Button onClick={() => test.setConfirmFinish(false)}>Повернутись</Button>
            </div>
          </div>
        </div>
      ) : null}
    </PageLayout>
  );
}
