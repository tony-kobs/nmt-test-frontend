import { Suspense } from "react";
import { Loader } from "@/components/Loader";
import { PracticeSetup } from "@/components/nmt/PracticeSetup";

export default function NmtPracticePage() {
  return (
    <Suspense fallback={<Loader label="Завантаження…" />}>
      <PracticeSetup />
    </Suspense>
  );
}
