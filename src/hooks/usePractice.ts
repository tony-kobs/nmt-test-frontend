"use client";

import { useMemo, useState } from "react";
import { topics } from "@/data/topics";
import { PRACTICE_MAX_TASKS, PRACTICE_MIN_TASKS } from "@/constants";
import { isAnswerCorrect } from "@/helpers/checkAnswer";
import { accuracyPercentile, formatUaSeconds, speedPercentile } from "@/helpers/formatTime";
import { clampInt, shuffle } from "@/helpers/shuffle";
import type { AnswerRecord, Task, TestPhase } from "@/types/practice";

function allowedTaskCount(topicLength: number): number {
  return Math.min(PRACTICE_MAX_TASKS, Math.max(PRACTICE_MIN_TASKS, topicLength));
}

function prepareTasks(topicId: string, count: number): Task[] {
  const topic = topics.find((item) => item.id === topicId);
  if (!topic) return [];
  return shuffle(topic.tasks)
    .slice(0, count)
    .map((task) => ({
      ...task,
      options: task.options ? shuffle(task.options) : undefined,
    }));
}

export function usePractice() {
  const [topicId, setTopicId] = useState(topics[0].id);
  const selectedTopic = topics.find((topic) => topic.id === topicId) ?? topics[0];
  const maxCount = allowedTaskCount(selectedTopic.tasks.length);
  const [taskCount, setTaskCount] = useState(maxCount);
  const [phase, setPhase] = useState<TestPhase>("idle");
  const [queue, setQueue] = useState<Task[]>([]);
  const [index, setIndex] = useState(0);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [startedAt, setStartedAt] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const current = queue[index];
  const inTest = phase === "answering" || phase === "revealed";
  const isLast = index === queue.length - 1;

  const stats = useMemo(() => {
    const total = records.length;
    const correct = records.filter((record) => record.isCorrect).length;
    const avgMs = total === 0 ? 0 : records.reduce((sum, record) => sum + record.timeMs, 0) / total;
    return {
      correct,
      total,
      averageLabel: formatUaSeconds(avgMs),
      accuracyPercentile: accuracyPercentile(correct, total),
      speedPercentile: speedPercentile(avgMs / 1000),
    };
  }, [records]);

  function handleTopicChange(id: string) {
    const topic = topics.find((item) => item.id === id);
    if (!topic) return;
    setTopicId(id);
    setTaskCount((count) => clampInt(count, PRACTICE_MIN_TASKS, allowedTaskCount(topic.tasks.length)));
  }

  function startTest() {
    const count = clampInt(taskCount, PRACTICE_MIN_TASKS, maxCount);
    setTaskCount(count);
    setQueue(prepareTasks(topicId, count));
    setIndex(0);
    setRecords([]);
    setSelectedOption(null);
    setInputValue("");
    setLastCorrect(null);
    setStartedAt(Date.now());
    setPhase("answering");
  }

  function resetToIdle() {
    setPhase("idle");
    setQueue([]);
    setIndex(0);
    setRecords([]);
    setSelectedOption(null);
    setInputValue("");
    setLastCorrect(null);
  }

  function submitAnswer(raw: string) {
    if (phase !== "answering" || !current) return;
    const userAnswer = raw.trim();
    if (!userAnswer) return;
    const isCorrect = isAnswerCorrect(userAnswer, current.correct);
    setSelectedOption(userAnswer);
    setLastCorrect(isCorrect);
    setRecords((prev) => [
      ...prev,
      {
        taskId: current.id,
        userAnswer,
        isCorrect,
        timeMs: Date.now() - startedAt,
      },
    ]);
    setPhase("revealed");
  }

  function goNext() {
    if (!isLast) {
      setIndex((value) => value + 1);
      setSelectedOption(null);
      setInputValue("");
      setLastCorrect(null);
      setStartedAt(Date.now());
      setPhase("answering");
      return;
    }
    setPhase("done");
  }

  return {
    topics,
    topicId,
    taskCount,
    maxCount,
    phase,
    current,
    inTest,
    isLast,
    index,
    queueLength: queue.length,
    selectedOption,
    inputValue,
    lastCorrect,
    stats,
    handleTopicChange,
    setTaskCount: (count: number) => setTaskCount(clampInt(count, PRACTICE_MIN_TASKS, maxCount)),
    setInputValue,
    startTest,
    resetToIdle,
    submitAnswer,
    goNext,
  };
}
