'use client';

import { useState } from 'react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newProject: { name: string; description: string; documents: string[]; domain: string; status: 'Public' | 'Private' | 'In Progress' | 'Completed' | 'On Hold'; contributors: string[] }) => void;
}

export default function AddProjectModal({ isOpen, onClose, onAdd }: AddProjectModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('');
  const [status, setStatus] = useState<'Public' | 'Private' | 'In Progress' | 'Completed' | 'On Hold'>('In Progress');
  const [contributors, setContributors] = useState('');
  const [documents, setDocuments] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      name,
      description,
      domain,
      status,
      contributors: contributors ? contributors.split(',').map((c) => c.trim()) : [],
      documents: documents ? documents.split(',').map((doc) => doc.trim()) : [],
    };
    onAdd(newProject);
    setName('');
    setDescription('');
    setDomain('');
    setStatus('In Progress');
    setContributors('');
    setDocuments('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-md font-bold text-zinc-900 mb-4">Add New Project</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 text-sm p-2 w-full border border-zinc-200 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 text-sm p-2 w-full border border-zinc-200 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">Domain</label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g., formbricks.com/docs"
              className="mt-1 text-sm p-2 w-full border border-zinc-200 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'Public' | 'Private' | 'In Progress' | 'Completed' | 'On Hold')}
              className="mt-1 text-sm p-2 w-full border border-zinc-200 rounded-lg"
            >
              <option value="In Progress">In Progress</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">Contributors (comma-separated)</label>
            <input
              type="text"
              value={contributors}
              onChange={(e) => setContributors(e.target.value)}
              placeholder="e.g., John Doe, Jane Smith"
              className="mt-1 text-sm p-2 w-full border border-zinc-200 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700">Documents (comma-separated)</label>
            <input
              type="text"
              value={documents}
              onChange={(e) => setDocuments(e.target.value)}
              placeholder="e.g., Doc1, Doc2"
              className="mt-1 text-sm p-2 w-full border border-zinc-200 rounded-lg"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 text-sm font-medium bg-blue-800 text-white rounded-md hover:bg-blue-900">
              Add Project
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium bg-zinc-100 rounded-md hover:bg-zinc-200 text-zinc-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}