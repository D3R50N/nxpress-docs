import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DOCS_DATA, DocSection } from "@/app/docs-content";
import { DocPageContent } from "@/components/DocPageContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return DOCS_DATA.map((section) => ({
    slug: section.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const section = DOCS_DATA.find((s) => s.id === slug);

  if (!section) {
    return {
      title: "Page Not Found - Nxpress Documentation",
    };
  }

  return {
    title: `${section.title} - Nxpress Documentation`,
    description: section.summary,
  };
}

export default async function DocSectionPage({ params }: PageProps) {
  const { slug } = await params;
  const sectionIndex = DOCS_DATA.findIndex((s) => s.id === slug);
  const section: DocSection | undefined = DOCS_DATA[sectionIndex];

  if (!section) {
    notFound();
  }

  const prevSection = sectionIndex > 0 ? DOCS_DATA[sectionIndex - 1] : null;
  const nextSection = sectionIndex < DOCS_DATA.length - 1 ? DOCS_DATA[sectionIndex + 1] : null;

  return (
    <DocPageContent
      section={section}
      prevSection={prevSection}
      nextSection={nextSection}
    />
  );
}
