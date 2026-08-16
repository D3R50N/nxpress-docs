"use client";

import React from "react";
import Image from "next/image";
import { Search, ChevronDown, Menu, X, Code2, ExternalLink } from "lucide-react";

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
  return (
    <header className="w-full border-b border-(--border-color) bg-(--bg-primary)/95 backdrop-blur-md px-4 sm:px-6 md:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Left: Brand Logo + Title + Version pill */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl border border-(--border-strong) text-(--text-primary) hover:bg-(--bg-secondary)"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center">
            <Image
              src="/logo.svg"
              alt="Nxpress Logo"
              width={30}
              height={30}
              className="h-7 w-auto transition-transform group-hover:scale-105"
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-(--text-primary)">
            Nxpress
          </span>
        </a>

        {/* Version dropdown pill */}
        <div className="relative flex items-center">
          <button className="flex items-center gap-1 text-[11px] font-mono font-medium px-2.5 py-1 rounded-full border border-(--border-strong) bg-(--bg-secondary) text-(--text-secondary) hover:text-(--text-primary) transition-colors cursor-pointer">
            <span>{activeVersion}</span>
            <ChevronDown className="w-3 h-3 text-(--text-muted)" />
          </button>
        </div>
      </div>

      {/* Center: Wide Search Bar Pill */}
      <div className="flex-1 max-w-md hidden sm:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-4 py-2 rounded-full border border-(--border-strong) bg-(--bg-secondary) text-(--text-muted) hover:border-blue-400/50 hover:bg-(--bg-primary) hover:text-(--text-secondary) transition-all text-xs cursor-pointer shadow-xs group"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-(--text-muted) group-hover:text-blue-500 transition-colors" />
            <span>Search documentation...</span>
          </div>
          <kbd className="font-mono text-[10px] font-medium px-1.5 py-0.5 rounded bg-(--bg-primary) border border-(--border-strong) text-(--text-muted)">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Nav Links + Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <nav className="hidden md:flex items-center gap-4 text-xs font-medium text-(--text-secondary)">
          <a
            href="https://github.com/D3R50N/nxpress"
            target="_blank"
            rel="noreferrer"
            className="hover:text-(--text-primary) transition-colors"
          >
            Community
          </a>
          <a
            href="#routing"
            className="hover:text-(--text-primary) transition-colors"
          >
            Reference
          </a>
          <a
            href="https://marketplace.visualstudio.com/items?itemName=MonsieurDev.nxpress"
            target="_blank"
            rel="noreferrer"
            className="hover:text-(--text-primary) transition-colors hidden lg:inline"
          >
            Extension
          </a>
        </nav>

        {/* Small Search on Mobile */}
        <button
          onClick={onOpenSearch}
          className="sm:hidden p-2 rounded-full border border-(--border-strong) bg-(--bg-secondary) text-(--text-secondary)"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Sign in / Get started pill buttons */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/D3R50N/nxpress"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-3 py-1.5 rounded-full text-xs font-medium text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition-colors"
          >
            GitHub
          </a>
          <a
            href="#getting-started"
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all hover:shadow-blue-500/20"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
