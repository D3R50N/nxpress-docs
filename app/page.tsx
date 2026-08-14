"use client";

import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { CodeBlock } from "@/components/CodeBlock";
import { SearchModal } from "@/components/SearchModal";
import { DOCS_DATA } from "@/app/docs-content";
import { Terminal, Shield, FileCode, ChevronRight, Layers, ArrowUp, Code2, ExternalLink } from "lucide-react";

export default function HomePage() {
  const [activeSectionId, setActiveSectionId] = useState("");
  const [activeSubId, setActiveSubId] = useState<string | undefined>("starting-server");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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
          const yOffset = -80;
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "auto" });
        }, 100);
      }
    } else {
      const savedScroll = sessionStorage.getItem("nxpress_docs_scroll_y");
      if (savedScroll) {
        window.scrollTo(0, parseInt(savedScroll, 10));
      }
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      sessionStorage.setItem("nxpress_docs_scroll_y", window.scrollY.toString());
    };

    window.addEventListener("scroll", handleScroll);

    // IntersectionObserver scrollspy only active during manual scrolling
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -65% 0px",
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
      window.removeEventListener("scroll", handleScroll);
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
      const yOffset = -80; // Header offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    // Re-enable scrollspy only after smooth scrolling completes
    scrollTimer.current = setTimeout(() => {
      isManualNav.current = false;
    }, 1000);
  };

  const scrollToTop = () => {
    isManualNav.current = true;
    window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      isManualNav.current = false;
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-(--bg-primary) text-(--text-primary) font-sans antialiased">
      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectSection={handleSelectSection}
      />

      {/* Top Header Navigation */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar Index */}
        <Sidebar
          activeSectionId={activeSectionId}
          activeSubId={activeSubId}
          onSelectSection={handleSelectSection}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Primary Content View */}
        <main className="flex-1 min-w-0 p-4 sm:p-8 md:p-12 space-y-16">
          {/* Documentation Banner Header */}
          <div className="border-b border-(--border-color) pb-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-(--text-muted)">
              <Terminal className="w-4 h-4 text-(--text-primary)" />
              <span>Technical Reference Manual</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-(--text-primary)">
              Nxpress Documentation
            </h1>
            <p className="text-base sm:text-lg text-(--text-secondary) max-w-3xl leading-relaxed">
              Exhaustive reference manual detailing file-based routing, template engine components, cascading middlewares, companion data fetching, and built-in template helpers.
            </p>

            {/* Quick Specs Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <div className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-md border border-(--border-color) bg-(--bg-secondary) text-(--text-secondary)">
                <Shield className="w-3.5 h-3.5" />
                <span>Express.js Based</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-md border border-(--border-color) bg-(--bg-secondary) text-(--text-secondary)">
                <FileCode className="w-3.5 h-3.5" />
                <span>EJS / HBS / Nunjucks / Liquid</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-md border border-(--border-color) bg-(--bg-secondary) text-(--text-secondary)">
                <Layers className="w-3.5 h-3.5" />
                <span>Tailwind CSS v4</span>
              </div>
              <a
                href="https://marketplace.visualstudio.com/items?itemName=MonsieurDev.nxpress"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-md border border-(--border-color) bg-(--bg-secondary) text-(--text-primary) hover:bg-(--bg-card) transition-all"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>VS Code Extension: MonsieurDev.nxpress</span>
              </a>
            </div>
          </div>

          {/* Documentation Sections */}
          <div className="space-y-20">
            {DOCS_DATA.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 space-y-8 border-b border-(--border-color) pb-12 last:border-b-0"
              >
                {/* Section Header */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold px-2.5 py-1 rounded border border-(--border-color) bg-(--bg-secondary) text-(--text-muted)">
                      {section.number}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-(--text-primary)">
                      {section.title}
                    </h2>
                  </div>
                  <p className="text-base text-(--text-secondary) leading-relaxed">
                    {section.summary}
                  </p>
                </div>

                {/* Subsections */}
                <div className="space-y-12">
                  {section.subsections.map((sub) => (
                    <div
                      key={sub.id}
                      id={sub.id}
                      className="scroll-mt-24 space-y-4 rounded-xl p-4 sm:p-6 border border-(--border-color) bg-(--bg-card) shadow-xs"
                    >
                      <h3 className="text-lg sm:text-xl font-bold text-(--text-primary) flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-(--text-muted) shrink-0" />
                        <span>{sub.title}</span>
                      </h3>

                      {sub.description && (
                        <p className="text-sm text-(--text-secondary) leading-relaxed">
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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-(--border-color) bg-(--bg-secondary) text-(--text-primary) hover:bg-(--bg-primary) hover:border-(--text-primary) font-semibold text-xs sm:text-sm transition-all shadow-xs"
                          >
                            <span>{sub.link.label}</span>
                            <ExternalLink className="w-4 h-4 text-(--text-muted) shrink-0" />
                          </a>
                        </div>
                      )}

                      {/* Content Bullets */}
                      {sub.content && sub.content.length > 0 && (
                        <ul className="space-y-2 text-sm text-(--text-secondary) list-disc pl-5">
                          {sub.content.map((item, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Code Snippets */}
                      {sub.codeSnippets && sub.codeSnippets.length > 0 && (
                        <div className="space-y-4 pt-2">
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
                        <div className="overflow-x-auto my-4 rounded-lg border border-(--border-color)">
                          <table className="w-full text-left text-xs sm:text-sm font-sans">
                            <thead className="bg-(--bg-secondary) text-(--text-primary) border-b border-(--border-color) font-semibold uppercase tracking-wider text-[11px]">
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
                                  className="hover:bg-(--bg-secondary)/50 transition-colors"
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
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-(--border-color) bg-(--bg-secondary) py-8 px-4 text-center text-xs text-(--text-muted) font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            Nxpress Reference Documentation &bull; {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-4">
            <span>Built for High-Performance Express Node.js Apps</span>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Floating Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full border border-(--border-color) bg-(--bg-primary) text-(--text-primary) shadow-lg hover:bg-(--bg-secondary) transition-all cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
