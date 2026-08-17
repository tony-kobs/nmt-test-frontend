import type { CategoryId } from "@/types/question";
import type { TestMode } from "@/types/test";

export interface TopicStat {
  category: CategoryId;
  correct: number;
  total: number;
}

export interface ReviewItem {
  questionId: string;
  question: string;
  type: string;
  category: CategoryId;
  userLabel: string;
  correctLabel: string;
  explanation: string;
  formula?: string;
  isCorrect: boolean;
  earned: number;
  maxPoints: number;
}

export interface TestResult {
  id: string;
  date: string;
  mode: TestMode;
  testScore: number;
  maxScore: number;
  rating: number | null;
  correct: number;
  incorrect: number;
  skipped: number;
  durationMs: number;
  topicStats: TopicStat[];
  review: ReviewItem[];
}

export interface WeakTopic {
  category: CategoryId;
  label: string;
  percent: number;
  total: number;
}
