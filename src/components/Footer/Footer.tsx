"use client";

import { useState, useEffect } from "react";
import css from "./Footer.module.css";
import Link from "next/link";

type HelpType = "how-it-works" | "scoring" | "marks" | null;

export default function Footer() {
  const [helpType, setHelpType] = useState<HelpType>(null);

  useEffect(() => {
    if (helpType !== null) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [helpType]);

  return (
    <footer className={css.footer}>
      <div className={css.footerContent}>
        <div className={css.brand}>
          <Link href="/">НМТ МАТЕМАТИКА</Link>
          <p>Тренажер для підготовки до НМТ-2026</p>
        </div>

        <div className={css.help}>
          <h2>ДОПОМОГА</h2>

          <ul>
            <li>
              <button onClick={() => setHelpType("how-it-works")}>
                Як це працює?
              </button>
            </li>

            <li>
              <button onClick={() => setHelpType("scoring")}>Оцінювання</button>
            </li>

            <li>
              <button onClick={() => setHelpType("marks")}>Позначки</button>
            </li>
          </ul>
        </div>
      </div>

      {helpType !== null && (
        <div className={css.modalBackdrop} onClick={() => setHelpType(null)}>
          <div className={css.modal} onClick={() => setHelpType(null)}>
            {helpType === "how-it-works" && (
              <>
                <h2>Як це працює?</h2>

                <p>
                  Оберіть режим підготовки: повний тест НМТ або коротку практику
                  за шкільними темами. У тренажері можна продовжити незавершений
                  тест, потренувати слабкі теми та переглянути свої результати.
                </p>
              </>
            )}

            {helpType === "scoring" && (
              <>
                <h2>Оцінювання</h2>

                <p>
                  У повному тесті НМТ — 22 завдання та максимум 32 тестові бали.
                  15 завдань мають одну правильну відповідь і дають по 1 балу. 3
                  завдання на відповідність — до 4 балів кожне. Ще 4 завдання з
                  короткою відповіддю — по 2 бали.
                </p>
              </>
            )}

            {helpType === "marks" && (
              <>
                <h2>Позначки</h2>

                <p>
                  Під час тесту позначайте завдання, до яких хочете повернутися
                  пізніше. Позначка допомагає не забути про питання, яке ви ще
                  не завершили або хочете перевірити перед завершенням тесту.
                </p>
              </>
            )}

            <button
              className={css.modalClose}
              onClick={() => setHelpType(null)}
              aria-label="Закрити"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
