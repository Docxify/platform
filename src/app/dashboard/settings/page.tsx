'use client';

import { useState, useEffect } from 'react';

export default function Settings() {
  // State for dark mode, notifications, custom domain, and sort preference
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [customDomain, setCustomDomain] = useState('');
  const [sortPreference, setSortPreference] = useState('name-asc'); // Options: name-asc, name-desc, date-asc, date-desc

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedNotifications = localStorage.getItem('emailNotifications');
    const savedDomain = localStorage.getItem('customDomain');
    const savedSort = localStorage.getItem('sortPreference');

    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
    if (savedNotifications) setEmailNotifications(savedNotifications === 'true');
    if (savedDomain) setCustomDomain(savedDomain);
    if (savedSort) setSortPreference(savedSort);
  }, []);

  // Toggle dark mode and save to localStorage
  const handleDarkModeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Toggle email notifications and save
  const handleEmailNotificationsToggle = () => {
    const newValue = !emailNotifications;
    setEmailNotifications(newValue);
    localStorage.setItem('emailNotifications', newValue.toString());
  };

  // Handle custom domain input change
  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDomain(e.target.value);
  };

  // Handle sort preference change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortPreference(e.target.value);
  };

  // Save all settings
  const handleSaveSettings = () => {
    localStorage.setItem('customDomain', customDomain);
    localStorage.setItem('sortPreference', sortPreference);
    alert('Settings saved successfully!');
    // Note: For actual domain configuration, you’d need to sync with Vercel API or redirect to Vercel dashboard
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
      {/* Settings Header */}
      <div className="mb-8">
        <h2 className="text-md font-bold text-black dark:text-white">Settings</h2>
      </div>

      {/* Appearance Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Appearance</h3>
        <div className="flex items-center justify-between border border-zinc-200 rounded-lg p-4 shadow-sm bg-white dark:bg-slate-800">
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-slate-200">Dark Mode</p>
            <p className="text-sm text-zinc-600 dark:text-slate-400">Switch between light and dark themes</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={handleDarkModeToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>

      {/* Domain Configuration Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Domain Configuration</h3>
        <div className="border border-zinc-200 rounded-lg p-4 shadow-sm bg-white dark:bg-slate-800">
          <p className="text-sm text-zinc-600 dark:text-slate-400 mb-2">Enter your custom domain (e.g., example.com). Configure DNS settings in your Vercel dashboard.</p>
          <input
            type="text"
            value={customDomain}
            onChange={handleDomainChange}
            placeholder="e.g., example.com"
            className="mt-1 text-xs p-2 w-full border rounded-lg dark:bg-slate-700 dark:text-slate-200"
          />
        </div>
      </div>

      {/* Sorting Preferences Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Sorting Preferences</h3>
        <div className="border border-zinc-200 rounded-lg p-4 shadow-sm bg-white dark:bg-slate-800">
          <p className="text-sm text-zinc-600 dark:text-slate-400 mb-2">Choose how to sort team members or activities</p>
          <select
            value={sortPreference}
            onChange={handleSortChange}
            className="mt-1 p-2 text-xs w-full border rounded-lg dark:bg-slate-700 dark:text-slate-200"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="date-desc">Date (Newest First)</option>
          </select>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Notifications</h3>
        <div className="flex items-center justify-between border border-zinc-200 rounded-lg p-4 shadow-sm bg-white dark:bg-slate-800">
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-slate-200">Email Notifications</p>
            <p className="text-sm text-zinc-600 dark:text-slate-400">Receive email updates for team activities</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={handleEmailNotificationsToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8">
        <button
          onClick={handleSaveSettings}
          className="p-2 text-sm rounded-lg bg-blue-800 text-white hover:bg-indigo-700"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}