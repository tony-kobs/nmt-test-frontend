export type QuestionType = "single" | "matching" | "short";
export type Difficulty = "easy" | "medium" | "hard";

export type CategoryId =
  | "numbers"
  | "equations"
  | "functions"
  | "planimetry"
  | "stereometry"
  | "probability";

export interface MatchingItem {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  category: CategoryId;
  subcategory: string;
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  options?: string[];
  matchingLeft?: MatchingItem[];
  matchingRight?: MatchingItem[];
  matchingCorrect?: Record<string, string>;
  correctAnswer: string[];
  explanation: string;
  formula?: string;
  points: number;
}

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  numbers: "Числа та вирази",
  equations: "Рівняння та нерівності",
  functions: "Функції",
  planimetry: "Планіметрія",
  stereometry: "Стереометрія",
  probability: "Комбінаторика, ймовірність і статистика",
};

export const OPTION_LETTERS = ["А", "Б", "В", "Г", "Д"] as const;
