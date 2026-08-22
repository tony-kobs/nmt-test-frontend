import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import { PracticeApp } from "@/components/practice/PracticeApp";
import { createPageMetadata } from "@/constants/seo";

export const metadata = createPageMetadata({
  title: "Практика за темами",
  description:
    "Практика з математики за 6 темами НМТ: числа та вирази, рівняння, функції, планіметрія, стереометрія, ймовірність. Звичайний режим з розбором або Ultimate — до 20 завдань за 20 хвилин.",
  path: "/practice",
});

export default function PracticePage() {
  return (
    <Suspense fallback={<Loader label="Завантаження…" />}>
      <PracticeApp />
    </Suspense>
  );
}
