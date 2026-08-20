"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTheme } from "@/redux/theme/slice";
import css from "./AppBar.module.css";

export function AppBar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.value);
  const onTrainer = pathname.startsWith("/nmt");
  const onPractice = pathname.startsWith("/practice");
  const onFormulas = pathname.startsWith("/nmt/formulas");
  const onResults = pathname.startsWith("/nmt/results");

  return (
    <header className={css.header}>
      <div className={css.inner}>
        <nav className={css.nav} aria-label="Розділи">
          <Link
            href="/nmt"
            className={clsx(css.tab, onTrainer && css.tabActive)}
            aria-current={onTrainer ? "page" : undefined}
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
          {onTrainer && (
            <>
              <Link href="/nmt/formulas" className={clsx(css.link, onFormulas && css.linkActive)}>
                Формули
              </Link>
              <Link href="/nmt/results" className={clsx(css.link, onResults && css.linkActive)}>
                Результати
              </Link>
            </>
          )}
          <div className={css.themeSwitch} role="group" aria-label="Тема оформлення">
            <button
              type="button"
              className={clsx(css.themeOpt, theme === "light" && css.themeOptActive)}
              aria-label="Світла тема"
              aria-pressed={theme === "light"}
              onClick={() => dispatch(setTheme("light"))}
            >
              <MdLightMode size={18} aria-hidden={true} />
            </button>
            <button
              type="button"
              className={clsx(css.themeOpt, theme === "dark" && css.themeOptActive)}
              aria-label="Темна тема"
              aria-pressed={theme === "dark"}
              onClick={() => dispatch(setTheme("dark"))}
            >
              <MdDarkMode size={18} aria-hidden={true} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
