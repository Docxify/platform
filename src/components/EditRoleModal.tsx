'use client';

import { useState } from 'react';

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: { name: string; role: string; email: string; lastActive: string } | null;
  onEdit: (role: string) => void;
}

export default function EditRoleModal({ isOpen, onClose, member, onEdit }: EditRoleModalProps) {
  const [editedRole, setEditedRole] = useState(member?.role || "");
  const roleOptions = ["Developer", "Designer", "Manager", "Admin", "Support"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(editedRole);
  };

  if (!isOpen || !member) return null;

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
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Edit Role for {member.name}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Role</label>
            <select
              value={editedRole}
              onChange={(e) => setEditedRole(e.target.value)}
              className="mt-1 p-2 w-full border text-sm rounded-lg dark:bg-slate-700 dark:text-slate-200"
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
              Save Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}