import { CATEGORY_LABELS, type CategoryId } from "@/types/question";
import type { WeakTopic } from "@/types/result";

export function getWeakTopics(stats: Record<string, { correct: number; total: number }>): WeakTopic[] {
  return (Object.keys(CATEGORY_LABELS) as CategoryId[])
    .map((category) => {
      const item = stats[category];
      const total = item?.total ?? 0;
      const percent = total === 0 ? 100 : Math.round((item.correct / total) * 100);
      return { category, label: CATEGORY_LABELS[category], percent, total };
    })
    .filter((item) => item.total > 0)
    .sort((a, b) => a.percent - b.percent);
}
