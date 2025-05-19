'use client';

import { useState, useEffect } from 'react';
import AddProjectButton from '@/components/AddProjectButton';
import AddProjectModal from '@/components/AddProjectModal';
import PrCard from '@/components/PrCard';
import ProjectRow from '@/components/ProjectRow';

interface Project {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  documents: string[];
}

interface ProjectsPageProps {
  projects?: Project[];
}

export default function Projects({ projects = [] }: ProjectsPageProps) {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Load projects and accent color on mount
  useEffect(() => {
    const savedAccent = localStorage.getItem('accentColor') || 'indigo';
    document.documentElement.style.setProperty('--accent-color', getAccentColor(savedAccent));

    const initialProjects = projects.length
      ? [...projects]
      : [
          { id: '1', name: 'Website Redesign', description: 'Revamp company website', lastUpdated: '2025-05-18', documents: ['Design Spec', 'Wireframes'] },
          { id: '2', name: 'API Integration', description: 'Integrate payment API', lastUpdated: '2025-05-17', documents: ['API Docs', 'Test Plan'] },
        ];
    setProjectList(initialProjects);
  }, []); // Empty dependency array to run only on mount

  const getAccentColor = (color: string) => {
    const colors = {
      indigo: '#6366f1',
      blue: '#3b82f6',
      red: '#ef4444',
      green: '#22c55e',
    };
    return colors[color as keyof typeof colors] || '#6366f1';
  };

  const handleAddProject = (newProject: { name: string; description: string; documents: string[] }) => {
    const updatedProjects = [
      ...projectList,
      {
        id: String(projectList.length + 1),
        name: newProject.name,
        description: newProject.description,
        lastUpdated: new Date().toISOString().split('T')[0],
        documents: newProject.documents || [],
      },
    ];
    setProjectList(updatedProjects);
    setIsAddModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-md font-bold text-black">Projects</h2>
          <AddProjectButton onClick={() => setIsAddModalOpen(true)} />
        </div>

        <div className="sm:hidden space-y-4">
          {projectList.length === 0 ? (
            <div className="text-sm text-zinc-500 text-center">No projects</div>
          ) : (
            projectList.map((project) => <PrCard key={project.id} project={project} />)
          )}
        </div>

        <div className="hidden sm:block overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Last Updated</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-zinc-700">Documents</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {projectList.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-sm text-zinc-500">
                    No projects
                  </td>
                </tr>
              ) : (
                projectList.map((project) => <ProjectRow key={project.id} project={project} />)
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddProjectModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddProject} />
    </div>
  );
}