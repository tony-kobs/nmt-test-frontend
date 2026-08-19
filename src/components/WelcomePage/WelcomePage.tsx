import { ButtonLink } from "@/components/Button";
import { PageLayout } from "@/components/PageLayout";
import css from "./WelcomePage.module.css";

export function WelcomePage() {
  return (
    <PageLayout>
      <main className={css.main}>
        <h1 className={css.title}>Готуйся до НМТ з математики так, як здаватимеш.</h1>

        <div className={css.copy}>
          <p>
            Привіт. Повний тест - це 22 завдання і 60 хвилин. Їх можна розкласти на тренування і звикнути до формату
            заздалегідь.
          </p>
          <p>
            Тут не треба бути готовим з першого разу. Треба місце, де можна помилятись, бачити розбір і набирати
            впевненість, поки ставка ще не 200 балів.
          </p>
        </div>

        <section className={css.section} aria-labelledby="today-heading">
          <h2 id="today-heading" className={css.heading}>
            Що можна зробити вже сьогодні
          </h2>
          <ul className={css.list}>
            <li>Здати повний тест як на НМТ: 22 завдання, 60 хвилин, тестові бали й рейтинг 100-200.</li>
            <li>Підтягнути одну тему короткою практикою: відповів - одразу видно, правильно чи ні.</li>
            <li>Повернутись пізніше: спроба зберігається в браузері, нічого не зникне після оновлення сторінки.</li>
          </ul>
          <p>Формат стає звичним після двох-трьох спроб. Далі лишається звичайна математика, яку вже вчив.</p>
          <p>Не треба закривати всю програму за вечір. Досить одного тесту або однієї теми. Це вже рух уперед.</p>
        </section>

        <div className={css.cards}>
          <article className={css.card}>
            <h2 className={css.cardTitle}>Тренажер НМТ</h2>
            <p className={css.cardText}>
              Повний варіант. Відчуєш час, типи завдань і свій бал - без сюрпризів у аудиторії.
            </p>
            <ButtonLink href="/nmt">Почати тренажер</ButtonLink>
          </article>
          <article className={css.card}>
            <h2 className={css.cardTitle}>Практика</h2>
            <p className={css.cardText}>
              Короткі добірки за темою. Щоб підтягнути слабке місце, а не проходити все підряд.
            </p>
            <ButtonLink href="/practice" variant="ink">
              До практики
            </ButtonLink>
          </article>
        </div>

        <p className={css.closing}>Вперед - це не «здати ідеально». Це ще одна спроба сьогодні.</p>
      </main>
    </PageLayout>
  );
}
