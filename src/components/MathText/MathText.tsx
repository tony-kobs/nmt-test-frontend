"use client";

import { useMemo } from "react";
import katex from "katex";

function renderLatex(latex: string, displayMode = false): string {
  return katex.renderToString(latex, {
    throwOnError: false,
    displayMode,
    output: "html",
  });
}

export function MathText({ text, className }: { text: string; className?: string }) {
  const nodes = useMemo(() => {
    const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^$]+\$)/g);
    return parts.map((part, index) => {
      if (part.startsWith("$$") && part.endsWith("$$")) {
        return (
          <span
            key={index}
            dangerouslySetInnerHTML={{ __html: renderLatex(part.slice(2, -2), true) }}
          />
        );
      }
      if (part.startsWith("$") && part.endsWith("$")) {
        return <span key={index} dangerouslySetInnerHTML={{ __html: renderLatex(part.slice(1, -1)) }} />;
      }
      return <span key={index}>{part}</span>;
    });
  }, [text]);

  return <span className={className}>{nodes}</span>;
}
