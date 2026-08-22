export type FormulaSection = "algebra" | "geometry";

export interface FormulaItem {
  id: string;
  section: FormulaSection;
  subsection: string;
  title: string;
  latex: string;
}

export const formulas: FormulaItem[] = [
  { id: "f1", section: "algebra", subsection: "Квадратні рівняння", title: "Квадратне рівняння", latex: "ax^2+bx+c=0" },
  { id: "f2", section: "algebra", subsection: "Квадратні рівняння", title: "Дискримінант", latex: "D=b^2-4ac" },
  { id: "f3", section: "algebra", subsection: "Квадратні рівняння", title: "Корені квадратного рівняння", latex: "x=\\dfrac{-b\\pm\\sqrt{D}}{2a}" },
  { id: "f4", section: "algebra", subsection: "Тотожності", title: "Різниця квадратів", latex: "a^2-b^2=(a-b)(a+b)" },
  { id: "f5", section: "algebra", subsection: "Тотожності", title: "Квадрат суми", latex: "(a+b)^2=a^2+2ab+b^2" },
  { id: "f6", section: "algebra", subsection: "Тотожності", title: "Квадрат різниці", latex: "(a-b)^2=a^2-2ab+b^2" },
  { id: "f7", section: "algebra", subsection: "Степені, корені, логарифми", title: "Добуток степенів", latex: "a^m\\cdot a^n=a^{m+n}" },
  { id: "f8", section: "algebra", subsection: "Степені, корені, логарифми", title: "Корінь як степінь", latex: "\\sqrt[n]{a}=a^{1/n}" },
  { id: "f9", section: "algebra", subsection: "Степені, корені, логарифми", title: "Логарифм добутку", latex: "\\log_a(bc)=\\log_a b+\\log_a c" },
  { id: "f10", section: "algebra", subsection: "Прогресії", title: "n-й член арифметичної прогресії", latex: "a_n=a_1+(n-1)d" },
  { id: "f11", section: "algebra", subsection: "Прогресії", title: "Сума арифметичної прогресії", latex: "S_n=\\dfrac{n}{2}(2a_1+(n-1)d)" },
  { id: "f12", section: "algebra", subsection: "Ймовірність", title: "Ймовірність", latex: "P=\\dfrac{m}{n}" },
  { id: "f13", section: "geometry", subsection: "Площі", title: "Площа трикутника", latex: "S=\\dfrac{1}{2}ah" },
  { id: "f15", section: "geometry", subsection: "Площі", title: "Площа паралелограма", latex: "S=ah" },
  { id: "f16", section: "geometry", subsection: "Площі", title: "Площа ромба", latex: "S=\\dfrac{d_1 d_2}{2}" },
  { id: "f17", section: "geometry", subsection: "Площі", title: "Площа трапеції", latex: "S=\\dfrac{a+b}{2}\\cdot h" },
  { id: "f19", section: "geometry", subsection: "Площі", title: "Площа круга", latex: "S=\\pi R^2" },
  { id: "f14", section: "geometry", subsection: "Коло та теорема Піфагора", title: "Теорема Піфагора", latex: "c^2=a^2+b^2" },
  { id: "f18", section: "geometry", subsection: "Коло та теорема Піфагора", title: "Довжина кола", latex: "C=2\\pi R" },
  { id: "f20", section: "geometry", subsection: "Об’єми", title: "Об’єм призми", latex: "V=S_{\\text{осн}}\\cdot H" },
  { id: "f21", section: "geometry", subsection: "Об’єми", title: "Об’єм циліндра", latex: "V=\\pi R^2 H" },
  { id: "f22", section: "geometry", subsection: "Об’єми", title: "Об’єм конуса", latex: "V=\\dfrac{1}{3}\\pi R^2 H" },
  { id: "f23", section: "geometry", subsection: "Об’єми", title: "Об’єм кулі", latex: "V=\\dfrac{4}{3}\\pi R^3" },
];
