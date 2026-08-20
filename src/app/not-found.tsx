import { ButtonLink, buttonCss } from "@/components/Button";
import { PageLayout } from "@/components/PageLayout";
import { createPageMetadata } from "@/constants/seo";
import css from "./not-found.module.css";

export const metadata = createPageMetadata({
  title: "Сторінку не знайдено",
  description: "Запитуваної сторінки немає. Поверніться на головну й оберіть тренажер НМТ або практику.",
  path: "/",
  noIndex: true,
});

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
