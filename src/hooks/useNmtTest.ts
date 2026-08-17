"use client";

import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";
import { questionsBank } from "@/data/questions";
import { evaluateTest } from "@/helpers/scoring";
import { createSession, generateFullTest, generatePracticeTest, generateRandomTest } from "@/helpers/testGenerator";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addResult, mergeTopicStats } from "@/redux/results/slice";
import { clearSession, setAnswer, setCurrentIndex, setSession, toggleFlag } from "@/redux/session/slice";
import type { TestResult } from "@/types/result";
import type { ActiveSession, AnswerValue } from "@/types/test";

export function useNmtTest() {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.session.current);
  const [result, setResult] = useState<TestResult | null>(null);
  const [showFormulas, setShowFormulas] = useState(false);
  const [confirmFinish, setConfirmFinish] = useState(false);
  const finishing = useRef(false);

  const beginSession = useCallback(
    (next: ActiveSession) => {
      finishing.current = false;
      dispatch(setSession(next));
      setShowFormulas(false);
      setConfirmFinish(false);
      setResult(null);
    },
    [dispatch],
  );

  const finish = useCallback(
    (current: ActiveSession) => {
      if (finishing.current) return;
      finishing.current = true;
      const evaluated = evaluateTest(current.questions, current.answers);
      const nextResult: TestResult = {
        id: nanoid(),
        date: new Date().toISOString(),
        mode: current.mode,
        durationMs: Date.now() - current.startedAt,
        ...evaluated,
      };
      dispatch(addResult(nextResult));
      dispatch(mergeTopicStats(evaluated.topicStats));
      dispatch(clearSession());
      setResult(nextResult);
      toast.success("Тест завершено");
    },
    [dispatch],
  );

  const restartSameMode = useCallback(
    (current: TestResult) => {
      if (current.mode === "full") {
        beginSession(createSession("full", generateFullTest()));
        return;
      }
      if (current.mode === "random") {
        beginSession(createSession("random", generateRandomTest(current.review.length || 22), { endsAt: null }));
        return;
      }
      const n = current.review.length;
      const count: 10 | 20 | 30 = n <= 10 ? 10 : n <= 20 ? 20 : 30;
      beginSession(
        createSession("practice", generatePracticeTest({ category: "all", difficulty: "any", count }), {
          endsAt: null,
        }),
      );
    },
    [beginSession],
  );

  const retryQuestion = useCallback(
    (questionId: string) => {
      const question = questionsBank.find((item) => item.id === questionId);
      if (!question) return;
      beginSession(createSession("practice", [question], { endsAt: null }));
    },
    [beginSession],
  );

  const onExpire = useCallback(() => {
    if (!session || result) return;
    finish(session);
  }, [finish, result, session]);

  function saveAnswer(questionId: string, value: AnswerValue) {
    dispatch(setAnswer({ questionId, value }));
  }

  function go(index: number) {
    dispatch(setCurrentIndex(index));
  }

  function flag(questionId: string) {
    dispatch(toggleFlag(questionId));
  }

  return {
    session,
    result,
    showFormulas,
    confirmFinish,
    setShowFormulas,
    setConfirmFinish,
    finish,
    restartSameMode,
    retryQuestion,
    onExpire,
    saveAnswer,
    go,
    flag,
  };
}
