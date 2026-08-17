"use client";

import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";

export function Loader({ label = "Завантаження…" }: { label?: string }) {
  return (
    <div className={css.wrap}>
      <ThreeDots height="48" width="48" color="currentColor" ariaLabel="loader" />
      <p className={css.label}>{label}</p>
    </div>
  );
}
