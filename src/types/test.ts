import type { CategoryId, Difficulty, Question } from "@/types/question";

export type TestMode = "full" | "practice" | "random";
export type HubMode = TestMode | "weak";

export type AnswerValue =
  | { type: "single"; value: string }
  | { type: "matching"; value: Record<string, string> }
  | { type: "short"; value: string };

export interface ActiveSession {
  mode: TestMode;
  questions: Question[];
  answers: Record<string, AnswerValue>;
  flagged: string[];
  currentIndex: number;
  startedAt: number;
  endsAt: number | null;
  category?: CategoryId;
  difficulty?: Difficulty | "any";
  allowFormulas: boolean;
}

export interface PracticeOptions {
  category: CategoryId | "all";
  difficulty: Difficulty | "any";
  count: 10 | 20 | 30;
}
