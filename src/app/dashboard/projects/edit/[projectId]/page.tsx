'use client';

import React, { useState } from 'react';
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

const EditorWrapper: React.FC<{ initialProject: Project }> = ({ initialProject }) => {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  return (
    <div className="flex flex-1 overflow-hidden">
      <FileTree
        initialFileStructure={initialProject.fileStructure}
        onSelectFile={setSelectedFile}
      />
      <Editor selectedFile={selectedFile} />
    </div>
  );
};

export default async function EditorPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = await getProject(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between p-2 bg-white border-b shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600">main</span>
          <span className="text-xs text-green-600">✓ Updated 4 hours ago</span>
        </div>
      </header>

      {/* Main Content */}
      <EditorWrapper initialProject={project} />
    </div>
  );
}