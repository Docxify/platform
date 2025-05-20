'use client';

import { useState, useEffect } from 'react';
import AddProjectButton from '@/components/AddProjectButton';
import AddProjectModal from '@/components/AddProjectModal';
import PrCard from '@/components/PrCard';
import ProjectRow from '@/components/ProjectRow';
import Link from 'next/link';

interface Project {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  documents: string[];
  domain: string;
  status: 'Public' | 'Private' | 'In Progress' | 'Completed' | 'On Hold';
  contributors: string[];
}

interface ProjectsPageProps {
  projects?: Project[];
}

export default function Projects({ projects = [] }: ProjectsPageProps) {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const savedAccent = localStorage.getItem('accentColor') || 'indigo';
    document.documentElement.style.setProperty('--accent-color', getAccentColor(savedAccent));

    const initialProjects = projects.length
      ? [...projects]
      : [
          { id: '1', name: 'Website Redesign', description: 'Revamp company website', lastUpdated: '2025-05-18', documents: ['Design Spec', 'Wireframes'], domain: 'formbricks.com/docs', status: 'Public', contributors: ['John Doe', 'Jane Smith'] },
          { id: '2', name: 'API Integration', description: 'Integrate payment API', lastUpdated: '2025-05-17', documents: ['API Docs', 'Test Plan'], domain: 'formbricks.com/docs', status: 'Private', contributors: ['Alice Johnson'] },
        ];
    setProjectList(initialProjects);
  }, []);

  const getAccentColor = (color: string) => {
    const colors = {
      indigo: '#6366f1',
      blue: '#3b82f6',
      red: '#ef4444',
      green: '#22c55e',
    };
    return colors[color as keyof typeof colors] || '#6366f1';
  };

  const handleAddProject = (newProject: { name: string; description: string; documents: string[]; domain: string; status: 'Public' | 'Private' | 'In Progress' | 'Completed' | 'On Hold'; contributors: string[] }) => {
    const updatedProjects = [
      ...projectList,
      {
        id: String(projectList.length + 1),
        name: newProject.name,
        description: newProject.description,
        lastUpdated: new Date().toISOString().split('T')[0],
        documents: newProject.documents || [],
        domain: newProject.domain,
        status: newProject.status,
        contributors: newProject.contributors || [],
      },
    ];
    setProjectList(updatedProjects);
    setIsAddModalOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    const updatedProjects = projectList.filter((project) => project.id !== id);
    setProjectList(updatedProjects);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Public':
        return 'bg-green-500';
      case 'Private':
        return 'bg-gray-500';
      case 'In Progress':
        return 'bg-blue-500';
      case 'Completed':
        return 'bg-green-700';
      case 'On Hold':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-md font-bold text-zinc-900 dark:text-white">Projects</h2>
          <AddProjectButton onClick={() => setIsAddModalOpen(true)} />
        </div>

        <div className="space-y-8">
          {projectList.length === 0 ? (
            <div className="text-sm text-zinc-500 text-center dark:text-slate-400">No projects</div>
          ) : (
            projectList.map((project) => <PrCard key={project.id} project={project} onDelete={handleDeleteProject} getStatusColor={getStatusColor} />)
          )}
        </div>

       
      </div>

      <AddProjectModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={handleAddProject} />
    </div>
  );
}