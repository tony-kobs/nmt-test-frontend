import { ResultsHistory } from "@/components/nmt/ResultsHistory";
import { createPageMetadata } from "@/constants/seo";

export const metadata = createPageMetadata({
  title: "Результати спроб",
  description:
    "Історія пройдених тестів НМТ з математики: тестові бали, рейтинг і теми, які варто повторити.",
  path: "/nmt/results",
});

export default function NmtResultsPage() {
  return <ResultsHistory />;
}
