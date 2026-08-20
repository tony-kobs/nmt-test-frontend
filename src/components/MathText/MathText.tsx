"use client";

import { useMemo } from "react";
import katex from "katex";
import { clsx } from "clsx";
import css from "./MathText.module.css";

function renderLatex(latex: string, displayMode = false): string {
  return katex.renderToString(latex, {
    throwOnError: false,
    displayMode,
    output: "html",
  });
}

export function MathText({ text, className }: { text: string; className?: string }) {
  const nodes = useMemo(() => {
    const source = typeof text === "string" ? text : "";
    const parts = source.split(/(\$\$[\s\S]+?\$\$|\$[^$]+\$)/g).filter((part) => part.length > 0);
    return parts.map((part, index) => {
      if (part.startsWith("$$") && part.endsWith("$$")) {
        return (
          <span
            key={index}
            className={css.block}
            dangerouslySetInnerHTML={{ __html: renderLatex(part.slice(2, -2), true) }}
          />
        );
      }
      if (part.startsWith("$") && part.endsWith("$")) {
        return (
          <span
            key={index}
            className={css.inline}
            dangerouslySetInnerHTML={{ __html: renderLatex(part.slice(1, -1)) }}
          />
        );
      }
      return <span key={index}>{part}</span>;
    });
  }, [text]);

  return <span className={clsx(css.root, className)}>{nodes}</span>;
}
