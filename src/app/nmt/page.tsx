import { NmtHub } from "@/components/nmt/NmtHub";
import { createPageMetadata } from "@/constants/seo";

export const metadata = createPageMetadata({
  title: "Тренажер НМТ",
  description:
    "Повний НМТ з математики 2026: обери один із 10 варіантів або випадковий. 22 завдання, 60 хвилин, 32 тестові бали та рейтинг 100–200 за схемою УЦОЯО.",
  path: "/nmt",
});

export default function NmtPage() {
  return <NmtHub />;
}
