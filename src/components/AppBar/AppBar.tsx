"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleTheme } from "@/redux/theme/slice";
import css from "./AppBar.module.css";

export function AppBar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.value);
  const onTrainer = pathname.startsWith("/nmt");

  return (
    <header className={css.header}>
      <div className={css.inner}>
        <nav className={css.nav}>
          <Link href="/" className={onTrainer ? css.muted : css.active}>
            Практика
          </Link>
          <Link href="/nmt" className={css.trainer}>
            Тренажер НМТ
          </Link>
        </nav>
        <div className={css.actions}>
          {onTrainer && (
            <>
              <Link href="/nmt/formulas" className={css.link}>
                Формули
              </Link>
              <Link href="/nmt/results" className={css.link}>
                Результати
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => dispatch(toggleTheme())}
            className={css.theme}
            aria-label="Перемкнути тему"
          >
            {theme === "dark" ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
            <span className={css.themeLabel}>{theme === "dark" ? "Світла" : "Темна"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
