'use client';

import { useEffect, useState } from 'react';

export default function QuickActions() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
  };

  return (
    <div className="flex items-center gap-2 ml-auto">
      <button className="bg-blue-800 text-xs font-sans text-white px-2.5 py-1 rounded transition">
        + New Project
      </button>
      <button className="bg-gray-600 text-xs px-2.5 py-1 text-white rounded transition">
        Import
      </button>
      <button
        onClick={toggleTheme}
        className="ml-2 rounded p-2 transition"
        aria-label="Toggle Dark Mode"
      >
        {isDark ? (
          // Sun Icon
          <svg
            className="w-4 h-4 text-yellow-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m0-13.828l1.414 1.414M17.95 17.95l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
            />
          </svg>
        ) : (
          // Moon Icon
          <svg
            className="w-4 h-4 text-zinc-800"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
