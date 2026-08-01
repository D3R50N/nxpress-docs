"use client";

import React, { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-ejs";

interface CodeBlockProps {
  title?: string;
  language?: string;
  code: string;
}

export function CodeBlock({ title, language = "typescript", code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState("");

  useEffect(() => {
    let lang = language.toLowerCase();
    if (lang === "ts" || lang === "typescript") lang = "typescript";
    else if (lang === "js" || lang === "javascript") lang = "javascript";
    else if (lang === "html" || lang === "ejs") lang = "ejs";
    else if (lang === "json") lang = "json";
    else if (lang === "bash" || lang === "shell" || lang === "sh") lang = "bash";
    else lang = "typescript";

    const prismLang = Prism.languages[lang] || Prism.languages.typescript;
    try {
      const html = Prism.highlight(code.trim(), prismLang, lang);
      setHighlightedHtml(html);
    } catch {
      setHighlightedHtml(code.trim());
    }
  }, [code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-code)] overflow-hidden font-mono text-sm shadow-xs">
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] text-xs">
          <span className="font-semibold uppercase tracking-wider text-[var(--text-secondary)] font-mono">
            {title || language}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer text-xs"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <div className="relative p-4 overflow-x-auto">
        {!title && !language && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 z-10 flex items-center gap-1 px-2 py-1 rounded border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-colors cursor-pointer text-xs"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        )}
        <pre className="text-xs md:text-sm leading-relaxed font-mono">
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedHtml || code }}
          />
        </pre>
      </div>
    </div>
  );
}
