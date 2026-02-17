import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { ExhibitContent } from "./ExhibitContent";

interface ExhibitPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ExhibitPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Exhibit`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Viraj Shah`,
      description: project.description,
    },
  };
}

export default async function ExhibitPage({ params }: ExhibitPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return <ExhibitContent project={project} />;
}
