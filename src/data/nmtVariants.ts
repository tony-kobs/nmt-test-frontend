import type { Difficulty, Question } from "../types/question";
import type { NmtVariant } from "../types/test";

type Spec = {
  n: number;
  pct: readonly [number, number];
  frac: readonly [number, number];
  pow: readonly [number, number, number];
  rad: readonly [number, number];
  lin: readonly [number, number, number];
  quad: readonly [number, number];
  ineq: readonly [number, number, number];
  fn: readonly [number, number, number];
  vert: readonly [number, number];
  pyth: readonly [number, number, number];
  rect: readonly [number, number];
  radius: number;
  cube: number;
  pyr: readonly [number, number];
  prob: { question: string; correct: string; wrong: readonly [string, string, string, string]; explain: string };
  matchA: readonly [number, number, number];
  matchB: readonly [number, number, number];
  matchC: readonly [number, number];
  shortPct: readonly [number, number];
  shortLin: readonly [number, number, number];
  shortGeo: readonly [number, number];
  shortN: number;
};

const SPECS: Spec[] = [
  {
    n: 1,
    pct: [25, 80],
    frac: [2, 3],
    pow: [2, 4, -1],
    rad: [5, 2],
    lin: [4, 5, 21],
    quad: [2, 5],
    ineq: [2, 1, 9],
    fn: [2, 3, 5],
    vert: [-6, 5],
    pyth: [5, 12, 13],
    rect: [7, 5],
    radius: 4,
    cube: 4,
    pyr: [9, 4],
    prob: {
      question: "Яка ймовірність випадіння числа, більшого за $4$, на гральному кубику?",
      correct: "$\\dfrac{1}{3}$",
      wrong: ["$\\dfrac{1}{6}$", "$\\dfrac{1}{2}$", "$\\dfrac{2}{3}$", "$\\dfrac{1}{4}$"],
      explain: "Сприятливі: $5$ і $6$, тобто $2$ з $6$, отже $\\dfrac{1}{3}$.",
    },
    matchA: [3, 25, 20],
    matchB: [6, 14, 4],
    matchC: [6, 8],
    shortPct: [15, 80],
    shortLin: [5, -7, 18],
    shortGeo: [5, 12],
    shortN: 4,
  },
  {
    n: 2,
    pct: [15, 120],
    frac: [3, 6],
    pow: [3, 3, -1],
    rad: [3, 2],
    lin: [3, -8, 13],
    quad: [3, 6],
    ineq: [3, -2, 10],
    fn: [4, -1, 3],
    vert: [-4, 1],
    pyth: [6, 8, 10],
    rect: [9, 4],
    radius: 5,
    cube: 5,
    pyr: [12, 5],
    prob: {
      question: "Яка ймовірність випадіння $6$ на гральному кубику?",
      correct: "$\\dfrac{1}{6}$",
      wrong: ["$\\dfrac{1}{3}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{4}$", "$\\dfrac{5}{6}$"],
      explain: "Одна грань із шести: $\\dfrac{1}{6}$.",
    },
    matchA: [4, 81, 25],
    matchB: [10, 16, 5],
    matchC: [5, 12],
    shortPct: [20, 45],
    shortLin: [3, 4, 19],
    shortGeo: [6, 8],
    shortN: 5,
  },
  {
    n: 3,
    pct: [40, 45],
    frac: [4, 12],
    pow: [2, 6, -3],
    rad: [4, 2],
    lin: [2, 9, 1],
    quad: [-2, 4],
    ineq: [4, 3, 11],
    fn: [-1, 10, 4],
    vert: [-10, 16],
    pyth: [9, 12, 15],
    rect: [8, 6],
    radius: 2,
    cube: 2,
    pyr: [15, 4],
    prob: {
      question: "Яка ймовірність випадіння парного числа на гральному кубику?",
      correct: "$\\dfrac{1}{2}$",
      wrong: ["$\\dfrac{1}{3}$", "$\\dfrac{1}{6}$", "$\\dfrac{2}{3}$", "$\\dfrac{1}{4}$"],
      explain: "Парні: $2,4,6$ — три з шести, $\\dfrac{1}{2}$.",
    },
    matchA: [5, 16, 50],
    matchB: [8, 18, 4],
    matchC: [4, 10],
    shortPct: [25, 36],
    shortLin: [2, -5, 9],
    shortGeo: [9, 12],
    shortN: 3,
  },
  {
    n: 4,
    pct: [12, 250],
    frac: [2, 5],
    pow: [5, 2, 0],
    rad: [5, 3],
    lin: [5, 7, 32],
    quad: [1, 8],
    ineq: [5, -5, 20],
    fn: [5, 2, 2],
    vert: [2, -3],
    pyth: [7, 24, 25],
    rect: [11, 3],
    radius: 6,
    cube: 6,
    pyr: [18, 2],
    prob: {
      question: "Яка ймовірність випадіння числа, більшого за $2$, на гральному кубику?",
      correct: "$\\dfrac{2}{3}$",
      wrong: ["$\\dfrac{1}{2}$", "$\\dfrac{1}{3}$", "$\\dfrac{5}{6}$", "$\\dfrac{1}{6}$"],
      explain: "Сприятливі $3,4,5,6$ — чотири з шести, $\\dfrac{2}{3}$.",
    },
    matchA: [2, 64, 20],
    matchB: [5, 20, 6],
    matchC: [8, 5],
    shortPct: [8, 125],
    shortLin: [6, -4, 20],
    shortGeo: [8, 15],
    shortN: 6,
  },
  {
    n: 5,
    pct: [30, 90],
    frac: [3, 4],
    pow: [2, 5, -2],
    rad: [4, 3],
    lin: [6, -4, 20],
    quad: [-3, 5],
    ineq: [2, 7, 1],
    fn: [3, -7, 5],
    vert: [-8, 7],
    pyth: [8, 15, 17],
    rect: [12, 5],
    radius: 3,
    cube: 3,
    pyr: [6, 9],
    prob: {
      question: "Яка ймовірність випадіння непарного числа на гральному кубику?",
      correct: "$\\dfrac{1}{2}$",
      wrong: ["$\\dfrac{1}{3}$", "$\\dfrac{1}{6}$", "$\\dfrac{2}{3}$", "$\\dfrac{3}{4}$"],
      explain: "Непарні: $1,3,5$ — три з шести, $\\dfrac{1}{2}$.",
    },
    matchA: [6, 25, 40],
    matchB: [7, 12, 8],
    matchC: [3, 14],
    shortPct: [40, 55],
    shortLin: [7, 3, 24],
    shortGeo: [7, 24],
    shortN: 4,
  },
  {
    n: 6,
    pct: [5, 160],
    frac: [5, 20],
    pow: [3, 4, -2],
    rad: [3, 3],
    lin: [7, 3, 24],
    quad: [4, 4],
    ineq: [1, 8, 12],
    fn: [-2, 9, 1],
    vert: [-2, -8],
    pyth: [9, 40, 41],
    rect: [10, 7],
    radius: 1,
    cube: 7,
    pyr: [21, 4],
    prob: {
      question: "Яка ймовірність випадіння числа, меншого за $3$, на гральному кубику?",
      correct: "$\\dfrac{1}{3}$",
      wrong: ["$\\dfrac{1}{6}$", "$\\dfrac{1}{2}$", "$\\dfrac{2}{3}$", "$\\dfrac{1}{4}$"],
      explain: "Сприятливі $1$ і $2$: $\\dfrac{2}{6}=\\dfrac{1}{3}$.",
    },
    matchA: [3, 49, 5],
    matchB: [9, 22, 4],
    matchC: [9, 6],
    shortPct: [12, 50],
    shortLin: [8, -10, 14],
    shortGeo: [9, 12],
    shortN: 5,
  },
  {
    n: 7,
    pct: [35, 80],
    frac: [2, 8],
    pow: [2, 3, 2],
    rad: [2, 2],
    lin: [8, -10, 14],
    quad: [-1, 7],
    ineq: [3, 6, 0],
    fn: [6, 1, 2],
    vert: [4, 1],
    pyth: [20, 21, 29],
    rect: [13, 4],
    radius: 10,
    cube: 8,
    pyr: [10, 9],
    prob: {
      question: "Яка ймовірність випадіння двох гербів на двох чесних монетах?",
      correct: "$\\dfrac{1}{4}$",
      wrong: ["$\\dfrac{1}{2}$", "$\\dfrac{1}{3}$", "$\\dfrac{1}{6}$", "$\\dfrac{3}{4}$"],
      explain: "Чотири рівноймовірні результати, один сприятливий: $\\dfrac{1}{4}$.",
    },
    matchA: [4, 9, 50],
    matchB: [4, 16, 9],
    matchC: [5, 16],
    shortPct: [18, 50],
    shortLin: [3, 11, 2],
    shortGeo: [12, 16],
    shortN: 6,
  },
  {
    n: 8,
    pct: [8, 125],
    frac: [4, 5],
    pow: [10, 3, -1],
    rad: [3, 5],
    lin: [3, 11, 2],
    quad: [2, 9],
    ineq: [6, -3, 15],
    fn: [1, -8, 15],
    vert: [-12, 20],
    pyth: [12, 16, 20],
    rect: [15, 2],
    radius: 7,
    cube: 9,
    pyr: [24, 2],
    prob: {
      question: "Яка ймовірність випадіння простого числа на гральному кубику?",
      correct: "$\\dfrac{1}{2}$",
      wrong: ["$\\dfrac{1}{3}$", "$\\dfrac{1}{6}$", "$\\dfrac{2}{3}$", "$\\dfrac{1}{4}$"],
      explain: "Прості: $2,3,5$ — три з шести, $\\dfrac{1}{2}$.",
    },
    matchA: [5, 121, 15],
    matchB: [11, 24, 3],
    matchC: [7, 6],
    shortPct: [16, 75],
    shortLin: [9, -6, 30],
    shortGeo: [5, 12],
    shortN: 3,
  },
  {
    n: 9,
    pct: [16, 50],
    frac: [3, 5],
    pow: [2, 8, -4],
    rad: [7, 2],
    lin: [9, -6, 30],
    quad: [3, -6],
    ineq: [2, -9, 7],
    fn: [7, -4, 2],
    vert: [-14, 40],
    pyth: [12, 35, 37],
    rect: [8, 9],
    radius: 8,
    cube: 10,
    pyr: [8, 9],
    prob: {
      question: "Яка ймовірність випадіння числа, більшого за $1$, на гральному кубику?",
      correct: "$\\dfrac{5}{6}$",
      wrong: ["$\\dfrac{1}{6}$", "$\\dfrac{2}{3}$", "$\\dfrac{1}{2}$", "$\\dfrac{4}{5}$"],
      explain: "Сприятливі $2,3,4,5,6$: $\\dfrac{5}{6}$.",
    },
    matchA: [2, 100, 25],
    matchB: [12, 26, 5],
    matchC: [10, 6],
    shortPct: [24, 25],
    shortLin: [2, -15, 5],
    shortGeo: [8, 15],
    shortN: 5,
  },
  {
    n: 10,
    pct: [45, 60],
    frac: [4, 6],
    pow: [4, 2, 1],
    rad: [2, 5],
    lin: [2, -15, 5],
    quad: [5, 7],
    ineq: [4, 8, 0],
    fn: [8, 3, 0],
    vert: [6, 5],
    pyth: [18, 24, 30],
    rect: [14, 5],
    radius: 9,
    cube: 11,
    pyr: [27, 4],
    prob: {
      question: "Яка ймовірність випадіння числа, кратного $3$, на гральному кубику?",
      correct: "$\\dfrac{1}{3}$",
      wrong: ["$\\dfrac{1}{2}$", "$\\dfrac{1}{6}$", "$\\dfrac{2}{3}$", "$\\dfrac{1}{4}$"],
      explain: "Кратні $3$: $3$ і $6$, $\\dfrac{2}{6}=\\dfrac{1}{3}$.",
    },
    matchA: [3, 144, 20],
    matchB: [15, 28, 4],
    matchC: [4, 18],
    shortPct: [30, 70],
    shortLin: [4, 5, 21],
    shortGeo: [9, 40],
    shortN: 4,
  },
];

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function fracTex(num: number, den: number): string {
  const sign = num * den < 0 ? "-" : "";
  const n = Math.abs(num);
  const d = Math.abs(den);
  const g = gcd(n, d);
  const nn = n / g;
  const dd = d / g;
  if (dd === 1) return `${sign}${nn}`;
  return `${sign}\\dfrac{${nn}}{${dd}}`;
}

