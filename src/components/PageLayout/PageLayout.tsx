import type { FormEvent, ReactNode } from "react";
import css from "./PageLayout.module.css";

export function PageLayout({
  children,
  as = "div",
  onSubmit,
}: {
  children: ReactNode;
  as?: "div" | "form";
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}) {
  if (as === "form") {
    return (
      <form className={css.page} onSubmit={onSubmit}>
        {children}
      </form>
    );
  }

  return <div className={css.page}>{children}</div>;
}
