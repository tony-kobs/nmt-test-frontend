function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function accuracyPercentile(correct: number, total: number): number {
  if (total === 0) return 0;
  return clamp(Math.round(-55 + (correct / total) * 150), 3, 99);
}

export function speedPercentile(avgSeconds: number): number {
  return clamp(Math.round(100 - avgSeconds * 5.4), 5, 97);
}

export function formatUaSeconds(ms: number): string {
  const seconds = ms / 1000;
  return `${seconds.toFixed(1).replace(".", ",")} с`;
}

export function formatDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
