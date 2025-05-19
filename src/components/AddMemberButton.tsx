'use client';

import { useState } from 'react';

interface AddMemberButtonProps {
  onClick: () => void;
}

export default function AddMemberButton({ onClick }: AddMemberButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg text-white bg-blue-800 dark:text-slate-300 transition-colors flex items-center gap-2"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <span className="text-xs font-medium">Add Member</span>
    </button>
  );
}