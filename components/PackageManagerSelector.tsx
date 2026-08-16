"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

type PkgManager = "pnpm" | "npm" | "yarn" | "bun";

interface PackageManagerSelectorProps {
  commandTemplate?: {
    pnpm: string;
    npm: string;
    yarn: string;
    bun: string;
  };
}

export function PackageManagerSelector({
  commandTemplate = {
    pnpm: "pnpm add @nxpress/core",
    npm: "npm i @nxpress/core",
    yarn: "yarn add @nxpress/core",
    bun: "bun add @nxpress/core",
  },
}: PackageManagerSelectorProps) {
  const [selectedPkg, setSelectedPkg] = useState<PkgManager>("pnpm");
  const [copied, setCopied] = useState(false);

  const activeCmd = commandTemplate[selectedPkg];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3 my-4">
      {/* Package tabs bar */}
      <div className="flex items-center gap-6 border-b border-(--border-strong) px-1 text-xs font-semibold">
        {(["pnpm", "npm", "yarn", "bun"] as PkgManager[]).map((pkg) => (
          <button
            key={pkg}
            onClick={() => setSelectedPkg(pkg)}
            className={`pb-2 transition-all cursor-pointer relative ${
              selectedPkg === pkg
                ? "text-blue-600 dark:text-blue-400 font-bold"
                : "text-(--text-muted) hover:text-(--text-primary)"
            }`}
          >
            {pkg}
            {selectedPkg === pkg && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Terminal Code Pill / Block */}
      <div className="relative flex items-center justify-between rounded-2xl border border-(--border-code) bg-(--bg-code) px-5 py-3.5 text-(--code-text) font-mono text-xs sm:text-sm shadow-xs transition-colors">
        <div className="flex items-center gap-3 overflow-x-auto">
          <span className="text-(--text-muted) select-none">$</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{selectedPkg}</span>
          <span className="text-(--text-primary)">{activeCmd.replace(selectedPkg, "").trim()}</span>
        </div>

        <button
          onClick={handleCopy}
          className="ml-3 shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg border border-(--border-strong) bg-(--bg-primary) text-(--text-secondary) hover:text-(--text-primary) hover:bg-(--bg-secondary) text-xs transition-colors cursor-pointer"
          aria-label="Copy install command"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[11px] text-emerald-500">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
