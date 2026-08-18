import { FULL_TEST_DURATION_MS } from "@/constants";
import { questionsBank } from "@/data/questions";
import { shuffle } from "@/helpers/shuffle";
import type { CategoryId, Difficulty, Question } from "@/types/question";
import type { ActiveSession, PracticeOptions, TestMode } from "@/types/test";

function uniqueTake(pool: Question[], count: number): Question[] {
  return shuffle(pool).slice(0, Math.min(count, pool.length));
}

function filterPracticePool(options: PracticeOptions): Question[] {
  return questionsBank.filter((item) => {
    const categoryOk = options.category === "all" || item.category === options.category;
    const difficultyOk = options.difficulty === "any" || item.difficulty === options.difficulty;
    return categoryOk && difficultyOk;
  });
}

export function generateFullTest(): Question[] {
  const singles = uniqueTake(
    questionsBank.filter((item) => item.type === "single"),
    15,
  );
  const matching = uniqueTake(
    questionsBank.filter((item) => item.type === "matching"),
    3,
  );
  const shorts = uniqueTake(
    questionsBank.filter((item) => item.type === "short"),
    4,
  );
  return [...singles, ...matching, ...shorts];
}

export function generatePracticeTest(options: PracticeOptions): Question[] {
  const pool = filterPracticePool(options);
  return uniqueTake(pool, Math.min(options.count, pool.length));
}

export function generateRandomTest(count: number): Question[] {
  return uniqueTake(questionsBank, count);
}

export function createSession(
  mode: TestMode,
  questions: Question[],
  extras?: Partial<Pick<ActiveSession, "category" | "difficulty" | "allowFormulas" | "endsAt">>,
): ActiveSession {
  const timed = mode === "full";
  const prepared = questions.map((question) =>
    question.type === "single" && question.options
      ? { ...question, options: shuffle(question.options) }
      : question,
  );
  return {
    mode,
    questions: prepared,
    answers: {},
    flagged: [],
    currentIndex: 0,
    startedAt: Date.now(),
    endsAt: extras?.endsAt ?? (timed ? Date.now() + FULL_TEST_DURATION_MS : null),
    category: extras?.category,
    difficulty: extras?.difficulty,
    allowFormulas: extras?.allowFormulas ?? true,
  };
}

export function remainingPoolSize(category: CategoryId | "all", difficulty: Difficulty | "any") {
  return filterPracticePool({ category, difficulty, count: 10 }).length;
}
