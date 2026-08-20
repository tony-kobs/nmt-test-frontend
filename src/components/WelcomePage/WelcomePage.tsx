import { ButtonLink } from "@/components/Button";
import { PageLayout } from "@/components/PageLayout";
import css from "./WelcomePage.module.css";

export function WelcomePage() {
  return (
    <PageLayout>
      <main className={css.main}>
        <h1 className={css.title}>
          Готуйся до НМТ з математики так, як здаватимеш.
        </h1>
        <p className={css.lead}>
          Привіт. Це тренажер і практика до НМТ. Пройди тест або підтягни одну тему.
        </p>

        <div className={css.cards}>
          <article className={css.card}>
            <h2 className={css.cardTitle}>Тренажер НМТ</h2>
            <p className={css.cardText}>
              Повний варіант. Відчуєш час, типи завдань і свій бал - без
              сюрпризів у аудиторії.
            </p>
            <ButtonLink href="/nmt">Почати тренажер</ButtonLink>
          </article>
          <article className={css.card}>
            <h2 className={css.cardTitle}>Практика</h2>
            <p className={css.cardText}>
              Короткі добірки за темою. Щоб підтягнути слабке місце, а не
              проходити все підряд.
            </p>
            <ButtonLink href="/practice" variant="ink">
              До практики
            </ButtonLink>
          </article>
        </div>
      </main>
    </PageLayout>
  );
}
