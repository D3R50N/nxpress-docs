"use client";

import React from "react";
import Image from "next/image";
import { Search, Menu, X, Code2, Sun, Moon, GitBranch } from "lucide-react";
import { useTheme } from "@/app/theme-provider";

interface HeaderProps {
  onOpenSearch: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  activeVersion?: string;
}

export function Header({
  onOpenSearch,
  isMobileMenuOpen,
  onToggleMobileMenu,
  activeVersion = "v1.3.8",
}: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-(--border-color) bg-(--bg-primary)/95 backdrop-blur-md px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between gap-4">
      {/* Left: Brand Logo + Version */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl border border-(--border-strong) text-(--text-primary) hover:bg-(--bg-secondary)"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        <a href="#" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.svg"
            alt="Nxpress Logo"
            width={28}
            height={28}
            className="h-7 w-auto transition-transform group-hover:scale-105"
            priority
          />
          <span className="text-lg font-bold tracking-tight text-(--text-primary)">
            Nxpress
          </span>
        </a>

        <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md border border-(--border-strong) bg-(--bg-secondary) text-(--text-muted)">
          {activeVersion}
        </span>
      </div>

      {/* Center: Search Bar */}
      <div className="flex-1 max-w-md hidden sm:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-4 py-1.5 rounded-full border border-(--border-strong) bg-(--bg-secondary) text-(--text-muted) hover:border-blue-400/50 hover:bg-(--bg-primary) hover:text-(--text-secondary) transition-all text-xs cursor-pointer shadow-xs group"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-(--text-muted) group-hover:text-blue-500 transition-colors" />
            <span>Search documentation...</span>
          </div>
          <kbd className="font-mono text-[10px] font-medium px-1.5 py-0.5 rounded bg-(--bg-primary) border border-(--border-strong) text-(--text-muted)">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Small Search on Mobile */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 rounded-full border border-(--border-strong) bg-(--bg-secondary) text-(--text-secondary)"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* VS Code Extension */}
        <a
          href="https://marketplace.visualstudio.com/items?itemName=MonsieurDev.nxpress"
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-(--border-strong) bg-(--bg-secondary) text-xs font-medium text-(--text-secondary) hover:text-(--text-primary) transition-colors"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Extension</span>
        </a>

        {/* GitHub Repository */}
        <a
          href="https://github.com/D3R50N/nxpress"
          target="_blank"
          rel="noreferrer"
          className="p-2 rounded-lg border border-(--border-strong) bg-(--bg-secondary) text-(--text-secondary) hover:text-(--text-primary) transition-colors"
          title="GitHub Repository"
          aria-label="GitHub Repository"
        >
          <GitBranch className="w-4 h-4" />
        </a>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-(--border-strong) bg-(--bg-secondary) text-(--text-secondary) hover:text-(--text-primary) transition-colors cursor-pointer"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </button>
      </div>
    </header>
  );
}
