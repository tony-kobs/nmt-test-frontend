"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleTheme } from "@/redux/theme/slice";
import css from "./AppBar.module.css";

export function AppBar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.value);
  const onPractice = pathname.startsWith("/practice");
  const onFormulas = pathname.startsWith("/nmt/formulas");
  const onResults = pathname.startsWith("/nmt/results");

  return (
    <header className={css.header}>
      <div className={css.inner}>
        <nav className={css.nav} aria-label="Розділи">
          <Link
            href="/"
            className={clsx(css.tab, !onPractice && css.tabActive)}
            aria-current={!onPractice ? "page" : undefined}
          >
            Тренажер НМТ
          </Link>
          <Link
            href="/practice"
            className={clsx(css.tab, onPractice && css.tabActive)}
            aria-current={onPractice ? "page" : undefined}
          >
            Практика
          </Link>
        </nav>
        <div className={css.actions}>
          {!onPractice && (
            <>
              <Link href="/nmt/formulas" className={clsx(css.link, onFormulas && css.linkActive)}>
                Формули
              </Link>
              <Link href="/nmt/results" className={clsx(css.link, onResults && css.linkActive)}>
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
