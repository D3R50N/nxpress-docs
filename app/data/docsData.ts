export interface DocSubSection {
  id: string;
  title: string;
}

export interface DocSection {
  id: string;
  category: string;
  title: string;
  description: string;
  badge?: string;
  subsections: DocSubSection[];
  content: {
    overview: string;
    highlights?: { title: string; desc: string; icon?: string }[];
    codeSnippets?: {
      title: string;
      language: string;
      filename?: string;
      code: string;
    }[];
    callouts?: {
      type: "note" | "tip" | "important" | "warning";
      title: string;
      message: string;
    }[];
    demoType?: "routing" | "props" | "live-reload" | "error-pages";
  };
}

export const DOCS_NAVIGATION = [
  {
    category: "Getting Started",
    items: [
      { id: "introduction", title: "Introduction", badge: "Core" },
      { id: "quick-start", title: "Quick Start" },
      { id: "installation", title: "Installation" },
    ],
  },
  {
    category: "Core Concepts",
    items: [
      { id: "file-routing", title: "File-Based Routing" },
      {
        id: "singletons-helpers",
        title: "Singletons & Built-in Helpers",
        badge: "KEY",
      },
      { id: "view-companion", title: "View Companions (props)" },
      { id: "template-engines", title: "Template Engines (HBS, EJS, HTML)" },
      { id: "layouts-components", title: "Layouts & Components" },
    ],
  },
  {
    category: "Dev Server & DX",
    items: [
      { id: "dev-server", title: "Smart Dev Server" },
      { id: "live-reload", title: "SSE Live Reloading", badge: "NEW" },
      { id: "tailwind", title: "Tailwind CSS v4 Integration" },
    ],
  },
  {
    category: "Guides & Use Cases",
    items: [
      { id: "custom-errors", title: "Custom 404 & 500 Pages" },
      { id: "global-variables", title: "Global Variables (globals)" },
      { id: "production-deployment", title: "Production Deployment" },
      { id: "comparison", title: "Nxpress vs Next.js vs Express" },
    ],
  },
];

