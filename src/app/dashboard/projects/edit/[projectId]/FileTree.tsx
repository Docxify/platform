'use client';

import React, { useState } from 'react';
import { FaFolder, FaFile } from 'react-icons/fa';
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from 'react-icons/md';

interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  content?: string;
  children?: FileNode[];
  expanded?: boolean;
}

interface FileTreeProps {
  initialFileStructure: FileNode[];
  onSelectFile: (file: FileNode | null) => void;
}

const FileTree: React.FC<FileTreeProps> = ({ initialFileStructure, onSelectFile }) => {
  const [fileStructure, setFileStructure] = useState<FileNode[]>(initialFileStructure);

  const toggleExpand = (id: string) => {
    const toggleNode = (nodes: FileNode[]): FileNode[] =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, expanded: !node.expanded }
          : node.type === 'folder' && node.children
            ? { ...node, children: toggleNode(node.children) }
            : node
      );
    setFileStructure(toggleNode(fileStructure));
  };

  const renderFileNode = (
    node: FileNode,
    depth: number,
    index: number,
    onSelectFile: (file: FileNode | null) => void,
    toggleExpand: (id: string) => void
  ) => {
    return (
      <div
        key={node.id}
        className="text-sm text-gray-700 hover:bg-gray-100 rounded px-2 py-1"
        style={{ paddingLeft: `${depth * 16}px` }}
      >
        <div
          onClick={() => (node.type === 'file' ? onSelectFile(node) : toggleExpand(node.id))}
          className="flex items-center cursor-pointer"
        >
          {node.type === 'folder' && (
            <>
              {node.expanded ? (
                <MdKeyboardArrowDown className="mr-1 w-4 h-4" />
              ) : (
                <MdKeyboardArrowRight className="mr-1 w-4 h-4" />
              )}
              <FaFolder className="mr-1 w-4 text-gray-500" />
            </>
          )}
          {node.type === 'file' && <FaFile className="mr-1 w-4 h-4 text-gray-500" />}
          {node.name}
        </div>
        {node.type === 'folder' && node.expanded && node.children && (
          <div className="ml-4">
            {node.children.map((child, childIndex) =>
              renderFileNode(child, depth + 1, childIndex, onSelectFile, toggleExpand)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-1/4 bg-white border-r p-2 overflow-y-auto">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Files</h3>
      <div className="space-y-1">
        {fileStructure.map((node, index) =>
          node.type === 'folder' && node.children
            ? renderFileNode(node, 0, index, onSelectFile, toggleExpand)
            : null
        )}
      </div>
    </div>
  );
};

export default FileTree;