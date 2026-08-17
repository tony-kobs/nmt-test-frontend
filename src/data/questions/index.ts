import { matchingQuestions } from "@/data/questions/matching";
import { shortQuestions } from "@/data/questions/shorts";
import { singleQuestions } from "@/data/questions/singles";
import type { Question } from "@/types/question";

export const questionsBank: Question[] = [...singleQuestions, ...matchingQuestions, ...shortQuestions];