function five(correct: string, wrong: string[]): string[] {
  const options = [correct];
  for (const item of wrong) {
    if (!options.includes(item)) options.push(item);
    if (options.length === 5) return options;
  }
  let n = 2;
  while (options.length < 5 && n < 40) {
    const extra = `$\\dfrac{${n}}{${n + 1}}$`;
    if (!options.includes(extra)) options.push(extra);
    n += 1;
  }
  if (options.length !== 5) {
    throw new Error(`Need 5 options, got ${options.length} for ${correct}`);
  }
  return options;
}

function numOpts(correct: number, preferred: number[]): string[] {
  const opts: number[] = [correct];
  for (const value of preferred) {
    if (Number.isFinite(value) && Number.isInteger(value) && !opts.includes(value)) {
      opts.push(value);
    }
    if (opts.length === 5) break;
  }
  let delta = 1;
  while (opts.length < 5 && delta < 80) {
    for (const value of [correct + delta, correct - delta]) {
      if (Number.isInteger(value) && !opts.includes(value)) opts.push(value);
      if (opts.length === 5) break;
    }
    delta += 1;
  }
  return opts.map(String);
}

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

function signed(a: number, x = "x"): string {
  if (a === 0) return "";
  if (a === 1) return `+${x}`;
  if (a === -1) return `-${x}`;
  return a > 0 ? `+${a}${x}` : `${a}${x}`;
}

