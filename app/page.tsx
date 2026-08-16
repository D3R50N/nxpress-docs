"use client";

import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { CodeBlock } from "@/components/CodeBlock";
import { PackageManagerSelector } from "@/components/PackageManagerSelector";
import { SearchModal } from "@/components/SearchModal";
import { DOCS_DATA } from "@/app/docs-content";
import {
  ChevronRight,
  Code2,
  ExternalLink,
} from "lucide-react";

export default function HomePage() {
  const [activeSectionId, setActiveSectionId] = useState("getting-started");
  const [activeSubId, setActiveSubId] = useState<string | undefined>("starting-server");
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
        for (const sec of DOCS_DATA) {
          if (sec.id === hash) {
            setActiveSectionId(sec.id);
            setActiveSubId(sec.subsections[0]?.id);
            break;
          }
          const sub = sec.subsections.find((s) => s.id === hash);
          if (sub) {
            setActiveSectionId(sec.id);
            setActiveSubId(sub.id);
            break;
          }
        }
        setTimeout(() => {
          const yOffset = -70;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "auto" });
        }, 100);
      }
    }

    // IntersectionObserver scrollspy
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (isManualNav.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (!id) return;

          for (const sec of DOCS_DATA) {
            if (sec.id === id) {
              setActiveSectionId(sec.id);
              setActiveSubId(sec.subsections[0]?.id);
              window.history.replaceState(null, "", `#${id}`);
              break;
            }
            const sub = sec.subsections.find((s) => s.id === id);
            if (sub) {
              setActiveSectionId(sec.id);
              setActiveSubId(sub.id);
              window.history.replaceState(null, "", `#${id}`);
              break;
            }
          }
        }
      });
    }, observerOptions);

    DOCS_DATA.forEach((sec) => {
      const secEl = document.getElementById(sec.id);
      if (secEl) observer.observe(secEl);
      sec.subsections.forEach((sub) => {
        const subEl = document.getElementById(sub.id);
        if (subEl) observer.observe(subEl);
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSelectSection = (sectionId: string, subId?: string) => {
    isManualNav.current = true;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);

    setActiveSectionId(sectionId);
    setActiveSubId(subId);

    const targetId = subId || sectionId;
    window.history.replaceState(null, "", `#${targetId}`);

    const element = document.getElementById(targetId);
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

  const currentSection = DOCS_DATA.find((s) => s.id === activeSectionId);
  const currentSub = currentSection?.subsections.find((s) => s.id === activeSubId);

  return (
    <div className="min-h-screen flex flex-col w-full bg-(--bg-primary) text-(--text-primary)">
      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSection={handleSelectSection}
      />

      {/* Top Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        activeVersion="v1.3.8"
      />

      {/* Main 3-Column Workspace Layout */}
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto relative">
        {/* Left Sidebar */}
        <Sidebar
          activeSectionId={activeSectionId}
          activeSubId={activeSubId}
          onSelectSection={handleSelectSection}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          filterQuery={filterQuery}
          onFilterChange={setFilterQuery}
        />

        {/* Center Main Content */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 lg:p-10 space-y-10">
          {/* Hero Banner Visual Card */}
          <div className="relative rounded-2xl overflow-hidden bg-[#161b22] text-white p-6 sm:p-8 border border-slate-800 shadow-xs">
            <div className="relative z-10 max-w-2xl space-y-3">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                Modern File-Based Routing for Express.js
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Next-generation developer experience combining Express performance, intuitive template engines, cascading middlewares, and zero-config API routes.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#getting-started"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all"
                >
                  <span>Get Started</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=MonsieurDev.nxpress"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium border border-slate-700 transition-all"
                >
                  <Code2 className="w-4 h-4" />
                  <span>VS Code Extension</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Install Package Manager Tabs Widget */}
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

            {/* Documentation Sections */}
            <div className="space-y-16">
              {DOCS_DATA.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 space-y-6 border-b border-(--border-color) pb-12 last:border-b-0"
                >
                  {/* Section Title Header */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg border border-(--border-strong) bg-(--bg-secondary) text-blue-600 dark:text-blue-400">
                        {section.number}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-(--text-primary)">
                        {section.title}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-(--text-secondary) leading-relaxed">
                      {section.summary}
                    </p>
                  </div>

                  {/* Subsections Cards */}
                  <div className="space-y-8">
                    {section.subsections.map((sub) => (
                      <div
                        key={sub.id}
                        id={sub.id}
                        className="scroll-mt-28 space-y-4 rounded-2xl p-5 sm:p-7 border border-(--border-color) bg-(--bg-card) shadow-xs hover:border-(--border-strong) transition-colors"
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
              ))}
            </div>
          </main>

          {/* Right Sidebar (TOC & Widgets) */}
          <RightSidebar
            activeSectionId={activeSectionId}
            activeSubId={activeSubId}
            onSelectSub={handleSelectSection}
            onScrollToTop={scrollToTop}
          />
        </div>

        {/* Floating App Card Footer */}
        <footer className="w-full border-t border-(--border-color) bg-(--bg-secondary)/60 py-6 px-6 sm:px-8 text-xs text-(--text-muted) font-sans">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
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
