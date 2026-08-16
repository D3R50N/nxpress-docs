"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { CodeBlock } from "@/components/CodeBlock";
import { PackageManagerSelector } from "@/components/PackageManagerSelector";
import { SearchModal } from "@/components/SearchModal";
import { DOCS_DATA, DocSection } from "@/app/docs-content";
import {
  ChevronRight,
  ChevronLeft,
  Code2,
  ExternalLink,
} from "lucide-react";

interface DocPageContentProps {
  section: DocSection;
  prevSection: DocSection | null;
  nextSection: DocSection | null;
}

export function DocPageContent({
  section,
  prevSection,
  nextSection,
}: DocPageContentProps) {
  const [activeSubId, setActiveSubId] = useState<string | undefined>(
    section.subsections[0]?.id
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState("");

  const isManualNav = useRef(false);
  const scrollTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setActiveSubId(hash);
        setTimeout(() => {
          const yOffset = -70;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "auto" });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
      setActiveSubId(section.subsections[0]?.id);
    }

    const observerOptions = {
      root: null,
      rootMargin: "-80px 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (isManualNav.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          setActiveSubId(entry.target.id);
          window.history.replaceState(null, "", `#${entry.target.id}`);
        }
      });
    }, observerOptions);

    section.subsections.forEach((sub) => {
      const subEl = document.getElementById(sub.id);
      if (subEl) observer.observe(subEl);
    });

    return () => {
      observer.disconnect();
    };
  }, [section]);

  const handleSelectSub = (subId: string) => {
    isManualNav.current = true;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);

    setActiveSubId(subId);
    window.history.replaceState(null, "", `#${subId}`);

    const element = document.getElementById(subId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    scrollTimer.current = setTimeout(() => {
      isManualNav.current = false;
    }, 800);
  };

  const scrollToTop = () => {
    isManualNav.current = true;
    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      isManualNav.current = false;
    }, 800);
  };

  const isOverview = section.id === "overview-cli";

  return (
    <div className="min-h-screen flex flex-col w-full bg-(--bg-primary) text-(--text-primary)">
      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        activeVersion="v1.3.8"
      />

      {/* Main 3-Column Layout */}
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto relative">
        {/* Left Sidebar */}
        <Sidebar
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          filterQuery={filterQuery}
          onFilterChange={setFilterQuery}
          activeSubId={activeSubId}
        />

        {/* Center Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 space-y-10">
          {/* Overview Hero Card on First Page */}
          {isOverview && (
            <div className="relative rounded-2xl overflow-hidden border border-(--border-strong) bg-(--bg-secondary) p-6 sm:p-8 shadow-xs transition-colors">
              <div className="relative z-10 max-w-2xl space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-(--text-primary)">
                  Modern File-Based Routing for Express.js
                </h1>
                <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                  Next-generation developer experience combining Express performance, intuitive template engines, cascading middlewares, and zero-config API routes.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="#project-scaffolding"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all"
                  >
                    <span>Quickstart</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://marketplace.visualstudio.com/items?itemName=MonsieurDev.nxpress"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-(--border-strong) bg-(--bg-primary) hover:bg-(--bg-card) text-(--text-primary) text-xs font-medium transition-all"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>VS Code Extension</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Quick Install Tabs on Overview Page */}
          {isOverview && (
            <div className="rounded-2xl border border-(--border-color) bg-(--bg-card) p-5 sm:p-6 shadow-xs space-y-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-(--text-primary)">
                  Quick Installation
                </h3>
                <p className="text-xs text-(--text-secondary)">
                  Scaffold a new project in seconds with your preferred package manager.
                </p>
              </div>

              <PackageManagerSelector
                commandTemplate={{
                  pnpm: "pnpm create nxpress-app@latest my-app",
                  npm: "npx create-nxpress-app@latest my-app",
                  yarn: "yarn create nxpress-app my-app",
                  bun: "bun create nxpress-app my-app",
                }}
              />
            </div>
          )}

          {/* Page Section Content */}
          <section className="space-y-6">
            {/* Section Header */}
            <div className="space-y-2 border-b border-(--border-color) pb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg border border-(--border-strong) bg-(--bg-secondary) text-blue-600 dark:text-blue-400">
                  {section.number}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary)">
                  {section.title}
                </h2>
              </div>
              <p className="text-sm text-(--text-secondary) leading-relaxed max-w-3xl">
                {section.summary}
              </p>
            </div>

            {/* Subsections Cards */}
            <div className="space-y-8">
              {section.subsections.map((sub) => (
                <div
                  key={sub.id}
                  id={sub.id}
                  className="scroll-mt-20 space-y-4 rounded-2xl p-5 sm:p-7 border border-(--border-color) bg-(--bg-card) shadow-xs hover:border-(--border-strong) transition-colors"
                >
                  <h3 className="text-base sm:text-lg font-bold text-(--text-primary) flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-500 shrink-0" />
                    <span>{sub.title}</span>
                  </h3>

                  {sub.description && (
                    <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                      {sub.description}
                    </p>
                  )}

                  {/* Direct External Link */}
                  {sub.link && (
                    <div className="py-1">
                      <a
                        href={sub.link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-(--border-strong) bg-(--bg-secondary) text-(--text-primary) hover:bg-(--bg-primary) hover:border-blue-500 font-semibold text-xs transition-all shadow-xs"
                      >
                        <span>{sub.link.label}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-(--text-muted) shrink-0" />
                      </a>
                    </div>
                  )}

                  {/* Content Bullets */}
                  {sub.content && sub.content.length > 0 && (
                    <ul className="space-y-2 text-xs sm:text-sm text-(--text-secondary) list-disc pl-5">
                      {sub.content.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Code Snippets */}
                  {sub.codeSnippets && sub.codeSnippets.length > 0 && (
                    <div className="space-y-4 pt-1">
                      {sub.codeSnippets.map((snippet, idx) => (
                        <CodeBlock
                          key={idx}
                          title={snippet.title}
                          language={snippet.language}
                          code={snippet.code}
                        />
                      ))}
                    </div>
                  )}

                  {/* Tables */}
                  {sub.table && (
                    <div className="overflow-x-auto my-4 rounded-xl border border-(--border-strong)">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-(--bg-secondary) text-(--text-primary) border-b border-(--border-strong) font-semibold uppercase tracking-wider text-[10px]">
                          <tr>
                            {sub.table.headers.map((h, i) => (
                              <th key={i} className="px-4 py-3">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-(--border-color) text-(--text-secondary)">
                          {sub.table.rows.map((row, rIdx) => (
                            <tr
                              key={rIdx}
                              className="hover:bg-(--bg-secondary)/60 transition-colors"
                            >
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`px-4 py-3 ${
                                    cIdx === 0
                                      ? "font-mono font-semibold text-(--text-primary)"
                                      : ""
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Previous / Next Page Navigation */}
          <div className="pt-8 border-t border-(--border-color) flex items-center justify-between gap-4">
            {prevSection ? (
              <Link
                href={`/docs/${prevSection.id}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-(--border-strong) bg-(--bg-secondary) text-(--text-primary) hover:border-blue-500 text-xs font-semibold transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-blue-500" />
                <div className="text-left">
                  <div className="text-[10px] text-(--text-muted) uppercase">Previous</div>
                  <div className="truncate">{prevSection.title}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextSection && (
              <Link
                href={`/docs/${nextSection.id}`}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-(--border-strong) bg-(--bg-secondary) text-(--text-primary) hover:border-blue-500 text-xs font-semibold transition-colors ml-auto"
              >
                <div className="text-right">
                  <div className="text-[10px] text-(--text-muted) uppercase">Next</div>
                  <div className="truncate">{nextSection.title}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-blue-500" />
              </Link>
            )}
          </div>
        </main>

        {/* Right Sidebar (Section-scoped TOC) */}
        <RightSidebar
          section={section}
          activeSubId={activeSubId}
          onSelectSub={handleSelectSub}
          onScrollToTop={scrollToTop}
        />
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-(--border-color) bg-(--bg-secondary)/60 py-6 px-6 sm:px-8 text-xs text-(--text-muted) font-sans">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            Nxpress Official Reference &bull; {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="https://github.com/D3R50N/nxpress"
              target="_blank"
              rel="noreferrer"
              className="hover:text-(--text-primary) transition-colors"
            >
              GitHub
            </a>
            <span>&bull;</span>
            <a
              href="https://marketplace.visualstudio.com/items?itemName=MonsieurDev.nxpress"
              target="_blank"
              rel="noreferrer"
              className="hover:text-(--text-primary) transition-colors"
            >
              VS Code Extension
            </a>
            <span>&bull;</span>
            <span>MIT License</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
