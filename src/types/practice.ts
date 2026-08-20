export type AnswerKind = "choice" | "input" | "matching";
export type PracticeMode = "full" | "ultimate" | "mistakes";

export interface MatchingItem {
  id: string;
  text: string;
}

export interface Task {
  id: string;
  title: string;
  prompt: string;
  kind: AnswerKind;
  options?: string[];
  matchingLeft?: MatchingItem[];
  matchingRight?: MatchingItem[];
  matchingCorrect?: Record<string, string>;
  correct: string[];
  correctLabel: string;
  explanation: string;
  formula?: string;
}

export interface Topic {
  id: string;
  number: number;
  title: string;
  tasks: Task[];
}

export interface AnswerRecord {
  taskId: string;
  userAnswer: string;
  isCorrect: boolean;
  timeMs: number;
}

export type TestPhase = "idle" | "answering" | "revealed" | "done";
