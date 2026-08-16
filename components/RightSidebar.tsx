"use client";

import React, { useState } from "react";
import { Copy, Check, ArrowUp } from "lucide-react";
import { DOCS_DATA } from "@/app/docs-content";

interface RightSidebarProps {
  activeSectionId: string;
  activeSubId?: string;
  onSelectSub: (sectionId: string, subId: string) => void;
  onScrollToTop: () => void;
}

export function RightSidebar({
  activeSectionId,
  activeSubId,
  onSelectSub,
  onScrollToTop,
}: RightSidebarProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const activeSection = DOCS_DATA.find((s) => s.id === activeSectionId) || DOCS_DATA[0];

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : "https://github.com/D3R50N/nxpress";
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <aside className="hidden xl:block w-60 shrink-0 py-6 px-3 space-y-6 h-[calc(100vh-4rem)] sticky top-14 overflow-y-auto">
      {/* Share / Copy URL Pill */}
      <button
        onClick={handleCopyLink}
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-(--border-strong) bg-(--bg-secondary) text-xs text-(--text-secondary) hover:text-(--text-primary) hover:border-blue-400 transition-colors cursor-pointer group"
      >
        <span className="truncate text-[11px] font-mono">nxpress.js.org/docs</span>
        <div className="flex items-center gap-1 shrink-0 text-(--text-muted) group-hover:text-blue-500">
          {copiedLink ? (
            <Check className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </div>
      </button>

      {/* "On this page" TOC */}
      <div className="space-y-2.5">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-(--text-muted) px-1">
          On this page
        </h4>

        <div className="space-y-1">
          {activeSection?.subsections.map((sub) => {
            const isActive = activeSubId === sub.id;

            return (
              <button
                key={sub.id}
                onClick={() => onSelectSub(activeSection.id, sub.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer truncate ${
                  isActive
                    ? "font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30"
                    : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)"
                }`}
              >
                {sub.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Back to Top button */}
      <div className="pt-2 border-t border-(--border-color)">
        <button
          onClick={onScrollToTop}
          className="flex items-center gap-1.5 text-xs font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors cursor-pointer px-1"
        >
          <ArrowUp className="w-3.5 h-3.5 text-blue-500" />
          <span>Back to top</span>
        </button>
      </div>
    </aside>
  );
}
