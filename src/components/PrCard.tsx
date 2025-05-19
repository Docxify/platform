'use client';

import Link from 'next/link';

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    lastUpdated: string;
    documents: string[];
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border border-zinc-200 rounded-lg p-4 shadow-sm hover:bg-zinc-50 flex justify-between items-start">
      <div>
        <p className="text-sm font-semibold text-zinc-900">{project.name}</p>
        <p className="text-sm text-zinc-700">Description: {project.description}</p>
        <p className="text-sm text-zinc-600">Last Updated: {project.lastUpdated}</p>
        <p className="text-sm text-zinc-600">Documents:</p>
        <ul className="list-disc pl-5 text-sm text-zinc-500">
          {project.documents.map((doc, index) => (
            <li key={index}>
              <Link href={`/dashboard/projects/${project.id}/docs/${encodeURIComponent(doc)}`} className="underline hover:text-indigo-600">
                {doc}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}