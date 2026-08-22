import { questionsFromVariants } from "@/data/nmtVariants";
import { additionalQuestions } from "@/data/additionalQuestions";
import type { Question } from "@/types/question";

export const questionsBank: Question[] = [...questionsFromVariants(), ...additionalQuestions];
