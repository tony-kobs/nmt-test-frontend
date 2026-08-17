"use client";

import { useEffect, useState } from "react";
import { TIMER_WARNING_MS } from "@/constants";
import { formatDuration } from "@/helpers/formatTime";
import { clsx } from "clsx";
import css from "./Timer.module.css";

export function Timer({ endsAt, onExpire }: { endsAt: number; onExpire: () => void }) {
  const [left, setLeft] = useState(() => endsAt - Date.now());

  useEffect(() => {
    const tick = () => {
      const next = endsAt - Date.now();
      setLeft(next);
      if (next <= 0) onExpire();
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [endsAt, onExpire]);

  return <p className={clsx(css.time, left <= TIMER_WARNING_MS && css.warn)}>{formatDuration(left)}</p>;
}
