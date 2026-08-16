"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_DATA } from "@/app/docs-content";
import {
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface SidebarProps {
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  filterQuery: string;
  onFilterChange: (query: string) => void;
  activeSubId?: string;
}

export function Sidebar({
  isOpenMobile,
  onCloseMobile,
  filterQuery,
  onFilterChange,
  activeSubId,
}: SidebarProps) {
  const pathname = usePathname();
  const currentSlug = pathname.replace("/docs/", "").replace("/docs", "") || DOCS_DATA[0].id;

  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSectionCollapse = (secId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCollapsedSections((prev) => ({
      ...prev,
      [secId]: !prev[secId],
    }));
  };

  const content = (
    <div className="flex flex-col h-full py-4 px-3 overflow-y-auto font-sans">
      {/* Fast Search Input */}
      <div className="relative mb-3 px-1">
        <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-(--text-muted)" />
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => onFilterChange(e.target.value)}
          placeholder="Filter documentation..."
          className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-(--border-strong) bg-(--bg-secondary) text-xs text-(--text-primary) placeholder:text-(--text-muted) focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Structured Navigation Groups */}
      <nav className="space-y-4 px-1 flex-1">
        {DOCS_DATA.map((sec) => {
          const isCollapsed = !!collapsedSections[sec.id];
          const isActiveSec = currentSlug === sec.id;

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
              {/* Group Header Link */}
              <div className="w-full flex items-center justify-between px-2.5 py-1 text-xs font-semibold text-(--text-primary) hover:text-blue-600 transition-colors group">
                <Link
                  href={`/docs/${sec.id}`}
                  onClick={onCloseMobile}
                  className={`flex items-center gap-2 truncate flex-1 ${
                    isActiveSec ? "text-blue-600 dark:text-blue-400 font-bold" : ""
                  }`}
                >
                  <span className="text-[11px] font-mono text-(--text-muted) group-hover:text-blue-500">
                    {sec.number}
                  </span>
                  <span className="truncate">{sec.title}</span>
                </Link>
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
                <div className="space-y-0.5 mt-0.5 pl-2 border-l border-(--border-color) ml-2">
                  {filteredSubs.map((sub) => {
                    const isCurrentSubActive = isActiveSec && activeSubId === sub.id;

                    return (
                      <Link
                        key={sub.id}
                        href={`/docs/${sec.id}#${sub.id}`}
                        onClick={onCloseMobile}
                        className={`w-full text-left block px-2.5 py-1.5 rounded-lg text-xs transition-all truncate ${
                          isCurrentSubActive
                            ? "bg-(--pill-active-bg) text-(--pill-active-text) font-semibold"
                            : isActiveSec
                            ? "text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary)"
                            : "text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-secondary)"
                        }`}
                      >
                        {sub.title}
                      </Link>
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
      <aside className="hidden lg:block w-64 shrink-0 border-r border-(--border-color) bg-(--bg-primary) h-[calc(100vh-3.5rem)] sticky top-14 overflow-hidden">
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
