import { MATH_RATING_TABLE, RATING_MIN_TEST_SCORE } from "@/constants";
import { isAnswerCorrect } from "@/helpers/checkAnswer";
import type { ReviewItem, TopicStat } from "@/types/result";
import type { CategoryId, Question } from "@/types/question";
import type { AnswerValue } from "@/types/test";

export function scoreQuestion(question: Question, answer?: AnswerValue) {
  if (question.type === "single") {
    const max = 1;
    if (!answer || answer.type !== "single" || !answer.value) {
      return { earned: 0, max, correct: false, skipped: true, userLabel: "пропущено" };
    }
    const correct =
      question.correctAnswer.includes(answer.value) || isAnswerCorrect(answer.value, question.correctAnswer);
    return { earned: correct ? 1 : 0, max, correct, skipped: false, userLabel: answer.value };
  }

  if (question.type === "short") {
    const max = 2;
    if (!answer || answer.type !== "short" || !answer.value.trim()) {
      return { earned: 0, max, correct: false, skipped: true, userLabel: "пропущено" };
    }
    const correct = isAnswerCorrect(answer.value, question.correctAnswer);
    return { earned: correct ? 2 : 0, max, correct, skipped: false, userLabel: answer.value };
  }

  const max = 4;
  if (!answer || answer.type !== "matching") {
    return { earned: 0, max, correct: false, skipped: true, userLabel: "пропущено" };
  }
  const map = question.matchingCorrect ?? {};
  const left = question.matchingLeft ?? [];
  const right = question.matchingRight ?? [];
  let earned = 0;
  const parts: string[] = [];
  for (const item of left) {
    const chosen = answer.value[item.id];
    if (chosen && map[item.id] === chosen) earned += 1;
    const rightText = right.find((option) => option.id === chosen)?.text ?? "—";
    parts.push(`${item.id}→${chosen || "—"}${chosen ? ` (${rightText})` : ""}`);
  }
  const skipped = left.every((item) => !answer.value[item.id]);
  return {
    earned,
    max,
    correct: earned === max,
    skipped,
    userLabel: parts.join("; "),
  };
}

export function toRating(testScore: number, maxScore: number): number | null {
  if (maxScore !== 32) return null;
  if (testScore < RATING_MIN_TEST_SCORE) return null;
  return MATH_RATING_TABLE[testScore] ?? null;
}

export function evaluateTest(questions: Question[], answers: Record<string, AnswerValue>) {
  let testScore = 0;
  let maxScore = 0;
  let correct = 0;
  let incorrect = 0;
  let skipped = 0;
  const byCategory = new Map<CategoryId, { correct: number; total: number }>();
  const review: ReviewItem[] = [];

  for (const question of questions) {
    const result = scoreQuestion(question, answers[question.id]);
    testScore += result.earned;
    maxScore += result.max;
    if (result.skipped) skipped += 1;
    else if (result.correct) correct += 1;
    else incorrect += 1;

    const cat = byCategory.get(question.category) ?? { correct: 0, total: 0 };
    cat.total += 1;
    if (result.correct) cat.correct += 1;
    byCategory.set(question.category, cat);

    const correctLabel =
      question.type === "matching"
        ? (question.matchingLeft ?? [])
            .map((item) => `${item.id}→${question.matchingCorrect?.[item.id]}`)
            .join("; ")
        : question.correctAnswer[0] ?? "";

    review.push({
      questionId: question.id,
      question: question.question,
      type: question.type,
      category: question.category,
      userLabel: result.userLabel,
      correctLabel,
      explanation: question.explanation,
      formula: question.formula,
      isCorrect: result.correct,
      earned: result.earned,
      maxPoints: result.max,
    });
  }

  const topicStats: TopicStat[] = [...byCategory.entries()].map(([category, value]) => ({
    category,
    correct: value.correct,
    total: value.total,
  }));

  return {
    testScore,
    maxScore,
    rating: toRating(testScore, maxScore),
    correct,
    incorrect,
    skipped,
    topicStats,
    review,
  };
}
