export const FULL_TEST_DURATION_MS = 60 * 60 * 1000;
export const TIMER_WARNING_MS = 5 * 60 * 1000;
export const FULL_TEST_MAX_SCORE = 32;
export const RATING_MIN_TEST_SCORE = 5;
export const PRACTICE_MIN_TASKS = 1;
export const PRACTICE_MAX_TASKS = 10;
export const HISTORY_LIMIT = 50;

export const STORAGE_KEYS = {
  persist: "nmt",
  theme: "nmt-theme",
  legacySession: "nmt-active-session",
  legacyHistory: "nmt-history",
  legacyTopicStats: "nmt-topic-stats",
} as const;

export const MATH_RATING_TABLE: Record<number, number> = {
  5: 100,
  6: 108,
  7: 115,
  8: 123,
  9: 131,
  10: 134,
  11: 137,
  12: 140,
  13: 143,
  14: 145,
  15: 147,
  16: 148,
  17: 149,
  18: 150,
  19: 151,
  20: 152,
  21: 155,
  22: 159,
  23: 163,
  24: 167,
  25: 170,
  26: 173,
  27: 176,
  28: 180,
  29: 184,
  30: 189,
  31: 194,
  32: 200,
};

export const MODE_LABEL = {
  full: "Повний НМТ",
  practice: "Тренування",
  random: "Випадковий тест",
} as const;

export const HUB_MODES = [
  {
    id: "full" as const,
    title: "Повний НМТ",
    description: "22 завдання, 60 хвилин, оцінювання як на реальному тесті: 32 бали і рейтинг 100–200.",
  },
  {
    id: "practice" as const,
    title: "Тренування",
    description: "Обери тему, кількість завдань і складність, потім пройди добірку.",
  },
  {
    id: "weak" as const,
    title: "Слабкі теми",
    description: "Тренування за темами, де найчастіше були помилки.",
  },
  {
    id: "random" as const,
    title: "Випадковий тест",
    description: "22 завдання з усіх категорій без таймера.",
  },
];
