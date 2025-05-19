'use client';

import QuickActions from '@/components/QuickActions';
import ProjectCard from '@/components/ProjectCard';
import ActivityFeed from '@/components/ActivityFeed';
import ProjectDash from '@/components/ProjectDash';
import Sidebar from '@/components/Sidebar';

export default function DashboardPage() {
  
  const projects = [
    {
      title: 'API Docs',
      pageCount: 12,
      lastUpdated: '2 days ago',
      isPublic: true,
      url: 'example.docxify.com',
    },
    {
      title: 'Internal Handbook',
      pageCount: 8,
      lastUpdated: '4 days ago',
      isPublic: false,
      url: 'example.docxify.com',
    },
  ];

  const activities = [
    {
      doc: 'Authentication Guide',
      project: 'API Docs',
      change: 'Updated Introduction section',  // <-- Add this
      time: '3 hours ago',
      url: 'example.docxify.com',
    },
    {
      doc: 'Welcome Page',
      project: 'Internal Handbook',
      change: 'Fixed typos',  // <-- Add this
      time: 'Yesterday',
      url: 'example.docxify.com',
    },
  ];

  
  return (
    <>
    
<div className="font-sans bg-white dark:bg-zinc-900 min-h-screen text-black dark:text-white">
    <div className="flex w-full items-center ">

      <QuickActions />
      </div>
     
      <section>
        <div className="">
    
            <ProjectCard  />
            <ProjectDash />
        </div>
      </section>
      <ActivityFeed items={activities} />
      </div>
    </>
  );
}
