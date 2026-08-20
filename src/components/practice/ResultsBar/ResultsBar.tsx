import { StatsGrid, statsCss } from "@/components/StatsGrid";

type ResultsBarProps = {
  visible: boolean;
  correct: number;
  total: number;
  averageLabel: string;
  averageCaption?: string;
  accuracyPercentile: number;
  speedPercentile: number;
};

export function ResultsBar({
  visible,
  correct,
  total,
  averageLabel,
  averageCaption = "Середній час відповіді",
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
          <p>
            {averageCaption}: {averageLabel}
          </p>
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