function linTex(a: number, b: number): string {
  const lead = a === 1 ? "x" : a === -1 ? "-x" : `${a}x`;
  if (b === 0) return lead;
  return b > 0 ? `${lead}+${b}` : `${lead}${b}`;
}

function buildVariant(spec: Spec): NmtVariant {
  const id = `variant-${spec.n}`;
  const p = (suffix: string) => `${id}-${suffix}`;

  const [pctP, pctA] = spec.pct;
  const pctAns = (pctP * pctA) / 100;

  const [f1, f2] = spec.frac;
  const fracNum = f2 + f1;
  const fracDen = f1 * f2;
  const fracCorrect = `$${fracTex(fracNum, fracDen)}$`;

  const [base, e1, e2] = spec.pow;
  const powAns = base ** (e1 + e2);

  const [rk, rm] = spec.rad;
  const radTex = `$${rk}\\sqrt{${rm}}$`;
  const radInside = rk * rk * rm;

  const [la, lb, lc] = spec.lin;
  const linAns = (lc - lb) / la;

  const [q1, q2] = spec.quad;
  const qSum = q1 + q2;
  const qProd = q1 * q2;
  const qLarger = Math.max(q1, q2);
  const quadTex = qSum === 0 ? `x^2${qProd < 0 ? qProd : `+${qProd}`}=0` : `x^2${signed(-qSum)}${qProd < 0 ? qProd : `+${qProd}`}=0`;

  const [ia, ib, ic] = spec.ineq;
  // «Найменше ціле x» коректне лише для a>0 (розв’язок x > bound).
  if (ia <= 0) {
    throw new Error(`Variant ${spec.n}: inequality leading coefficient must be positive`);
  }
  const bound = (ic - ib) / ia;
  const ineqAns = Math.floor(bound) + 1;

  const [fk, fb, fx0] = spec.fn;
  const fAns = fk * fx0 + fb;

  const [vb, vc] = spec.vert;
  const vertAns = -vb / 2;
  const vertTex = `y=x^2${signed(vb)}${vc < 0 ? vc : `+${vc}`}`;

  const [pa, pb, pc] = spec.pyth;
  const [rw, rh] = spec.rect;
  const rectAns = rw * rh;
  const circleK = spec.radius * spec.radius;
  const cubeAns = spec.cube ** 3;
  const [pS, pH] = spec.pyr;
  const pyrAns = (pS * pH) / 3;

  const [mPow, mSqrt, mPct] = spec.matchA;
  const mPowV = 2 ** mPow;
  const mSqrtV = Math.sqrt(mSqrt);
  const mPctV = (mPct / 100) * 80;
  const [mA, mB, mC] = spec.matchB;
  const root1 = mB - mA;
  const root2 = mB / 2;
  const root3 = mC ** 2;
  const [side, height] = spec.matchC;
  const sqA = side * side;
  const triA = (side * height) / 2;
  const rectA = side * (height + 2);
  const letters = ["А", "Б", "В", "Г", "Д"] as const;

  function matchRight(values: number[]) {
    const extras: number[] = [];
    let next = 1;
    while (extras.length < 2) {
      if (!values.includes(next) && !extras.includes(next)) extras.push(next);
      next += 1;
    }
    const all = [...values, ...extras];
    const shift = spec.n % 5;
    const right = letters.map((letter, index) => ({
      id: letter,
      text: `$${all[(index + shift) % 5]}$`,
    }));
    const letterOf = (value: number) => {
      const found = right.find((item) => item.text === `$${value}$`);
      if (!found) throw new Error(`No letter for ${value} in variant ${spec.n}`);
      return found.id;
    };
    return { right, letterOf };
  }

  const matchNums = matchRight([mPowV, mSqrtV, mPctV]);
  const matchEq = matchRight([root1, root2, mC]);
  const matchGeo = matchRight([sqA, triA, rectA]);

  const [sp, sa] = spec.shortPct;
  const shortPctAns = (sp * sa) / 100;
  const [sla, slb, slc] = spec.shortLin;
  const shortLinAns = (slc - slb) / sla;
  const [sga, sgb] = spec.shortGeo;
  const shortHyp = Math.sqrt(sga * sga + sgb * sgb);
  const shortFact = factorial(spec.shortN);

  const questions: Question[] = [
    single(
      p("s01"),
      "numbers",
      "відсотки",
      "easy",
      `Скільки становить $${pctP}\\%$ від $${pctA}$?`,
      numOpts(pctAns, [pctAns + 5, pctAns - 4, pctP, pctA / 2]),
      String(pctAns),
      `$\\dfrac{${pctP}}{100}\\cdot ${pctA}=${pctAns}$.`,
      "p\\% \\text{ від } a = \\dfrac{p}{100}\\cdot a",
    ),
    single(
      p("s02"),
      "numbers",
      "дроби",
      "easy",
      `$\\dfrac{1}{${f1}}+\\dfrac{1}{${f2}}$ дорівнює:`,
      five(fracCorrect, [
        `$\\dfrac{${f1 + f2}}{${f1 + f2}}$`,
        `$\\dfrac{2}{${f1 + f2}}$`,
        `$\\dfrac{${fracNum}}{${f1 + f2}}$`,
        `$\\dfrac{1}{${f1 * f2}}$`,
      ]),
      fracCorrect,
      `Спільний знаменник $${f1 * f2}$: $\\dfrac{${f2}}{${f1 * f2}}+\\dfrac{${f1}}{${f1 * f2}}=\\dfrac{${fracNum}}{${fracDen}}$.`,
    ),
    single(
      p("s03"),
      "numbers",
      "степені",
      "medium",
      `$${base}^{${e1}}\\cdot ${base}^{${e2}}$ дорівнює:`,
      numOpts(powAns, [base ** Math.abs(e1), base ** Math.abs(e2), powAns * base, powAns / base || 1]),
      String(powAns),
      `$${base}^{${e1}+(${e2})}=${base}^{${e1 + e2}}=${powAns}$.`,
      "a^m \\cdot a^n = a^{m+n}",
    ),
    single(
      p("s04"),
      "numbers",
      "корені",
      "medium",
      `$\\sqrt{${radInside}}$ спрощується до:`,
      five(radTex, [
        `$${rk + 1}\\sqrt{${rm}}$`,
        `$${rk}\\sqrt{${rm + 1}}$`,
        `$${rk * rm}$`,
        `$${rk * rk}\\sqrt{${rm}}$`,
      ]),
      radTex,
      `$\\sqrt{${rk}^2\\cdot ${rm}}=${rk}\\sqrt{${rm}}$.`,
    ),
    single(
      p("s05"),
      "equations",
      "лінійні",
      "easy",
      `Розв’язком рівняння $${linTex(la, lb)}=${lc}$ є:`,
      numOpts(linAns, [linAns + 1, linAns - 1, lc - lb, la]),
      String(linAns),
      `$${la}x=${lc - lb}$, $x=${linAns}$.`,
    ),
    single(
      p("s06"),
      "equations",
      "квадратні",
      "medium",
      `Більший корінь рівняння $${quadTex}$ дорівнює:`,
      numOpts(qLarger, [Math.min(q1, q2), qSum, qProd, qLarger + 1]),
      String(qLarger),
      `Корені $${q1}$ і $${q2}$, більший — $${qLarger}$.`,
      "x=\\dfrac{-b\\pm\\sqrt{D}}{2a}",
    ),
    single(
      p("s07"),
      "equations",
      "нерівності",
      "medium",
      `$${linTex(ia, ib)}>${ic}$. Найменше ціле $x$, яке задовольняє нерівність:`,
      numOpts(ineqAns, [ineqAns - 1, ineqAns + 1, Math.round(bound), ineqAns + 2]),
      String(ineqAns),
      `$x>${bound}$, найменше ціле — $${ineqAns}$.`,
    ),
    single(
      p("s08"),
      "functions",
      "лінійна",
      "easy",
      `$f(x)=${linTex(fk, fb)}$. Знайдіть $f(${fx0})$.`,
      numOpts(fAns, [fAns + fk, fk + fb, fx0, fAns - fk]),
      String(fAns),
      `$f(${fx0})=${fk}\\cdot ${fx0}${fb < 0 ? fb : `+${fb}`}=${fAns}$.`,
    ),
    single(
      p("s09"),
      "functions",
      "квадратична",
      "medium",
      `$${vertTex}$. Абсциса вершини параболи дорівнює:`,
      numOpts(vertAns, [vertAns + 1, vertAns - 1, vc, vb]),
      String(vertAns),
      `$x_v=-\\dfrac{b}{2a}=-\\dfrac{${vb}}{2}=${vertAns}$.`,
      "x_v=-\\dfrac{b}{2a}",
    ),
    single(
      p("s10"),
      "planimetry",
      "Піфагор",
      "easy",
      `Катети прямокутного трикутника дорівнюють $${pa}$ і $${pb}$. Гіпотенуза:`,
      numOpts(pc, [pa + pb, pc - 1, pa * 2, pb + 2]),
      String(pc),
      `$\\sqrt{${pa}^2+${pb}^2}=${pc}$.`,
      "c^2=a^2+b^2",
    ),
    single(
      p("s11"),
      "planimetry",
      "площа",
      "easy",
      `Площа прямокутника зі сторонами $${rw}$ і $${rh}$ дорівнює:`,
      numOpts(rectAns, [rw + rh, 2 * (rw + rh), rw * rh + rw, rectAns - rh]),
      String(rectAns),
      `$S=${rw}\\cdot ${rh}=${rectAns}$.`,
    ),
    single(
      p("s12"),
      "planimetry",
      "коло",
      "medium",
      `Площа круга радіуса $${spec.radius}$ дорівнює $k\\pi$. Знайдіть $k$.`,
      numOpts(circleK, [2 * spec.radius, spec.radius, circleK + spec.radius, 4 * spec.radius]),
      String(circleK),
      `$S=\\pi R^2=${circleK}\\pi$, тому $k=${circleK}$.`,
      "S=\\pi R^2",
    ),
    single(
      p("s13"),
      "stereometry",
      "куб",
      "easy",
      `Об’єм куба з ребром $${spec.cube}$ дорівнює:`,
      numOpts(cubeAns, [6 * spec.cube * spec.cube, spec.cube * spec.cube, cubeAns / spec.cube, spec.cube * 6]),
      String(cubeAns),
      `$V=a^3=${spec.cube}^3=${cubeAns}$.`,
      "V=a^3",
    ),
    single(
      p("s14"),
      "stereometry",
      "піраміда",
      "medium",
      `Об’єм піраміди з площею основи $${pS}$ і висотою $${pH}$ дорівнює:`,
      numOpts(pyrAns, [pS * pH, (pS * pH) / 2, pS + pH, pyrAns + pH]),
      String(pyrAns),
      `$V=\\dfrac{1}{3}SH=\\dfrac{1}{3}\\cdot ${pS}\\cdot ${pH}=${pyrAns}$.`,
      "V=\\dfrac{1}{3}SH",
    ),
    single(
      p("s15"),
      "probability",
      "класична ймовірність",
      "medium",
      spec.prob.question,
      five(spec.prob.correct, [...spec.prob.wrong]),
      spec.prob.correct,
      spec.prob.explain,
      "P=\\dfrac{m}{n}",
    ),
    matching(
      p("m16"),
      "numbers",
      "значення виразів",
      "Установіть відповідність між виразом і його значенням.",
      [
        { id: "1", text: `$2^{${mPow}}$` },
        { id: "2", text: `$\\sqrt{${mSqrt}}$` },
        { id: "3", text: `$${mPct}\\%$ від $80$` },
      ],
      matchNums.right,
      { "1": matchNums.letterOf(mPowV), "2": matchNums.letterOf(mSqrtV), "3": matchNums.letterOf(mPctV) },
      `$2^{${mPow}}=${mPowV}$, $\\sqrt{${mSqrt}}=${mSqrtV}$, $${mPct}\\%$ від $80$ — це $${mPctV}$.`,
    ),
    matching(
      p("m17"),
      "equations",
      "корені",
      "Установіть відповідність між рівнянням і його коренем.",
      [
        { id: "1", text: `$x+${mA}=${mB}$` },
        { id: "2", text: `$2x=${mB}$` },
        { id: "3", text: `$x^2=${root3}$, $x>0$` },
      ],
      matchEq.right,
      { "1": matchEq.letterOf(root1), "2": matchEq.letterOf(root2), "3": matchEq.letterOf(mC) },
      `$x=${root1}$; $x=${root2}$; $x=${mC}$.`,
    ),
    matching(
      p("m18"),
      "planimetry",
      "площі",
      "Установіть відповідність між фігурою та площею.",
      [
        { id: "1", text: `Квадрат зі стороною $${side}$` },
        { id: "2", text: `Трикутник з основою $${side}$ і висотою $${height}$` },
        { id: "3", text: `Прямокутник $${side}\\times ${height + 2}$` },
      ],
      matchGeo.right,
      { "1": matchGeo.letterOf(sqA), "2": matchGeo.letterOf(triA), "3": matchGeo.letterOf(rectA) },
      `$S=${sqA}$; $S=\\dfrac{1}{2}\\cdot ${side}\\cdot ${height}=${triA}$; $S=${rectA}$.`,
    ),
    short(
      p("sh19"),
      "numbers",
      "відсотки",
      "easy",
      `Знайдіть $${sp}\\%$ від $${sa}$. Впишіть число.`,
      String(shortPctAns),
      `$\\dfrac{${sp}}{100}\\cdot ${sa}=${shortPctAns}$.`,
      "p\\% \\text{ від } a = \\dfrac{p}{100}\\cdot a",
    ),
    short(
      p("sh20"),
      "equations",
      "лінійні",
      "easy",
      `Розв’яжіть $${linTex(sla, slb)}=${slc}$. Впишіть значення $x$.`,
      String(shortLinAns),
      `$${sla}x=${slc - slb}$, $x=${shortLinAns}$.`,
    ),
    short(
      p("sh21"),
      "planimetry",
      "Піфагор",
      "medium",
      `Катети $${sga}$ і $${sgb}$. Знайдіть гіпотенузу.`,
      String(shortHyp),
      `$\\sqrt{${sga}^2+${sgb}^2}=${shortHyp}$.`,
      "c^2=a^2+b^2",
    ),
    short(
      p("sh22"),
      "probability",
      "комбінаторика",
      "medium",
      `Скількома способами можна розставити $${spec.shortN}$ різні книги в ряд?`,
      String(shortFact),
      `$${spec.shortN}!=${shortFact}$.`,
      "P_n=n!",
    ),
  ];

  const integers = [
    pctAns,
    powAns,
    linAns,
    qLarger,
    ineqAns,
    fAns,
    vertAns,
    pyrAns,
    shortPctAns,
    shortLinAns,
    shortHyp,
    mPowV,
    mSqrtV,
    mPctV,
    root1,
    root2,
    root3,
    sqA,
    triA,
    rectA,
  ];
  for (const value of integers) {
    if (!Number.isInteger(value)) {
      throw new Error(`Variant ${spec.n} produced non-integer ${value}`);
    }
  }

  const uniqueGroups = [
    [mPowV, mSqrtV, mPctV],
    [root1, root2, mC],
    [sqA, triA, rectA],
  ];
  for (const group of uniqueGroups) {
    if (new Set(group).size !== group.length) {
      throw new Error(`Variant ${spec.n} matching values collide: ${group.join(", ")}`);
    }
  }

  return {
    id,
    number: spec.n,
    title: `Варіант ${spec.n}`,
    questions,
  };
}

