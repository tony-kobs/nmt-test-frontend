import type { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";
import css from "./ChoiceButton.module.css";

export type ChoiceState = "idle" | "selected" | "correct" | "wrong" | "muted";

type ChoiceButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  state?: ChoiceState;
  wide?: boolean;
  compact?: boolean;
  letter?: string;
  children: ReactNode;
};

export function ChoiceButton({
  state = "idle",
  wide = false,
  compact = false,
  letter,
  className,
  children,
  ...props
}: ChoiceButtonProps) {
  return (
    <button
      type="button"
      className={clsx(css.button, css[state], wide && css.wide, compact && css.compact, className)}
      {...props}
    >
      {letter ? <span className={css.letter}>{letter}.</span> : null}
      {children}
    </button>
  );
}
