export type AnswerKind = "choice" | "input";

export interface Task {
  id: string;
  title: string;
  prompt: string;
  kind: AnswerKind;
  options?: string[];
  correct: string[];
  correctLabel: string;
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
