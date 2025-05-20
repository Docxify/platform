'use client';

import { useState } from 'react';
import Link from 'next/link';

interface PrCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    lastUpdated: string;
    documents: string[];
    domain: string;
    status: 'Public' | 'Private' | 'In Progress' | 'Completed' | 'On Hold';
    contributors: string[];
  };
  onDelete: (id: string) => void;
  getStatusColor: (status: string) => string;
}

export default function PrCard({ project, onDelete, getStatusColor }: PrCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const lastUpdatedTime = new Date(project.lastUpdated).getTime();
  const currentTime = new Date().getTime();
  const timeDiffHours = Math.floor((currentTime - lastUpdatedTime) / (1000 * 60 * 60));
  const lastUpdatedText = timeDiffHours < 24 ? `${timeDiffHours} hours ago` : project.lastUpdated;

  return (
    <div className="flex flex-col rounded-lg border border-zinc-200 bg-white  active:border-purple-200 p-6 relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <Link href={`/dashboard/projects/edit/${project.id}`} className="p-2 text-zinc-700 text-white rounded-md" aria-label="Edit project">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </Link>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="p-2 text-zinc-700 rounded-md "
            aria-label="Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
           
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 rounded-md shadow-lg z-10">
              <button
                onClick={() => { onDelete(project.id); setIsDropdownOpen(false); }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-zinc-100"
              >
                Delete Project
              </button>
              <Link
                href={`/dashboard/projects/settings/${project.id}`}
                onClick={() => setIsDropdownOpen(false)}
                className="block w-full text-left px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
              >
                Manage Project
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className={`w-2.5 h-2.5 ${getStatusColor(project.status)} rounded-full`}></span>
        <span className="text-sm font-medium text-zinc-700 dark:text-slate-300">Project Status: {project.status}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-slate-400 mb-4">
        <span>Last updated</span>
        <span className="text-zinc-900 dark:text-white font-semibold">{lastUpdatedText}</span>
      </div>
      <div className="mb-4 text-sm">
        <div className="text-zinc-500 dark:text-slate-400 mb-1">Domain</div>
        <div className="text-zinc-900 dark:text-white font-semibold">{project.domain}</div>
      </div>
      <div className="flex items-center gap-3 mt-auto">
        <button
          className="p-2 bg-zinc-100 rounded-md hover:bg-zinc-200"
          aria-label="Duplicate project"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-zinc-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5h7.5a2.25 2.25 0 012.25 2.25v11.25a2.25 2.25 0 01-2.25 2.25H8.25a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 9.75h7.5" />
          </svg>
        </button>
        <button
          className="p-2 bg-zinc-100 rounded-md hover:bg-zinc-200"
          aria-label="Refresh"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-zinc-700 dark:text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.24a5.25 5.25 0 10-7.19 7.19M4.5 12a7.5 7.5 0 0112.318-5.51M19.5 12a7.5 7.5 0 01-12.318 5.51" />
          </svg>
        </button>
        <Link href={`/dashboard/projects/${project.id}`} className="inline-flex items-center px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-md hover:bg-blue-900">
          Visit docs
        </Link>
      </div>
    </div>
  );
}