function factorial(n: number): number {
  let result = 1;
  for (let i = 2; i <= n; i += 1) result *= i;
  return result;
}

export const nmtVariants: NmtVariant[] = SPECS.map(buildVariant);

for (const variant of nmtVariants) {
  if (variant.questions.length !== 22) {
    throw new Error(`${variant.title} must have 22 questions`);
  }
  const singles = variant.questions.filter((item) => item.type === "single");
  const matches = variant.questions.filter((item) => item.type === "matching");
  const shorts = variant.questions.filter((item) => item.type === "short");
  if (singles.length !== 15 || matches.length !== 3 || shorts.length !== 4) {
    throw new Error(`${variant.title} has wrong NMT structure`);
  }
  for (const question of singles) {
    if (!question.options?.includes(question.correctAnswer[0])) {
      throw new Error(`${question.id} correct option missing`);
    }
  }
}

export const VARIANT_RANDOM = "random";

export function getVariant(id: string): NmtVariant | undefined {
  return nmtVariants.find((item) => item.id === id);
}

export function pickFullVariant(completedIds: string[] = []): NmtVariant {
  const remaining = nmtVariants.filter((item) => !completedIds.includes(item.id));
  const pool = remaining.length > 0 ? remaining : nmtVariants;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function questionsFromVariants(): Question[] {
  return nmtVariants.flatMap((item) => item.questions);
}

export function findQuestion(questionId: string): Question | undefined {
  return questionsFromVariants().find((item) => item.id === questionId);
}
