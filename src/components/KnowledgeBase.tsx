'use client';

import { useState } from 'react';
import {
  Book,
  MessageSquare,
  Code,
  FileText,
  Package,
  BarChart2,
} from 'lucide-react';
import Image from 'next/image';

interface KnowledgeBaseProps {
  userName?: string;
  activeTabDefault?: string;
  onTabChange?: (tabName: string) => void;
}

const KnowledgeBase: React.FC<KnowledgeBaseProps> = ({
  userName = 'James',
  activeTabDefault = 'Guides',
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(activeTabDefault);

  const tabs = [
    { name: 'Guides', icon: <Book className="w-5 h-5" /> },
    { name: 'AI Chat', icon: <MessageSquare className="w-5 h-5" /> },
    { name: 'API Reference', icon: <Code className="w-5 h-5" /> },
    { name: 'Knowledge Base', icon: <FileText className="w-5 h-5" /> },
    { name: 'SDK Library', icon: <Package className="w-5 h-5" /> },
    { name: 'Changelog', icon: <BarChart2 className="w-5 h-5" /> },
  ];

  const imageMap: { [key: string]: string } = {
    'Guides': '/guides.png',
    'AI Chat': '/ai-chat.png',
    'API Reference': '/api-reference.png',
    'Knowledge Base': '/know.png',
    'SDK Library': '/sdk-library.png',
    'Changelog': '/changelog.png',
  };

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    if (onTabChange) onTabChange(tabName);
  };

  const currentImage = imageMap[activeTab] || '/guides.png';

  return (
    <div className="min-h-screen text-white">
      {/* Tabs */}
      <div className="max-w-6xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6 border-b border-gray-700 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => handleTabClick(tab.name)}
              className={`flex items-center gap-2 text-sm md:text-base font-medium pb-2 border-b-2 transition-all duration-200 ${
                activeTab === tab.name
                  ? 'border-white text-white'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-white/50'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Image */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
            <Image
              src={currentImage}
              alt={`Image for ${activeTab}`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
