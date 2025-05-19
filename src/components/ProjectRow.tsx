'use client';

import Link from 'next/link';

interface ProjectRowProps {
  project: {
    id: string;
    name: string;
    description: string;
    lastUpdated: string;
    documents: string[];
  };
}

export default function ProjectRow({ project }: ProjectRowProps) {
  return (
    <tr className="hover:bg-zinc-50">
      <td className="px-6 py-4 text-sm font-medium text-zinc-900">{project.name}</td>
      <td className="px-6 py-4 text-sm text-zinc-700">{project.description}</td>
      <td className="px-6 py-4 text-sm text-zinc-500">{project.lastUpdated}</td>
      <td className="px-6 py-4 text-sm text-zinc-600">
        <ul className="list-disc pl-5">
          {project.documents.map((doc, index) => (
            <li key={index}>
              <Link href={`/dashboard/projects/${project.id}/docs/${encodeURIComponent(doc)}`} className="underline hover:text-indigo-600">
                {doc}
              </Link>
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
}