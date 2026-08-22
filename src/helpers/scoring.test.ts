import { describe, expect, it } from "vitest";
import { FULL_TEST_MAX_SCORE } from "@/constants";
import { evaluateTest, maxPointsForQuestion, scoreQuestion, toRating } from "@/helpers/scoring";
import type { Question } from "@/types/question";

function singleQ(overrides: Partial<Question> = {}): Question {
  return {
    id: "s1",
    category: "numbers",
    subcategory: "test",
    difficulty: "easy",
    type: "single",
    question: "2+2?",
    options: ["3", "4", "5", "6", "7"],
    correctAnswer: ["4"],
    explanation: "2+2=4",
    points: 1,
    ...overrides,
  };
}

function shortQ(overrides: Partial<Question> = {}): Question {
  return {
    id: "sh1",
    category: "equations",
    subcategory: "test",
    difficulty: "easy",
    type: "short",
    question: "x?",
    correctAnswer: ["5", "5.0"],
    explanation: "x=5",
    points: 2,
    ...overrides,
  };
}

function matchingQ(overrides: Partial<Question> = {}): Question {
  return {
    id: "m1",
    category: "numbers",
    subcategory: "test",
    difficulty: "medium",
    type: "matching",
    question: "match",
    matchingLeft: [
      { id: "1", text: "a" },
      { id: "2", text: "b" },
      { id: "3", text: "c" },
    ],
    matchingRight: [
      { id: "А", text: "1" },
      { id: "Б", text: "2" },
      { id: "В", text: "3" },
      { id: "Г", text: "4" },
      { id: "Д", text: "5" },
    ],
    matchingCorrect: { "1": "А", "2": "Б", "3": "В" },
    correctAnswer: ["1-А", "2-Б", "3-В"],
    explanation: "ok",
    points: 3,
    ...overrides,
  };
}

describe("maxPointsForQuestion", () => {
  it("returns NMT point caps", () => {
    expect(maxPointsForQuestion(singleQ())).toBe(1);
    expect(maxPointsForQuestion(shortQ())).toBe(2);
    expect(maxPointsForQuestion(matchingQ())).toBe(3);
  });
});

describe("scoreQuestion", () => {
  it("scores single choice", () => {
    expect(scoreQuestion(singleQ(), { type: "single", value: "4" }).earned).toBe(1);
    expect(scoreQuestion(singleQ(), { type: "single", value: "3" }).earned).toBe(0);
    expect(scoreQuestion(singleQ()).skipped).toBe(true);
  });

  it("scores short answers with normalization", () => {
    expect(scoreQuestion(shortQ(), { type: "short", value: "5" }).earned).toBe(2);
    expect(scoreQuestion(shortQ(), { type: "short", value: "5,0" }).earned).toBe(2);
    expect(scoreQuestion(shortQ(), { type: "short", value: "  " }).skipped).toBe(true);
  });

  it("gives partial credit for matching and rejects duplicate letters", () => {
    const q = matchingQ();
    const partial = scoreQuestion(q, {
      type: "matching",
      value: { "1": "А", "2": "Г", "3": "В" },
    });
    expect(partial.earned).toBe(2);
    expect(partial.correct).toBe(false);

    const dup = scoreQuestion(q, {
      type: "matching",
      value: { "1": "А", "2": "А", "3": "В" },
    });
    expect(dup.earned).toBe(1);
  });
});

describe("toRating / evaluateTest", () => {
  it("maps full-test scores to rating table", () => {
    expect(toRating(4, FULL_TEST_MAX_SCORE)).toBeNull();
    expect(toRating(5, FULL_TEST_MAX_SCORE)).toBe(100);
    expect(toRating(32, FULL_TEST_MAX_SCORE)).toBe(200);
    expect(toRating(32, 30)).toBeNull();
  });

  it("evaluates a tiny perfect suite", () => {
    const questions = [singleQ(), shortQ(), matchingQ()];
    const answers = {
      s1: { type: "single" as const, value: "4" },
      sh1: { type: "short" as const, value: "5" },
      m1: { type: "matching" as const, value: { "1": "А", "2": "Б", "3": "В" } },
    };
    const result = evaluateTest(questions, answers, { rating: false });
    expect(result.testScore).toBe(6);
    expect(result.maxScore).toBe(6);
    expect(result.correct).toBe(3);
    expect(result.rating).toBeNull();
  });
});
