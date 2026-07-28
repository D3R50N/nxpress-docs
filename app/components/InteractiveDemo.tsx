"use client";

import React, { useState } from "react";
import {
  Zap,
  FileCode,
  Globe,
  RefreshCw,
  Terminal,
} from "lucide-react";

interface Props {
  demoType: "routing" | "props" | "live-reload" | "error-pages";
  isDarkMode?: boolean;
}

export function InteractiveDemo({ demoType, isDarkMode = true }: Props) {
  const [selectedRoute, setSelectedRoute] = useState("/");
  const [demoUser, setDemoUser] = useState("Alex Developer");
  const [demoRole, setDemoRole] = useState("Admin");
  const [isSimulatingEdit, setIsSimulatingEdit] = useState(false);
  const [reloadLog, setReloadLog] = useState<string[]>([]);
  const [errorType, setErrorType] = useState<"404" | "500">("404");

  const handleSimulateEdit = () => {
    setIsSimulatingEdit(true);
    const now = new Date().toLocaleTimeString();
    setReloadLog((prev) => [
      `[${now}] File changed: app/index.hbs`,
      `[${now}] Tailwind CSS compiled (12ms)`,
      `[${now}] SSE broadcast -> 'data: reload'`,
      `[${now}] Browser reloaded page (8ms)`,
      ...prev.slice(0, 3),
    ]);
    setTimeout(() => {
      setIsSimulatingEdit(false);
    }, 500);
  };

  return (
    <div
      className={`my-8 rounded-xl border p-5 shadow-sm transition-colors ${
        isDarkMode
          ? "border-[#26203b] bg-[#141024]"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div
        className={`flex items-center justify-between border-b pb-3 mb-4 ${
          isDarkMode ? "border-[#26203b]" : "border-slate-200"
        }`}
      >
        <div className="flex items-center gap-2">
          <Zap
            className={`w-4 h-4 ${
              isDarkMode ? "text-[#02FAFC]" : "text-cyan-600"
            }`}
          />
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              isDarkMode ? "text-[#02FAFC]" : "text-cyan-700"
            }`}
          >
            Interactive Nxpress Playground
          </span>
        </div>
        <span
          className={`text-xs font-mono ${
            isDarkMode ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Live Simulator
        </span>
      </div>

      {/* Demo 1: Routing */}
      {demoType === "routing" && (
        <div className="space-y-4">
          <p
            className={`text-sm ${
              isDarkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Click an HTTP path to see how Nxpress maps URL requests to template & companion files:
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              { path: "/", file: "app/index.hbs" },
              { path: "/about", file: "app/about.hbs" },
              { path: "/users/42", file: "app/users/[id].hbs" },
              { path: "/api/users", file: "app/api/users.ts" },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => setSelectedRoute(item.path)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                  selectedRoute === item.path
                    ? isDarkMode
                      ? "bg-[#211b38] border-[#02FAFC] text-[#02FAFC] font-bold"
                      : "bg-cyan-50 border-cyan-500 text-cyan-800 font-bold"
                    : isDarkMode
                    ? "bg-[#090712] border-[#26203b] text-slate-400 hover:border-slate-700"
                    : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                }`}
              >
                {item.path}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div
              className={`p-3 rounded-lg border ${
                isDarkMode
                  ? "bg-[#090712] border-[#26203b]"
                  : "bg-white border-slate-200"
              }`}
            >
              <div
                className={`mb-1 flex items-center gap-1.5 ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                <FileCode
                  className={`w-3.5 h-3.5 ${
                    isDarkMode ? "text-[#02FAFC]" : "text-cyan-600"
                  }`}
                />
                Target Template View
              </div>
              <div
                className={`font-bold ${
                  isDarkMode ? "text-[#02FAFC]" : "text-cyan-700"
                }`}
              >
                {selectedRoute === "/" && "app/index.hbs"}
                {selectedRoute === "/about" && "app/about.hbs"}
                {selectedRoute === "/users/42" && "app/users/[id].hbs"}
                {selectedRoute === "/api/users" && "app/api/users.ts (REST JSON)"}
              </div>
            </div>

            <div
              className={`p-3 rounded-lg border ${
                isDarkMode
                  ? "bg-[#090712] border-[#26203b]"
                  : "bg-white border-slate-200"
              }`}
            >
              <div
                className={`mb-1 flex items-center gap-1.5 ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-500" />
                Resolved URL Endpoint
              </div>
              <div className="text-emerald-600 dark:text-emerald-300 font-bold">
                GET http://localhost:3000{selectedRoute}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo 2: Props Companion */}
      {demoType === "props" && (
        <div className="space-y-4">
          <p
            className={`text-sm ${
              isDarkMode ? "text-slate-300" : "text-slate-700"
            }`}
          >
            Edit parameters to see how companion `props(req, res)` passes values directly to template rendering:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                className={`text-xs block mb-1 font-mono ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                User Name (props)
              </label>
              <input
                type="text"
                value={demoUser}
                onChange={(e) => setDemoUser(e.target.value)}
                className={`w-full border rounded-lg px-3 py-1.5 text-xs focus:outline-none ${
                  isDarkMode
                    ? "bg-[#090712] border-[#26203b] text-slate-200 focus:border-[#02FAFC]"
                    : "bg-white border-slate-300 text-slate-900 focus:border-cyan-500"
                }`}
              />
            </div>
            <div>
              <label
                className={`text-xs block mb-1 font-mono ${
                  isDarkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Role (props)
              </label>
              <input
                type="text"
                value={demoRole}
                onChange={(e) => setDemoRole(e.target.value)}
                className={`w-full border rounded-lg px-3 py-1.5 text-xs focus:outline-none ${
                  isDarkMode
                    ? "bg-[#090712] border-[#26203b] text-slate-200 focus:border-[#02FAFC]"
                    : "bg-white border-slate-300 text-slate-900 focus:border-cyan-500"
                }`}
              />
            </div>
          </div>

          <div
            className={`p-3 rounded-lg border font-mono text-xs space-y-1 ${
              isDarkMode
                ? "bg-[#090712] border-[#26203b] text-slate-300"
                : "bg-white border-slate-200 text-slate-800"
            }`}
          >
            <div className="text-slate-500">// Rendered HTML Output:</div>
            <div
              className={`font-bold ${
                isDarkMode ? "text-[#02FAFC]" : "text-cyan-700"
              }`}
            >
              &lt;h1&gt;Welcome back, {demoUser}!&lt;/h1&gt;
            </div>
            <div className="text-slate-500">
              &lt;span class="badge"&gt;Role: {demoRole}&lt;/span&gt;
            </div>
          </div>
        </div>
      )}

      {/* Demo 3: Live Reload */}
      {demoType === "live-reload" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p
              className={`text-sm ${
                isDarkMode ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Simulate template file modification & instant SSE browser synchronization:
            </p>
            <button
              onClick={handleSimulateEdit}
              disabled={isSimulatingEdit}
              className={`px-3.5 py-1.5 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all cursor-pointer ${
                isDarkMode
                  ? "bg-[#02FAFC] hover:bg-cyan-300 text-[#0f0c1b]"
                  : "bg-cyan-600 hover:bg-cyan-700 text-white"
              }`}
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${
                  isSimulatingEdit ? "animate-spin" : ""
                }`}
              />
              Simulate File Edit
            </button>
          </div>

          <div
            className={`border rounded-lg p-3 font-mono text-xs space-y-1 min-h-[100px] ${
              isDarkMode
                ? "bg-[#090712] border-[#26203b]"
                : "bg-white border-slate-200"
            }`}
          >
            <div
              className={`border-b pb-1 mb-2 flex items-center gap-1.5 ${
                isDarkMode
                  ? "text-slate-400 border-[#26203b]"
                  : "text-slate-500 border-slate-200"
              }`}
            >
              <Terminal
                className={`w-3.5 h-3.5 ${
                  isDarkMode ? "text-[#02FAFC]" : "text-cyan-600"
                }`}
              />
              Dev Server Live Event Log
            </div>
            {reloadLog.length === 0 ? (
              <div className="text-slate-400 italic">
                Click the button above to simulate a live reload event...
              </div>
            ) : (
              reloadLog.map((log, idx) => (
                <div
                  key={idx}
                  className={`font-semibold ${
                    isDarkMode ? "text-[#02FAFC]" : "text-cyan-700"
                  }`}
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Demo 4: Custom Error Pages */}
      {demoType === "error-pages" && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setErrorType("404")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                errorType === "404"
                  ? isDarkMode
                    ? "bg-[#211b38] border-amber-400 text-amber-300 font-bold"
                    : "bg-amber-50 border-amber-500 text-amber-800 font-bold"
                  : isDarkMode
                  ? "bg-[#090712] border-[#26203b] text-slate-400"
                  : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              Simulate 404 (Not Found)
            </button>
            <button
              onClick={() => setErrorType("500")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                errorType === "500"
                  ? isDarkMode
                    ? "bg-[#211b38] border-red-400 text-red-300 font-bold"
                    : "bg-red-50 border-red-500 text-red-800 font-bold"
                  : isDarkMode
                  ? "bg-[#090712] border-[#26203b] text-slate-400"
                  : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              Simulate 500 (Server Error)
            </button>
          </div>

          <div
            className={`p-4 rounded-lg border font-mono text-xs ${
              isDarkMode
                ? "bg-[#090712] border-[#26203b]"
                : "bg-white border-slate-200"
            }`}
          >
            <div className="text-slate-500 mb-2">
              // Injected `title` prop fallback:
            </div>
            <div className="text-slate-700 dark:text-slate-200">
              <span className="text-purple-600 dark:text-[#8b5cf6] font-bold">
                res.locals.title
              </span>{" "}
              ={" "}
              <span
                className={
                  errorType === "404"
                    ? "text-amber-600 dark:text-amber-400 font-bold"
                    : "text-red-600 dark:text-red-400 font-bold"
                }
              >
                "{errorType}"
              </span>
            </div>
            <div className="mt-3 text-slate-500">
              Template View:{" "}
              <span
                className={
                  isDarkMode ? "text-[#02FAFC]" : "text-cyan-700"
                }
              >
                app/{errorType}.hbs
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
