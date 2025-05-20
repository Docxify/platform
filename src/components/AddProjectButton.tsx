'use client';

import { useState } from 'react';

interface AddProjectButtonProps {
  onClick: () => void;
}

export default function AddProjectButton({ onClick }: AddProjectButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg text-sm text-white bg-blue-800 hover:opacity-90"
    >
      Create Project
    </button>
  );
}