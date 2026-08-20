import { FormulasPage } from "@/components/nmt/FormulasPage";
import { createPageMetadata } from "@/constants/seo";

export const metadata = createPageMetadata({
  title: "Формули з математики",
  description:
    "Довідник формул для підготовки до НМТ: алгебра та геометрія з коректним відображенням через LaTeX. Швидкий доступ під час тренування.",
  path: "/nmt/formulas",
});

export default function NmtFormulasPage() {
  return <FormulasPage />;
}
