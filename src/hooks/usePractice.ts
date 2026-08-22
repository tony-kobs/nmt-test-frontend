"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ULTIMATE_DURATION_MS, ULTIMATE_TASK_LIMIT } from "@/constants";
import { getTopic, topics } from "@/data/practiceTopics";
import { isTaskCorrect } from "@/helpers/checkTask";
import { accuracyPercentile, formatDuration, formatUaSeconds, speedPercentile } from "@/helpers/formatTime";
import { clearPracticeDraft, readPracticeDraft, writePracticeDraft } from "@/helpers/practiceDraft";
import { shuffle } from "@/helpers/shuffle";
import type { AnswerRecord, PracticeMode, Task, TestPhase } from "@/types/practice";

function topicFromParam(value: string | null): string {
  if (value && topics.some((item) => item.id === value)) return value;
  return topics[0].id;
}

function prepareQueue(source: Task[]): Task[] {
  return source.map((task) => ({
    ...task,
    options: task.options ? shuffle(task.options) : undefined,
  }));
}

export function usePractice() {
  const params = useSearchParams();
  const topicParam = params.get("topic");
  const [topicId, setTopicId] = useState(() => topicFromParam(topicParam));
  const topic = getTopic(topicId);
  const bank = topic.tasks;

  const [phase, setPhase] = useState<TestPhase>("idle");
  const [queue, setQueue] = useState<Task[]>([]);
  const [index, setIndex] = useState(0);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [startedAt, setStartedAt] = useState(0);
  const [endsAt, setEndsAt] = useState(0);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [lastAnswer, setLastAnswer] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [matchingValue, setMatchingValue] = useState<Record<string, string>>({});
  const [mode, setMode] = useState<PracticeMode>("full");
  const [timedOut, setTimedOut] = useState(false);
  const [spentMs, setSpentMs] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const sessionStartRef = useRef(0);
  const sessionTasksRef = useRef<Task[]>([]);
  const busyRef = useRef(false);
  const finishedRef = useRef(false);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const liveRef = useRef({ queue, phase });
  liveRef.current = { queue, phase };

  const current = queue[index];
  const isUltimate = mode === "ultimate";
  const inTest = phase === "answering" || phase === "revealed";
  const isLast = index === queue.length - 1;
  const wrongCount = records.filter((record) => !record.isCorrect).length;
  const inTestRef = useRef(inTest);
  inTestRef.current = inTest;

  useEffect(() => {
    const draft = readPracticeDraft();
    if (draft) {
      setTopicId(draft.topicId);
      setMode(draft.mode);
      setQueue(draft.queue);
      setIndex(draft.index);
      setRecords(draft.records);
      setStartedAt(draft.startedAt);
      setEndsAt(draft.endsAt);
      sessionStartRef.current = draft.sessionStartAt;
      sessionTasksRef.current = draft.queue;
      setSelectedOption(draft.selectedOption);
      setInputValue(draft.inputValue);
      setMatchingValue(draft.matchingValue);
      setLastCorrect(draft.lastCorrect);
      setLastAnswer(draft.lastAnswer);
      setTimedOut(draft.timedOut);
      setSpentMs(draft.spentMs);
      finishedRef.current = draft.phase === "done";
      busyRef.current = false;
      setPhase(draft.phase);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (inTestRef.current) return;
    setTopicId(topicFromParam(topicParam));
  }, [topicParam, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (phase === "idle") {
      clearPracticeDraft();
      return;
    }
    writePracticeDraft({
      topicId,
      mode,
      phase,
      queue,
      index,
      records,
      startedAt,
      endsAt,
      sessionStartAt: sessionStartRef.current,
      selectedOption,
      inputValue,
      matchingValue,
      lastCorrect,
      lastAnswer,
      timedOut,
      spentMs,
    });
  }, [
    hydrated,
    topicId,
    mode,
    phase,
    queue,
    index,
    records,
    startedAt,
    endsAt,
    selectedOption,
    inputValue,
    matchingValue,
    lastCorrect,
    lastAnswer,
    timedOut,
    spentMs,
  ]);

  const stats = useMemo(() => {
    const total = records.length;
    const correct = records.filter((record) => record.isCorrect).length;
    const timed = records.filter((record) => record.timeMs > 0);
    const avgMs = timed.length === 0 ? 0 : timed.reduce((sum, record) => sum + record.timeMs, 0) / timed.length;
    return {
      correct,
      total,
      averageLabel: formatUaSeconds(avgMs),
      accuracyPercentile: accuracyPercentile(correct, total),
      speedPercentile: speedPercentile(avgMs / 1000),
      spentLabel: formatDuration(spentMs),
    };
  }, [records, spentMs]);

  function clearUnlockTimer() {
    if (unlockTimerRef.current === null) return;
    clearTimeout(unlockTimerRef.current);
    unlockTimerRef.current = null;
  }

  function scheduleUnlock() {
    clearUnlockTimer();
    unlockTimerRef.current = setTimeout(() => {
      unlockTimerRef.current = null;
      if (!finishedRef.current) busyRef.current = false;
    }, 400);
  }

  function resetInputs() {
    setSelectedOption(null);
    setInputValue("");
    setMatchingValue({});
    setLastCorrect(null);
    setLastAnswer(null);
  }

  function finish(nextTimedOut: boolean) {
    clearUnlockTimer();
    finishedRef.current = true;
    busyRef.current = true;
    setTimedOut(nextTimedOut);
    setSpentMs(nextTimedOut ? ULTIMATE_DURATION_MS : Date.now() - sessionStartRef.current);
    setPhase("done");
  }

  function begin(source: Task[], nextMode: PracticeMode) {
    const prepared = prepareQueue(source);
    const queueNext =
      nextMode === "ultimate" ? shuffle(prepared).slice(0, ULTIMATE_TASK_LIMIT) : prepared;
    clearUnlockTimer();
    busyRef.current = false;
    finishedRef.current = false;
    sessionTasksRef.current = queueNext;
    setMode(nextMode);
    setQueue(queueNext);
    setIndex(0);
    setRecords([]);
    resetInputs();
    setTimedOut(false);
    setSpentMs(0);
    const now = Date.now();
    sessionStartRef.current = now;
    setStartedAt(now);
    setEndsAt(nextMode === "ultimate" ? now + ULTIMATE_DURATION_MS : 0);
    setPhase("answering");
  }

  function handleTopicChange(id: string) {
    if (inTest) return;
    setTopicId(id);
  }

  function abortToTopics() {
    clearUnlockTimer();
    finishedRef.current = false;
    busyRef.current = false;
    clearPracticeDraft();
    setQueue([]);
    setIndex(0);
    setRecords([]);
    resetInputs();
    setTimedOut(false);
    setSpentMs(0);
    setEndsAt(0);
    setPhase("idle");
  }

  function startFull() {
    begin(bank, "full");
  }

  function startUltimate() {
    begin(bank, "ultimate");
  }

  function startMistakes() {
    const wrongIds = new Set(records.filter((record) => !record.isCorrect).map((record) => record.taskId));
    const source = sessionTasksRef.current.filter((task) => wrongIds.has(task.id));
    if (source.length === 0) return;
    begin(source, "mistakes");
  }

  function advance(fromIndex: number, length: number) {
    if (fromIndex >= length - 1) {
      finish(false);
      return;
    }
    setIndex(fromIndex + 1);
    resetInputs();
    setStartedAt(Date.now());
    setPhase("answering");
    scheduleUnlock();
  }

  function commit(userAnswer: string, isCorrect: boolean) {
    if (!current || finishedRef.current) return;
    busyRef.current = true;
    const fromIndex = index;
    const length = queue.length;
    setLastAnswer(userAnswer);
    setLastCorrect(isCorrect);
    if (current.kind === "choice") setSelectedOption(userAnswer);
    setRecords((prev) => [
      ...prev,
      {
        taskId: current.id,
        userAnswer,
        isCorrect,
        timeMs: Date.now() - startedAt,
      },
    ]);
    if (isUltimate) {
      advance(fromIndex, length);
      return;
    }
    setPhase("revealed");
  }

  function submitAnswer(raw: string) {
    if (busyRef.current || finishedRef.current || phase !== "answering" || !current) return;
    const userAnswer = raw.trim();
    if (!userAnswer) return;
    commit(userAnswer, isTaskCorrect(current, userAnswer));
  }

  function skip() {
    if (busyRef.current || finishedRef.current || !isUltimate || phase !== "answering" || !current) return;
    commit("", false);
  }

  function goNext() {
    if (phase !== "revealed" || finishedRef.current) return;
    advance(index, queue.length);
  }

  const expire = useCallback(() => {
    const { queue: liveQueue, phase: livePhase } = liveRef.current;
    if (finishedRef.current || livePhase === "done" || livePhase === "idle") return;
    clearUnlockTimer();
    finishedRef.current = true;
    busyRef.current = true;
    setTimedOut(true);
    setSpentMs(ULTIMATE_DURATION_MS);
    setRecords((prev) => {
      const answered = new Set(prev.map((record) => record.taskId));
      const extra = liveQueue
        .filter((task) => !answered.has(task.id))
        .map((task) => ({
          taskId: task.id,
          userAnswer: "",
          isCorrect: false,
          timeMs: 0,
        }));
      return extra.length > 0 ? [...prev, ...extra] : prev;
    });
    setPhase("done");
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (mode !== "ultimate") return;
    if (phase === "idle" || phase === "done") return;
    if (!endsAt || endsAt > Date.now()) return;
    expire();
  }, [hydrated, mode, phase, endsAt, expire]);

  return {
    topics,
    topic,
    topicId,
    phase,
    current,
    inTest,
    isLast,
    isUltimate,
    index,
    queueLength: queue.length,
    selectedOption,
    inputValue,
    matchingValue,
    lastCorrect,
    lastAnswer,
    stats,
    mode,
    wrongCount,
    records,
    endsAt,
    timedOut,
    hydrated,
    handleTopicChange,
    setInputValue,
    setMatchingValue,
    startFull,
    startUltimate,
    startMistakes,
    abortToTopics,
    submitAnswer,
    skip,
    goNext,
    expire,
  };
}
