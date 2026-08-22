"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { HUB_MODES } from "@/constants";
import { nmtVariants, VARIANT_RANDOM } from "@/data/nmtVariants";
import { clampPercent, getScoreTrend, safePercent } from "@/helpers/hubStats";
import { persistAndGo } from "@/helpers/navigation";
import { createFullSession, createSession, generateRandomTest } from "@/helpers/testGenerator";
import { getWeakTopics } from "@/helpers/weakTopics";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCurrentResult } from "@/redux/results/slice";
import { clearSession, setSession } from "@/redux/session/slice";
import type { HubMode } from "@/types/test";

export function useNmtHub() {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.session.current);
  const history = useAppSelector((state) => state.results.history);
  const topicStats = useAppSelector((state) => state.results.topicStats);
  const [mode, setMode] = useState<HubMode>("full");
  const [variantId, setVariantId] = useState(VARIANT_RANDOM);
  const [error, setError] = useState("");
  const selected = HUB_MODES.find((item) => item.id === mode) ?? HUB_MODES[0];
  const weak = getWeakTopics(topicStats);
  const last = history[0];
  const hasFullTest = history.some((item) => item.mode === "full");
  const completedIds = [
    ...new Set(history.filter((item) => item.mode === "full" && item.variantId).map((item) => item.variantId!)),
  ];
  const completedCount = completedIds.length;
  const weakTopic = weak[0];
  const correctPercent = last ? safePercent(last.correct, last.correct + last.incorrect + last.skipped) : null;
  const scorePercent = last ? safePercent(last.testScore, last.maxScore) : null;
  const scoreTrend = getScoreTrend(history);
  const weakTopicErrorPercent = weakTopic ? clampPercent(100 - weakTopic.percent) : null;

  function lastScoreFor(id: string) {
    return history.find((item) => item.mode === "full" && item.variantId === id);
  }

  const variantOptions = [
    {
      value: VARIANT_RANDOM,
      label: completedCount < nmtVariants.length ? "Випадковий (з непройдених)" : "Випадковий варіант",
    },
    ...nmtVariants.map((item) => {
      const done = lastScoreFor(item.id);
      return {
        value: item.id,
        label: done
          ? `${item.title} · пройдено (${done.testScore} з ${done.maxScore})`
          : `${item.title} · не пройдено`,
      };
    }),
  ];

  function chooseMode(nextMode: HubMode) {
    if (nextMode === "weak" && !hasFullTest) return;
    if (nextMode === "weak") {
      goToWeakPractice();
      return;
    }
    setMode(nextMode);
    setError("");
  }

  function goToWeakPractice() {
    window.location.assign(weakTopic ? `/practice?topic=${weakTopic.category}` : "/practice");
  }

  async function launch(nextMode: HubMode) {
    if (nextMode === "weak") {
      if (!hasFullTest) {
        setError("Слабкі теми відкриються після першого повного НМТ.");
        toast.error("Спочатку пройди повний НМТ");
        return;
      }
      goToWeakPractice();
      return;
    }
    if (nextMode === "practice") {
      window.location.assign("/practice");
      return;
    }
    chooseMode(nextMode);
    try {
      const test =
        nextMode === "full"
          ? createFullSession(variantId, completedIds)
          : createSession("random", generateRandomTest(22), { endsAt: null });
      if (test.questions.length === 0) {
        setError("Не вдалося зібрати завдання. Оновіть сторінку і спробуйте ще раз.");
        toast.error("Не вдалося зібрати завдання");
        return;
      }
      dispatch(clearCurrentResult());
      dispatch(setSession(test));
      await persistAndGo("/nmt/test");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Не вдалося запустити тест.";
      setError(message);
      toast.error(message);
    }
  }

  function cancelSession() {
    dispatch(clearSession());
  }

  return {
    session,
    mode,
    setMode: chooseMode,
    variantId,
    setVariantId,
    variantOptions,
    completedCount,
    variantTotal: nmtVariants.length,
    selected,
    error,
    weak,
    last,
    correctPercent,
    scorePercent,
    scoreTrend,
    weakTopic,
    weakTopicErrorPercent,
    hasFullTest,
    launch,
    start: () => launch(mode),
    continueTest: () => window.location.assign("/nmt/test"),
    cancelSession,
  };
}
