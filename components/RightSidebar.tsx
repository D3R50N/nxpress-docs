"use client";

import React, { useState } from "react";
import { Copy, Check, ArrowUp, Play, BookOpen, ExternalLink } from "lucide-react";
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
    <aside className="hidden xl:block w-64 shrink-0 py-6 px-4 space-y-6 h-[calc(100vh-8rem)] sticky top-28 overflow-y-auto">
      {/* Share / Copy URL Pill */}
      <button
        onClick={handleCopyLink}
        className="w-full flex items-center justify-between px-3 py-2 rounded-full border border-(--border-strong) bg-(--bg-secondary) text-xs text-(--text-secondary) hover:text-(--text-primary) hover:border-blue-400 transition-colors cursor-pointer group"
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
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-(--text-primary)">
          On this page
        </h4>

        <div className="space-y-1">
          {activeSection?.subsections.map((sub) => {
            const isActive = activeSubId === sub.id;

            return (
              <button
                key={sub.id}
                onClick={() => onSelectSub(activeSection.id, sub.id)}
                className={`w-full text-left px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer truncate ${
                  isActive
                    ? "border border-blue-500 font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30"
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
      <button
        onClick={onScrollToTop}
        className="flex items-center gap-2 text-xs font-medium text-(--text-muted) hover:text-(--text-primary) transition-colors cursor-pointer pt-2"
      >
        <ArrowUp className="w-4 h-4 text-blue-500" />
        <span>Back to top</span>
      </button>

      {/* "Need help?" Card Widget */}
      <div className="rounded-2xl border border-(--border-strong) bg-(--bg-secondary) p-3.5 space-y-3 shadow-xs">
        <div className="space-y-1">
          <h5 className="text-xs font-bold text-(--text-primary)">Need help?</h5>
          <p className="text-[11px] text-(--text-muted) leading-snug">
            Learn basics with quickstart guide & starter templates
          </p>
        </div>

        {/* Thumbnail Preview Banner */}
        <div className="relative rounded-xl overflow-hidden bg-slate-900 dark:bg-slate-800 text-white p-3 aspect-video flex flex-col justify-between group cursor-pointer border border-slate-700/50">
          <div className="flex items-center justify-between text-[10px] font-mono opacity-80">
            <span>NXPRESS TUTORIAL</span>
            <span className="px-1.5 py-0.5 rounded bg-white/20 text-[9px]">5 min</span>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
          </div>

          <div className="text-[10px] font-medium opacity-90 truncate">
            Fast setup & fullstack walkthrough
          </div>
        </div>

        <a
          href="https://github.com/D3R50N/nxpress"
          target="_blank"
          rel="noreferrer"
          className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline pt-1"
        >
          <span>Explore GitHub Repo</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
}
