function compact(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/\$/g, "")
    .replace(/π/g, "pi")
    .replace(/⋅|×|·/g, "*")
    .replace(/ː|∶/g, ":")
    .replace(/\s+/g, "");
}

function decimalCommaToDot(value: string): string {
  return value.replace(/(\d),(\d)/g, "$1.$2");
}

export function normalizeAnswer(value: string): string {
  const compacted = compact(value);
  if (/^[(\[].*[)\]]$/.test(compacted)) {
    return compacted.replace(/,/g, ";");
  }
  return decimalCommaToDot(compacted);
}

function parseNumber(value: string): number | null {
  const normalized = normalizeAnswer(value);
  if (!normalized) return null;
  if (normalized === "pi") return Math.PI;

  const piProduct = normalized.match(/^(-?\d+(?:\.\d+)?)\*?pi$/);
  if (piProduct) return Number(piProduct[1]) * Math.PI;

  if (/^-?\d+\/-?\d+$/.test(normalized)) {
    const [numerator, denominator] = normalized.split("/").map(Number);
    if (denominator === 0) return null;
    return numerator / denominator;
  }

  const asNumber = Number(normalized);
  return Number.isFinite(asNumber) ? asNumber : null;
}

function splitList(value: string): string[] {
  return value
    .trim()
    .toLowerCase()
    .split(/\s*(?:;|\||(?:^|\s)(?:і|та)(?:\s|$)|\/)\s*/)
    .map((part) => part.trim())
    .filter(Boolean)
    .sort();
}

function numbersMatch(a: number, b: number): boolean {
  return Math.abs(a - b) < 1e-6;
}

export function isAnswerCorrect(userAnswer: string, accepted: string[]): boolean {
  const user = normalizeAnswer(userAnswer);
  if (!user) return false;

  for (const candidate of accepted) {
    const expected = normalizeAnswer(candidate);
    if (user === expected) return true;

    const userNum = parseNumber(userAnswer);
    const expectedNum = parseNumber(candidate);
    if (userNum !== null && expectedNum !== null && numbersMatch(userNum, expectedNum)) {
      return true;
    }

    const userList = splitList(userAnswer);
    const expectedList = splitList(candidate);
    if (userList.length > 1 && userList.length === expectedList.length) {
      const userNums = userList.map(parseNumber);
      const expectedNums = expectedList.map(parseNumber);
      const allNumeric = userNums.every((n) => n !== null) && expectedNums.every((n) => n !== null);
      if (allNumeric) {
        const a = [...(userNums as number[])].sort((x, y) => x - y);
        const b = [...(expectedNums as number[])].sort((x, y) => x - y);
        if (a.every((n, i) => numbersMatch(n, b[i]))) return true;
      }
    }
  }

  return false;
}
