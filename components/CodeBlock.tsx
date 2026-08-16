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
    <div className="my-4 rounded-2xl border border-(--border-code) bg-(--bg-code) text-(--code-text) overflow-hidden font-mono text-xs sm:text-sm shadow-xs transition-colors">
      {(title || language) && (
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-(--border-code) bg-(--bg-code-header) text-(--text-muted) text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 opacity-60">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="font-semibold text-(--text-secondary) font-mono text-[11px] ml-1">
              {title || language}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-(--border-strong) bg-(--bg-primary) text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition-colors cursor-pointer text-xs"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[11px] text-emerald-500">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <div className="relative p-4 sm:p-5 overflow-x-auto">
        {!title && !language && (
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-lg border border-(--border-strong) bg-(--bg-primary) text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition-colors cursor-pointer text-xs"
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        )}
        <pre className="text-xs sm:text-[13px] leading-relaxed font-mono">
          <code
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedHtml || code }}
          />
        </pre>
      </div>
    </div>
  );
}
