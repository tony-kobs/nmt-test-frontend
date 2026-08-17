"use client";

import { ChoiceButton } from "@/components/ChoiceButton";
import { MathText } from "@/components/MathText";
import { OPTION_LETTERS } from "@/types/question";
import css from "./AnswerOptions.module.css";

export function AnswerOptions({
  options,
  value,
  onChange,
}: {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className={css.grid}>
      {options.map((option, index) => {
        const letter = OPTION_LETTERS[index] ?? String(index + 1);
        const selected = value === option;
        return (
          <ChoiceButton
            key={`${letter}-${option}`}
            letter={letter}
            wide={index === 4}
            state={selected ? "selected" : "idle"}
            onClick={() => onChange(option)}
          >
            <MathText text={option} />
          </ChoiceButton>
        );
      })}
    </div>
  );
}
