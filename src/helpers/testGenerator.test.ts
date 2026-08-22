import { describe, expect, it } from "vitest";
import { ULTIMATE_TASK_LIMIT } from "@/constants";
import { nmtVariants } from "@/data/nmtVariants";
import { questionsBank } from "@/data/questions";
import { evaluateTest, maxPointsForQuestion } from "@/helpers/scoring";
import {
  createFullSession,
  createSession,
  generatePracticeTest,
  generateRandomTest,
  remainingPoolSize,
  VARIANT_RANDOM,
} from "@/helpers/testGenerator";

describe("nmtVariants bank", () => {
  it("has 10×22 tasks and unique ids", () => {
    expect(nmtVariants).toHaveLength(10);
    // 10 variants × 22 questions = 220 base + additional questions for vectors/systems
    expect(questionsBank.length).toBeGreaterThanOrEqual(220);
    expect(new Set(questionsBank.map((q) => q.id)).size).toBe(questionsBank.length);
  });

  it("keeps official structure and perfect score 32→200", () => {
    for (const variant of nmtVariants) {
      expect(variant.questions).toHaveLength(22);
      const singles = variant.questions.filter((q) => q.type === "single");
      const matching = variant.questions.filter((q) => q.type === "matching");
      const shorts = variant.questions.filter((q) => q.type === "short");
      expect(singles).toHaveLength(15);
      expect(matching).toHaveLength(3);
      expect(shorts).toHaveLength(4);

      const max = variant.questions.reduce((sum, q) => sum + maxPointsForQuestion(q), 0);
      expect(max).toBe(32);

      const perfect = Object.fromEntries(
        variant.questions.map((q) => {
          if (q.type === "single") return [q.id, { type: "single", value: q.correctAnswer[0] }];
          if (q.type === "short") return [q.id, { type: "short", value: q.correctAnswer[0] }];
          return [q.id, { type: "matching", value: { ...(q.matchingCorrect ?? {}) } }];
        }),
      );
      const evaluated = evaluateTest(variant.questions, perfect as never, { rating: true });
      expect(evaluated.testScore).toBe(32);
      expect(evaluated.rating).toBe(200);
    }
  });
});

describe("testGenerator", () => {
  it("creates a timed full session from a concrete variant", () => {
    const session = createFullSession("variant-1");
    expect(session.mode).toBe("full");
    expect(session.variantId).toBe("variant-1");
    expect(session.questions).toHaveLength(22);
    expect(session.endsAt).toBeTypeOf("number");
    expect((session.endsAt as number) - session.startedAt).toBeGreaterThan(0);
  });

  it("picks among remaining variants for random full session", () => {
    const done = nmtVariants.slice(0, 9).map((item) => item.id);
    const session = createFullSession(VARIANT_RANDOM, done);
    expect(session.variantId).toBe(nmtVariants[9].id);
  });

  it("generates practice and random pools with filters", () => {
    const practice = generatePracticeTest({ category: "numbers", difficulty: "any", count: 10 });
    expect(practice.length).toBe(10);
    expect(practice.every((q) => q.category === "numbers")).toBe(true);

    const random = generateRandomTest(22);
    expect(random).toHaveLength(22);

    expect(remainingPoolSize("functions", "any")).toBeGreaterThan(0);
    expect(remainingPoolSize("all", "medium")).toBeGreaterThan(0);
  });

  it("createSession shuffles single options and respects endsAt override", () => {
    const base = questionsBank.find((q) => q.type === "single" && q.options);
    expect(base).toBeTruthy();
    const session = createSession("practice", [base!], { endsAt: null });
    expect(session.endsAt).toBeNull();
    expect(session.questions[0].options).toHaveLength(base!.options!.length);
  });

  it("documents ultimate task cap constant", () => {
    expect(ULTIMATE_TASK_LIMIT).toBe(20);
  });
});
