import { describe, expect, it } from "vitest";
import { clampPercent, getScoreTrend, safePercent } from "@/helpers/hubStats";
import type { TestResult } from "@/types/result";

function result(overrides: Partial<TestResult> = {}): TestResult {
  return {
    id: "r1",
    date: new Date().toISOString(),
    mode: "full",
    testScore: 0,
    maxScore: 0,
    rating: null,
    correct: 0,
    incorrect: 0,
    skipped: 0,
    durationMs: 0,
    topicStats: [],
    review: [],
    ...overrides,
  };
}

describe("clampPercent", () => {
  it("clamps into 0-100", () => {
    expect(clampPercent(-10)).toBe(0);
    expect(clampPercent(140)).toBe(100);
    expect(clampPercent(42)).toBe(42);
  });

  it("treats non-finite values as 0", () => {
    expect(clampPercent(Number.NaN)).toBe(0);
    expect(clampPercent(Number.POSITIVE_INFINITY)).toBe(0);
  });
});

describe("safePercent", () => {
  it("computes a rounded percent", () => {
    expect(safePercent(2, 10)).toBe(20);
  });

  it("returns null for a zero or invalid denominator", () => {
    expect(safePercent(2, 0)).toBeNull();
    expect(safePercent(2, Number.NaN)).toBeNull();
  });
});

describe("getScoreTrend", () => {
  it("returns null with fewer than two results", () => {
    expect(getScoreTrend([])).toBeNull();
    expect(getScoreTrend([result({ testScore: 10, maxScore: 32 })])).toBeNull();
  });

  it("compares normalized score percentages, not raw scores", () => {
    const latest = result({ testScore: 10, maxScore: 20 });
    const previous = result({ testScore: 15, maxScore: 32 });
    expect(getScoreTrend([latest, previous])).toBe("up");
  });

  it("returns same when normalized percentages are equal", () => {
    const latest = result({ testScore: 16, maxScore: 32 });
    const previous = result({ testScore: 8, maxScore: 16 });
    expect(getScoreTrend([latest, previous])).toBe("same");
  });

  it("does not infer a trend when a denominator is invalid", () => {
    const latest = result({ testScore: 10, maxScore: 0 });
    const previous = result({ testScore: 15, maxScore: 32 });
    expect(getScoreTrend([latest, previous])).toBeNull();
  });

  it("returns null when latest testScore is NaN", () => {
    const latest = result({ testScore: Number.NaN, maxScore: 32 });
    const previous = result({ testScore: 15, maxScore: 32 });
    expect(getScoreTrend([latest, previous])).toBeNull();
  });

  it("returns null when latest testScore is infinite", () => {
    const latest = result({ testScore: Number.POSITIVE_INFINITY, maxScore: 32 });
    const previous = result({ testScore: 15, maxScore: 32 });
    expect(getScoreTrend([latest, previous])).toBeNull();
  });

  it("returns null when latest maxScore is infinite", () => {
    const latest = result({ testScore: 10, maxScore: Number.POSITIVE_INFINITY });
    const previous = result({ testScore: 15, maxScore: 32 });
    expect(getScoreTrend([latest, previous])).toBeNull();
  });

  it("returns null when latest maxScore is negative", () => {
    const latest = result({ testScore: 10, maxScore: -32 });
    const previous = result({ testScore: 15, maxScore: 32 });
    expect(getScoreTrend([latest, previous])).toBeNull();
  });

  it("returns null when previous result has invalid values", () => {
    const latest = result({ testScore: 10, maxScore: 32 });
    expect(getScoreTrend([latest, result({ testScore: Number.NaN, maxScore: 32 })])).toBeNull();
    expect(
      getScoreTrend([latest, result({ testScore: Number.POSITIVE_INFINITY, maxScore: 32 })]),
    ).toBeNull();
    expect(
      getScoreTrend([latest, result({ testScore: 15, maxScore: Number.POSITIVE_INFINITY })]),
    ).toBeNull();
    expect(getScoreTrend([latest, result({ testScore: 15, maxScore: -32 })])).toBeNull();
  });
});
