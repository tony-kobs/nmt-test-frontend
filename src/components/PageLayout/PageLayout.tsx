import type { FormEvent, ReactNode } from "react";
import { clsx } from "clsx";
import css from "./PageLayout.module.css";

export function PageLayout({
  children,
  as = "div",
  onSubmit,
  centered = false,
}: {
  children: ReactNode;
  as?: "div" | "form";
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  centered?: boolean;
}) {
  const className = clsx(css.page, centered && css.centered);

  if (as === "form") {
    return (
      <form className={className} onSubmit={onSubmit}>
        {children}
      </form>
    );
  }

  return <div className={className}>{children}</div>;
}
