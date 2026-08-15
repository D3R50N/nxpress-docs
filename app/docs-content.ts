export interface DocTable {
  headers: string[];
  rows: string[][];
}

export interface CodeSnippet {
  title?: string;
  language: string;
  code: string;
}

export interface DocSubsection {
  id: string;
  title: string;
  description?: string;
  content?: string[];
  link?: {
    url: string;
    label: string;
  };
  table?: DocTable;
  codeSnippets?: CodeSnippet[];
}

export interface DocSection {
  id: string;
  number: string;
  title: string;
  summary: string;
  badge?: string;
  subsections: DocSubsection[];
}

export const DOCS_DATA: DocSection[] = [
  {
    id: "overview-cli",
    number: "01",
    title: "Overview & CLI",
    summary: "Nxpress is an Express.js-based framework for Node.js providing file-based routing, template components, cascading middlewares, automatic response handling, and built-in template helpers.",
    subsections: [
      {
        id: "starting-server",
        title: "Starting the Server",
        description: "You can start your Nxpress application in two ways: via the Nxpress CLI or through a custom server.ts entrypoint.",
        codeSnippets: [
          {
            title: "Option 1: Nxpress CLI",
            language: "bash",
            code: "# Start development server with Hot Reload, route scanning, & Tailwind\nnxpress dev\n# or shortcut\nnxp dev\n\n# Start production server\nnxpress start\n\n# Generate static HTML export (SSG) to out/\nnxpress export"
          },
          {
            title: "Option 2: Custom server.ts Entrypoint",
            language: "bash",
            code: "# Execute server.ts directly using tsx\nnpx tsx --watch server.ts\n# or using pnpm\npnpm serve"
          }
        ]
      }
    ]
  },
  {
    id: "vscode-extension",
    number: "02",
    title: "VS Code Extension",
    summary: "Enhance your Nxpress developer experience with the official Visual Studio Code extension providing intelligent autocompletion, snippets, and navigation.",
    subsections: [
      {
        id: "vscode-features",
        title: "VS Code Integration & Features",
        description: "The official Nxpress extension brings full IDE superpowers to your file-based Express development workflow.",
        link: {
          url: "https://marketplace.visualstudio.com/items?itemName=MonsieurDev.nxpress",
          label: "View Nxpress on VS Code Marketplace"
        },
        content: [
          "Autocompletion for component renderer $() with component name auto-discovery.",
          "Intelligent auto-suggestions for all built-in template helpers (cn, icon, ternary, len, tr, etc.).",
          "Routing navigation and companion file jump shortcuts.",
          "Snippet generators for page companion files, API handlers, and folder middlewares."
        ]
      }
    ]
  },
  {
    id: "server-options",
    number: "03",
    title: "Server Options & Configuration",
    summary: "Server options can be configured via nxpress.config.json (or .js, .ts, .mjs, .cjs) in the project root, or passed directly to nxpress(options) / serve(options).",
    subsections: [
      {
        id: "configuration-schema",
        title: "Configuration Schema Options",
        description: "All configurable properties accepted by the Nxpress server options schema:",
        table: {
          headers: ["Option", "Type", "Default", "Description"],
          rows: [
            ["rootDir", "string", "process.cwd()", "Absolute path to the project root directory."],
            ["appDir", "string", '"app" (or "pages")', "Directory containing view templates and route files."],
            ["componentsDir", "string", '"components"', "Directory containing reusable template components."],
            ["publicDir", "string", '"public"', "Directory for serving static assets via Express static middleware."],
            ["engine", "string", '"ejs"', 'Template engine choice ("ejs", "hbs", "html", "nunjucks", "liquid").'],
            ["port", "number", "3000", "HTTP server port number (can also be set via process.env.PORT)."],
            ["tailwind", "boolean | object", "true", "Automatic Tailwind CSS compilation (true, false, or custom path config)."],
            ["globals", "object", "{}", "Application-wide default global variables injected into all template views."],
            ["secureEnv", "boolean", "true", "Security flag filtering environment variables exposed to templates via E / env."],
            ["isDev", "boolean", "Auto-detected", "Development mode flag enabling Hot Reload and live route re-scanning."],
            ["i18n", "object", "undefined", "Internationalization options (locales, defaultLocale, prefixDefault, localesDir)."]
          ]
        }
      },
      {
        id: "config-example",
        title: "Configuration Example (nxpress.config.json)",
        codeSnippets: [
          {
            title: "nxpress.config.json",
            language: "json",
            code: `{\n  "$schema": "https://unpkg.com/@nxpress/core@latest/schema.json",\n  "port": 3000,\n  "engine": "ejs",\n  "appDir": "app",\n  "componentsDir": "components",\n  "publicDir": "public",\n  "secureEnv": true,\n  "i18n": {\n    "locales": ["fr", "en", "es"],\n    "defaultLocale": "fr",\n    "prefixDefault": false\n  },\n  "globals": {\n    "siteName": "My Store",\n    "author": "Nxpress Team",\n    "currency": "$"\n  }\n}`
          }
        ]
      }
    ]
  },
  {
    id: "file-routing",
    number: "04",
    title: "File-Based Routing Architecture",
    summary: "The directory structure inside app/ defines your application routes automatically.",
    subsections: [
      {
        id: "supported-files",
        title: "Supported File Types",
        content: [
          "View templates: .ejs, .njk, .nunjucks, .hbs, .liquid, .html",
          "Page companion files: .ts or .js files sharing the same base name as the view (e.g. index.ts for index.ejs)",
          "API route files: Any .ts or .js file located under app/api/",
          "Folder middleware files: middleware.ts or middleware.js"
        ]
      },
      {
        id: "dynamic-slugs",
        title: "Dynamic Route Syntax, Slugs & Route Groups",
        table: {
          headers: ["Pattern", "Example File Path", "Matched Route", "Companion Access", "View Access"],
          rows: [
            ["Single Parameter", "app/products/[id].ejs", "/products/:id", "req.params.id", "R.params.id"],
            ["Catch-All Wildcard Slug", "app/docs/[...slug].ejs", "/docs/*", "req.params.slug", "R.params.slug"],
            ["Index Route", "app/index.ejs", "/", "N/A", "N/A"],
            ["Route Groups", "app/(auth)/login.ejs", "/login", "N/A", "N/A"]
          ]
        },
        content: [
          "Route Groups (app/(group)/...): Parenthesized folders organize routes and nested layouts without affecting URL pathnames (e.g. app/(auth)/login.ejs -> /login, app/(dashboard)/settings.ejs -> /settings)."
        ]
      },
      {
        id: "reserved-filenames",
        title: "Reserved Filenames",
        table: {
          headers: ["Filename", "Role"],
          rows: [
            ["layout.ejs", "Nested layout template wrapping page templates in the current folder."],
            ["middleware.ts / middleware.js", "Directory-level middleware (never routed as a standalone page)."],
            ["404.ejs, 500.ejs, not-found.ejs, error.ejs", "Custom HTTP status error fallback templates."]
          ]
        }
      }
    ]
  },
  {
    id: "companion-files",
    number: "05",
    title: "Page Companion Files",
    summary: "Every view template page can be paired with a TypeScript or JavaScript companion file to fetch data and define SEO metadata before rendering.",
    subsections: [
      {
        id: "props-export",
        title: "Props Export",
        description: "Companion files can return page data via a default function, named props function, or direct export (objects, arrays, primitives).",
        codeSnippets: [
          {
            title: "app/products/[id].ts (Page Companion)",
            language: "typescript",
            code: `import type { Request, Response } from '@nxpress/core';\n\nexport default async function props(req: Request, res: Response) {\n  const products = [\n    { id: 1, name: 'Laptop', price: 999 }\n  ];\n\n  return {\n    title: 'Store',\n    products\n  };\n}`
          }
        ],
        content: [
          "Supported Export Formats: Async/Sync function (default or named props), direct plain object export, or direct array / primitive export (e.g. export default [1, 2, 3]).",
          "Template Access: Plain object properties are destructured into template locals (<%= title %>) and also accessible via props (<%= props.title %>). Primitives and arrays are accessible directly through props (<%= props %>). If no companion file or export exists, props is null."
        ]
      },
      {
        id: "metadata-export",
        title: "Metadata and SEO Export (metadata)",
        description: "Companion files can export page-level metadata as a static object or an async dynamic function.",
        codeSnippets: [
          {
            title: "Static Metadata Object",
            language: "typescript",
            code: `import type { NxpressMetadata } from '@nxpress/core';\n\nexport const metadata: NxpressMetadata = {\n  title: 'Store Products - Nxpress',\n  description: 'Explore our wide selection of electronics.',\n  keywords: ['shop', 'store', 'electronics'],\n  openGraph: {\n    title: 'Store Products',\n    description: 'Explore our wide selection of electronics.',\n    image: '/og-image.png'\n  },\n  twitter: {\n    card: 'summary_large_image',\n    creator: '@nxpress'\n  }\n};`
          },
          {
            title: "Dynamic Metadata Function",
            language: "typescript",
            code: `import type { NxpressMetadata, Request, Response } from '@nxpress/core';\n\nexport async function metadata(req: Request, res: Response): Promise<NxpressMetadata> {\n  return {\n    title: \`Product #\${req.params.id}\`,\n    description: \`Dynamic product details page.\`\n  };\n}`
          },
          {
            title: "Using App Globals / Config in Metadata",
            language: "typescript",
            code: `import type { NxpressMetadata, Request, Response } from '@nxpress/core';\nimport config from '../../nxpress.config.json';\n\nexport async function metadata(req: Request, res: Response): Promise<NxpressMetadata> {\n  const siteTitle = config.globals?.title || 'Nxpress Store';\n  return {\n    title: \`\${siteTitle} - Product #\${req.params.id}\`,\n    description: \`View details for product #\${req.params.id}.\`\n  };\n}`
          }
        ],
        content: [
          "Using Globals in Metadata: If you need global configuration or constants inside metadata(), directly import your config (e.g. nxpress.config.json) or custom constants module."
        ]
      }
    ]
  },
  {
    id: "injected-variables",
    number: "06",
    title: "Injected Template Variables & Objects",
    summary: "Nxpress automatically injects standard helper objects and variables into every view template rendering context.",
    subsections: [
      {
        id: "request-object",
        title: "1. R / req (Request Object)",
        description: "A sanitized representation of the current HTTP request:",
        table: {
          headers: ["Property", "Description", "Example Value"],
          rows: [
            ["R.url", "Full requested URL path", '"/products/123?sort=asc"'],
            ["R.path", "Pathname without query string", '"/products/123"'],
            ["R.full", "Full URL string with protocol and host", '"http://localhost:3000/products/123"'],
            ["R.base", "Base URL with protocol and host", '"http://localhost:3000"'],
            ["R.method", "HTTP method in uppercase", '"GET"'],
            ["R.query", "Query parameters object", '{ sort: "asc" }'],
            ["R.params", "Dynamic route path parameters object", '{ id: "123" }'],
            ["R.headers", "HTTP request headers object", '{ "user-agent": "..." }'],
            ["R.cookies", "Request cookies object", '{ session: "..." }'],
            ["R.ip", "Client IP address", '"127.0.0.1"'],
            ["R.protocol", "Protocol", '"http" or "https"'],
            ["R.host", "Host header value", '"localhost:3000"'],
            ["R.locale", "Currently active locale string", '"en"'],
            ["R.locales", "Array of available locales", '["fr", "en", "es"]'],
            ["R.defaultLocale", "Configured default locale", '"fr"']
          ]
        }
      },
      {
        id: "env-object",
        title: "2. E / env (Environment Variables)",
        description: "Exposes environment variables safely to view templates based on the secureEnv flag:",
        content: [
          "When secureEnv: true (default): Filters process.env to only include NODE_ENV and variables starting with PUBLIC_.",
          "When secureEnv: false: Exposes all environment variables in process.env."
        ],
        codeSnippets: [
          {
            title: "Template Access",
            language: "html",
            code: `<p>Environment: <%= E.NODE_ENV %></p>\n<p>Public API Key: <%= E.PUBLIC_API_KEY %></p>`
          }
        ]
      },
      {
        id: "global-and-component",
        title: "3. G / global & 4. $ (Component Renderer)",
        content: [
          "G / global: Merged object containing custom globals from configuration, all built-in helpers, and the component renderer $.",
          "$ (Component Renderer): Function used inside templates to include reusable components from componentsDir."
        ],
        codeSnippets: [
          {
            title: "Rendering Components in EJS",
            language: "html",
            code: `<%- $("Navbar", { activePage: "home" }) %>`
          }
        ]
      },
      {
        id: "automatic-helpers",
        title: "5. Automatic Helpers & Assets",
        table: {
          headers: ["Variable", "Type", "Description"],
          rows: [
            ["year", "number", "Current 4-digit year (e.g. 2026)."],
            ["now", "Date", "Current JavaScript Date object instance."],
            ["lang", "string", "Direct current active language code in templates (e.g. 'en')."]
          ]
        }
      }
    ]
  },
  {
    id: "builtin-helpers",
    number: "07",
    title: "Built-in Template Helpers",
    summary: "Nxpress registers built-in helper functions accessible in all supported template engines (ejs, hbs, nunjucks, liquid).",
    subsections: [
      {
        id: "formatting-helpers",
        title: "Formatting & String Helpers",
        table: {
          headers: ["Helper", "Description"],
          rows: [
            ["str(val)", "Converts value or object to string (JSON.stringify for objects)."],
            ["json(val)", "Parses a JSON string into an object."],
            ["lower(val)", "Converts string to lowercase."],
            ["upper(val)", "Converts string to uppercase."],
            ["capitalize(val)", "Capitalizes the first letter of string."],
            ["truncate(val, len)", "Truncates string to specified length (default 50) with ..."],
            ["join(arr, sep)", 'Joins array elements into a string using separator (default ", ").']
          ]
        }
      },
      {
        id: "logic-helpers",
        title: "Comparisons & Logic Helpers",
        table: {
          headers: ["Helper", "Description"],
          rows: [
            ["eq(a, b)", "Returns true if a === b."],
            ["ne(a, b)", "Returns true if a !== b."],
            ["gt(a, b) / gte(a, b)", "Greater than / Greater than or equal."],
            ["lt(a, b) / lte(a, b)", "Less than / Less than or equal."],
            ["and(...args)", "Returns true if all arguments are truthy."],
            ["or(...args)", "Returns true if any argument is truthy."],
            ["not(val)", "Returns logical NOT (!val)."],
            ["ternary(cond, trueVal, falseVal)", "Returns trueVal if cond is truthy, otherwise falseVal."]
          ]
        }
      },
      {
        id: "lucide-icons",
        title: "Lucide Icon Helpers (icon / I)",
        description: "Renders zero-dependency server-side Lucide SVG icons by name. Supports kebab-case, camelCase, or PascalCase.",
        codeSnippets: [
          {
            title: "Lucide Icons in EJS",
            language: "html",
            code: `<%- icon('user', 'w-5 h-5 text-sky-500') %>\n<%- I('moon', 'w-5 h-5 dark:hidden') %>\n<%- I('sun', 'w-5 h-5 hidden dark:block') %>`
          }
        ]
      },
      {
        id: "head-injections",
        title: "Zero-Config Head Injections (SEO & Tailwind CSS)",
        description: "Nxpress automatically compiles Tailwind CSS and renders companion file metadata (<title>, <meta>, OpenGraph, Twitter), and injects them directly before </head> in your layouts. No template variables are needed.",
        codeSnippets: [
          {
            title: "Clean Layout with Automatic Injections",
            language: "html",
            code: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <!-- Tailwind stylesheet and SEO tags are automatically injected before </head> -->\n</head>\n<body>\n  <%- body %>\n</body>\n</html>`
          }
        ]
      },
      {
        id: "collections-helpers",
        title: "Collections & Utility Helpers",
        table: {
          headers: ["Helper", "Description"],
          rows: [
            ["cn(...classes)", "Merges class names and resolves Tailwind CSS conflicts using clsx and tailwind-merge."],
            ["tr(key, [params])", "Returns translated text dictionary string with variable interpolation."],
            ["len(val)", "Returns length of array, string, or object keys count."],
            ["contains(arr, val) / includes(arr, val)", "Checks if array or string contains value."],
            ["add(a, b) / sub(a, b)", "Adds or subtracts two numbers."]
          ]
        }
      }
    ]
  },
  {
    id: "component-system",
    number: "08",
    title: "Component System",
    summary: "Components stored in componentsDir can be rendered inside any view template or nested within other components using $.",
    subsections: [
      {
        id: "rendering-components",
        title: "Rendering Components",
        codeSnippets: [
          {
            title: "Usage in View Templates",
            language: "html",
            code: `<%- $("Navbar", { title: G.siteName }) %>\n<main>\n  <%- $("ProductCard", { product: p }) %>\n</main>\n<%- $("Footer") %>`
          }
        ]
      }
    ]
  },
  {
    id: "api-routes",
    number: "09",
    title: "API Routes",
    summary: "Any file under app/api/ is automatically registered as an API route handler.",
    subsections: [
      {
        id: "http-method-handlers",
        title: "HTTP Method Handlers & Default Export",
        description: "Each HTTP method is defined by an exported named function (get, post, put, delete, patch).",
        codeSnippets: [
          {
            title: "app/api/users.ts",
            language: "typescript",
            code: `import type { Request, Response } from '@nxpress/core';\n\nexport function get(req: Request, res: Response) {\n  return {\n    status: 'ok',\n    timestamp: new Date().toISOString()\n  };\n}\n\nexport function post(req: Request, res: Response) {\n  return {\n    success: true,\n    message: 'Data saved successfully'\n  };\n}`
          }
        ],
        content: [
          "Default Fallback Handler: If no matching named HTTP method function is exported, export default function(req, res) catches all HTTP requests for that route."
        ]
      },
      {
        id: "auto-return",
        title: "Automatic Response (Auto-Return)",
        content: [
          "Object or Array: Automatically sent via res.json(...).",
          "String or Buffer: Automatically sent via res.send(...).",
          "Configured status codes (res.status(...)) are preserved.",
          "If the handler returns nothing and does not send a response, next() is called automatically."
        ]
      }
    ]
  },
  {
    id: "folder-middlewares",
    number: "10",
    title: "Folder-Level Middlewares",
    summary: "The filename middleware.ts (or .js) is reserved and applies cascadingly to its directory and all subdirectories.",
    subsections: [
      {
        id: "directory-cascading",
        title: "Directory Cascading & Auto-Collection",
        content: [
          "app/middleware.ts -> Applies to all application routes (global).",
          "app/admin/middleware.ts -> Applies strictly to /admin/*.",
          "All exported functions inside middleware.ts are collected and executed in declaration order."
        ],
        codeSnippets: [
          {
            title: "app/middleware.ts",
            language: "typescript",
            code: `import type { Request, Response } from '@nxpress/core';\n\n// Route exclusions\nexport const ignore = ['/api/health', '/public/*'];\n\nexport function logger(req: Request, res: Response) {\n  console.log(\`[LOG] \${req.method} \${req.path}\`);\n}\n\nexport function setSecurityHeader(req: Request, res: Response) {\n  res.setHeader('X-Frame-Options', 'DENY');\n}`
          }
        ]
      }
    ]
  },
  {
    id: "route-middlewares",
    number: "11",
    title: "Route-Level Middlewares",
    summary: "Attach middlewares to specific routes via middleware (singular) or middlewares (plural) exports in companion or API files.",
    subsections: [
      {
        id: "middleware-exports",
        title: "Singular vs. Plural Middleware Exports",
        codeSnippets: [
          {
            title: "Singular (middleware)",
            language: "typescript",
            code: `import type { Handler } from '@nxpress/core';\n\nexport const middleware: Handler = (req, res) => {\n  res.setHeader('X-Route-Scope', 'single');\n};`
          },
          {
            title: "Plural (middlewares)",
            language: "typescript",
            code: `import type { Handler } from '@nxpress/core';\n\nexport const middlewares: Handler[] = [\n  (req, res) => { console.log('Middleware 1'); },\n  (req, res) => { console.log('Middleware 2'); }\n];`
          }
        ],
        content: [
          "If both middleware AND middlewares are exported in the same file, they merge and execute in order: middleware first, then elements in middlewares array."
        ]
      }
    ]
  },
  {
    id: "execution-model",
    number: "12",
    title: "Middleware Execution Model",
    summary: "Nxpress provides automatic control flow, Express package compatibility, and dev mode swappable router hot-reloading.",
    subsections: [
      {
        id: "optional-next",
        title: "Optional next() Calling & Express Compatibility",
        content: [
          "Optional next(): Middlewares are not required to call next(). If a function completes without sending a response, Nxpress automatically advances.",
          "Express Package Compatibility: Traditional Express middlewares with 3 parameters (req, res, next) remain 100% compatible.",
          "Hot Reloading: In dev mode, route changes and config updates re-register immediately without restarting Node.js."
        ]
      }
    ]
  },
  {
    id: "package-exports",
    number: "13",
    title: "Package Exports & Types",
    summary: "The @nxpress/core module re-exports core server utilities, handlers, and TypeScript definitions.",
    subsections: [
      {
        id: "ts-imports",
        title: "Importing Core Types",
        codeSnippets: [
          {
            title: "TypeScript Exports",
            language: "typescript",
            code: `import {\n  nxpress,\n  serve,\n  NxpressServerOptions,\n  TemplateEngine,\n  HttpMethod,\n  NxpressMetadata,\n  logger,\n  Request,\n  Response,\n  Express,\n  NextFunction,\n  RequestHandler,\n  Handler,\n} from '@nxpress/core';`
          }
        ]
      }
    ]
  },
  {
    id: "client-api",
    number: "14",
    title: "Client API & Theme Management",
    summary: "Nxpress injects client-side utilities and flicker-free dark mode controls under window.__nxpress__.",
    subsections: [
      {
        id: "theme-api",
        title: "Theme Management API (window.__nxpress__.theme)",
        table: {
          headers: ["Method", "Return Type", "Description"],
          rows: [
            ["window.__nxpress__.theme.get()", "'dark' | 'light'", "Returns the currently active theme preference."],
            ["window.__nxpress__.theme.set(mode)", "void", "Sets theme mode ('dark', 'light', 'system') and persists in localStorage."],
            ["window.__nxpress__.theme.toggle()", "'dark' | 'light'", "Toggles theme mode between dark and light, returning the new state."]
          ]
        },
        codeSnippets: [
          {
            title: "Usage in View Templates",
            language: "html",
            code: `<button onclick="__nxpress__.theme.toggle()">\n  Toggle Dark Mode\n</button>`
          }
        ]
      }
    ]
  },
  {
    id: "static-site-generation",
    number: "15",
    title: "Static Site Generation (SSG)",
    summary: "Nxpress allows you to pre-render your entire application into static HTML files and copy assets for zero-Node.js hosting.",
    subsections: [
      {
        id: "ssg-cli-export",
        title: "CLI Command (nxpress export)",
        description: "Pre-renders all views and assets into static output directories (e.g. GitHub Pages, Netlify, Vercel Static, S3).",
        codeSnippets: [
          {
            title: "CLI Commands",
            language: "bash",
            code: "# Default export to out/\nnxpress export\n\n# Custom output directory and template engine\nnxpress export --out-dir dist/static --engine ejs"
          }
        ],
        table: {
          headers: ["Flag", "Description", "Default"],
          rows: [
            ["-o, --out-dir <dir>", "Destination output directory", '"out"'],
            ["-e, --engine <engine>", "Template engine to use", "From config or ejs"],
            ["-a, --app-dir <dir>", "Custom app/pages directory", "From config"],
            ["-c, --components-dir <dir>", "Custom components directory", "From config"],
            ["--public-dir <dir>", "Custom public static directory", '"public"'],
            ["--no-tailwind", "Disable automatic Tailwind CSS build", "false"]
          ]
        }
      },
      {
        id: "generate-static-params",
        title: "Dynamic Routes with generateStaticParams",
        description: "For dynamic routes (e.g. app/products/[id].ejs), export generateStaticParams() in companion files.",
        codeSnippets: [
          {
            title: "app/products/[id].ts",
            language: "typescript",
            code: `import type { Request, Response } from '@nxpress/core';\n\n// 1. Generate static route parameters at build time\nexport async function generateStaticParams() {\n  const products = await fetchProducts();\n  return products.map((p) => ({ id: String(p.id) }));\n}\n\n// 2. Fetch page props for each param instance\nexport default async function props(req: Request, res: Response) {\n  const product = await getProductById(req.params.id);\n  return { product };\n}`
          },
          {
            title: "Catch-All Wildcard Routes (app/docs/[...slug].ts)",
            language: "typescript",
            code: `export async function generateStaticParams() {\n  return [\n    { slug: 'getting-started' },\n    { slug: 'installation/manual' }\n  ];\n}`
          }
        ],
        content: [
          "Nxpress generates static HTML files such as out/products/1/index.html, out/products/2/index.html, out/docs/getting-started/index.html.",
          "Dynamic routes without generateStaticParams() are skipped during export."
        ]
      }
    ]
  },
  {
    id: "internationalization",
    number: "16",
    title: "Internationalization (i18n)",
    summary: "Nxpress includes built-in multi-language routing, automatic locale detection (URL prefix, cookies, Accept-Language), and translation helpers.",
    subsections: [
      {
        id: "translation-files",
        title: "Translation Dictionaries (locales/)",
        description: "Store translation dictionaries as JSON or TS/JS files in the locales/ folder.",
        codeSnippets: [
          {
            title: "locales/fr.json",
            language: "json",
            code: `{\n  "welcome": "Bienvenue {{name}} !",\n  "nav": {\n    "home": "Accueil",\n    "about": "À propos"\n  }\n}`
          },
          {
            title: "locales/en.json",
            language: "json",
            code: `{\n  "welcome": "Welcome {{name}}!",\n  "nav": {\n    "home": "Home",\n    "about": "About"\n  }\n}`
          }
        ]
      },
      {
        id: "tr-helper",
        title: "Translation Helper (tr)",
        description: "The tr(key, [params]) helper translates dictionary keys with variable replacement and automatic fallback to defaultLocale.",
        codeSnippets: [
          {
            title: "Usage in View Templates (EJS / HBS / NJK / Liquid)",
            language: "html",
            code: `<nav>\n  <a href="/products"><%= tr('products_title') %></a>\n  <a href="?lang=en">English</a>\n  <a href="?lang=fr">Français</a>\n</nav>\n\n<h1><%= tr('welcome', { name: 'Alex' }) %></h1>`
          }
        ]
      },
      {
        id: "i18n-injections-priority",
        title: "Template Injections & Resolution Priority",
        content: [
          "Template & Request Injections: lang (current code), R.locale (active locale), R.locales (supported locales), R.defaultLocale (fallback).",
          "SSR Resolution Priority: 1. URL Path Prefix (/fr/...) -> 2. Query Parameter (?lang=fr) -> 3. Cookie (lang=fr) -> 4. Accept-Language Header -> 5. defaultLocale.",
          "SSG Multi-language Export: Running nxpress export automatically compiles every page for each configured locale (e.g. out/index.html and out/fr/index.html) with pre-rendered translations."
        ]
      }
    ]
  },
  {
    id: "recipes-use-cases",
    number: "17",
    title: "Practical Recipes & Use Cases",
    summary: "Real-world project architectures and complete code patterns showing companion files, templates, route groups, SSG exports, and REST APIs.",
    subsections: [
      {
        id: "ecommerce-store-usecase",
        title: "1. E-Commerce Store (Dynamic Routes, SEO, Props & Components)",
        description: "A complete product catalog showcasing dynamic routes, companion data loaders, dynamic SEO metadata, and custom reusable components.",
        codeSnippets: [
          {
            title: "Project Structure",
            language: "bash",
            code: `app/\n├── layout.ejs              # Global root layout with <head> and navbar\n├── index.ejs               # Store home page\n├── index.ts                # Featured products loader\n└── products/\n    ├── [id].ejs            # Product details view\n    └── [id].ts             # Product companion loader & metadata\ncomponents/\n├── Navbar.ejs              # Reusable navigation bar\n└── ProductCard.ejs         # Reusable product card component\nnxpress.config.json         # Engine and global configuration`
          },
          {
            title: "app/products/[id].ts (Companion Data & SEO)",
            language: "typescript",
            code: `import type { Request, Response, NxpressMetadata } from '@nxpress/core';\nimport config from '../../nxpress.config.json';\n\n// 1. Dynamic SEO Metadata\nexport async function metadata(req: Request, res: Response): Promise<NxpressMetadata> {\n  const siteName = config.globals?.title || 'Nxpress Store';\n  return {\n    title: \`\${siteName} - Product #\${req.params.id}\`,\n    description: \`Buy product #\${req.params.id} at the best price.\`,\n    openGraph: {\n      title: \`Product #\${req.params.id}\`,\n      image: \`/images/product-\${req.params.id}.jpg\`\n    }\n  };\n}\n\n// 2. Page Data Loader (Props)\nexport default async function props(req: Request, res: Response) {\n  const { id } = req.params;\n  \n  // Fetch from database or external API\n  const product = {\n    id,\n    name: \`Premium Wireless Headset \${id}\`,\n    price: 199.99,\n    inStock: true,\n    features: ['Active Noise Cancelling', '40h Battery', 'Bluetooth 5.3']\n  };\n\n  const related = [\n    { id: '101', name: 'Protective Case', price: 29.99 },\n    { id: '102', name: 'Audio Cable', price: 14.99 }\n  ];\n\n  return {\n    product,\n    related\n  };\n}`
          },
          {
            title: "app/products/[id].ejs (Product View Template)",
            language: "html",
            code: `<div class="container mx-auto py-8 px-4">\n  <nav class="text-sm mb-6 text-gray-500">\n    <a href="/" class="hover:underline">Home</a> &gt; \n    <a href="/products" class="hover:underline">Products</a> &gt; \n    <span class="text-gray-800 font-semibold"><%= product.name %></span>\n  </nav>\n\n  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">\n    <div>\n      <img src="/images/product-<%= product.id %>.jpg" alt="<%= product.name %>" class="rounded-xl shadow-lg w-full" />\n    </div>\n    \n    <div>\n      <h1 class="text-3xl font-bold text-gray-900 mb-2"><%= product.name %></h1>\n      <p class="text-2xl text-indigo-600 font-bold mb-4">$<%= product.price.toFixed(2) %></p>\n      \n      <h3 class="font-semibold text-gray-700 mb-2">Key Features:</h3>\n      <ul class="list-disc pl-5 mb-6 text-gray-600 space-y-1">\n        <% product.features.forEach(function(feat) { %>\n          <li><%= feat %></li>\n        <% }); %>\n      </ul>\n\n      <button class="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700">\n        Add to Cart\n      </button>\n    </div>\n  </div>\n\n  <div class="mt-12">\n    <h2 class="text-2xl font-bold mb-4">Related Accessories</h2>\n    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">\n      <% related.forEach(function(item) { %>\n        <ProductCard id="<%= item.id %>" name="<%= item.name %>" price="<%= item.price %>" />\n      <% }); %>\n    </div>\n  </div>\n</div>`
          },
          {
            title: "components/ProductCard.ejs (Custom Component)",
            language: "html",
            code: `<div class="border rounded-lg p-4 bg-white shadow hover:shadow-md transition">\n  <h4 class="font-bold text-gray-800"><%= name %></h4>\n  <p class="text-indigo-600 font-semibold mt-1">$<%= price %></p>\n  <a href="/products/<%= id %>" class="inline-block mt-3 text-sm text-indigo-600 font-medium hover:underline">\n    View Details &rarr;\n  </a>\n</div>`
          }
        ]
      },
      {
        id: "i18n-blog-ssg-usecase",
        title: "2. Multi-Language Blog with Static Site Generation (SSG)",
        description: "A fast multi-language blog pre-rendering static HTML pages with generateStaticParams, translation dictionaries, and automated export.",
        codeSnippets: [
          {
            title: "Project Structure",
            language: "bash",
            code: `app/\n├── layout.ejs\n└── blog/\n    ├── [slug].ejs          # Blog post template with tr() helpers\n    └── [slug].ts           # generateStaticParams, props & metadata\nlocales/\n├── en.json                 # English dictionary\n└── fr.json                 # French dictionary\nnxpress.config.json`
          },
          {
            title: "locales/en.json & locales/fr.json",
            language: "json",
            code: `// locales/en.json\n{\n  "blog_title": "Nxpress Engineering Blog",\n  "read_time": "{{minutes}} min read",\n  "author": "By {{name}}"\n}\n\n// locales/fr.json\n{\n  "blog_title": "Blog d'Ingénierie Nxpress",\n  "read_time": "Temps de lecture : {{minutes}} min",\n  "author": "Par {{name}}"\n}`
          },
          {
            title: "app/blog/[slug].ts (Static Params, Data & SEO)",
            language: "typescript",
            code: `import type { Request, Response, NxpressMetadata } from '@nxpress/core';\n\n// 1. Export list of dynamic slugs for Static Site Generation (nxpress export)\nexport async function generateStaticParams() {\n  return [\n    { slug: 'announcing-nxpress-v1' },\n    { slug: 'file-based-routing-in-depth' },\n    { slug: 'mastering-static-export' }\n  ];\n}\n\n// 2. Dynamic SEO Metadata\nexport async function metadata(req: Request, res: Response): Promise<NxpressMetadata> {\n  const { slug } = req.params;\n  return {\n    title: \`Blog - \${slug}\`,\n    description: \`Read the full article about \${slug} on our blog.\`\n  };\n}\n\n// 3. Post Content Loader\nexport default async function props(req: Request, res: Response) {\n  const { slug } = req.params;\n  return {\n    slug,\n    title: slug.replace(/-/g, ' ').toUpperCase(),\n    readMinutes: 5,\n    authorName: 'Alex Rivers',\n    content: 'Nxpress provides an intuitive developer experience with minimal overhead...'\n  };\n}`
          },
          {
            title: "app/blog/[slug].ejs (Template with i18n Helpers)",
            language: "html",
            code: `<article class="max-w-3xl mx-auto py-12 px-4">\n  <div class="flex items-center justify-between text-sm text-gray-500 mb-4">\n    <span><%= tr('author', { name: authorName }) %></span>\n    <span><%= tr('read_time', { minutes: readMinutes }) %></span>\n  </div>\n\n  <h1 class="text-4xl font-extrabold text-gray-900 mb-6"><%= title %></h1>\n\n  <div class="prose lg:prose-xl text-gray-700 leading-relaxed">\n    <p><%= content %></p>\n  </div>\n\n  <div class="mt-8 pt-6 border-t flex gap-4 text-sm">\n    <a href="/<%= slug %>?lang=en" class="font-medium text-indigo-600 hover:underline">English</a>\n    <a href="/fr/<%= slug %>" class="font-medium text-indigo-600 hover:underline">Français</a>\n  </div>\n</article>`
          }
        ]
      },
      {
        id: "admin-dashboard-auth-usecase",
        title: "3. Protected Admin Dashboard (Route Groups & Middleware Cascades)",
        description: "How to use route groups (folder parentheses) to isolate layouts and apply route-group middleware without polluting the URL structure.",
        codeSnippets: [
          {
            title: "Project Structure",
            language: "bash",
            code: `app/\n├── (auth)/                 # URL: /login (no (auth) in path)\n│   ├── login.ejs\n│   └── login.ts\n└── (dashboard)/            # URL: /overview, /analytics, /settings\n    ├── middleware.ts       # Protects all routes inside (dashboard)/\n    ├── layout.ejs          # Dashboard shell with sidebar\n    ├── overview.ejs\n    └── overview.ts`
          },
          {
            title: "app/(dashboard)/middleware.ts (Directory Auth Guard)",
            language: "typescript",
            code: `import type { Request, Response, NextFunction } from '@nxpress/core';\n\nexport default function authGuard(req: Request, res: Response, next: NextFunction) {\n  const sessionToken = req.cookies?.session_token || req.headers['authorization'];\n\n  if (!sessionToken) {\n    // Redirect unauthenticated requests to login page\n    return res.redirect('/login');\n  }\n\n  // Attach authenticated user profile to res.locals\n  res.locals.user = { id: 1, name: 'Admin', role: 'admin' };\n  next();\n}`
          },
          {
            title: "app/(dashboard)/layout.ejs (Dedicated Dashboard Layout)",
            language: "html",
            code: `<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n  <title>Admin Dashboard</title>\n  <link rel="stylesheet" href="/styles.css">\n</head>\n<body class="flex min-h-screen bg-gray-100">\n  <!-- Sidebar Navigation -->\n  <aside class="w-64 bg-gray-900 text-white p-6">\n    <div class="text-xl font-bold mb-8">Nxpress Admin</div>\n    <nav class="space-y-3">\n      <a href="/overview" class="block py-2 px-3 rounded hover:bg-gray-800">Overview</a>\n      <a href="/analytics" class="block py-2 px-3 rounded hover:bg-gray-800">Analytics</a>\n      <a href="/settings" class="block py-2 px-3 rounded hover:bg-gray-800">Settings</a>\n    </nav>\n  </aside>\n\n  <!-- Main Content Area -->\n  <main class="flex-1 p-8">\n    <header class="flex justify-between items-center mb-8 pb-4 border-b">\n      <h2 class="text-2xl font-bold">Welcome back, <%= user?.name %></h2>\n      <a href="/api/auth/logout" class="text-sm text-red-600 hover:underline">Logout</a>\n    </header>\n    \n    <!-- Child Page Injected Here -->\n    <%- body %>\n  </main>\n</body>\n</html>`
          }
        ]
      },
      {
        id: "rest-api-crud-usecase",
        title: "4. Full REST API with Auto-Responses & Status Codes",
        description: "Building JSON REST APIs using file-based HTTP method exports, cascading API middlewares, and automatic response formatting.",
        codeSnippets: [
          {
            title: "Project Structure",
            language: "bash",
            code: `app/\n└── api/\n    ├── middleware.ts       # Global API middleware (CORS, Rate limiting, Token verify)\n    └── users/\n        ├── index.ts        # GET /api/users, POST /api/users\n        └── [id].ts         # GET /api/users/:id, PUT /api/users/:id, DELETE /api/users/:id`
          },
          {
            title: "app/api/users/index.ts (List & Create)",
            language: "typescript",
            code: `import type { Request, Response } from '@nxpress/core';\n\nconst mockUsers = [\n  { id: 1, name: 'Alice', email: 'alice@example.com' },\n  { id: 2, name: 'Bob', email: 'bob@example.com' }\n];\n\n// GET /api/users -> Automatically responds with 200 OK + JSON\nexport async function GET(req: Request, res: Response) {\n  const search = req.query.search as string;\n  if (search) {\n    return mockUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));\n  }\n  return mockUsers;\n}\n\n// POST /api/users -> Creates new record with 201 Created\nexport async function POST(req: Request, res: Response) {\n  const { name, email } = req.body;\n  if (!name || !email) {\n    return res.status(400).json({ error: 'Name and email are required' });\n  }\n  \n  const newUser = { id: Date.now(), name, email };\n  mockUsers.push(newUser);\n  \n  return res.status(201).json(newUser);\n}`
          },
          {
            title: "app/api/users/[id].ts (Get, Update, Delete by ID)",
            language: "typescript",
            code: `import type { Request, Response } from '@nxpress/core';\n\n// GET /api/users/:id\nexport async function GET(req: Request, res: Response) {\n  const userId = Number(req.params.id);\n  const user = { id: userId, name: 'Alice', email: 'alice@example.com' };\n  \n  if (!user) {\n    return res.status(404).json({ error: 'User not found' });\n  }\n  return user;\n}\n\n// PUT /api/users/:id\nexport async function PUT(req: Request, res: Response) {\n  const userId = Number(req.params.id);\n  const { name, email } = req.body;\n  return { id: userId, name, email, updatedAt: new Date().toISOString() };\n}\n\n// DELETE /api/users/:id\nexport async function DELETE(req: Request, res: Response) {\n  return res.status(204).send();\n}`
          }
        ]
      }
    ]
  }
];

