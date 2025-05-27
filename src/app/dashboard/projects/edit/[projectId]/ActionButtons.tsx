'use client';

import React from 'react';
import { FaSave, FaRocket, FaGlobe } from 'react-icons/fa';

interface ActionButtonsProps {
  onSave: () => void;
  onPublish: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onSave, onPublish }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={onSave}
        className="px-3 py-1 text-sm text-white bg-gray-300 rounded transition flex items-center"
      > Save
      </button>
      <button
        onClick={onPublish}
        className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 transition flex items-center"
      >   Deploy 
      </button>
    </div>
  );
};

export default ActionButtons;