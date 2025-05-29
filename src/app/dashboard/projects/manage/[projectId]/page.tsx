'use client';

import React, { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { Settings, User, Shield, X, Search, Globe } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  lastUpdated?: string;
  documents?: string[];
  domain: string;
  status: 'Public' | 'Private' | 'In Progress' | 'Completed' | 'On Hold';
  contributors: string[];
  logo?: string;
  favicon?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  permissions?: { [contributor: string]: 'Admin' | 'Editor' | 'Viewer' };
  socialProfiles?: { twitter?: string; linkedin?: string; facebook?: string; youtube?: string };
  githubRepository?: string;
  website?: string;
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
    logo: '',
    favicon: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    permissions: {},
    socialProfiles: { twitter: '', linkedin: '', facebook: '', youtube: '' },
    githubRepository: '',
    website: '',
  });
  const [activeTab, setActiveTab] = useState('Branding');

  const tabs = [
    { name: 'Branding', icon: <Settings className="w-5 h-5" /> },
    { name: 'SEO Settings', icon: <Search className="w-5 h-5" /> },
    { name: 'Permissions', icon: <Shield className="w-5 h-5" /> },
    { name: 'Contributors', icon: <User className="w-5 h-5" /> },
    { name: 'Social Profiles', icon: <Globe className="w-5 h-5" /> },
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
        {
          id: '1',
          name: 'Website Redesign',
          description: 'Revamp company website',
          lastUpdated: '2025-05-18',
          documents: ['Design Spec', 'Wireframes'],
          domain: 'formbricks.com/docs',
          status: 'Public',
          contributors: ['John Doe', 'Jane Smith'],
          logo: '',
          favicon: '',
          metaTitle: '',
          metaDescription: '',
          keywords: '',
          permissions: { 'John Doe': 'Admin', 'Jane Smith': 'Editor' },
          socialProfiles: { twitter: '', linkedin: '', facebook: '', youtube: '' },
          githubRepository: '',
          website: '',
        },
        {
          id: '2',
          name: 'API Integration',
          description: 'Integrate payment API',
          lastUpdated: '2025-05-17',
          documents: ['API Docs', 'Test Plan'],
          domain: 'formbricks.com/docs',
          status: 'Private',
          contributors: ['Alice Johnson'],
          logo: '',
          favicon: '',
          metaTitle: '',
          metaDescription: '',
          keywords: '',
          permissions: { 'Alice Johnson': 'Admin' },
          socialProfiles: { twitter: '', linkedin: '', facebook: '', youtube: '' },
          githubRepository: '',
          website: '',
        },
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
    if (name.startsWith('socialProfiles.')) {
      const profileKey = name.split('.')[1] as keyof Project['socialProfiles'];
      setFormData((prev) => ({
        ...prev,
        socialProfiles: {
          ...prev.socialProfiles,
          [profileKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleContributorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(',').map((c) => c.trim());
    setFormData((prev) => ({
      ...prev,
      contributors: value,
      permissions: {
        ...prev.permissions,
        ...value.reduce((acc: { [key: string]: string }, contributor) => {
          if (!prev.permissions?.[contributor] && !Object.keys(acc).includes(contributor)) {
            acc[contributor] = 'Viewer';
          }
          return acc;
        }, {}),
      },
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'favicon') => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file (PNG, JPEG, etc.).');
        return;
      }
      if (field === 'favicon') {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
          if (img.width !== img.height || (img.width !== 16 && img.width !== 32)) {
            console.warn('Favicon should be 16x16 or 32x32 pixels for best results.');
          }
        };
      }
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          [field]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (field: 'logo' | 'favicon') => {
    setFormData((prev) => ({
      ...prev,
      [field]: '',
    }));
  };

  const handleRoleChange = (contributor: string, role: 'Admin' | 'Editor' | 'Viewer') => {
    setFormData((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [contributor]: role,
      },
    }));
  };

  const removeContributorAccess = (contributor: string) => {
    setFormData((prev) => {
      const newPermissions = { ...prev.permissions };
      delete newPermissions[contributor];
      return {
        ...prev,
        permissions: newPermissions,
      };
    });
  };

  const handleSave = () => {
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    const { socialProfiles, githubRepository, website } = formData;

    // Validate social profiles
    if (socialProfiles?.twitter && !urlRegex.test(socialProfiles.twitter)) {
      alert('Please enter a valid Twitter URL (https://twitter.com/username)');
      return;
    }
    if (socialProfiles?.linkedin && !urlRegex.test(socialProfiles.linkedin)) {
      alert('Please enter a valid LinkedIn URL (https://linkedin.com/in/username)');
      return;
    }
    if (socialProfiles?.facebook && !urlRegex.test(socialProfiles.facebook)) {
      alert('Please enter a valid Facebook URL (https://facebook.com/username)');
      return;
    }
    if (socialProfiles?.youtube && !urlRegex.test(socialProfiles.youtube)) {
      alert('Please enter a valid YouTube URL (https://youtube.com/@username)');
      return;
    }

    // Validate GitHub repository
    if (githubRepository && !urlRegex.test(githubRepository)) {
      alert('Please enter a valid GitHub repository URL (https://github.com/username/repo)');
      return;
    }

    // Validate website
    if (website && !urlRegex.test(website)) {
      alert('Please enter a valid website URL (https://example.com)');
      return;
    }

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
      <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl flex items-center justify-center min-h-screen">
        <p className="text-sm text-zinc-500">Loading project...</p>
      </div>
    );
  }

  if (!selectedProject) {
    return (
      <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl flex items-center justify-center min-h-screen">
        <p className="text-sm text-zinc-500">Project not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center mb-5">
        <h2 className="text-md font-bold text-zinc-900">Project Management</h2>
      </header>

      {/* Card-like Container */}
      <div className="flex flex-col rounded-lg bg-white p-6">
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
              <div className="text-sm text-zinc-500 mb-1 font-medium">Project Name</div>
              <div className="flex items-center overflow-hidden gap-2 w-full focus-within:border-transparent px-4 py-3 group ring-1 ring-slate-300 focus-within:ring-[1.5px] focus-within:ring-blue-600 rounded-xl">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full text-slate-600 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <div className="text-sm text-zinc-500 font-medium mb-1">Description</div>
              <div className="flex items-center overflow-hidden gap-2 w-full focus-within:border-transparent px-4 py-3 group ring-1 ring-slate-300 focus-within:ring-[1.5px] focus-within:ring-blue-600 rounded-xl">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full text-slate-600 placeholder-slate-400 focus:outline-none h-24 resize-y"
                />
              </div>
            </div>
            <div>
              <div className="text-sm text-zinc-500 font-medium mb-1">Domain</div>
              <div className="flex items-center overflow-hidden gap-2 w-full focus-within:border-transparent px-4 py-3 group ring-1 ring-slate-300 focus-within:ring-[1.5px] focus-within:ring-blue-600 rounded-xl">
                <input
                  type="text"
                  name="domain"
                  value={formData.domain}
                  onChange={handleInputChange}
                  className="w-full text-slate-600 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <div className="text-sm text-zinc-500 font-medium mb-1">Project Logo</div>
              {formData.logo ? (
                <div className="relative w-32 h-32">
                  <img
                    src={formData.logo}
                    alt="Project Logo"
                    className="w-full h-full object-contain rounded-md border border-zinc-300"
                  />
                  <button
                    onClick={() => removeImage('logo')}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-300 rounded-md cursor-pointer transition-colors duration-200">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-2 text-zinc-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16V8m0 0H3m4 0h4m6 0h4m-4 0v8m0 0h4m-4 0H7m10-8V4m0 16v4"
                      />
                    </svg>
                    <p className="text-sm text-zinc-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-zinc-400">PNG, JPEG (max 5MB)</p>
                  </div>
                  <input
                    type="file"
                    name="logo"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'logo')}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div>
              <div className="text-sm text-zinc-500 font-medium mb-1">Favicon</div>
              {formData.favicon ? (
                <div className="relative w-16 h-16">
                  <img
                    src={formData.favicon}
                    alt="Favicon"
                    className="w-full h-full object-contain rounded-md border border-zinc-300"
                  />
                  <button
                    onClick={() => removeImage('favicon')}
                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-zinc-300 rounded-md cursor-pointer hover:border-blue-800 transition-colors duration-200">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-6 h-6 mb-2 text-zinc-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16V8m0 0H3m4 0h4m6 0h4m-4 0v8m0 0h4m-4 0H7m10-8V4m0 16v4"
                      />
                    </svg>
                    <p className="text-sm text-zinc-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-zinc-400">PNG, JPEG (16x16 or 32x32 recommended)</p>
                  </div>
                  <input
                    type="file"
                    name="favicon"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'favicon')}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div>
              <div className="text-sm text-zinc-500 mb-1 font-medium">Status</div>
              <div className="flex items-center overflow-hidden gap-2 w-full focus-within:border-transparent px-4 py-3 group ring-1 ring-slate-300 focus-within:ring-[1.5px] focus-within:ring-blue-600 rounded-xl">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full text-slate-600 placeholder-slate-400 focus:outline-none"
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                  <option value="Completed">Completed</option>
                  <option value="On Hold">On Hold</option>
                </select>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        )}

        {activeTab === 'SEO Settings' && (
          <div className="space-y-6">
            <div>
              <div className="text-sm text-zinc-500 font-medium mb-1">Meta Title</div>
              <div className="flex items-center overflow-hidden gap-2 w-full focus-within:border-transparent px-4 py-3 group hover:bg-slate-50 ring-1 ring-slate-300 focus-within:ring-[1.5px] focus-within:ring-blue-600 rounded-xl">
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle || ''}
                  onChange={handleInputChange}
                  placeholder="Enter meta title (up to 60 characters)"
                  maxLength={60}
                  className="w-full text-slate-600 group-hover:bg-slate-50 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <div className="text-sm text-zinc-500 mb-1">Meta Description</div>
              <div className="flex items-center overflow-hidden gap-2 w-full focus-within:border-transparent px-4 py-3 group hover:bg-slate-50 ring-1 ring-slate-300 focus-within:ring-[1.5px] focus-within:ring-blue-600 rounded-xl">
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription || ''}
                  onChange={handleInputChange}
                  placeholder="Enter meta description (up to 160 characters)"
                  maxLength={160}
                  className="w-full text-slate-600 group-hover:bg-slate-50 placeholder-slate-400 focus:outline-none h-24 resize-y"
                />
              </div>
            </div>
            <div>
              <div className="text-sm font-medium text-zinc-500 mb-1">Keywords</div>
              <div className="flex items-center overflow-hidden gap-2 w-full focus-within:border-transparent px-4 py-3 group hover:bg-slate-50 ring-1 ring-slate-300 focus-within:ring-[1.5px] focus-within:ring-blue-600 rounded-xl">
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords || ''}
                  onChange={handleInputChange}
                  placeholder="Enter keywords (comma-separated)"
                  className="w-full text-slate-600 group-hover:bg-slate-50 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        )}

        {activeTab === 'Contributors' && (
          <div className="space-y-6">
            <div>
              <div className="text-sm text-zinc-500 mb-1">Contributors (comma-separated)</div>
              <div className="flex items-center overflow-hidden gap-2 w-full focus-within:border-transparent px-4 py-3 group hover:bg-slate-50 ring-1 ring-slate-300 focus-within:ring-[1.5px] focus-within:ring-blue-600 rounded-xl">
                <input
                  type="text"
                  name="contributors"
                  value={formData.contributors.join(', ')}
                  onChange={handleContributorsChange}
                  className="w-full text-slate-600 group-hover:bg-slate-50 placeholder-slate-400 focus:outline-none"
                  placeholder="e.g., User1, User2"
                />
              </div>
            </div>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        )}

        {activeTab === 'Permissions' && (
          <div className="space-y-6">
            <div>
              <div className="text-sm font-medium text-zinc-700 mb-4">Manage Access</div>
              {formData.contributors.length === 0 ? (
                <p className="text-sm text-zinc-500">No contributors added yet.</p>
              ) : (
                <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm">
                  <table className="min-w-full divide-y divide-zinc-200">
                    <thead className="bg-zinc-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-700 sm:px-6 sm:py-3 sm:text-sm">
                          Contributor
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-700 sm:px-6 sm:py-3 sm:text-sm">
                          Role
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-zinc-700 sm:px-6 sm:py-3 sm:text-sm">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {formData.contributors.map((contributor) => (
                        <tr
                          key={contributor}
                          className="hover:bg-zinc-50 cursor-pointer"
                        >
                          <td className="px-4 py-3 text-xs font-medium text-zinc-900 sm:px-6 sm:py-4 sm:text-sm">
                            {contributor}
                          </td>
                          <td className="px-4 py-3 text-xs text-zinc-600 sm:px-6 sm:py-4 sm:text-sm">
                            <div className="flex items-center overflow-hidden gap-2 w-full focus-within:border-transparent px-4 py-3 group hover:bg-slate-50 ring-1 ring-slate-300 focus-within:ring-[1.5px] focus-within:ring-blue-600 rounded-xl">
                              <select
                                value={formData.permissions?.[contributor] || 'Viewer'}
                                onChange={(e) =>
                                  handleRoleChange(
                                    contributor,
                                    e.target.value as 'Admin' | 'Editor' | 'Viewer'
                                  )
                                }
                                className="w-full text-slate-600 group-hover:bg-slate-50 placeholder-slate-400 focus:outline-none"
                              >
                                <option value="Admin">Admin</option>
                                <option value="Editor">Editor</option>
                                <option value="Viewer">Viewer</option>
                              </select>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-zinc-600 sm:px-6 sm:py-4 sm:text-sm">
                            <button
                              onClick={() => removeContributorAccess(contributor)}
                              className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        )}

        {activeTab === 'Social Profiles' && (
          <div className="space-y-6">
            <div>
              <div className="text-sm font-medium text-zinc-700 font-extrabold mb-4">Social Profiles & Links</div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-zinc-500 font-medium mb-1">X / Twitter URL</div>
                  <div className="flex items-center overflow-hidden gap-2 w-full focus-within:border-transparent px-4 py-3 group ring-1 ring-slate-300 focus-within:ring-[1.5px] focus-within:ring-blue-600 rounded-xl">
                    <input
                      type="text"
                      name="socialProfiles.twitter"
                      value={formData.socialProfiles?.twitter || ''}
                      onChange={handleInputChange}
                      placeholder="https://twitter.com/username"
                      className="w-full text-slate-600 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium mb-1">LinkedIn URL</div>
                  <div className="flex items-center overflow-hidden gap-2 w-full focus-within:border-transparent px-4 py-3 group ring-1 ring-slate-300 focus-within:ring-[1.5px] focus-within:ring-blue-600 rounded-xl">
                    <input
                      type="text"
                      name="socialProfiles.linkedin"
                      value={formData.socialProfiles?.linkedin || ''}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full text-slate-600 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium mb-1">YouTube URL</div>
                  <div className="flex items-center overflow-hidden gap-2 w-full focus-within:border-transparent px-4 py-3 group ring-1 ring-slate-300 focus-within:ring-[1.5px] focus-within:ring-blue-600 rounded-xl">
                    <input
                      type="text"
                      name="socialProfiles.youtube"
                      value={formData.socialProfiles?.youtube || ''}
                      onChange={handleInputChange}
                      placeholder="https://youtube.com/@username"
                      className="w-full text-slate-600 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium mb-1">Facebook URL</div>
                  <div className="flex items-center overflow-hidden gap-2 w-full focus-within:border-transparent px-4 py-3 group ring-1 ring-slate-300 focus-within:ring-[1.5px] focus-within:ring-blue-600 rounded-xl">
                    <input
                      type="text"
                      name="socialProfiles.facebook"
                      value={formData.socialProfiles?.facebook || ''}
                      onChange={handleInputChange}
                      placeholder="https://facebook.com/username"
                      className="w-full text-slate-600 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium mb-1">GitHub Repository URL</div>
                  <div className="flex items-center overflow-hidden gap-2 w-full focus-within:border-transparent px-4 py-3 group ring-1 ring-slate-300 focus-within:ring-[1.5px] focus-within:ring-blue-600 rounded-xl">
                    <input
                      type="text"
                      name="githubRepository"
                      value={formData.githubRepository || ''}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username/repo"
                      className="w-full text-slate-600 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm text-zinc-500 font-medium mb-1">Website URL</div>
                  <div className="flex items-center overflow-hidden gap-2 w-full focus-within:border-transparent px-4 py-3 group ring-1 ring-slate-300 focus-within:ring-[1.5px] focus-within:ring-blue-600 rounded-xl">
                    <input
                      type="text"
                      name="website"
                      value={formData.website || ''}
                      onChange={handleInputChange}
                      placeholder="https://example.com"
                      className="w-full text-slate-600 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManagementPage;