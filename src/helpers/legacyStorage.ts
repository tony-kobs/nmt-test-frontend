import { STORAGE_KEYS } from "@/constants";
import type { TestResult } from "@/types/result";
import type { ActiveSession } from "@/types/test";
import type { CategoryId } from "@/types/question";

export type LegacySnapshot = {
  session: ActiveSession | null;
  history: TestResult[];
  topicStats: Record<CategoryId, { correct: number; total: number }>;
  theme: "light" | "dark";
};

function parseJson<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function readLegacyStorage(): LegacySnapshot | null {
  if (typeof window === "undefined") return null;

  const session = parseJson<ActiveSession | null>(localStorage.getItem(STORAGE_KEYS.legacySession), null);
  const history = parseJson<TestResult[]>(localStorage.getItem(STORAGE_KEYS.legacyHistory), []);
  const topicStats = parseJson<Record<CategoryId, { correct: number; total: number }>>(
    localStorage.getItem(STORAGE_KEYS.legacyTopicStats),
    {} as Record<CategoryId, { correct: number; total: number }>,
  );
  const theme = localStorage.getItem(STORAGE_KEYS.theme) === "dark" ? "dark" : "light";
  const hasData = Boolean(session) || history.length > 0 || Object.keys(topicStats).length > 0;
  if (!hasData) return null;
  return { session, history, topicStats, theme };
}

export function clearLegacyStorage() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEYS.legacySession);
  localStorage.removeItem(STORAGE_KEYS.legacyHistory);
  localStorage.removeItem(STORAGE_KEYS.legacyTopicStats);
}

export function writeThemeKey(theme: "light" | "dark") {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.theme, theme);
  document.documentElement.classList.toggle("dark", theme === "dark");
}
