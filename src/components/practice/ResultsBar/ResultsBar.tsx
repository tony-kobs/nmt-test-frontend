import { StatsGrid, statsCss } from "@/components/StatsGrid";

type ResultsBarProps = {
  visible: boolean;
  correct: number;
  total: number;
  averageLabel: string;
  accuracyPercentile: number;
  speedPercentile: number;
};

export function ResultsBar({
  visible,
  correct,
  total,
  averageLabel,
  accuracyPercentile,
  speedPercentile,
}: ResultsBarProps) {
  if (!visible) return null;

  return (
    <StatsGrid
      left={
        <>
          <p>
            Правильних відповідей: {correct} з {total}
          </p>
          <p>Середній час відповіді: {averageLabel}</p>
        </>
      }
      right={
        <>
          <p>
            Краще ніж {accuracyPercentile}%
            <span className={statsCss.hint}>за точністю</span>
          </p>
          <p>
            Краще ніж {speedPercentile}%
            <span className={statsCss.hint}>за швидкістю</span>
          </p>
        </>
      }
    />
  );
}
