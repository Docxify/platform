'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { Settings, User, Shield } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  lastUpdated?: string;
  documents?: string[];
  domain: string;
  status: 'Public' | 'Private' | 'In Progress' | 'Completed' | 'On Hold';
  contributors: string[];
}

const ProjectManagementPage = ({ params }: { params: Promise<{ projectId: string }> }) => {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>({
    id: '',
    name: '',
    description: '',
    domain: '',
    status: 'In Progress',
    contributors: [],
  });
  const [activeTab, setActiveTab] = useState('Branding');

  const tabs = [
    { name: 'Branding', icon: <Settings className="w-5 h-5" /> },
    { name: 'Permissions', icon: <Shield className="w-5 h-5" /> },
    { name: 'Contributors', icon: <User className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      console.log('Starting fetchProject');
      const resolvedParams = await params;
      console.log('Resolved params:', resolvedParams);
      const { projectId } = resolvedParams;
      if (!projectId) {
        console.log('No projectId in params, invoking notFound');
        notFound();
      }
      const initialProjects = [
        { id: '1', name: 'Website Redesign', description: 'Revamp company website', lastUpdated: '2025-05-18', documents: ['Design Spec', 'Wireframes'], domain: 'formbricks.com/docs', status: 'Public', contributors: ['John Doe', 'Jane Smith'] },
        { id: '2', name: 'API Integration', description: 'Integrate payment API', lastUpdated: '2025-05-17', documents: ['API Docs', 'Test Plan'], domain: 'formbricks.com/docs', status: 'Private', contributors: ['Alice Johnson'] },
      ];
      setProjectList(initialProjects);
      const project = initialProjects.find((p) => p.id === projectId);
      if (!project) {
        console.log('No project found for ID:', projectId, 'invoking notFound');
        notFound();
      }
      console.log('Setting project:', project);
      setSelectedProject(project);
      setFormData(project || formData);
      setLoading(false);
    };
    fetchProject().catch((error) => {
      console.error('Fetch error:', error);
      setLoading(false);
    });
  }, [params]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContributorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(',').map((c) => c.trim());
    setFormData((prev) => ({
      ...prev,
      contributors: value,
    }));
  };

  const handleSave = () => {
    if (selectedProject) {
      const updatedProjects = projectList.map((p) =>
        p.id === selectedProject.id ? { ...p, ...formData } : p
      );
      setProjectList(updatedProjects);
      setSelectedProject({ ...selectedProject, ...formData });
      alert(`Project Saved: ${JSON.stringify(formData, null, 2)}`);
    }
  };

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-sm text-zinc-500">Loading project...</p>
      </div>
    );
  }

  if (!selectedProject) {
    return (
      <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-sm text-zinc-500">Project not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center mb-5">
        <h2 className="text-md font-bold text-zinc-900">Project Management</h2>
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
        >
          Save
        </button>
      </header>

      {/* Card-like Container */}
      <div className="flex flex-col rounded-lg border border-zinc-200 bg-white p-6">
        {/* Tabs */}
        <div className="flex flex-wrap gap-6 border-b border-zinc-200 pb-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              className={`flex items-center gap-2 text-sm font-medium pb-2 border-b-2 transition-all duration-200 ${
                activeTab === tab.name
                  ? 'border-blue-800 text-zinc-900'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:border-blue-800/50'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'Branding' && (
          <div className="space-y-6">
            <div>
              <div className="text-sm text-zinc-500 mb-1">Project Name</div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-blue-800 text-zinc-900"
              />
            </div>
            <div>
              <div className="text-sm text-zinc-500 mb-1">Description</div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-blue-800 h-24 resize-y text-zinc-900"
              />
            </div>
            <div>
              <div className="text-sm text-zinc-500 mb-1">Domain</div>
              <input
                type="text"
                name="domain"
                value={formData.domain}
                onChange={handleInputChange}
                className="w-full p-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-blue-800 text-zinc-900"
              />
            </div>
            <div>
              <div className="text-sm text-zinc-500 mb-1">Status</div>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-blue-800 text-zinc-900"
              >
                <option value="In Progress">In Progress</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'Contributors' && (
          <div>
            <div className="text-sm text-zinc-500 mb-1">Contributors (comma-separated)</div>
            <input
              type="text"
              name="contributors"
              value={formData.contributors.join(', ')}
              onChange={handleContributorsChange}
              className="w-full p-2 border border-zinc-300 rounded-md focus:ring-2 focus:ring-blue-800 text-zinc-900"
              placeholder="e.g., User1, User2"
            />
          </div>
        )}

        {activeTab === 'Permissions' && (
          <div className="text-sm text-zinc-700">
            Permissions settings will be implemented here.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManagementPage;