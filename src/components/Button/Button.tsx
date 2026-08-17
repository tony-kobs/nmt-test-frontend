import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "clsx";
import css from "./Button.module.css";

type Variant = "start" | "ink" | "cell" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  selected?: boolean;
};

export function Button({ variant = "ink", selected = false, className, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(css.button, css[variant], selected && css.cellSelected, className)}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  variant = "start",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={clsx(css.button, css[variant], className)}>
      {children}
    </Link>
  );
}
