import { ChoiceButton, type ChoiceState } from "@/components/ChoiceButton";
import { MathText } from "@/components/MathText";
import { isAnswerCorrect } from "@/helpers/checkAnswer";
import css from "./AnswerChoices.module.css";

type AnswerChoicesProps = {
  options: string[];
  selected: string | null;
  correct: string[];
  revealed: boolean;
  disabled: boolean;
  onSelect: (option: string) => void;
};

function optionState(option: string, selected: string | null, correct: string[], revealed: boolean): ChoiceState {
  const isCorrectOption = isAnswerCorrect(option, correct);
  if (!revealed) return selected === option ? "selected" : "idle";
  if (isCorrectOption) return "correct";
  if (selected === option) return "wrong";
  return "muted";
}

export function AnswerChoices({
  options,
  selected,
  correct,
  revealed,
  disabled,
  onSelect,
}: AnswerChoicesProps) {
  return (
    <div className={css.grid}>
      {options.map((option, index) => (
        <ChoiceButton
          key={`${option}-${index}`}
          disabled={disabled}
          state={optionState(option, selected, correct, revealed)}
          onClick={() => onSelect(option)}
        >
          <MathText text={option} />
        </ChoiceButton>
      ))}
    </div>
  );
}
