import { FULL_TEST_MAX_SCORE, MATH_RATING_TABLE, RATING_MIN_TEST_SCORE } from "@/constants";
import { isAnswerCorrect } from "@/helpers/checkAnswer";
import type { ReviewItem, TopicStat } from "@/types/result";
import type { CategoryId, Question } from "@/types/question";
import type { AnswerValue } from "@/types/test";

export function maxPointsForQuestion(question: Question) {
  if (question.type === "single") return 1;
  if (question.type === "short") return 2;
  return question.matchingLeft?.length ?? 3;
}

function letterUsage(value: Record<string, string>) {
  const counts = new Map<string, number>();
  for (const chosen of Object.values(value)) {
    if (!chosen) continue;
    counts.set(chosen, (counts.get(chosen) ?? 0) + 1);
  }
  return counts;
}

function pairLabel(leftId: string, letter?: string, rightText?: string) {
  if (!letter) return `${leftId} → —`;
  return rightText ? `${leftId} → ${letter}: ${rightText}` : `${leftId} → ${letter}`;
}

export function scoreQuestion(question: Question, answer?: AnswerValue) {
  if (question.type === "single") {
    const max = maxPointsForQuestion(question);
    if (!answer || answer.type !== "single" || !answer.value) {
      return { earned: 0, max, correct: false, skipped: true, userLabel: "пропущено" };
    }
    const correct =
      question.correctAnswer.includes(answer.value) || isAnswerCorrect(answer.value, question.correctAnswer);
    return { earned: correct ? max : 0, max, correct, skipped: false, userLabel: answer.value };
  }

  if (question.type === "short") {
    const max = maxPointsForQuestion(question);
    if (!answer || answer.type !== "short" || !answer.value.trim()) {
      return { earned: 0, max, correct: false, skipped: true, userLabel: "пропущено" };
    }
    const correct = isAnswerCorrect(answer.value, question.correctAnswer);
    return { earned: correct ? max : 0, max, correct, skipped: false, userLabel: answer.value };
  }

  const max = maxPointsForQuestion(question);
  if (!answer || answer.type !== "matching") {
    return { earned: 0, max, correct: false, skipped: true, userLabel: "пропущено" };
  }
  const map = question.matchingCorrect ?? {};
  const left = question.matchingLeft ?? [];
  const right = question.matchingRight ?? [];
  const usage = letterUsage(answer.value);
  let earned = 0;
  const parts: string[] = [];
  for (const item of left) {
    const chosen = answer.value[item.id];
    const uniqueColumn = Boolean(chosen) && (usage.get(chosen) ?? 0) === 1;
    if (uniqueColumn && map[item.id] === chosen) earned += 1;
    const rightText = right.find((option) => option.id === chosen)?.text;
    parts.push(pairLabel(item.id, chosen, rightText));
  }
  const skipped = left.every((item) => !answer.value[item.id]);
  return {
    earned,
    max,
    correct: earned === max && max > 0,
    skipped,
    userLabel: parts.join("; "),
  };
}

export function toRating(testScore: number, maxScore: number): number | null {
  if (maxScore !== FULL_TEST_MAX_SCORE) return null;
  if (testScore < RATING_MIN_TEST_SCORE) return null;
  return MATH_RATING_TABLE[testScore] ?? null;
}

export function evaluateTest(
  questions: Question[],
  answers: Record<string, AnswerValue>,
  options?: { rating?: boolean },
) {
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
            .map((item) => {
              const letter = question.matchingCorrect?.[item.id];
              const rightText = question.matchingRight?.find((option) => option.id === letter)?.text;
              return pairLabel(item.id, letter, rightText);
            })
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
    rating: options?.rating === false ? null : toRating(testScore, maxScore),
    correct,
    incorrect,
    skipped,
    topicStats,
    review,
  };
}
