'use client';

import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { useState, useEffect } from 'react';

interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file';
  content?: string;
  children?: FileNode[];
  expanded?: boolean;
}

interface EditorProps {
  selectedFile: FileNode | null;
}

const Editor: React.FC<EditorProps> = ({ selectedFile }) => {
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    setContent(selectedFile?.content || '');
  }, [selectedFile]);

  if (!selectedFile) {
    return (
      <div className="w-3/4 p-4 overflow-y-auto bg-white min-h-[600px] mt-[-20px]">
        <div className="text-sm text-gray-500 text-center h-full flex items-center justify-center">
          Select a file to edit.
        </div>
      </div>
    );
  }

  return (
    <div className="w-3/4 p-4 overflow-y-auto bg-white min-h-[600px] mt-[-20px]">
      <div className="flex flex-col border border-gray-300 rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-2 bg-gray-50 border-b">
          <h3 className="text-sm font-medium text-gray-700">Editing: {selectedFile.name}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => alert(`Saved: ${content}`)}
              className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition"
            >
              Save
            </button>
            <button className="px-3 py-1 text-sm text-white bg-green-500 rounded hover:bg-green-600 transition">
              Publish
            </button>
          </div>
        </div>
        <div className="flex-1">
          <SimpleEditor
            content={content}
            onUpdate={({ editor }) => {
              setContent(editor.getHTML());
            }}
            className="p-4 prose prose-sm max-w-none" // Tailwind for clean text rendering
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;