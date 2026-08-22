import type { TestResult } from "@/types/result";

export type ScoreTrend = "up" | "down" | "same";

export function clampPercent(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

export function safePercent(numerator: number, denominator: number): number | null {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator <= 0) return null;
  return clampPercent(Math.round((numerator / denominator) * 100));
}

function normalizedRatio(testScore: number, maxScore: number): number | null {
  if (!Number.isFinite(testScore) || !Number.isFinite(maxScore) || maxScore <= 0) return null;
  return testScore / maxScore;
}

export function getScoreTrend(history: TestResult[]): ScoreTrend | null {
  const [latest, previous] = history;
  if (!latest || !previous) return null;

  const latestPercent = normalizedRatio(latest.testScore, latest.maxScore);
  const previousPercent = normalizedRatio(previous.testScore, previous.maxScore);
  if (latestPercent === null || previousPercent === null) return null;

  if (latestPercent > previousPercent) return "up";
  if (latestPercent < previousPercent) return "down";
  return "same";
}
