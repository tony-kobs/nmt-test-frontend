import { isAnswerCorrect } from "@/helpers/checkAnswer";
import type { Task } from "@/types/practice";

export function parseMatchingAnswer(raw: string): Record<string, string> {
  try {
    const parsed = JSON.parse(raw) as Record<string, string>;
    if (parsed && typeof parsed === "object") return parsed;
  } catch {
    /* plain map string */
  }
  const value: Record<string, string> = {};
  for (const part of raw.split(";")) {
    const [left, right] = part.split("=").map((item) => item.trim());
    if (left && right) value[left] = right;
  }
  return value;
}

export function serializeMatchingAnswer(value: Record<string, string>): string {
  return JSON.stringify(value);
}

export function matchingAnswerLabel(task: Task, raw: string): string {
  if (!raw.trim()) return "пропущено";
  const value = parseMatchingAnswer(raw);
  const left = task.matchingLeft ?? [];
  const right = task.matchingRight ?? [];
  return left
    .map((item) => {
      const letter = value[item.id];
      const text = right.find((option) => option.id === letter)?.text;
      return letter ? `${item.id} → ${letter}${text ? `: ${text}` : ""}` : `${item.id} → —`;
    })
    .join("; ");
}

export function isTaskCorrect(task: Task, raw: string): boolean {
  if (task.kind === "matching") {
    const value = parseMatchingAnswer(raw);
    const map = task.matchingCorrect ?? {};
    const left = task.matchingLeft ?? [];
    if (left.length === 0) return false;
    const used = new Set<string>();
    for (const item of left) {
      const chosen = value[item.id];
      if (!chosen || map[item.id] !== chosen || used.has(chosen)) return false;
      used.add(chosen);
    }
    return true;
  }
  return isAnswerCorrect(raw, task.correct);
}
