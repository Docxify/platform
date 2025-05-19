'use client';

interface EditRoleButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function EditRoleButton({ onClick, disabled = false }: EditRoleButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-1 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
  );
}