export const DOCS_DATA: Record<string, DocSection> = {
  introduction: {
    id: "introduction",
    category: "Getting Started",
    title: "Introduction to Nxpress",
    description:
      "Nxpress is a lightweight, Next.js-inspired web framework for Node.js built on top of Express. It brings file-based routing, template components, server companion logic, and SSE live reload to standard Express apps.",
    badge: "v1.1.3",
    subsections: [
      { id: "why-nxpress", title: "Why Nxpress?" },
      { id: "key-features", title: "Key Features" },
      { id: "architecture-overview", title: "Architecture Overview" },
    ],
    content: {
      overview:
        "Standard Express applications often require repetitive route definitions, complex view rendering boilerplate, and manual browser refreshes. Nxpress bridges the gap by delivering a Next.js-like developer experience using classical, battle-tested server HTML templates (Handlebars, EJS, or raw HTML).",
      highlights: [
        {
          title: "File-Based Directory Routing",
          desc: "Drop Handlebars, EJS, or HTML files into your `app/` directory. Routes map automatically to files.",
        },
        {
          title: "Built-in System Singletons (R, G, E)",
          desc: "Direct access to Request (R), Globals (G), and Environment (E) in every view template automatically.",
        },
        {
          title: "Server Companion `props()`",
          desc: "Export an async `props(req, res)` function in a matching `.ts` companion file to pass server data directly to views.",
        },
        {
          title: "Instant SSE Live Reload",
          desc: "Zero-configuration browser live reload via Server-Sent Events with automatic dev error stack trace formatting.",
        },
      ],
      codeSnippets: [
        {
          title: "Minimal Nxpress Application",
          language: "typescript",
          filename: "server.ts",
          code: `import { nxpress, serve } from "@nxpress/core";

// Create and start an Nxpress app
const app = nxpress({
  engine: "hbs", // 'hbs' | 'ejs' | 'html'
  globals: {
    siteName: "My Nxpress Portal",
  },
});
app.listen(3000, () => {
  console.log("Server listening at http://localhost:3000");
});

// or just
serve({ 
  port: 3000, 
  engine: "hbs",
  globals: {
    siteName: "My Nxpress Portal",
  }, 
});`,
        },
      ],
      callouts: [
        {
          type: "tip",
          title: "Instant Scaffolding",
          message:
            "Run `pnpm create nxpress-app@latest my-app` to create a production-ready Nxpress project in seconds.",
        },
      ],
    },
  },

  "quick-start": {
    id: "quick-start",
    category: "Getting Started",
    title: "Quick Start Guide",
    description:
      "Get up and running with a complete Nxpress starter application using `create-nxpress-app`.",
    subsections: [
      { id: "scaffolding", title: "Scaffolding a New App" },
      { id: "project-structure", title: "Project Directory Structure" },
      { id: "running-dev", title: "Running the Dev Server" },
    ],
    content: {
      overview:
        "The fastest way to start building with Nxpress is using the official CLI tool. It interactively prompts you for a project name and template engine preference.",
      codeSnippets: [
        {
          title: "1. Create New Project",
          language: "bash",
          code: `# Using pnpm (recommended)
pnpm create nxpress-app my-nxpress-app

# Or using npx
npx create-nxpress-app my-nxpress-app`,
        },
        {
          title: "2. Standard Project Structure",
          language: "text",
          filename: "Directory Tree",
          code: `my-nxpress-app/
├── app/
│   ├── layout.hbs        # Root layout wrapper
│   ├── index.hbs         # Home page (GET /)
│   ├── index.ts          # Server companion logic (props)
│   ├── about.hbs         # About page (GET /about)
│   ├── 404.hbs           # Custom 404 error view
│   └── 500.hbs           # Custom 500 error view
├── components/
│   ├── navbar.hbs        # Reusable navbar component
│   └── footer.hbs        # Reusable footer component
├── public/
│   └── logo.png          # Static assets
├── app.css               # Tailwind CSS entrypoint
├── nxpress.config.js     # Framework options & globals
├── package.json
└── server.ts             # App entrypoint`,
        },
        {
          title: "3. Start Development Server",
          language: "bash",
          code: `cd my-nxpress-app
pnpm dev`,
        },
      ],
      callouts: [
        {
          type: "note",
          title: "Smart Hot Invalidation",
          message:
            "When you edit templates or companion code in `app/`, Nxpress invalidates in-memory caches instantly without restarting the HTTP server process.",
        },
      ],
    },
  },

  installation: {
    id: "installation",
    category: "Getting Started",
    title: "Server Initialization Methods",
    description:
      "Understand the 3 primary ways to initialize and start an Nxpress application.",
    subsections: [
      {
        id: "method-serve",
        title: "Method 1: Automatic serve(options) Helper",
      },
      {
        id: "method-nxpress",
        title: "Method 2: Custom Express Instance nxpress(options)",
      },
      { id: "method-cli", title: "Method 3: CLI Commands (nxpress / nxp)" },
    ],
    content: {
      overview:
        "Nxpress offers 3 flexible ways to initialize and run your application depending on your workflow: using the one-liner `serve()` helper, attaching custom middleware via `nxpress()`, or using the built-in CLI (`nxpress` / `nxp`).",
      highlights: [
        {
          title: "Method 1: serve(options)",
          desc: "One-liner helper that initializes Nxpress and starts listening immediately without declaring `app` first.",
        },
        {
          title: "Method 2: nxpress(options)",
          desc: "Returns a standard Express `app` instance so you can attach custom middleware (`cors`, `helmet`, `session`) before calling `app.listen(port)`.",
        },
        {
          title: "Method 3: CLI Commands",
          desc: "Use `nxpress dev` (or `nxp dev`) for development with SSE live reload, and `nxpress start` (or `nxp start`) for production.",
        },
      ],
      codeSnippets: [
        {
          title: "Method 1: One-Liner serve() Helper",
          language: "typescript",
          filename: "server.ts",
          code: `import { serve } from "@nxpress/core";

// Automatically creates Express app & starts listening on port 3000
serve({
  port: 3000,
  engine: "hbs",
  globals: {
    siteName: "My Nxpress App",
  },
});`,
        },
        {
          title: "Method 2: Custom Express Instance with Custom Middleware",
          language: "typescript",
          filename: "server.ts",
          code: `import { nxpress } from "@nxpress/core";
import cors from "cors";
import helmet from "helmet";

// Create custom Express app instance
const app = nxpress({
  engine: "hbs",
  globals: { siteName: "My Portal" },
});

// Attach standard Express middleware
app.use(cors());
app.use(helmet());

// Manually start HTTP server
app.listen(3000, () => {
  console.log("Server listening at http://localhost:3000");
});`,
        },
        {
          title: "Method 3: CLI Commands (nxpress / nxp)",
          language: "bash",
          filename: "Terminal",
          code: `# Development mode (with SSE Live Reload & hot cache invalidation)
pnpm nxp dev
# or using npx
npx nxpress dev

# Production server mode (automatically sets isDev = false)
pnpm nxp start
# or using npx
npx nxpress start`,
        },
      ],
    },
  },

  "singletons-helpers": {
    id: "singletons-helpers",
    category: "Core Concepts",
    title: "System Singletons & Built-in Helpers",
    description:
      "Nxpress automatically injects system singletons (R, G, E), default variables (year, tailwind), component helpers ($), and utility helpers into every template.",
    badge: "KEY",
    subsections: [
      { id: "system-singletons", title: "System Singletons (R, G, E)" },
      {
        id: "injected-defaults",
        title: "Injected Default Variables (year, now, tailwind)",
      },
      { id: "component-helper", title: "The Component Helper ($)" },
      {
        id: "builtin-helpers-list",
        title: "Complete Built-in Utility Helpers List",
      },
    ],
    content: {
      overview:
        "Nxpress eliminates template boilerplate. Every view rendering automatically receives system request singletons, global configurations, environment variables, component helpers, and a suite of built-in utility helpers for string manipulation, comparison, logic, collections, and math.",
      highlights: [
        {
          title: "R / req Singleton",
          desc: "Direct access to Express Request (`R.path`, `R.params`, `R.query`, `R.ip`, `R.headers`, `R.body`).",
        },
        {
          title: "G / global Singleton",
          desc: "Direct access to your `nxpress.config.js` globals object without importing files (`G.siteName`, `G.description`).",
        },
        {
          title: "E / env Singleton",
          desc: "Direct access to `process.env` secrets and environment flags (`E.NODE_ENV`, `E.PORT`).",
        },
        {
          title: "Built-in Utility Helpers",
          desc: "Built-in functions for string formatting (`capitalize`, `truncate`), logic (`eq`, `and`, `or`, `not`, `ternary`), and arrays (`len`, `join`, `contains`).",
        },
      ],
      codeSnippets: [
        {
          title: "Consuming Built-in Utility Helpers in Templates",
          language: "handlebars",
          filename: "app/users.hbs",
          code: `{{!-- String & Text Formatting Helpers --}}
<h1>{{capitalize user.name}}</h1>
<p>{{truncate user.bio 60}}</p>
<p>Email (lowercase): {{lower user.email}}</p>

{{!-- Comparison & Logic Helpers --}}
{{#if (eq user.role "admin")}}
  <span class="badge font-bold">Administrator</span>
{{/if}}

{{#if (and user.isVerified (gt user.score 50))}}
  <span class="badge text-emerald-400">Featured Creator</span>
{{/if}}

<p>Status: {{ternary user.isOnline "Active Now" "Offline"}}</p>

{{!-- Collections & Array Helpers --}}
<p>Interests: {{join user.interests ", "}}</p>
<p>Total Badges: {{len user.badges}}</p>
<p>Has VIP: {{contains user.badges "vip"}}</p>

{{!-- Math Helpers --}}
<p>Next Year Score: {{add user.score 10}}</p>`,
        },
        {
          title: "Singletons & Component Helper ($) in Layout",
          language: "handlebars",
          filename: "app/layout.hbs",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{#if title}}{{title}} - {{/if}}{{G.siteName}}</title>
  
  {{!-- Injected CSS Link --}}
  {{{tailwind}}}
</head>
<body class="bg-slate-950 text-slate-100">
  {{!-- Render navbar component with helper --}}
  {{{$ "navbar" active="home"}}}

  <main>
    {{{body}}}
  </main>

  <footer class="border-t border-slate-800 p-4 text-xs text-slate-400">
    {{!-- Injected 'year' & 'E' environment singleton --}}
    <p>&copy; {{year}} {{G.siteName}}. Env: {{E.NODE_ENV}} | Path: {{R.path}}</p>
  </footer>
</body>
</html>`,
        },
        {
          title: "EJS Engine Usage with Singletons & Helpers",
          language: "ejs",
          filename: "app/layout.ejs",
          code: `<!DOCTYPE html>
<html>
<head>
  <title><%= typeof title !== 'undefined' ? title + ' - ' : '' %><%= G.siteName %></title>
  <%- tailwind %>
</head>
<body>
  <%- $("navbar", { active: "home" }) %>

  <main><%- body %></main>

  <footer>
    <p>&copy; <%= year %> <%= G.siteName %> | Request Path: <%= R.path %></p>
  </footer>
</body>
</html>`,
        },
      ],
      callouts: [
        {
          type: "important",
          title: "Singleton Protection",
          message:
            "System singletons (`R`, `G`, `E`, `$`, `tailwind`) are protected reserved keys. View companion `props()` functions cannot accidentally override system singletons.",
        },
        {
          type: "tip",
          title: "Full Built-in Helper List",
          message:
            "Available helpers in views: `str`, `json`, `lower`, `upper`, `capitalize`, `truncate`, `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `and`, `or`, `not`, `len`, `contains`, `includes`, `join`, `add`, `sub`, `ternary`, and `$`.",
        },
      ],
    },
  },

  "file-routing": {
    id: "file-routing",
    category: "Core Concepts",
    title: "File-Based Routing",
    description:
      "Understand how template files in the `app/` directory map directly to public HTTP URLs.",
    subsections: [
      { id: "route-mapping", title: "Route Mapping Table" },
      { id: "dynamic-routes", title: "Dynamic Parameters ([id])" },
      { id: "api-routes", title: "API Endpoint Routes" },
    ],
    content: {
      overview:
        "Nxpress uses a file-based routing system similar to Next.js. Every file in your `app/` directory automatically becomes an accessible URL endpoint based on its relative path.",
      highlights: [
        {
          title: "index.hbs / index.ejs",
          desc: "Maps to the root of its folder (`/` or `/dashboard`).",
        },
        {
          title: "[id].hbs",
          desc: "Captures dynamic parameters accessible via `R.params.id` or `req.params.id` in server companion logic.",
        },
        {
          title: "api/*.ts",
          desc: "Exports HTTP handler functions (`GET`, `POST`, `PUT`, `DELETE`) for JSON REST endpoints.",
        },
      ],
      codeSnippets: [
        {
          title: "Dynamic Route Companion Example",
          language: "typescript",
          filename: "app/users/[id].ts",
          code: `import { Request, Response } from "express";

export async function props(req: Request, res: Response) {
  const userId = req.params.id;
  
  // Fetch user data from database or REST API
  const user = await db.user.findUnique({ where: { id: userId } });

  return {
    title: \`Profile - \${user.name}\`,
    user,
  };
}`,
        },
        {
          title: "API Route Example",
          language: "typescript",
          filename: "app/api/users.ts",
          code: `import { Request, Response } from "express";

export async function GET(req: Request, res: Response) {
  return res.json({ status: "ok", users: [{ id: 1, name: "Alice" }] });
}

export async function POST(req: Request, res: Response) {
  const body = req.body;
  return res.status(201).json({ success: true, created: body });
}`,
        },
      ],
      demoType: "routing",
      callouts: [
        {
          type: "note",
          title: "Strict Engine Extension Filtering",
          message:
            "Nxpress strictly scans and registers only template files matching the configured server engine extension (e.g. `.ejs` for EJS, `.hbs` for Handlebars, etc.), plus `.ts`/`.js` companions and API routes. Template files matching other engines in `app/` are automatically ignored to eliminate route conflicts.",
        },
      ],
    },
  },

  "view-companion": {
    id: "view-companion",
    category: "Core Concepts",
    title: "View Companions (`props`)",
    description:
      "Decouple template rendering from backend data fetching using TypeScript companion files.",
    subsections: [
      { id: "props-function", title: "The `props()` Export" },
      { id: "locals-merging", title: "Locals & Globals Merging" },
      {
        id: "built-in-singletons",
        title: "Built-in System Singletons (R, G, E)",
      },
    ],
    content: {
      overview:
        "Every view file (e.g. `app/dashboard.hbs`) can be paired with an optional companion TypeScript file (`app/dashboard.ts`). Exporting a `props(req, res)` function allows you to execute asynchronous server queries before rendering.",
      codeSnippets: [
        {
          title: "View Companion TypeScript File",
          language: "typescript",
          filename: "app/dashboard.ts",
          code: `import { Request, Response } from "express";

export async function props(req: Request, res: Response) {
  const sessionUser = req.session?.user;

  return {
    title: "Dashboard Overview",
    stats: {
      totalUsers: 1420,
      activeSessions: 89,
    },
    user: sessionUser,
  };
}`,
        },
        {
          title: "Consuming Props in View Template",
          language: "handlebars",
          filename: "app/dashboard.hbs",
          code: `{{!-- Access props directly by name --}}
<div class="dashboard">
  <h1>{{title}}</h1>
  <p>Welcome back, {{user.name}}!</p>

  <div class="grid font-mono">
    <span>Total Users: {{stats.totalUsers}}</span>
    <span>Active: {{stats.activeSessions}}</span>
  </div>

  {{!-- System request singleton 'R' --}}
  <p>Your IP: {{R.ip}} | Path: {{R.path}}</p>
</div>`,
        },
      ],
      callouts: [
        {
          type: "important",
          title: "Direct Variable Access",
          message:
            "Variables defined in `globals` or returned by `props()` are directly accessible by name in your view templates without requiring `G.variableName` wrappers.",
        },
      ],
      demoType: "props",
    },
  },

  "template-engines": {
    id: "template-engines",
    category: "Core Concepts",
    title: "Template Engines",
    description:
      "Nxpress supports EJS (powered by Eta, default), Handlebars, Nunjucks, LiquidJS, and Vanilla HTML.",
    subsections: [
      { id: "ejs", title: "EJS (.ejs) - Powered by Eta (Default)" },
      { id: "handlebars", title: "Handlebars (.hbs)" },
      { id: "nunjucks", title: "Nunjucks (.njk)" },
      { id: "liquid", title: "LiquidJS (.liquid)" },
      { id: "raw-html", title: "Vanilla HTML (.html)" },
    ],
    content: {
      overview:
        "Nxpress supports 5 template engines. `.ejs` templates are compiled out of the box using the ultra-fast Eta engine under the hood. Full support is also included for Handlebars, Nunjucks, LiquidJS, and Vanilla HTML.",
      codeSnippets: [
        {
          title: "EJS (Eta Engine) Example (Default)",
          language: "ejs",
          filename: "app/index.ejs",
          code: `<h1><%= title %></h1>
<% if (!E.NODE_ENV || E.NODE_ENV !== 'production') { %>
  <span class="badge">Development Mode</span>
<% } %>
<p><%= description %></p>`,
        },
        {
          title: "Handlebars Example",
          language: "handlebars",
          filename: "app/index.hbs",
          code: `<h1>{{title}}</h1>
{{#if isDev}}
  <span class="badge">Development Mode</span>
{{/if}}
<p>{{description}}</p>`,
        },
        {
          title: "EJS Example",
          language: "ejs",
          filename: "app/index.ejs",
          code: `<h1><%= title %></h1>
<% if (typeof isDev !== 'undefined' && isDev) { %>
  <span class="badge">Development Mode</span>
<% } %>
<p><%= description %></p>`,
        },
        {
          title: "Nunjucks Example",
          language: "html",
          filename: "app/index.njk",
          code: `<h1>{{ title }}</h1>
{% if isDev %}
  <span class="badge">Development Mode</span>
{% endif %}
<p>{{ description }}</p>`,
        },
        {
          title: "LiquidJS Example",
          language: "html",
          filename: "app/index.liquid",
          code: `<h1>{{ title }}</h1>
{% if isDev %}
  <span class="badge">Development Mode</span>
{% endif %}
<p>{{ description }}</p>`,
        },
        {
          title: "Vanilla HTML Example",
          language: "html",
          filename: "app/index.html",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Nxpress HTML View</title>
</head>
<body>
  <h1>Welcome to Nxpress</h1>
</body>
</html>`,
        },
      ],
    },
  },

  "layouts-components": {
    id: "layouts-components",
    category: "Core Concepts",
    title: "Layouts & Components",
    description:
      "Wrap views with nested layout templates and reuse modular UI components.",
    subsections: [
      { id: "root-layout", title: "Root Layout (`layout.hbs`)" },
      { id: "nested-layouts", title: "Nested Subdirectory Layouts" },
      {
        id: "components-helper",
        title: 'Template Helper Components `{{$ "name"}}`',
      },
    ],
    content: {
      overview:
        "Layout files wrap page views automatically. Any `layout.hbs` placed in `app/` wraps all child pages. You can place nested layouts in subdirectories (e.g. `app/admin/layout.hbs`) for hierarchical page wrapping.",
      codeSnippets: [
        {
          title: "Root Layout Wrapper",
          language: "handlebars",
          filename: "app/layout.hbs",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{{description}}">
  <title>{{#if title}}{{title}} - {{/if}}{{G.siteName}}</title>
  {{{tailwind}}}
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen">
  {{!-- Render component helper --}}
  {{{$ "navbar" active="home"}}}

  <main class="container mx-auto p-6">
    {{{body}}}
  </main>

  {{{$ "footer"}}}
</body>
</html>`,
        },
        {
          title: "Reusable Component Template",
          language: "handlebars",
          filename: "components/navbar.hbs",
          code: `<header class="border-b border-slate-800 p-4 flex justify-between">
  <a href="/" class="font-bold text-cyan-400">{{G.siteName}}</a>
  <nav class="flex gap-4">
    <a href="/" class="{{#if (eq active 'home')}}text-cyan-400{{/if}}">Home</a>
    <a href="/about">About</a>
  </nav>
</header>`,
        },
      ],
    },
  },

  "dev-server": {
    id: "dev-server",
    category: "Dev Server & DX",
    title: "Smart Dev Server",
    description:
      "Lightning fast development server with zero-restart in-memory cache invalidation.",
    subsections: [
      { id: "cache-invalidation", title: "In-Memory Cache Invalidation" },
      { id: "smart-restarts", title: "Smart Server Restarts" },
      { id: "manual-reloads", title: "Manual Key Reloads ('r')" },
    ],
    content: {
      overview:
        "Unlike heavy server restart wrappers (like nodemon), Nxpress uses smart cache invalidation. Edits to view templates or companion code clear Node's require cache in-memory instantly, leaving HTTP server sockets active.",
      highlights: [
        {
          title: "File Edits",
          desc: "In-place cache invalidation (0ms restart penalty).",
        },
        {
          title: "Route Creation / Deletion",
          desc: "Triggers a clean, single-line debounced server restart.",
        },
        {
          title: "Config / .env Edits",
          desc: "Reloads `nxpress.config.js` with zero-cache `jiti` and restarts server.",
        },
      ],
    },
  },

  "live-reload": {
    id: "live-reload",
    category: "Dev Server & DX",
    title: "Automatic Live Reloading",
    description:
      "Instant browser synchronization out-of-the-box in development mode.",
    subsections: [
      { id: "automatic-sync", title: "Automatic Browser Sync" },
      { id: "dev-stack-trace", title: "Development Error Overlay" },
    ],
    content: {
      overview:
        "When running in development mode (`nxpress dev`), Nxpress provides automatic browser synchronization out of the box. Any changes to template files, views, components, or Tailwind CSS trigger instant browser updates without requiring manual refreshes or browser extensions.",
      highlights: [
        {
          title: "Zero Configuration Required",
          desc: "Works automatically out of the box when starting the server with `nxpress dev`.",
        },
        {
          title: "Development Stack Trace Overlay",
          desc: "In development mode, internal server errors (500) render styled stack traces directly in your browser.",
        },
      ],
      demoType: "live-reload",
    },
  },

  tailwind: {
    id: "tailwind",
    category: "Dev Server & DX",
    title: "Tailwind CSS v4 Integration",
    description:
      "Native integration with Tailwind CSS v4 for utility-first styling with zero configuration.",
    subsections: [
      { id: "auto-compilation", title: "Automatic CSS Compilation" },
      { id: "view-rebuilding", title: "Rebuilding on View Edits" },
      { id: "custom-input", title: "Custom Input CSS Files" },
    ],
    content: {
      overview:
        "Nxpress automatically detects and compiles Tailwind CSS v4 into `public/tailwind.css`. When you add new Tailwind classes to any template in `app/` or `components/`, Nxpress rebuilds the CSS bundle before triggering Live Reload.",
      codeSnippets: [
        {
          title: "App CSS Entrypoint",
          language: "css",
          filename: "app.css",
          code: `@import "tailwindcss";

/* Custom design tokens and utilities */
@theme {
  --color-brand-cyan: #02fafc;
}`,
        },
      ],
    },
  },

  "custom-errors": {
    id: "custom-errors",
    category: "Guides & Use Cases",
    title: "Custom 404 & 500 Pages",
    description: "Create branded error pages with default fallback titles.",
    subsections: [
      { id: "custom-404", title: "Creating `app/404.hbs`" },
      { id: "custom-500", title: "Creating `app/500.hbs`" },
      {
        id: "default-title-props",
        title: "Default `title` Fallbacks ('404' & '500')",
      },
    ],
    content: {
      overview:
        "Creating custom error pages is as simple as adding `404.hbs` or `500.hbs` to your `app/` directory. Nxpress automatically passes default `title` props ('404' and '500') so your root layout handles error titles seamlessly.",
      codeSnippets: [
        {
          title: "Custom 404 Error View",
          language: "handlebars",
          filename: "app/404.hbs",
          code: `<div class="text-center py-20">
  <h1 class="text-9xl font-black text-cyan-400">404</h1>
  <h2 class="text-2xl font-semibold mt-4">Page Not Found</h2>
  <p class="text-slate-400 mt-2">The page you are looking for does not exist.</p>
  <a href="/" class="inline-block mt-6 px-6 py-3 bg-cyan-500 text-slate-950 font-bold rounded-lg">Return Home</a>
</div>`,
        },
        {
          title: "Custom 500 Error View",
          language: "handlebars",
          filename: "app/500.hbs",
          code: `<div class="text-center py-20">
  <h1 class="text-9xl font-black text-red-400">500</h1>
  <h2 class="text-2xl font-semibold mt-4">Internal Server Error</h2>
  <p class="text-slate-400 mt-2">{{error}}</p>
  <a href="/" class="inline-block mt-6 px-6 py-3 bg-slate-800 text-slate-100 rounded-lg">Back to Home</a>
</div>`,
        },
      ],
      demoType: "error-pages",
    },
  },

  "global-variables": {
    id: "global-variables",
    category: "Guides & Use Cases",
    title: "Global Variables (`globals`)",
    description:
      "Define global variables available in all view templates across your application.",
    subsections: [
      {
        id: "config-globals",
        title: "Configuring Globals in nxpress.config.js",
      },
      { id: "direct-naming", title: "Direct Naming Access" },
      {
        id: "view-overrides",
        title: "Overriding Globals in View Companion `props()`",
      },
    ],
    content: {
      overview:
        "Global variables defined in `nxpress.config.js` (like `description`, `title`, `metaAuthor`) are merged into template rendering locals automatically. You can reference them directly by variable name in templates.",
      codeSnippets: [
        {
          title: "Nxpress Configuration File",
          language: "javascript",
          filename: "nxpress.config.js",
          code: `module.exports = {
  engine: "hbs",
  port: 3000,
  globals: {
    siteName: "Nxpress Framework",
    description: "The lightweight Next.js-like framework for Node.js Express.",
    author: "Nxpress Team",
  },
};`,
        },
      ],
    },
  },

  "production-deployment": {
    id: "production-deployment",
    category: "Guides & Use Cases",
    title: "Production Deployment",
    description:
      "Deploy Nxpress applications safely in production environments.",
    subsections: [
      { id: "cli-start", title: "Running `nxpress start`" },
      {
        id: "environment-vars",
        title: "Environment Variables (`isDev = false`)",
      },
      { id: "docker-setup", title: "Containerizing with Docker" },
    ],
    content: {
      overview:
        "In production mode (`nxpress start` or `isDev = false`), live reloading and dev error overlays are automatically disabled. The production server uses compiled JavaScript and standard Node execution for maximum throughput.",
      codeSnippets: [
        {
          title: "Production Start Command",
          language: "bash",
          code: `pnpm start`,
        },
        {
          title: "Production Dockerfile Example",
          language: "dockerfile",
          filename: "Dockerfile",
          code: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]`,
        },
      ],
    },
  },

  comparison: {
    id: "comparison",
    category: "Guides & Use Cases",
    title: "Nxpress vs Next.js vs Express",
    description:
      "Compare architectural differences, bundle sizes, and use cases.",
    subsections: [
      { id: "comparison-table", title: "Feature Comparison Table" },
      { id: "when-to-use", title: "When to Choose Nxpress" },
    ],
    content: {
      overview:
        "Nxpress combines the file-system simplicity of Next.js with the raw speed and zero-bundle server rendering of classic Express HTML templates.",
      highlights: [
        {
          title: "Zero Client JS Bundle",
          desc: "Unlike React Next.js apps sending megabytes of hydration code, Nxpress sends clean HTML to the browser.",
        },
        {
          title: "Express Ecosystem Compatibility",
          desc: "Direct access to Express middleware, authentication libraries, and standard npm packages.",
        },
        {
          title: "Instant Cold Start",
          desc: "App boots in < 50ms compared to heavy framework compilation overhead.",
        },
      ],
    },
  },
};
