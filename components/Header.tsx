"use client";

import React from "react";
import Image from "next/image";
import { Sun, Moon, Search, Menu, X, Code2 } from "lucide-react";
import { useTheme } from "@/app/theme-provider";

interface HeaderProps {
  onOpenSearch: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export function Header({ onOpenSearch, isMobileMenuOpen, onToggleMobileMenu }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-(--border-color) bg-(--bg-primary)/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-md border border-(--border-color) text-(--text-primary) hover:bg-(--bg-secondary)"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <a href="#" className="flex items-center gap-2.5 font-bold tracking-tight text-(--text-primary)">
            <Image
              src="/logo.svg"
              alt="Nxpress Logo"
              width={28}
              height={28}
              className="h-7 w-auto"
              priority
            />
            <span className="text-lg font-bold">Nxpress</span>
            <span className="hidden sm:inline-block text-xs font-mono px-2 py-0.5 rounded border border-(--border-color) bg-(--bg-secondary) text-(--text-muted)">
              v1.3.4
            </span>
          </a>
        </div>

        {/* Center/Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search Trigger Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-(--border-color) bg-(--bg-secondary) text-(--text-muted) hover:text-(--text-primary) hover:border-(--text-muted) transition-all cursor-pointer text-xs sm:text-sm"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Quick search docs...</span>
            <span className="sm:hidden">Search</span>
            <kbd className="hidden sm:inline-block font-mono text-[10px] px-1.5 py-0.5 rounded border border-(--border-color) bg-(--bg-primary)">
              ⌘K
            </kbd>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-(--border-color) bg-(--bg-primary) text-(--text-primary) hover:bg-(--bg-secondary) transition-colors cursor-pointer"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-white" />
            ) : (
              <Moon className="w-4 h-4 text-black" />
            )}
          </button>

          {/* Repository Link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center p-2 rounded-lg border border-(--border-color) bg-(--bg-primary) text-(--text-primary) hover:bg-(--bg-secondary) transition-colors"
            aria-label="Code repository"
          >
            <Code2 className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
