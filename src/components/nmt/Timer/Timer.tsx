"use client";

import { useEffect, useRef, useState } from "react";
import { TIMER_WARNING_MS } from "@/constants";
import { formatDuration } from "@/helpers/formatTime";
import { clsx } from "clsx";
import css from "./Timer.module.css";

export function Timer({ endsAt, onExpire }: { endsAt: number; onExpire: () => void }) {
  const [left, setLeft] = useState(() => endsAt - Date.now());
  const expired = useRef(false);

  useEffect(() => {
    expired.current = false;
    let id: ReturnType<typeof setInterval> | undefined;

    const tick = () => {
      const next = endsAt - Date.now();
      setLeft(Math.max(0, next));
      if (next <= 0 && !expired.current) {
        expired.current = true;
        if (id !== undefined) clearInterval(id);
        onExpire();
      }
    };

    tick();
    if (!expired.current) id = setInterval(tick, 250);
    return () => {
      if (id !== undefined) clearInterval(id);
    };
  }, [endsAt, onExpire]);

  return (
    <p className={clsx(css.time, left <= TIMER_WARNING_MS && css.warn)} aria-live="polite">
      {formatDuration(left)}
    </p>
  );
}
