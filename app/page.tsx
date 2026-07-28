import { DocsViewer } from "./components/DocsViewer";

export const metadata = {
  title: "Nxpress Documentation - Next.js-like DX for Express",
  description:
    "Official documentation for @nxpress/core. File-based routing, template components, view companions, and SSE live reload for Express.",
};

export default function HomePage() {
  return <DocsViewer />;
}
