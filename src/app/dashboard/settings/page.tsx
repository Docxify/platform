'use client';

import { useState, useEffect } from 'react';

export default function Settings() {
  // State for various settings
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [notificationFrequency, setNotificationFrequency] = useState('real-time');
  const [customDomain, setCustomDomain] = useState('');
  const [sortPreference, setSortPreference] = useState('name-asc');
  const [userName, setUserName] = useState('John Doe');
  const [userEmail, setUserEmail] = useState('john@example.com');
  const [accentColor, setAccentColor] = useState('indigo'); // Options: indigo, blue, red, green

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedEmailNotifications = localStorage.getItem('emailNotifications');
    const savedInAppNotifications = localStorage.getItem('inAppNotifications');
    const savedNotificationFrequency = localStorage.getItem('notificationFrequency');
    const savedDomain = localStorage.getItem('customDomain');
    const savedSort = localStorage.getItem('sortPreference');
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('userEmail');
    const savedAccent = localStorage.getItem('accentColor');

    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle('dark', prefersDark);
    }
    if (savedEmailNotifications) setEmailNotifications(savedEmailNotifications === 'true');
    if (savedInAppNotifications) setInAppNotifications(savedInAppNotifications === 'true');
    if (savedNotificationFrequency) setNotificationFrequency(savedNotificationFrequency);
    if (savedDomain) setCustomDomain(savedDomain);
    if (savedSort) setSortPreference(savedSort);
    if (savedName) setUserName(savedName);
    if (savedEmail) setUserEmail(savedEmail);
    if (savedAccent) setAccentColor(savedAccent);
  }, []);


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

  // Toggle in-app notifications and save
  const handleInAppNotificationsToggle = () => {
    const newValue = !inAppNotifications;
    setInAppNotifications(newValue);
    localStorage.setItem('inAppNotifications', newValue.toString());
  };

  // Handle notification frequency change
  const handleNotificationFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNotificationFrequency(e.target.value);
    localStorage.setItem('notificationFrequency', e.target.value);
  };

  // Handle custom domain input change
  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDomain(e.target.value);
  };

  // Handle sort preference change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortPreference(e.target.value);
    localStorage.setItem('sortPreference', e.target.value);
  };

  // Handle user name change
  const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  // Handle user email change
  const handleUserEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  // Handle accent color change
  const handleAccentColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccentColor(e.target.value);
    localStorage.setItem('accentColor', e.target.value);
    // Apply accent color to the document (simplified example)
    document.documentElement.style.setProperty('--accent-color', getAccentColor(e.target.value));
  };

  // Helper to get accent color values
  const getAccentColor = (color: string) => {
    const colors = {
      indigo: '#6366f1',
      blue: '#3b82f6',
      red: '#ef4444',
      green: '#22c55e',
    };
    return colors[color as keyof typeof colors] || '#6366f1';
  };

  // Save all settings
  const handleSaveSettings = () => {
    localStorage.setItem('customDomain', customDomain);
    localStorage.setItem('sortPreference', sortPreference);
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('accentColor', accentColor);
    alert('Settings saved successfully!');
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
      {/* Settings Header */}
      <div className="mb-8">
        <h2 className="text-md font-bold text-black dark:text-white">Settings</h2>
      </div>

      {/* Profile Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Profile</h3>
        <div className="border border-zinc-200 rounded-lg p-4 shadow-sm bg-white dark:bg-slate-800">
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-slate-300">Name</label>
            <input
              type="text"
              value={userName}
              onChange={handleUserNameChange}
              className="mt-1 text-xs p-2 w-full border rounded-lg dark:bg-slate-700 dark:text-slate-200"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-slate-300">Email</label>
            <input
              type="email"
              value={userEmail}
              onChange={handleUserEmailChange}
              className="mt-1 text-xs p-2 w-full border rounded-lg dark:bg-slate-700 dark:text-slate-200"
            />
          </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Appearance</h3>
        <div className="border border-zinc-200 rounded-lg p-4 shadow-sm bg-white dark:bg-slate-800">
          <div className="flex items-center justify-between mb-4">
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
      </div>

      {/* Domain Configuration */}
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

      {/* Sorting Preferences */}
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

      {/* Notification Settings */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Notifications</h3>
        <div className="border border-zinc-200 rounded-lg p-4 shadow-sm bg-white dark:bg-slate-800">
          <div className="flex items-center justify-between mb-4">
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
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-zinc-900 dark:text-slate-200">In-App Notifications</p>
              <p className="text-sm text-zinc-600 dark:text-slate-400">Receive in-app alerts for team activities</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={inAppNotifications}
                onChange={handleInAppNotificationsToggle}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-zinc-700 dark:text-slate-300">Notification Frequency</label>
            <select
              value={notificationFrequency}
              onChange={handleNotificationFrequencyChange}
              className="mt-1 p-2 w-full border text-xs rounded-lg dark:bg-slate-700 dark:text-slate-200"
            >
              <option value="real-time">Real-Time</option>
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Digest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8">
        <button
          onClick={handleSaveSettings}
          className="p-2 text-xs rounded-lg bg-blue-800 text-white"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}