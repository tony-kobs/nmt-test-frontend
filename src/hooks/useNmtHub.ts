"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { HUB_MODES } from "@/constants";
import { persistAndGo } from "@/helpers/navigation";
import { createSession, generateFullTest, generateRandomTest } from "@/helpers/testGenerator";
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
  const [error, setError] = useState("");
  const selected = HUB_MODES.find((item) => item.id === mode) ?? HUB_MODES[0];
  const weak = getWeakTopics(topicStats);
  const last = history[0];

  async function launch(nextMode: HubMode) {
    setMode(nextMode);
    setError("");
    try {
      if (nextMode === "practice") {
        window.location.assign("/nmt/practice");
        return;
      }
      if (nextMode === "weak") {
        const worst = getWeakTopics(topicStats)[0];
        window.location.assign(worst ? `/nmt/practice?category=${worst.category}` : "/nmt/practice");
        return;
      }
      const test =
        nextMode === "full"
          ? createSession("full", generateFullTest())
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
    setMode,
    selected,
    error,
    weak,
    last,
    launch,
    start: () => launch(mode),
    continueTest: () => window.location.assign("/nmt/test"),
    cancelSession,
  };
}
