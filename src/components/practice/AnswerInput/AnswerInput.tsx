import { clsx } from "clsx";
import css from "./AnswerInput.module.css";

type AnswerInputProps = {
  value: string;
  revealed: boolean;
  isCorrect: boolean | null;
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

export function AnswerInput({
  value,
  revealed,
  isCorrect,
  disabled,
  onChange,
  onSubmit,
}: AnswerInputProps) {
  return (
    <form
      className={css.form}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Впишіть відповідь"
        className={clsx(css.input, revealed && isCorrect && css.ok, revealed && !isCorrect && css.bad)}
        autoComplete="off"
      />
      <button type="submit" disabled={disabled || !value.trim()} className={css.submit}>
        Відповісти
      </button>
    </form>
  );
}
