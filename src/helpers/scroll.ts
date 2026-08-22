export function smoothScrollTop() {
  if (typeof window === "undefined") return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

export function scrollIntoViewId(id: string, block: ScrollLogicalPosition = "nearest") {
  if (typeof window === "undefined") return;
  const node = document.getElementById(id);
  if (!node) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block });
}
