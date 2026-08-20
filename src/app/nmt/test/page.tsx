import { TestShell } from "@/components/nmt/TestShell";
import { createPageMetadata } from "@/constants/seo";

export const metadata = createPageMetadata({
  title: "Тест НМТ",
  description: "Активна спроба тесту НМТ з математики. Сесія зберігається в браузері.",
  path: "/nmt/test",
  noIndex: true,
});

export default function NmtTestPage() {
  return <TestShell />;
}
