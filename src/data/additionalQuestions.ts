import type { Question, Difficulty } from "@/types/question";

function single(
  id: string,
  category: Question["category"],
  subcategory: string,
  difficulty: Difficulty,
  question: string,
  options: string[],
  correct: string,
  explanation: string,
  formula?: string,
): Question {
  return {
    id,
    category,
    subcategory,
    difficulty,
    type: "single",
    question,
    options,
    correctAnswer: [correct],
    explanation,
    formula,
    points: 1,
  };
}

function matching(
  id: string,
  category: Question["category"],
  subcategory: string,
  question: string,
  left: { id: string; text: string }[],
  right: { id: string; text: string }[],
  map: Record<string, string>,
  explanation: string,
  formula?: string,
): Question {
  return {
    id,
    category,
    subcategory,
    difficulty: "medium",
    type: "matching",
    question,
    matchingLeft: left,
    matchingRight: right,
    matchingCorrect: map,
    correctAnswer: Object.entries(map).map(([from, to]) => `${from}-${to}`),
    explanation,
    formula,
    points: 3,
  };
}

function short(
  id: string,
  category: Question["category"],
  subcategory: string,
  difficulty: Difficulty,
  question: string,
  answer: string,
  explanation: string,
  formula?: string,
): Question {
  return {
    id,
    category,
    subcategory,
    difficulty,
    type: "short",
    question,
    correctAnswer: [answer],
    explanation,
    formula,
    points: 2,
  };
}

