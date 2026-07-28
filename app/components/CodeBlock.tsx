"use client";

import React, { useState } from "react";
import { Check, Copy, FileCode } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  isDarkMode?: boolean;
}

export function CodeBlock({
  code,
  language,
  filename,
  isDarkMode = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderHighlightedCode = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => {
      if (
        line.trim().startsWith("//") ||
        line.trim().startsWith("{{!--") ||
        line.trim().startsWith("#") ||
        line.trim().startsWith("/*")
      ) {
        return (
          <div
            key={lineIdx}
            className={isDarkMode ? "text-slate-500 italic" : "text-slate-400 italic"}
          >
            {line}
          </div>
        );
      }

      const tokens = line.split(
        /(\s+|[{}\[\](),;:<>.=`"']|"[^"]*"|'[^']*'|`[^`]*`)/g
      );

      return (
        <div key={lineIdx}>
          {tokens.map((token, tokIdx) => {
            if (!token) return null;

            if (
              (token.startsWith('"') && token.endsWith('"')) ||
              (token.startsWith("'") && token.endsWith("'")) ||
              (token.startsWith("`") && token.endsWith("`"))
            ) {
              return (
                <span
                  key={tokIdx}
                  className={
                    isDarkMode
                      ? "text-emerald-400 font-medium"
                      : "text-emerald-600 font-medium"
                  }
                >
                  {token}
                </span>
              );
            }

            if (
              /^(import|export|function|const|let|var|return|from|async|await|default|if|else|typeof|try|catch|module|exports|new)$/.test(
                token
              )
            ) {
              return (
                <span
                  key={tokIdx}
                  className={
                    isDarkMode
                      ? "text-purple-400 font-bold"
                      : "text-purple-600 font-bold"
                  }
                >
                  {token}
                </span>
              );
            }

            if (
              /^(nxpress|serve|Request|Response|express|dotenv|console|log|json|render|props|req|res|app|logger|tailwind|G|R|E|Boolean|String|Number|Object)$/.test(
                token
              )
            ) {
              return (
                <span
                  key={tokIdx}
                  className={
                    isDarkMode
                      ? "text-[#02FAFC] font-bold"
                      : "text-cyan-600 font-bold"
                  }
                >
                  {token}
                </span>
              );
            }

            if (
              token.startsWith("<") ||
              token.startsWith(">") ||
              token.startsWith("</") ||
              token.includes("hbs") ||
              token.includes("ejs")
            ) {
              return (
                <span
                  key={tokIdx}
                  className={
                    isDarkMode
                      ? "text-rose-400 font-bold"
                      : "text-rose-600 font-bold"
                  }
                >
                  {token}
                </span>
              );
            }

            if (/^\d+$/.test(token)) {
              return (
                <span
                  key={tokIdx}
                  className={
                    isDarkMode
                      ? "text-amber-400 font-bold"
                      : "text-amber-600 font-bold"
                  }
                >
                  {token}
                </span>
              );
            }

            return <span key={tokIdx}>{token}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div
      className={`rounded-xl border overflow-hidden shadow-sm transition-colors ${
        isDarkMode
          ? "border-[#26203b] bg-[#0c0916]"
          : "border-slate-200 bg-white"
      }`}
    >
      <div
        className={`flex items-center justify-between px-4 py-2 border-b font-mono text-xs ${
          isDarkMode
            ? "bg-[#141024] border-[#26203b] text-slate-300"
            : "bg-slate-100 border-slate-200 text-slate-700"
        }`}
      >
        <div className="flex items-center gap-2 font-semibold">
          <FileCode
            className={`w-4 h-4 ${
              isDarkMode ? "text-[#02FAFC]" : "text-cyan-600"
            }`}
          />
          <span>{filename || "Code Snippet"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded ${
              isDarkMode
                ? "bg-[#26203b] text-slate-300"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            {language}
          </span>
          <button
            onClick={handleCopy}
            className={`p-1 transition-colors cursor-pointer rounded ${
              isDarkMode
                ? "text-slate-400 hover:text-white hover:bg-slate-800"
                : "text-slate-500 hover:text-slate-900 hover:bg-slate-200"
            }`}
            title="Copy code"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <pre
        className={`p-4 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed whitespace-pre ${
          isDarkMode ? "text-slate-200" : "text-slate-800"
        }`}
      >
        <code>{renderHighlightedCode(code)}</code>
      </pre>
    </div>
  );
}
