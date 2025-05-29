'use client';

import React, { useState, useEffect } from 'react';
import FileTree from './FileTree';
import Editor from './Editor';
import { notFound } from 'next/navigation';

interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  content?: string;
  children?: FileNode[];
  expanded?: boolean;
}

interface Project {
  id: string;
  name: string;
  description: string;
  lastUpdated: string;
  documents: string[];
  domain: string;
  status: 'Public' | 'Private' | 'In Progress' | 'Completed' | 'On Hold';
  contributors: string[];
  fileStructure: FileNode[];
}

async function getProject(projectId: string): Promise<Project | null> {
  const projects: Project[] = [
    {
      id: '1',
      name: 'Test Project',
      description: 'Test project for debugging',
      lastUpdated: '2025-05-25',
      documents: ['Test Doc'],
      domain: 'formbricks.com/docs',
      status: 'In Progress',
      contributors: ['Test User'],
      fileStructure: [
        {
          id: 'root',
          name: 'root',
          type: 'folder',
          expanded: true,
          children: [
            {
              id: 'docs',
              name: 'docs',
              type: 'folder',
              expanded: true,
              children: [
                {
                  id: 'contribution',
                  name: 'contribution.mdx',
                  type: 'file',
                  content: `
# Contributing to Formbricks

Thank you for considering contributing to Formbricks! We welcome contributions from everyone. Here’s how you can contribute to our project.

## Getting Started

To get started, follow these steps:

- **Fork the Repository**: Fork the Formbricks repository on GitHub.
- **Clone Your Fork**: Clone your forked repository to your local machine.
- **Set Up the Project**: Follow the setup instructions in the README to install dependencies and run the project locally.

## Contributing Code

When contributing code, please adhere to the following guidelines:

- **Follow the Code Style**: Ensure your code follows our coding standards (e.g., Prettier, ESLint).
- **Write Tests**: Add tests for new features or bug fixes.
- **Create a Pull Request**: Submit a pull request with a clear description of your changes.

## Reporting Bugs

If you find a bug, please report it by opening an issue on GitHub. Include the following details:

- A clear description of the bug.
- Steps to reproduce the bug.
- Expected behavior and actual behavior.
`,
                },
              ],
            },
            {
              id: 'assets',
              name: 'assets',
              type: 'folder',
              expanded: false,
              children: [],
            },
          ],
        },
      ],
    },
  ];
  const foundProject = projects.find((p) => p.id === projectId);
  return foundProject || null;
}

export default function EditorPage({ params }: { params: Promise<{ projectId: string }> }) {
  const [project, setProject] = useState<Project | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(25); // Controlled by FileTree
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      const { projectId } = await params;
      const data = await getProject(projectId);
      if (!data) {
        notFound();
      }
      setProject(data);
    };
    fetchProject();
  }, [params]);

  if (!project) {
    return null; // Loading state or not found handled by notFound()
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-semibold text-gray-800">main</span>
          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            ✓ Updated 4 hours ago
          </span>
        </div>
        <button className="px-4 py-1.5 text-sm font-medium text-white bg-blue-800 rounded-md transition shadow-sm">
          Save Changes
        </button>
        <button className="px-4 py-1.5 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition shadow-sm">
          Publish
        </button>
      </header>

      {/* Main Content with Resizable Panels */}
      <div className="flex flex-1 overflow-hidden">
        {/* FileTree */}
        <div style={{ width: `${sidebarWidth}%` }} className="bg-white p-3 overflow-y-auto shadow-sm border-r border-gray-200">
          <FileTree
            initialFileStructure={project.fileStructure}
            onFileSelect={setSelectedFile}
            onWidthChange={setSidebarWidth}
          />
        </div>

        {/* Editor */}
        <div
          style={{ width: `${100 - sidebarWidth}%` }}
          className="p-4 overflow-y-auto bg-gray-50"
        >
          <Editor initialContent={selectedFile?.content || ''} />
        </div>
      </div>
    </div>
  );
}