'use client';

import React from 'react';

export default function DocsStatusCard() {
  return (
    <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl">
      <h2 className="text-md font-bold mb-5">Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        {/* CARD 1 */}
        <div className="flex flex-col rounded-lg border border-zinc-200 bg-white active:border-purple-200 p-6">
          {/* Status */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            <span className="text-sm font-medium text-zinc-700">Project Status: Public</span>
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
            <span>Last updated</span>
            <span className="text-zinc-900 font-semibold">13 hours ago</span>
          </div>

          {/* Domain */}
          <div className="mb-4 text-sm">
            <div className="text-zinc-500 mb-1">Domain</div>
            <div className="text-zinc-900 font-semibold">formbricks.com/docs</div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-auto">
            <button
              className="p-2 bg-zinc-100 rounded-md"
              aria-label="Duplicate document"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5h7.5a2.25 2.25 0 012.25 2.25v11.25a2.25 2.25 0 01-2.25 2.25H8.25a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 9.75h7.5" />
              </svg>
            </button>

            <button
              className="p-2 bg-zinc-100 rounded-md"
              aria-label="Refresh"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.24a5.25 5.25 0 10-7.19 7.19M4.5 12a7.5 7.5 0 0112.318-5.51M19.5 12a7.5 7.5 0 01-12.318 5.51" />
              </svg>
            </button>

            <a
              href="https://formbricks.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-800 text-white text-sm font-medium rounded-md"
            >
              Visit docs
            </a>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="flex flex-col rounded-lg border border-zinc-200 bg-white active:border-purple-200 p-6">
          {/* Status */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 bg-gray-500 rounded-full"></span>
            <span className="text-sm font-medium text-zinc-700">Project Status: Private</span>
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
            <span>Last updated</span>
            <span className="text-zinc-900 font-semibold">5 hours ago</span>
          </div>

          {/* Domain */}
          <div className="mb-4 text-sm">
            <div className="text-zinc-500 mb-1">Domain</div>
            <div className="text-zinc-900 font-semibold">formbricks.com/docs</div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-auto">
            <button
              className="p-2 bg-zinc-100 rounded-md"
              aria-label="Duplicate document"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 4.5h7.5a2.25 2.25 0 012.25 2.25v11.25a2.25 2.25 0 01-2.25 2.25H8.25a2.25 2.25 0 01-2.25-2.25V6.75a2.25 2.25 0 012.25-2.25z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 9.75h7.5" />
              </svg>
            </button>

            <button
              className="p-2 bg-zinc-100 rounded-md"
              aria-label="Refresh"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.24a5.25 5.25 0 10-7.19 7.19M4.5 12a7.5 7.5 0 0112.318-5.51M19.5 12a7.5 7.5 0 01-12.318 5.51" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
