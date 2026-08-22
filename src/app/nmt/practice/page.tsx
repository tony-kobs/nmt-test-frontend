import { redirect } from "next/navigation";

export default async function NmtPracticePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; topic?: string }>;
}) {
  const params = await searchParams;
  const topic = params.topic || params.category;
  redirect(topic ? `/practice?topic=${encodeURIComponent(topic)}` : "/practice");
}
