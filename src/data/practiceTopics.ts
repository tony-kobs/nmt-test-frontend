import { questionsBank } from "@/data/questions";
import { CATEGORY_LABELS, type CategoryId, type Question } from "@/types/question";
import type { Task, Topic } from "@/types/practice";

const TYPE_TITLE: Record<Question["type"], string> = {
  single: "Вибір відповіді",
  matching: "Відповідність",
  short: "Коротка відповідь",
};

function matchingLabel(question: Question): string {
  return (question.matchingLeft ?? [])
    .map((item) => {
      const letter = question.matchingCorrect?.[item.id];
      const right = question.matchingRight?.find((option) => option.id === letter)?.text;
      return right ? `${item.id} → ${letter}: ${right}` : `${item.id} → ${letter ?? "—"}`;
    })
    .join("; ");
}

export function questionToTask(question: Question): Task {
  if (question.type === "matching") {
    return {
      id: question.id,
      title: question.subcategory || TYPE_TITLE.matching,
      prompt: question.question,
      kind: "matching",
      matchingLeft: question.matchingLeft,
      matchingRight: question.matchingRight,
      matchingCorrect: question.matchingCorrect,
      correct: question.correctAnswer,
      correctLabel: matchingLabel(question),
      explanation: question.explanation,
      formula: question.formula,
    };
  }

  if (question.type === "short") {
    return {
      id: question.id,
      title: question.subcategory || TYPE_TITLE.short,
      prompt: question.question,
      kind: "input",
      correct: question.correctAnswer,
      correctLabel: question.correctAnswer[0] ?? "",
      explanation: question.explanation,
      formula: question.formula,
    };
  }

  return {
    id: question.id,
    title: question.subcategory || TYPE_TITLE.single,
    prompt: question.question,
    kind: "choice",
    options: question.options,
    correct: question.correctAnswer,
    correctLabel: question.correctAnswer[0] ?? "",
    explanation: question.explanation,
    formula: question.formula,
  };
}

const ORDER: CategoryId[] = [
  "numbers",
  "equations",
  "functions",
  "planimetry",
  "stereometry",
  "probability",
];

export const topics: Topic[] = ORDER.map((category, index) => ({
  id: category,
  number: index + 1,
  title: CATEGORY_LABELS[category],
  tasks: questionsBank.filter((item) => item.category === category).map(questionToTask),
}));

export function getTopic(id: string): Topic {
  return topics.find((item) => item.id === id) ?? topics[0];
}
