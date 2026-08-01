"use client";

import React from "react";
import { DOCS_DATA } from "@/app/docs-content";
import { BookOpen } from "lucide-react";

interface SidebarProps {
  activeSectionId: string;
  activeSubId?: string;
  onSelectSection: (sectionId: string, subId?: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  activeSectionId,
  activeSubId,
  onSelectSection,
  isOpenMobile,
  onCloseMobile,
}: SidebarProps) {
  const content = (
    <div className="flex flex-col h-full py-4 overflow-y-auto font-sans">
      <div className="px-4 mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] border-b border-[var(--border-color)] pb-3">
        <BookOpen className="w-4 h-4 text-[var(--text-primary)]" />
        <span>Documentation Index</span>
      </div>

      <nav className="space-y-6 px-2">
        {DOCS_DATA.map((sec) => {
          const isActiveSec = activeSectionId === sec.id;

          return (
            <div key={sec.id} className="space-y-1">
              {/* Section Title Header */}
              <button
                onClick={() => {
                  onSelectSection(sec.id);
                  onCloseMobile();
                }}
                className={`w-full text-left px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer ${
                  isActiveSec
                    ? "bg-[var(--accent-color)] text-[var(--accent-contrast)]"
                    : "text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                }`}
              >
                <span className="font-mono opacity-60 text-[10px]">{sec.number}</span>
                <span className="truncate">{sec.title}</span>
              </button>

              {/* Subsections list */}
              <div className="pl-4 space-y-0.5 border-l border-[var(--border-color)] ml-3 mt-1">
                {sec.subsections.map((sub) => {
                  const isActiveSub = isActiveSec && activeSubId === sub.id;
                  return (
                    <button
                      key={sub.id}
                      onClick={() => {
                        onSelectSection(sec.id, sub.id);
                        onCloseMobile();
                      }}
                      className={`w-full text-left px-2 py-1 rounded text-xs transition-colors cursor-pointer block truncate ${
                        isActiveSub
                          ? "font-semibold text-[var(--text-primary)] bg-[var(--bg-secondary)]"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]/50"
                      }`}
                    >
                      {sub.title}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside className="hidden md:block w-64 shrink-0 border-r border-[var(--border-color)] bg-[var(--bg-primary)] h-[calc(100vh-4rem)] sticky top-16">
        {content}
      </aside>

      {/* Mobile drawer overlay */}
      {isOpenMobile && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <aside className="relative w-4/5 max-w-sm bg-[var(--bg-primary)] border-r border-[var(--border-color)] h-full z-10">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
