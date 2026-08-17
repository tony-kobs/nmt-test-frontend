import { ButtonLink, buttonCss } from "@/components/Button";
import { PageLayout } from "@/components/PageLayout";
import css from "./not-found.module.css";

export default function NotFound() {
  return (
    <PageLayout>
      <main className={css.main}>
        <h1 className={css.title}>Сторінку не знайдено</h1>
        <p className={css.lead}>Перевірте адресу або поверніться на головну.</p>
        <ButtonLink href="/" className={buttonCss.offset}>
          На головну
        </ButtonLink>
      </main>
    </PageLayout>
  );
}
