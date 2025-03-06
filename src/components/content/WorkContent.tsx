// src/components/content/WorkContent.tsx
'use client';

import { useState } from 'react';
import { nodeContent } from '@/data/nodeContent';
import { projects } from '@/data/projects';
import TabSystem from '../shared/TabSystem';
import ProjectCard from './ProjectCard';

interface WorkContentProps {
  isMobile?: boolean;
}

const WorkContent = ({ isMobile = false }: WorkContentProps) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
  ];

  return (
    <TabSystem tabs={tabs} initialTabId="overview" isMobile={isMobile}>
      {(activeTabId) => (
        <>
          {activeTabId === 'overview' && (
            <div className="space-y-4">
              <div className="whitespace-pre-line mb-4">
                {nodeContent.work.content}
              </div>
              
              {/* Featured project */}
              {projects.length > 0 && (
                <div className="mt-6">
                  <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} text-green-400 mb-3`}>
                    Featured Project
                  </h3>
                  <ProjectCard project={projects[0]} isMobile={isMobile} />
                </div>
              )}
            </div>
          )}
          
          {activeTabId === 'projects' && (
            <div>
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                {projects.map(project => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    isMobile={isMobile} 
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </TabSystem>
  );
};

export default WorkContent;