"use client";

import React, { useState } from "react";
import { DOCS_DATA } from "@/app/docs-content";
import {
  Search,
  BookOpen,
  Send,
  Layers,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Sparkles,
  FileCode2,
} from "lucide-react";

interface SidebarProps {
  activeSectionId: string;
  activeSubId?: string;
  onSelectSection: (sectionId: string, subId?: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  filterQuery: string;
  onFilterChange: (query: string) => void;
}

export function Sidebar({
  activeSectionId,
  activeSubId,
  onSelectSection,
  isOpenMobile,
  onCloseMobile,
  filterQuery,
  onFilterChange,
}: SidebarProps) {
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSectionCollapse = (secId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsedSections((prev) => ({
      ...prev,
      [secId]: !prev[secId],
    }));
  };

  const content = (
    <div className="flex flex-col h-full py-4 px-3 overflow-y-auto font-sans">
      {/* Fast Search Input */}
      <div className="relative mb-4 px-1">
        <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-(--text-muted)" />
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Fast search..."
          className="w-full pl-9 pr-3 py-1.5 rounded-full border border-(--border-strong) bg-(--bg-secondary) text-xs text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-blue-400 transition-colors"
        />
      </div>

      {/* Quick Pinned Items */}
      <div className="space-y-1 mb-5 px-1 border-b border-(--border-color) pb-4">
        <button
          onClick={() => {
            onSelectSection("getting-started", "starting-server");
            onCloseMobile();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium text-(--text-primary) hover:bg-(--bg-secondary) transition-colors cursor-pointer"
        >
          <div className="w-5 h-5 rounded-md bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <BookOpen className="w-3 h-3" />
          </div>
          <span>Documentation</span>
        </button>

        <a
          href="https://github.com/D3R50N/nxpress/releases"
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition-colors"
        >
          <div className="w-5 h-5 rounded-md bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <Send className="w-3 h-3" />
          </div>
          <span>Roadmap & Releases</span>
        </a>

        <a
          href="https://marketplace.visualstudio.com/items?itemName=MonsieurDev.nxpress"
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition-colors"
        >
          <div className="w-5 h-5 rounded-md bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <Layers className="w-3 h-3" />
          </div>
          <span>VS Code Extension</span>
        </a>

        <a
          href="https://github.com/D3R50N/nxpress/issues"
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition-colors"
        >
          <div className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
            <MessageSquare className="w-3 h-3" />
          </div>
          <span>Community</span>
        </a>
      </div>

      {/* Structured Navigation Groups */}
      <nav className="space-y-4 px-1 flex-1">
        {DOCS_DATA.map((sec) => {
          const isCollapsed = !!collapsedSections[sec.id];
          const isActiveSec = activeSectionId === sec.id;

          const filteredSubs = filterQuery
            ? sec.subsections.filter(
                (s) =>
                  s.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
                  s.description?.toLowerCase().includes(filterQuery.toLowerCase())
              )
            : sec.subsections;

          if (filterQuery && filteredSubs.length === 0 && !sec.title.toLowerCase().includes(filterQuery.toLowerCase())) {
            return null;
          }

          return (
            <div key={sec.id} className="space-y-1">
              {/* Group Header */}
              <div
                onClick={() => {
                  onSelectSection(sec.id, sec.subsections[0]?.id);
                  onCloseMobile();
                }}
                className="w-full flex items-center justify-between px-2.5 py-1 text-xs font-semibold text-(--text-primary) hover:text-blue-600 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[11px] font-mono text-(--text-muted) group-hover:text-blue-500">
                    {sec.number}
                  </span>
                  <span className="truncate">{sec.title}</span>
                </div>
                <button
                  onClick={(e) => toggleSectionCollapse(sec.id, e)}
                  className="p-0.5 rounded text-(--text-muted) hover:text-(--text-primary) transition-transform"
                >
                  {isCollapsed ? (
                    <ChevronRight className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Subsections list */}
              {!isCollapsed && (
                <div className="space-y-0.5 mt-1">
                  {filteredSubs.map((sub) => {
                    const isActiveSub =
                      (isActiveSec && activeSubId === sub.id) ||
                      (!activeSubId && isActiveSec && sec.subsections[0]?.id === sub.id);

                    return (
                      <button
                        key={sub.id}
                        onClick={() => {
                          onSelectSection(sec.id, sub.id);
                          onCloseMobile();
                        }}
                        className={`w-full text-left px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isActiveSub
                            ? "bg-(--pill-active-bg) text-(--pill-active-text) font-semibold shadow-xs"
                            : "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)"
                        }`}
                      >
                        <span className="truncate">{sub.title}</span>
                        {isActiveSub && (
                          <span className="shrink-0 text-[10px] font-mono font-normal px-1.5 py-0.2 rounded-full bg-blue-600 text-white">
                            Active
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 border-r border-(--border-color) bg-(--bg-primary) h-[calc(100vh-8rem)] sticky top-28 overflow-hidden">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <aside className="relative w-4/5 max-w-xs bg-(--bg-primary) border-r border-(--border-color) h-full z-10 shadow-2xl">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
