"use client";

import React, { useState, useEffect } from "react";
import { Search, X, ChevronRight, FileText } from "lucide-react";
import { DOCS_DATA, DocSection, DocSubsection } from "@/app/docs-content";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (sectionId: string, subId?: string) => void;
}

interface SearchResultItem {
  section: DocSection;
  subsection: DocSubsection | null;
}

export function SearchModal({ isOpen, onClose, onSelectSection }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filtered: SearchResultItem[] = query.trim() === "" ? [] : DOCS_DATA.flatMap((sec) => {
    const results: SearchResultItem[] = [];
    if (
      sec.title.toLowerCase().includes(query.toLowerCase()) ||
      sec.summary.toLowerCase().includes(query.toLowerCase())
    ) {
      results.push({ section: sec, subsection: null });
    }
    sec.subsections.forEach((sub) => {
      if (
        sub.title.toLowerCase().includes(query.toLowerCase()) ||
        (sub.description && sub.description.toLowerCase().includes(query.toLowerCase())) ||
        (sub.content && sub.content.some((c) => c.toLowerCase().includes(query.toLowerCase())))
      ) {
        results.push({ section: sec, subsection: sub });
      }
    });
    return results;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-(--bg-primary) border border-(--border-color) rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search input header */}
        <div className="flex items-center px-4 border-b border-(--border-color) py-3">
          <Search className="w-5 h-5 text-(--text-muted) shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation, options, code, helpers..."
            className="w-full bg-transparent text-(--text-primary) focus:outline-none text-base placeholder:text-(--text-muted) font-sans"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-(--text-muted) hover:text-(--text-primary) transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results container */}
        <div className="overflow-y-auto p-3 flex-1">
          {query.trim() === "" ? (
            <div className="py-12 text-center text-(--text-muted) text-sm">
              Type keywords to search through all 13 documentation sections.
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-(--text-muted) text-sm">
              No documentation topics found for &quot;{query}&quot;.
            </div>
          ) : (
            <div className="space-y-1">
              {filtered.map(({ section, subsection }, idx) => (
                <button
                  key={`${section.id}-${subsection ? subsection.id : 'main'}-${idx}`}
                  onClick={() => {
                    onSelectSection(section.id, subsection ? subsection.id : undefined);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-lg hover:bg-(--bg-secondary) border border-transparent hover:border-(--border-color) transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <FileText className="w-4 h-4 text-(--text-muted) group-hover:text-(--text-primary) mt-1 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-(--text-muted) uppercase tracking-wider">
                        {section.number}. {section.title}
                      </div>
                      <div className="text-sm font-medium text-(--text-primary) mt-0.5">
                        {subsection ? subsection.title : section.title}
                      </div>
                      {subsection?.description && (
                        <div className="text-xs text-(--text-muted) line-clamp-1 mt-0.5">
                          {subsection.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-(--text-muted) group-hover:text-(--text-primary) shrink-0 ml-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-(--border-color) bg-(--bg-secondary) text-xs text-(--text-muted) flex items-center justify-between">
          <span>Search @nxpress/core Reference</span>
          <span className="font-mono text-[10px] border border-(--border-color) px-1.5 py-0.5 rounded">
            ESC to close
          </span>
        </div>
      </div>
    </div>
  );
}
