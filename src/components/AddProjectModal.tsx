'use client';

import { useState } from 'react';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newProject: { name: string; description: string; documents: string[] }) => void;
}

export default function AddProjectModal({ isOpen, onClose, onAdd }: AddProjectModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [documents, setDocuments] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      name,
      description,
      documents: documents ? documents.split(',').map((doc) => doc.trim()) : [],
    };
    onAdd(newProject);
    setName('');
    setDescription('');
    setDocuments('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Add New Project</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-slate-300">Project Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-lg dark:bg-slate-700 dark:text-slate-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-slate-300">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 p-2 w-full border rounded-lg dark:bg-slate-700 dark:text-slate-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-slate-300">Documents (comma-separated)</label>
            <input
              type="text"
              value={documents}
              onChange={(e) => setDocuments(e.target.value)}
              placeholder="e.g., Doc1, Doc2"
              className="mt-1 p-2 w-full border rounded-lg dark:bg-slate-700 dark:text-slate-200"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="p-2 rounded-lg text-white"
              style={{ backgroundColor: 'var(--accent-color, #6366f1)' }}
            >
              Add Project
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-300 dark:bg-gray-600 text-black dark:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}