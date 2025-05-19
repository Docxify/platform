'use client';

import { useState } from 'react';

interface AddProjectButtonProps {
  onClick: () => void;
}

export default function AddProjectButton({ onClick }: AddProjectButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg text-white hover:opacity-90"
      style={{ backgroundColor: 'var(--accent-color, #6366f1)' }}
    >
      Add Project
    </button>
  );
}