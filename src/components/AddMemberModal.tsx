'use client';

import { useState } from 'react';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: { name: string; role: string; email: string; lastActive: string }) => void;
}

export default function AddMemberModal({ isOpen, onClose, onAdd }: AddMemberModalProps) {
  const [newMember, setNewMember] = useState({ name: "", role: "", email: "", lastActive: "" });
  const roleOptions = ["Developer", "Designer", "Manager", "Admin", "Support"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newMember);
    setNewMember({ name: "", role: "", email: "", lastActive: "" });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-transparent backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300"
      style={{ opacity: isOpen ? 1 : 0 }} // Fade in/out effect
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-md w-full transform transition-transform duration-300"
        style={{ transform: isOpen ? 'scale(1)' : 'scale(0.9)' }} // Scale up/down effect
        onClick={(e) => e.stopPropagation()} // Prevent click from bubbling to the background
      >
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Add New Member</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
            <input
              type="text"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="mt-1 p-2 w-full border rounded-lg dark:bg-slate-700 dark:text-slate-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Role</label>
            <select
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              className="mt-1 p-2 w-full border rounded-lg dark:bg-slate-700 dark:text-slate-200"
              required
            >
              <option value="" disabled>Select a role</option>
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input
              type="email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              className="mt-1 p-2 w-full border rounded-lg dark:bg-slate-700 dark:text-slate-200"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}