import { ButtonLink } from "@/components/Button";
import { PageLayout } from "@/components/PageLayout";
import css from "./WelcomePage.module.css";

export function WelcomePage() {
  return (
    <PageLayout centered>
      <main className={css.main}>
        <div className={css.hero}>
          <h1 className={css.title}>Готуйся до НМТ з математики разом із нашою платформою</h1>
          <p className={css.lead}>
            Спробуй себе в тестуванні, наближеному до НМТ-2026: 10 варіантів, оцінювання УЦОЯО, розбір помилок і
            практика за темами.
          </p>
        </div>

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
              Ті самі теми, що в НМТ. Звичайний режим з розбором або Ultimate: до 20 завдань за 20 хвилин.
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
