import { STORAGE_KEYS } from "@/constants";
import type { AnswerRecord, PracticeMode, Task, TestPhase } from "@/types/practice";

export type PracticeDraft = {
  version: 1;
  topicId: string;
  mode: PracticeMode;
  phase: TestPhase;
  queue: Task[];
  index: number;
  records: AnswerRecord[];
  startedAt: number;
  endsAt: number;
  sessionStartAt: number;
  selectedOption: string | null;
  inputValue: string;
  matchingValue: Record<string, string>;
  lastCorrect: boolean | null;
  lastAnswer: string | null;
  timedOut: boolean;
  spentMs: number;
  savedAt: number;
};

const DRAFT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readPracticeDraft(): PracticeDraft | null {
  if (!canUseStorage()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.practiceDraft);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PracticeDraft;
    if (!parsed || parsed.version !== 1) return null;
    if (!parsed.topicId || !Array.isArray(parsed.queue) || !Array.isArray(parsed.records)) return null;
    if (parsed.phase === "idle") return null;
    if (Date.now() - (parsed.savedAt || 0) > DRAFT_MAX_AGE_MS) {
      clearPracticeDraft();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writePracticeDraft(draft: Omit<PracticeDraft, "version" | "savedAt">) {
  if (!canUseStorage()) return;
  if (draft.phase === "idle") {
    clearPracticeDraft();
    return;
  }
  const payload: PracticeDraft = {
    ...draft,
    version: 1,
    savedAt: Date.now(),
  };
  try {
    window.localStorage.setItem(STORAGE_KEYS.practiceDraft, JSON.stringify(payload));
  } catch {
    /* quota / private mode */
  }
}

export function clearPracticeDraft() {
  if (!canUseStorage()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEYS.practiceDraft);
  } catch {
    /* ignore */
  }
}