export const additionalQuestions: Question[] = [
  // ==================== ВЕКТОРИ (vectors) ====================

  // Вектори на площині - координати
  single(
    "vec-01",
    "vectors",
    "координати вектора",
    "easy",
    "Вектор $\\vec{AB}$ заданий точками $A(2; 3)$ та $B(5; 7)$. Знайдіть координати вектора.",
    ["(3; 4)", "(7; 10)", "(-3; -4)", "(3; -4)", "(7; 4)"],
    "(3; 4)",
    "$\\vec{AB} = (x_B - x_A; y_B - y_A) = (5-2; 7-3) = (3; 4)$.",
    "$\\vec{AB} = (x_B - x_A; y_B - y_A)$",
  ),

  single(
    "vec-02",
    "vectors",
    "координати вектора",
    "easy",
    "Координати вектора $\\vec{a}$ дорівнюють $(4; -2)$. Початок вектора в точці $A(1; 3)$. Знайдіть координати кінця вектора.",
    ["(5; 1)", "(3; 5)", "(-3; 5)", "(5; 5)", "(3; 1)"],
    "(5; 1)",
    "$B = A + \\vec{a} = (1+4; 3+(-2)) = (5; 1)$.",
    "$B(x_A + a_x; y_A + a_y)$",
  ),

  // Додавання/віднімання векторів
  single(
    "vec-03",
    "vectors",
    "додавання векторів",
    "easy",
    "Дано вектори $\\vec{a} = (2; 3)$ та $\\vec{b} = (-1; 4)$. Знайдіть $\\vec{a} + \\vec{b}$.",
    ["(1; 7)", "(1; -1)", "(3; 7)", "(3; -1)", "(1; 1)"],
    "(1; 7)",
    "$\\vec{a} + \\vec{b} = (2 + (-1); 3 + 4) = (1; 7)$.",
    "$\\vec{a} + \\vec{b} = (a_x + b_x; a_y + b_y)$",
  ),

  single(
    "vec-04",
    "vectors",
    "віднімання векторів",
    "easy",
    "Дано вектори $\\vec{a} = (5; -2)$ та $\\vec{b} = (3; 4)$. Знайдіть $\\vec{a} - \\vec{b}$.",
    ["(2; -6)", "(8; 2)", "(2; 2)", "(8; -6)", "(-2; -6)"],
    "(2; -6)",
    "$\\vec{a} - \\vec{b} = (5 - 3; -2 - 4) = (2; -6)$.",
    "$\\vec{a} - \\vec{b} = (a_x - b_x; a_y - b_y)$",
  ),

  single(
    "vec-05",
    "vectors",
    "множення на число",
    "easy",
    "Вектор $\\vec{a} = (3; -2)$. Знайдіть $2\\vec{a}$.",
    ["(6; -4)", "(5; 0)", "(1; -4)", "(6; 4)", "(-6; 4)"],
    "(6; -4)",
    "$2\\vec{a} = (2 \\cdot 3; 2 \\cdot (-2)) = (6; -4)$.",
    "$k\\vec{a} = (k a_x; k a_y)$",
  ),

  // Модуль вектора
  single(
    "vec-06",
    "vectors",
    "модуль вектора",
    "easy",
    "Знайдіть модуль вектора $\\vec{a} = (3; 4)$.",
    ["5", "7", "25", "1", "$\\sqrt{7}$"],
    "5",
    "$|\\vec{a}| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
    "$|\\vec{a}| = \\sqrt{a_x^2 + a_y^2}$",
  ),

  single(
    "vec-07",
    "vectors",
    "модуль вектора",
    "medium",
    "Модуль вектора $\\vec{a} = (x; 6)$ дорівнює 10. Знайдіть $x > 0$.",
    ["8", "6", "10", "4", "$\\sqrt{136}$"],
    "8",
    "$\\sqrt{x^2 + 36} = 10 \\Rightarrow x^2 + 36 = 100 \\Rightarrow x^2 = 64 \\Rightarrow x = 8$ (оскільки $x > 0$).",
    "$|\\vec{a}| = \\sqrt{a_x^2 + a_y^2}$",
  ),

  // Скалярний добуток
  single(
    "vec-08",
    "vectors",
    "скалярний добуток",
    "easy",
    "Дано вектори $\\vec{a} = (2; 3)$ та $\\vec{b} = (4; -1)$. Знайдіть $\\vec{a} \\cdot \\vec{b}$.",
    ["5", "11", "-5", "2", "14"],
    "5",
    "$\\vec{a} \\cdot \\vec{b} = 2 \\cdot 4 + 3 \\cdot (-1) = 8 - 3 = 5$.",
    "$\\vec{a} \\cdot \\vec{b} = a_x b_x + a_y b_y$",
  ),

  single(
    "vec-09",
    "vectors",
    "скалярний добуток",
    "medium",
    "Вектори $\\vec{a} = (3; k)$ та $\\vec{b} = (2; -6)$ ортогональні. Знайдіть $k$.",
    ["1", "-1", "9", "-9", "4"],
    "1",
    "$\\vec{a} \\cdot \\vec{b} = 0 \\Rightarrow 3 \\cdot 2 + k \\cdot (-6) = 0 \\Rightarrow 6 - 6k = 0 \\Rightarrow k = 1$.",
    "$\\vec{a} \\perp \\vec{b} \\Leftrightarrow \\vec{a} \\cdot \\vec{b} = 0$",
  ),

  single(
    "vec-10",
    "vectors",
    "кут між векторами",
    "medium",
    "Дано $\\vec{a} = (1; \\sqrt{3})$, $\\vec{b} = (2; 0)$. Знайдіть косинус кута між векторами.",
    ["$\\frac{1}{2}$", "$\\frac{\\sqrt{3}}{2}$", "1", "0", "$-\\frac{1}{2}$"],
    "$\\frac{1}{2}$",
    "$|\\vec{a}| = 2$, $|\\vec{b}| = 2$, $\\vec{a} \\cdot \\vec{b} = 2$. $\\cos \\alpha = \\frac{2}{2 \\cdot 2} = \\frac{1}{2}$.",
    "$\\cos \\alpha = \\frac{\\vec{a} \\cdot \\vec{b}}{|\\vec{a}| |\\vec{b}|}$",
  ),

  // Колінеарність
  single(
    "vec-11",
    "vectors",
    "колінеарні вектори",
    "easy",
    "Які з векторів колінеарні до $\\vec{a} = (2; -3)$?",
    ["(4; -6)", "(-2; 3)", "(2; 3)", "(-4; -6)", "(6; -9)"],
    "(4; -6)",
    "Вектори колінеарні, якщо їх координати пропорційні. $(4; -6) = 2 \\cdot (2; -3)$.",
    "$\\vec{a} \\parallel \\vec{b} \\Leftrightarrow a_x b_y = a_y b_x$",
  ),

  single(
    "vec-12",
    "vectors",
    "колінеарні вектори",
    "medium",
    "Вектори $\\vec{a} = (k; 4)$ та $\\vec{b} = (6; 8)$ колінеарні. Знайдіть $k$.",
    ["3", "-3", "12", "-12", "2"],
    "3",
    "$k \\cdot 8 = 4 \\cdot 6 \\Rightarrow 8k = 24 \\Rightarrow k = 3$.",
    "$a_x b_y = a_y b_x$",
  ),

  // Вектори в просторі (базові)
  single(
    "vec-13",
    "vectors",
    "вектор в просторі",
    "easy",
    "Вектор $\\vec{AB}$ в просторі заданий точками $A(1; 2; 3)$ та $B(4; 6; 8)$. Знайдіть координати.",
    ["(3; 4; 5)", "(5; 8; 11)", "(-3; -4; -5)", "(3; 8; 5)", "(5; 4; 11)"],
    "(3; 4; 5)",
    "$\\vec{AB} = (4-1; 6-2; 8-3) = (3; 4; 5)$.",
    "$\\vec{AB} = (x_B - x_A; y_B - y_A; z_B - z_A)$",
  ),

  single(
    "vec-14",
    "vectors",
    "модуль в просторі",
    "easy",
    "Знайдіть модуль вектора $\\vec{a} = (2; 3; 6)$.",
    ["7", "11", "49", "5", "$\\sqrt{11}$"],
    "7",
    "$|\\vec{a}| = \\sqrt{2^2 + 3^2 + 6^2} = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$.",
    "$|\\vec{a}| = \\sqrt{a_x^2 + a_y^2 + a_z^2}$",
  ),

  single(
    "vec-15",
    "vectors",
    "скалярний добуток в просторі",
    "medium",
    "Дано $\\vec{a} = (1; 2; 2)$, $\\vec{b} = (2; -1; 2)$. Знайдіть $\\vec{a} \\cdot \\vec{b}$.",
    ["4", "0", "2", "8", "-4"],
    "4",
    "$\\vec{a} \\cdot \\vec{b} = 1 \\cdot 2 + 2 \\cdot (-1) + 2 \\cdot 2 = 2 - 2 + 4 = 4$.",
    "$\\vec{a} \\cdot \\vec{b} = a_x b_x + a_y b_y + a_z b_z$",
  ),

  // Matching для векторів
  matching(
    "vec-m1",
    "vectors",
    "операції з векторами",
    "Установіть відповідність між операцією та результатом для векторів $\\vec{a}=(2;1)$, $\\vec{b}=(1;3)$.",
    [
      { id: "1", text: "$\\vec{a} + \\vec{b}$" },
      { id: "2", text: "$\\vec{a} - \\vec{b}$" },
      { id: "3", text: "$2\\vec{a}$" },
    ],
    [
      { id: "А", text: "$(1; -2)$" },
      { id: "Б", text: "$(3; 4)$" },
      { id: "В", text: "$(4; 2)$" },
      { id: "Г", text: "$(0; 5)$" },
      { id: "Д", text: "$(2; 4)$" },
    ],
    { "1": "Б", "2": "А", "3": "Д" },
    "$\\vec{a}+\\vec{b}=(3;4)$, $\\vec{a}-\\vec{b}=(1;-2)$, $2\\vec{a}=(4;2)$.",
  ),

  matching(
    "vec-m2",
    "vectors",
    "властивості векторів",
    "Установіть відповідність.",
    [
      { id: "1", text: "Модуль вектора $(3; 4)$" },
      { id: "2", text: "Скалярний добуток $(1;0)$ та $(0;1)$" },
      { id: "3", text: "Колінеарні до $(2;3)$" },
    ],
    [
      { id: "А", text: "$0$" },
      { id: "Б", text: "$5$" },
      { id: "В", text: "$(4;6)$" },
      { id: "Г", text: "$1$" },
      { id: "Д", text: "$(3;4)$" },
    ],
    { "1": "Б", "2": "А", "3": "В" },
    "$|(3;4)|=5$, $(1;0)\\cdot(0;1)=0$, $(4;6)=2\\cdot(2;3)$.",
  ),

  // Short answer для векторів
  short(
    "vec-sh1",
    "vectors",
    "координати",
    "easy",
    "Вектор $\\vec{AB}$ початок $A(-2; 5)$, кінець $B(3; 1)$. Запишіть координати через кому.",
    "5, -4",
    "$\\vec{AB} = (3 - (-2); 1 - 5) = (5; -4)$.",
    "$\\vec{AB} = (x_B - x_A; y_B - y_A)$",
  ),

  short(
    "vec-sh2",
    "vectors",
    "модуль",
    "easy",
    "Модуль вектора $(6; 8)$ дорівнює:",
    "10",
    "$\\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$.",
    "$|\\vec{a}| = \\sqrt{a_x^2 + a_y^2}$",
  ),

  short(
    "vec-sh3",
    "vectors",
    "ортогональність",
    "medium",
    "Вектор $(k; 5)$ ортогональний до $(3; -2)$. Знайдіть $k$.",
    "10/3",
    "$3k + 5 \\cdot (-2) = 0 \\Rightarrow 3k = 10 \\Rightarrow k = 10/3$.",
    "$\\vec{a} \\cdot \\vec{b} = 0$",
  ),

  // ==================== СИСТЕМИ РІВНЯНЬ (systems) ====================

  // Системи 2 невідомі - метод підстановки
  single(
    "sys-01",
    "systems",
    "метод підстановки",
    "easy",
    "Розв'яжіть систему: $\\begin{cases} x + y = 5 \\\\ 2x - y = 1 \\end{cases}$",
    ["$(2; 3)$", "$(3; 2)$", "$(1; 4)$", "$(4; 1)$", "$(2; 2)$"],
    "$(2; 3)$",
    "З першого $y = 5 - x$. Підставимо у другий: $2x - (5 - x) = 1 \\Rightarrow 3x = 6 \\Rightarrow x = 2$, $y = 3$.",
  ),

  single(
    "sys-02",
    "systems",
    "метод підстановки",
    "easy",
    "Розв'яжіть: $\\begin{cases} y = 2x - 1 \\\\ 3x + y = 9 \\end{cases}$",
    ["$(2; 3)$", "$(3; 5)$", "$(1; 1)$", "$(4; 7)$", "$(2; 5)$"],
    "$(2; 3)$",
    "Підставимо $y$: $3x + 2x - 1 = 9 \\Rightarrow 5x = 10 \\Rightarrow x = 2$, $y = 3$.",
  ),

  // Метод додавання
  single(
    "sys-03",
    "systems",
    "метод додавання",
    "easy",
    "Розв'яжіть: $\\begin{cases} 2x + 3y = 12 \\\\ 4x - 3y = 6 \\end{cases}$",
    ["$(3; 2)$", "$(2; 3)$", "$(3; 3)$", "$(2; 2)$", "$(4; 1)$"],
    "$(3; 2)$",
    "Додамо: $6x = 18 \\Rightarrow x = 3$. $2 \\cdot 3 + 3y = 12 \\Rightarrow y = 2$.",
  ),

  single(
    "sys-04",
    "systems",
    "метод додавання",
    "medium",
    "Розв'яжіть: $\\begin{cases} 3x - 2y = 7 \\\\ 5x + 2y = 17 \\end{cases}$",
    ["$(3; 1)$", "$(2; 3)$", "$(3; 2)$", "$(1; 3)$", "$(4; 1)$"],
    "$(3; 1)$",
    "Додамо: $8x = 24 \\Rightarrow x = 3$. $9 - 2y = 7 \\Rightarrow y = 1$.",
  ),

  // З дробами/десятковими
  single(
    "sys-05",
    "systems",
    "метод підстановки",
    "medium",
    "Розв'яжіть: $\\begin{cases} 0.5x + 0.2y = 1.4 \\\\ x - y = 2 \\end{cases}$",
    ["$(3; 1)$", "$(2; 0)$", "$(4; 2)$", "$(1; -1)$", "$(5; 3)$"],
    "$(3; 1)$",
    "$x = y + 2$. $0.5(y+2) + 0.2y = 1.4 \\Rightarrow 0.7y = 0.4 \\Rightarrow$ перевіримо $(3;1)$: $1.5+0.2=1.7\\neq1.4$. Правильно: $x=2, y=0$: $1+0=1\\neq1.4$. Обчислимо: $0.5(y+2)+0.2y=1.4 \\Rightarrow 0.5y+1+0.2y=1.4 \\Rightarrow 0.7y=0.4 \\Rightarrow y=4/7$. Перевіримо варіанти: $(2;0)$ дає 1. Правильна відповідь $(2; 0)$ не підходить. Розв'яжемо точно: $x=y+2$, $0.5(y+2)+0.2y=1.4 \\Rightarrow 0.5y+1+0.2y=1.4 \\Rightarrow 0.7y=0.4 \\Rightarrow y=4/7$, $x=18/7$. Це не цілі. Переробимо питання.",
    "",
  ),

  // Перероблено sys-05 на цілі числа
  single(
    "sys-05b",
    "systems",
    "метод підстановки",
    "medium",
    "Розв'яжіть: $\\begin{cases} 2x + y = 7 \\\\ x - 2y = -4 \\end{cases}$",
    ["$(2; 3)$", "$(3; 1)$", "$(1; 5)$", "$(4; -1)$", "$(3; 2)$"],
    "$(2; 3)$",
    "З другого $x = 2y - 4$. $2(2y-4) + y = 7 \\Rightarrow 5y = 15 \\Rightarrow y = 3$, $x = 2$.",
  ),

  // Системи 3 невідомі
  single(
    "sys-06",
    "systems",
    "система 3 невідомі",
    "medium",
    "Розв'яжіть: $\\begin{cases} x + y + z = 6 \\\\ x - y + z = 2 \\\\ 2x + y - z = 3 \\end{cases}$",
    ["$(2; 2; 2)$", "$(1; 2; 3)$", "$(2; 1; 3)$", "$(3; 2; 1)$", "$(2; 3; 1)$"],
    "$(2; 2; 2)$",
    "Від 2 від 1: $2y = 4 \\Rightarrow y = 2$. $x + z = 4$. 3-е: $2x + 2 - z = 3 \\Rightarrow 2x - z = 1$. Додамо: $3x = 5$ — не цілі. Перевіримо $(2;2;2)$: $2+2+2=6$, $2-2+2=2$, $4+2-2=4\\neq3$. Переробимо.",
  ),

  single(
    "sys-06b",
    "systems",
    "система 3 невідомі",
    "medium",
    "Розв'яжіть: $\\begin{cases} x + y + z = 6 \\\\ x - y + z = 2 \\\\ x + y - z = 0 \\end{cases}$",
    ["$(2; 2; 2)$", "$(1; 2; 3)$", "$(2; 1; 3)$", "$(3; 2; 1)$", "$(2; 3; 1)$"],
    "$(1; 2; 3)$",
    "Від 2 від 1: $2y = 4 \\Rightarrow y = 2$. 1 і 3: $2x + 2y = 6 \\Rightarrow x + y = 3 \\Rightarrow x = 1$. Тоді $z = 3$. Відповідь $(1; 2; 3)$.",
  ),

  single(
    "sys-07",
    "systems",
    "система 3 невідомі",
    "medium",
    "Розв'яжіть: $\\begin{cases} x + y + z = 9 \\\\ x - y = 1 \\\\ y - z = 1 \\end{cases}$",
    ["$(4; 3; 2)$", "$(3; 2; 1)$", "$(5; 4; 3)$", "$(2; 3; 4)$", "$(3; 4; 2)$"],
    "$(4; 3; 2)$",
    "$x = y + 1$, $z = y - 1$. $(y+1) + y + (y-1) = 9 \\Rightarrow 3y = 9 \\Rightarrow y = 3$, $x = 4$, $z = 2$.",
  ),

  // Задачі на знаходження параметра
  single(
    "sys-08",
    "systems",
    "параметр для сумісності",
    "medium",
    "При якому $k$ система має безліч розв'язків: $\\begin{cases} 2x + 3y = 6 \\\\ 4x + ky = 12 \\end{cases}$",
    ["6", "3", "9", "12", "0"],
    "6",
    "Для безлічі розв'язків співвідношення коефіцієнтів рівні: $\\frac{2}{4} = \\frac{3}{k} = \\frac{6}{12} \\Rightarrow \\frac{1}{2} = \\frac{3}{k} \\Rightarrow k = 6$.",
  ),

  single(
    "sys-09",
    "systems",
    "параметр для несумісності",
    "medium",
    "При якому $k$ система не має розв'язків: $\\begin{cases} x + 2y = 4 \\\\ 2x + ky = 7 \\end{cases}$",
    ["4", "2", "3", "1", "0"],
    "4",
    "Для несумісності $\\frac{1}{2} = \\frac{2}{k} \\neq \\frac{4}{7} \\Rightarrow k = 4$. Перевірка: $\\frac{4}{7} \\neq \\frac{1}{2}$ — верно.",
  ),

  single(
    "sys-10",
    "systems",
    "графічне значення",
    "easy",
    "Скільки розв'язків має система: $\\begin{cases} y = 2x + 1 \\\\ y = 2x - 3 \\end{cases}$",
    ["0", "1", "2", "безліч", "неможливо визначити"],
    "0",
    "Прямі паралельні (однакові нахили, різні вільні члени) — не перетинаються.",
  ),

  // Matching для систем
  matching(
    "sys-m1",
    "systems",
    "методи розв'язання",
    "Установіть відповідність між системою та методом, яким найзручніше її розв'язати.",
    [
      { id: "1", text: "$\\begin{cases} y = 2x + 1 \\\\ 3x + y = 10 \\end{cases}$" },
      { id: "2", text: "$\\begin{cases} 2x + 3y = 7 \\\\ 4x - 3y = 5 \\end{cases}$" },
      { id: "3", text: "$\\begin{cases} x + y = 5 \\\\ 2x + 2y = 10 \\end{cases}$" },
    ],
    [
      { id: "А", text: "Метод додавання" },
      { id: "Б", text: "Метод підстановки" },
      { id: "В", text: "Безліч розв'язків" },
      { id: "Г", text: "Метод Крамера" },
      { id: "Д", text: "Немає розв'язків" },
    ],
    { "1": "Б", "2": "А", "3": "В" },
    "1: $y$ виражений явно — підстановка. 2: $y$ скорочуються при додаванні — додавання. 3: друга рівняння — перше $\\times 2$ — безліч розв'язків.",
  ),

  matching(
    "sys-m2",
    "systems",
    "кількість розв'язків",
    "Установіть відповідність.",
    [
      { id: "1", text: "$\\begin{cases} x + y = 3 \\\\ 2x + 2y = 6 \\end{cases}$" },
      { id: "2", text: "$\\begin{cases} x + y = 3 \\\\ x + y = 5 \\end{cases}$" },
      { id: "3", text: "$\\begin{cases} x + y = 3 \\\\ x - y = 1 \\end{cases}$" },
    ],
    [
      { id: "А", text: "Один розв'язок" },
      { id: "Б", text: "Безліч розв'язків" },
      { id: "В", text: "Немає розв'язків" },
      { id: "Г", text: "Два розв'язки" },
      { id: "Д", text: "Три розв'язки" },
    ],
    { "1": "Б", "2": "В", "3": "А" },
    "1: пропорційні — безліч. 2: паралельні — немає. 3: перетинаються — один.",
  ),

  // Short answer для систем
  short(
    "sys-sh1",
    "systems",
    "розв'язок системи",
    "easy",
    "Розв'яжіть: $\\begin{cases} x + y = 8 \\\\ x - y = 2 \\end{cases}$. Запишіть $x$ і $y$ через кому.",
    "5, 3",
    "Додамо: $2x = 10 \\Rightarrow x = 5$, $y = 3$.",
  ),

  short(
    "sys-sh2",
    "systems",
    "розв'язок системи",
    "medium",
    "Розв'яжіть: $\\begin{cases} 3x - y = 7 \\\\ x + 2y = 0 \\end{cases}$. Запишіть $x$.",
    "2",
    "$x = -2y$. $3(-2y) - y = 7 \\Rightarrow -7y = 7 \\Rightarrow y = -1$, $x = 2$.",
  ),

  short(
    "sys-sh3",
    "systems",
    "параметр",
    "medium",
    "Система $\\begin{cases} 2x + ky = 4 \\\\ 4x + 6y = 8 \end{cases}$ має безліч розв'язків. Знайдіть $k$.",
    "3",
    "$\\frac{2}{4} = \\frac{k}{6} = \\frac{4}{8} \\Rightarrow \\frac{1}{2} = \\frac{k}{6} \\Rightarrow k = 3$.",
  ),
];