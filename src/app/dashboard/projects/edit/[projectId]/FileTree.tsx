'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  onFileSelect: (file: FileNode | null) => void;
  onWidthChange: (width: number) => void; // Callback to update parent width
}

const FileTree: React.FC<FileTreeProps> = ({ initialFileStructure, onFileSelect, onWidthChange }) => {
  const [fileStructure, setFileStructure] = useState<FileNode[]>(initialFileStructure);
  const [sidebarWidth, setSidebarWidth] = useState(15); // Reduced default width
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

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
    toggleExpand: (id: string) => void
  ) => {
    return (
      <div
        key={node.id}
        className="text-sm text-gray-700 rounded px-2 py-1.5 transition-colors duration-150"
        style={{ paddingLeft: `${depth * 20}px` }}
      >
        <div
          onClick={() => {
            if (node.type === 'file') {
              onFileSelect(node);
            } else {
              toggleExpand(node.id);
            }
          }}
          className="flex items-center cursor-pointer space-x-1"
        >
          {node.type === 'folder' && (
            <>
              {node.expanded ? (
                <MdKeyboardArrowDown className="w-4 h-4 text-gray-500" />
              ) : (
                <MdKeyboardArrowRight className="w-4 h-4 text-gray-500" />
              )}
              <FaFolder className="w-4 h-4 text-blue-500" />
            </>
          )}
          {node.type === 'file' && <FaFile className="w-4 h-4 text-gray-500" />}
          <span className="truncate">{node.name}</span>
        </div>
        {node.type === 'folder' && node.expanded && node.children && (
          <div className="ml-4">
            {node.children.map((child, childIndex) =>
              renderFileNode(child, depth + 1, childIndex, toggleExpand)
            )}
          </div>
        )}
      </div>
    );
  };

  // Handle drag events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        console.log('Mouse Move:', e.clientX); // Debug log
        const windowWidth = window.innerWidth;
        const newWidth = (e.clientX / window.innerWidth) * 100; // Use window.innerWidth directly
        const constrainedWidth = Math.max(10, Math.min(40, newWidth));
        setSidebarWidth(constrainedWidth);
        onWidthChange(constrainedWidth); // Notify parent
        console.log('New Width Set:', constrainedWidth); // Debug log
      }
    };

    const handleMouseUp = () => {
      console.log('Mouse Up'); // Debug log
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onWidthChange]);

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('Mouse Down, Ref:', dragRef.current); // Debug log
    if (dragRef.current) {
      e.preventDefault(); // Prevent default behavior
      setIsDragging(true);
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">Files</h3>
      <div className="space-y-0.5 flex-1 overflow-y-auto">
        {fileStructure.map((node, index) =>
          node.type === 'folder' && node.children
            ? renderFileNode(node, 0, index, toggleExpand)
            : null
        )}
      </div>
      <div
        ref={dragRef}
        className="w-1.5 bg-gray-200 cursor-col-resize transition-all duration-200 hover:bg-gray-300 absolute right-0 top-0 bottom-0 z-10"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default FileTree;