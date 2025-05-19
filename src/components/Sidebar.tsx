'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);

  return (
    <>
      {/* Hamburger Menu Button for Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        onClick={toggleMobileSidebar}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`flex w-275 flex-col bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-lg fixed md:static inset-y-0 left-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20 min-w-20' : 'w-64 min-w-64'
        } ${isMobileOpen ? 'w-screen min-w-screen' : 'w-0 md:w-auto'} ${
          isMobileOpen ? 'opacity-100' : 'opacity-0 md:opacity-100'
        } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} z-40 bg-red-500`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <div className={`flex items-center gap-2 ${isCollapsed ? 'hidden' : 'flex'}`}>
            <img src="/docxify.png" alt="Docxify Logo" className="w-8 h-8 object-contain" />
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-0.5">
            {/* Projects */}
            <li>
              <Link href="/formbricks/formbricks">
                <button className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-700 transition-colors ${
                  isCollapsed ? 'justify-center' : ''
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  {!isCollapsed && <span className="text-xs font-medium">Overview</span>}
                </button>
              </Link>
            </li>

            {/* Team */}
            <li>
              <button className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-700 transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {!isCollapsed && <span className="text-xs font-medium">Team</span>}
              </button>
            </li>

            {/* Settings */}
            <li>
              <button className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-700 transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {!isCollapsed && <span className="text-xs font-medium">Settings</span>}
              </button>
            </li>

            {/* Help */}
            <li>
              <Link href="/formbricks/formbricks/products/chat">
                <button className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-700 transition-colors ${
                  isCollapsed ? 'justify-center' : ''
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  {!isCollapsed && <span className="text-xs font-medium">Support</span>}
                </button>
              </Link>
            </li>

            {/* Docs and Logout at Bottom */}
            <li className="mt-auto">
              <Link href="https://mintlify.com/docs" target="_blank">
                <button className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-700 transition-colors ${
                  isCollapsed ? 'justify-center' : ''
                }`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13v-2m0 2v2m0-2h-2m2 0h2" />
                  </svg>
                  {!isCollapsed && <span className="text-xs font-medium">Projects</span>}
                </button>
              </Link>
            </li>
            <li>
              <button className={`w-full flex items-center gap-3 p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-700 dark:text-gray-300 hover:text-red-700 transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {!isCollapsed && <span className="text-xs font-medium">Logout</span>}
              </button>
            </li>
          </ul>
        </nav>

        {/* Close Button for Mobile */}
        <button
          className={`md:hidden fixed top-4 right-4 z-50 p-2 bg-slate-50 dark:bg-slate-900 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${!isMobileOpen ? 'hidden' : ''}`}
          onClick={toggleMobileSidebar}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Overlay for Mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileSidebar}
        ></div>
      )}
    </>
  );
}