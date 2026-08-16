"use client";

import React from "react";
import { ChevronRight, Globe, HelpCircle, Sun, Moon, GitBranch } from "lucide-react";
import { useTheme } from "@/app/theme-provider";

interface SubHeaderProps {
  currentSectionTitle?: string;
  currentSubTitle?: string;
}

export function SubHeader({ currentSectionTitle = "Getting Started", currentSubTitle = "Install" }: SubHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full border-b border-(--border-color) bg-(--bg-secondary)/50 px-4 sm:px-6 md:px-8 py-2.5 flex items-center justify-between gap-4 text-xs">
      {/* Left: Avatar Stack / Workspace Breadcrumbs */}
      <div className="flex items-center gap-2.5 overflow-hidden">
        {/* Workspace Avatars Badge */}
        <div className="flex -space-x-1.5 items-center shrink-0">
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-[9px] font-bold text-white flex items-center justify-center ring-2 ring-(--bg-primary)">
            NX
          </div>
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-[9px] font-bold text-white flex items-center justify-center ring-2 ring-(--bg-primary)">
            JS
          </div>
        </div>

        <span className="font-semibold text-(--text-primary) shrink-0">
          Nxpress Workspace
        </span>

        <ChevronRight className="w-3.5 h-3.5 text-(--text-muted) shrink-0" />
        <span className="text-(--text-secondary) shrink-0">Documentation</span>

        {currentSectionTitle && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-(--text-muted) shrink-0" />
            <span className="text-(--text-muted) truncate">{currentSectionTitle}</span>
          </>
        )}
      </div>

      {/* Right: Language / Support / GitHub / Theme */}
      <div className="flex items-center gap-3 shrink-0 text-(--text-secondary)">
        {/* Language selector */}
        <div className="hidden md:flex items-center gap-1 text-[11px] text-(--text-muted) hover:text-(--text-primary) cursor-pointer">
          <Globe className="w-3.5 h-3.5" />
          <span>English, USA</span>
        </div>

        {/* Support */}
        <a
          href="https://github.com/D3R50N/nxpress/issues"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:flex items-center gap-1 text-[11px] text-(--text-muted) hover:text-(--text-primary) cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Support</span>
        </a>

        {/* GitHub link */}
        <a
          href="https://github.com/D3R50N/nxpress"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-[11px] text-(--text-muted) hover:text-(--text-primary) transition-colors"
          title="GitHub Repo"
        >
          <GitBranch className="w-3.5 h-3.5" />
        </a>

        {/* Theme switch button */}
        <button
          onClick={toggleTheme}
          className="p-1 rounded-md text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-secondary) transition-colors cursor-pointer"
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-slate-700" />
          )}
        </button>
      </div>
    </div>
  );
}
