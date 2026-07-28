"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  DOCS_NAVIGATION,
  DOCS_DATA,
  DocSection,
} from "../data/docsData";
import { InteractiveDemo } from "./InteractiveDemo";
import { CodeBlock } from "./CodeBlock";
import {
  Search,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Zap,
  Info,
  Lightbulb,
  AlertTriangle,
  ExternalLink,
  Sun,
  Moon,
} from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function DocsViewer() {
  const [activeId, setActiveId] = useState<string>("introduction");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const currentSection: DocSection = useMemo(() => {
    return DOCS_DATA[activeId] || DOCS_DATA["introduction"];
  }, [activeId]);

  const flatNavList = useMemo(() => {
    const list: { id: string; title: string; category: string }[] = [];
    DOCS_NAVIGATION.forEach((cat) => {
      cat.items.forEach((item) => {
        list.push({ id: item.id, title: item.title, category: cat.category });
      });
    });
    return list;
  }, []);

  const currentIndex = useMemo(() => {
    return flatNavList.findIndex((item) => item.id === activeId);
  }, [flatNavList, activeId]);

  const prevItem = currentIndex > 0 ? flatNavList[currentIndex - 1] : null;
  const nextItem =
    currentIndex < flatNavList.length - 1 ? flatNavList[currentIndex + 1] : null;

  const filteredNav = useMemo(() => {
    if (!searchQuery.trim()) return DOCS_NAVIGATION;
    const q = searchQuery.toLowerCase();
    return DOCS_NAVIGATION.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.id.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-150 ${
        isDarkMode
          ? "bg-[#0f0c1b] text-slate-100"
          : "bg-white text-slate-900"
      }`}
    >
      {/* Top Fixed Header */}
      <header
        className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors ${
          isDarkMode
            ? "border-[#26203b] bg-[#0f0c1b]/95 text-slate-100"
            : "border-slate-200 bg-white/95 text-slate-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Brand Name */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-200 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <a
              href="#"
              onClick={() => setActiveId("introduction")}
              className="flex items-center gap-3 font-bold text-lg group"
            >
              <Image
                src="/logo.png"
                alt="Nxpress Logo"
                width={32}
                height={32}
                className="w-8 h-8 rounded-md object-contain"
              />
              <span className="tracking-tight text-xl font-extrabold">
                Nxpress
              </span>
            </a>

            <span
              className={`px-2 py-0.5 text-[10px] font-mono font-bold border rounded-md ${
                isDarkMode
                  ? "bg-[#1e1838] text-[#02FAFC] border-[#26203b]"
                  : "bg-cyan-50 text-cyan-700 border-cyan-200"
              }`}
            >
              v1.1.0
            </span>
          </div>

          {/* Search Input */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border rounded-xl pl-9 pr-12 py-1.5 text-xs placeholder-slate-400 focus:outline-none transition-all ${
                isDarkMode
                  ? "bg-[#171326] border-[#26203b] text-slate-200 focus:border-[#02FAFC]"
                  : "bg-slate-50 border-slate-200 text-slate-900 focus:border-cyan-500"
              }`}
            />
            <span
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                isDarkMode
                  ? "text-slate-400 bg-[#26203b] border-slate-700"
                  : "text-slate-500 bg-slate-200 border-slate-300"
              }`}
            >
              ⌘K
            </span>
          </div>

          {/* Header Action Buttons & Theme Switcher */}
          <div className="flex items-center gap-3">
            {/* Light / Dark Mode Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors cursor-pointer border ${
                isDarkMode
                  ? "border-[#26203b] bg-[#141024] text-amber-300 hover:bg-[#1f1936]"
                  : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="https://github.com/D3R50N/nexpress"
              target="_blank"
              rel="noreferrer"
              className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-xs font-medium ${
                isDarkMode
                  ? "text-slate-400 hover:text-white hover:bg-[#1c1733]"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <GithubIcon className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            <a
              href="#installation"
              onClick={() => setActiveId("quick-start")}
              className={`px-3.5 py-1.5 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 ${
                isDarkMode
                  ? "bg-[#02FAFC] hover:bg-cyan-300 text-[#0f0c1b]"
                  : "bg-cyan-600 hover:bg-cyan-700 text-white"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Quick Start
            </a>
          </div>
        </div>
      </header>

      {/* Main Documentation Body */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex">
        {/* Left Sidebar Navigation - NO border-left! */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-72 border-r pt-20 pb-8 px-4 overflow-y-auto lg:static lg:z-auto lg:pt-6 lg:w-64 transform ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } transition-transform duration-200 ease-in-out ${
            isDarkMode
              ? "bg-[#0f0c1b] border-[#26203b]"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          {/* Mobile Search inside Sidebar */}
          <div className="md:hidden mb-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border rounded-lg pl-9 pr-3 py-2 text-xs ${
                isDarkMode
                  ? "bg-[#171326] border-[#26203b] text-slate-200"
                  : "bg-white border-slate-200 text-slate-900"
              }`}
            />
          </div>

          <div className="space-y-6">
            {filteredNav.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-1">
                <h3
                  className={`px-2 text-xs font-bold uppercase tracking-wider font-mono ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {cat.category}
                </h3>
                <div className="space-y-1 pt-1">
                  {cat.items.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveId(item.id);
                          setIsMobileOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-all ${
                          isActive
                            ? isDarkMode
                              ? "bg-[#1c1733] text-[#02FAFC] font-bold"
                              : "bg-cyan-50 text-cyan-800 font-bold"
                            : isDarkMode
                            ? "text-slate-400 hover:text-slate-200 hover:bg-[#171326]"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isActive && (
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                isDarkMode ? "bg-[#02FAFC]" : "bg-cyan-600"
                              }`}
                            />
                          )}
                          <span>{item.title}</span>
                        </div>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                              item.badge === "NEW"
                                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                                : isDarkMode
                                ? "bg-[#26203b] text-slate-300"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Mobile Backdrop */}
        {isMobileOpen && (
          <div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-20 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          />
        )}

        {/* Main Content Body */}
        <main className="flex-1 min-w-0 px-4 sm:px-8 py-8 lg:py-10 max-w-4xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 font-mono">
            <span>Docs</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span>{currentSection.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span
              className={`font-semibold ${
                isDarkMode ? "text-[#02FAFC]" : "text-cyan-700"
              }`}
            >
              {currentSection.title}
            </span>
          </div>

          {/* Article Header */}
          <div
            className={`border-b pb-6 mb-8 ${
              isDarkMode ? "border-[#26203b]" : "border-slate-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`px-2.5 py-0.5 text-xs font-mono font-bold rounded-md border ${
                  isDarkMode
                    ? "bg-[#1e1838] text-[#02FAFC] border-[#26203b]"
                    : "bg-cyan-50 text-cyan-800 border-cyan-200"
                }`}
              >
                {currentSection.category}
              </span>
              {currentSection.badge && (
                <span className="px-2 py-0.5 text-xs font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md border border-emerald-500/20">
                  {currentSection.badge}
                </span>
              )}
            </div>

            <h1
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {currentSection.title}
            </h1>

            <p
              className={`mt-3 text-base leading-relaxed max-w-3xl ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              {currentSection.description}
            </p>
          </div>

          {/* Section Overview Prose */}
          <div
            className={`prose max-w-none text-sm sm:text-base leading-relaxed mb-8 ${
              isDarkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            <p>{currentSection.content.overview}</p>
          </div>

          {/* Highlights Grid */}
          {currentSection.content.highlights && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              {currentSection.content.highlights.map((hl, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    isDarkMode
                      ? "bg-[#141024] border-[#26203b] hover:border-[#8b5cf6]/40"
                      : "bg-slate-50 border-slate-200 hover:border-cyan-300"
                  }`}
                >
                  <div
                    className={`font-bold text-sm flex items-center gap-2 ${
                      isDarkMode ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    <Sparkles
                      className={`w-4 h-4 flex-shrink-0 ${
                        isDarkMode ? "text-[#02FAFC]" : "text-cyan-600"
                      }`}
                    />
                    {hl.title}
                  </div>
                  <p
                    className={`text-xs mt-1.5 leading-relaxed ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {hl.desc}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Callout Alert Boxes */}
          {currentSection.content.callouts && (
            <div className="space-y-4 my-6">
              {currentSection.content.callouts.map((co, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
                    co.type === "tip"
                      ? isDarkMode
                        ? "bg-[#141024] border-[#02FAFC]/50 text-cyan-200"
                        : "bg-cyan-50 border-cyan-200 text-cyan-900"
                      : co.type === "important"
                      ? isDarkMode
                        ? "bg-[#141024] border-[#8b5cf6]/50 text-purple-200"
                        : "bg-purple-50 border-purple-200 text-purple-900"
                      : co.type === "warning"
                      ? isDarkMode
                        ? "bg-[#141024] border-amber-500/50 text-amber-200"
                        : "bg-amber-50 border-amber-200 text-amber-900"
                      : isDarkMode
                      ? "bg-[#141024] border-[#26203b] text-slate-300"
                      : "bg-slate-50 border-slate-200 text-slate-800"
                  }`}
                >
                  {co.type === "tip" && (
                    <Lightbulb
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        isDarkMode ? "text-[#02FAFC]" : "text-cyan-600"
                      }`}
                    />
                  )}
                  {co.type === "important" && (
                    <Info
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        isDarkMode ? "text-[#8b5cf6]" : "text-purple-600"
                      }`}
                    />
                  )}
                  {co.type === "warning" && (
                    <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <strong className="block font-semibold mb-0.5 text-sm">
                      {co.title}
                    </strong>
                    <span>{co.message}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Syntax Highlighted Code Snippets */}
          {currentSection.content.codeSnippets && (
            <div className="space-y-6 my-8">
              {currentSection.content.codeSnippets.map((snippet, idx) => (
                <CodeBlock
                  key={idx}
                  code={snippet.code}
                  language={snippet.language}
                  filename={snippet.filename || snippet.title}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          )}

          {/* Interactive Playground Widget */}
          {currentSection.content.demoType && (
            <InteractiveDemo
              demoType={currentSection.content.demoType}
              isDarkMode={isDarkMode}
            />
          )}          {/* Subsections List & Interactive Scroll Targets */}
          {currentSection.subsections.length > 0 && (
            <div
              className={`mt-10 pt-8 border-t space-y-6 ${
                isDarkMode ? "border-[#26203b]" : "border-slate-200"
              }`}
            >
              <h3
                className={`text-lg font-bold ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                In this section:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentSection.subsections.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      const el = document.getElementById(sub.id);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`p-3 rounded-lg border text-xs font-semibold transition-all flex items-center justify-between text-left cursor-pointer ${
                      isDarkMode
                        ? "bg-[#141024] border-[#26203b] text-slate-300 hover:text-[#02FAFC] hover:border-[#02FAFC]/50"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:text-cyan-700 hover:border-cyan-300"
                    }`}
                  >
                    <span>{sub.title}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>

              {/* Subsection Content Elements with ID Anchors */}
              <div className="space-y-4 pt-4">
                {currentSection.subsections.map((sub) => (
                  <div
                    key={sub.id}
                    id={sub.id}
                    className={`p-4 rounded-xl border scroll-mt-24 transition-colors ${
                      isDarkMode
                        ? "bg-[#141024]/60 border-[#26203b]"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <h4
                      className={`text-sm font-bold flex items-center gap-2 ${
                        isDarkMode ? "text-[#02FAFC]" : "text-cyan-800"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isDarkMode ? "bg-[#02FAFC]" : "bg-cyan-600"
                        }`}
                      />
                      {sub.title}
                    </h4>
                    <p
                      className={`mt-1.5 text-xs leading-relaxed ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      Detailed guidance on {sub.title.toLowerCase()} for your Nxpress application. Refer to the code blocks above for complete syntax and usage.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Pagination */}
          <div
            className={`mt-12 pt-8 border-t flex items-center justify-between gap-4 ${
              isDarkMode ? "border-[#26203b]" : "border-slate-200"
            }`}
          >
            {prevItem ? (
              <button
                onClick={() => setActiveId(prevItem.id)}
                className={`p-3 rounded-xl border text-left transition-all group max-w-[200px] sm:max-w-[260px] ${
                  isDarkMode
                    ? "border-[#26203b] bg-[#141024] hover:border-slate-600"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300"
                }`}
              >
                <span className="text-[11px] font-mono text-slate-400 block mb-0.5">
                  ← Previous
                </span>
                <span
                  className={`text-xs font-bold line-clamp-1 transition-colors ${
                    isDarkMode
                      ? "text-slate-200 group-hover:text-[#02FAFC]"
                      : "text-slate-800 group-hover:text-cyan-700"
                  }`}
                >
                  {prevItem.title}
                </span>
              </button>
            ) : (
              <div />
            )}

            {nextItem ? (
              <button
                onClick={() => setActiveId(nextItem.id)}
                className={`p-3 rounded-xl border text-right transition-all group max-w-[200px] sm:max-w-[260px] ml-auto ${
                  isDarkMode
                    ? "border-[#26203b] bg-[#141024] hover:border-[#02FAFC]/50"
                    : "border-slate-200 bg-slate-50 hover:border-cyan-300"
                }`}
              >
                <span className="text-[11px] font-mono text-slate-400 block mb-0.5">
                  Next Section →
                </span>
                <span
                  className={`text-xs font-bold line-clamp-1 transition-colors ${
                    isDarkMode
                      ? "text-slate-200 group-hover:text-[#02FAFC]"
                      : "text-slate-800 group-hover:text-cyan-700"
                  }`}
                >
                  {nextItem.title}
                </span>
              </button>
            ) : (
              <div />
            )}
          </div>
        </main>

        {/* Right Table of Contents (On This Page) */}
        <aside className="hidden xl:block w-56 pt-10 px-4">
          <div className="sticky top-24 space-y-4">
            <h4
              className={`text-xs font-bold uppercase tracking-wider font-mono ${
                isDarkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              On This Page
            </h4>

            <nav className="space-y-1 text-xs">
              {currentSection.subsections.map((sub) => (
                <a
                  key={sub.id}
                  href={`#${sub.id}`}
                  className={`block py-1 transition-colors line-clamp-1 ${
                    isDarkMode
                      ? "text-slate-400 hover:text-[#02FAFC]"
                      : "text-slate-600 hover:text-cyan-700"
                  }`}
                >
                  {sub.title}
                </a>
              ))}
            </nav>

            <div
              className={`pt-6 border-t text-xs font-mono space-y-2 ${
                isDarkMode ? "border-[#26203b]" : "border-slate-200"
              }`}
            >
              <a
                href="https://github.com/D3R50N/nexpress/issues"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-1.5 ${
                  isDarkMode
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Report an Issue
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
