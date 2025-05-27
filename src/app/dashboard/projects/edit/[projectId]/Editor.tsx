'use client';

import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor';
import { useState, useEffect } from 'react';

interface EditorProps {
  initialContent: string;
}

const Editor: React.FC<EditorProps> = ({ initialContent }) => {
  const [content, setContent] = useState<string>(initialContent);

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  return (
    <div className="h-full bg-white">
      <div className="flex flex-col h-full border border-gray-200 rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-3 bg-gray-50 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800">
            {initialContent ? 'Editing: contribution.mdx' : 'Select a file to edit'}
          </h3>
          <button
            onClick={() => alert(`Saved: ${content}`)}
            className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition shadow-sm"
          >
            Save
          </button>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <SimpleEditor
            content={content}
            onUpdate={({ editor }) => {
              setContent(editor.getHTML());
            }}
            className="prose prose-sm max-w-none h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;