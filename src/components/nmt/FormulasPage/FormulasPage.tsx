import { BackButton } from "@/components/BackButton";
import { FormulasList } from "@/components/nmt/FormulasList";
import { PageLayout } from "@/components/PageLayout";
import css from "./FormulasPage.module.css";

export function FormulasPage() {
  return (
    <PageLayout>
      <header className={css.top}>
        <BackButton href="/nmt" />
        <span>Обери тему:</span>
        <span className={css.accent}>Довідкові матеріали</span>
      </header>
      <main className={css.main}>
        <h1 className={css.title}>Формули</h1>
        <p className={css.lead}>
          На реальному НМТ можна користуватися довідкою. Нижче — ключові формули алгебри та геометрії.
        </p>
        <div className={css.body}>
          <FormulasList />
        </div>
      </main>
    </PageLayout>
  );
}
