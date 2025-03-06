// src/components/content/EssaysContent.tsx
'use client';

import { nodeContent } from '@/data/nodeContent';
import { essays, substackUrl } from '@/data/essays';
import TabSystem from '../shared/TabSystem';

interface EssaysContentProps {
  isMobile?: boolean;
}

const EssaysContent = ({ isMobile = false }: EssaysContentProps) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'essays', label: 'Essays' },
  ];

  return (
    <TabSystem tabs={tabs} initialTabId="overview" isMobile={isMobile}>
      {(activeTabId) => (
        <>
          {activeTabId === 'overview' && (
            <div className="space-y-4">
              <div className="whitespace-pre-line mb-4">
                {nodeContent.essays.content}
              </div>
              
              {/* Featured essay */}
              {essays.length > 0 && (
                <div className="mt-6">
                  <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} text-green-400 mb-3`}>
                    Featured Essay
                  </h3>
                  <div className="border border-green-500/30 bg-black/30 p-4 rounded-lg">
                    <h4 className={`${isMobile ? 'text-base' : 'text-lg'} text-green-400 mb-2`}>
                      {essays[0].title}
                    </h4>
                    <div className="text-xs text-green-300/70 mb-2">
                      {new Date(essays[0].publishedAt).toLocaleDateString()} 
                      {essays[0].category && ` • ${essays[0].category}`}
                    </div>
                    <p className="text-green-300 mb-3 line-clamp-3">{essays[0].excerpt}</p>
                    <a 
                      href={essays[0].substackUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 text-sm underline"
                    >
                      Read Full Essay →
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTabId === 'essays' && (
            <div>
              <div className="space-y-4">
                {essays.map(essay => (
                  <div 
                    key={essay.id} 
                    className="border border-green-500/30 bg-black/30 p-4 rounded-lg"
                  >
                    <h4 className={`${isMobile ? 'text-base' : 'text-lg'} text-green-400 mb-2`}>
                      {essay.title}
                    </h4>
                    <div className="text-xs text-green-300/70 mb-2">
                      {new Date(essay.publishedAt).toLocaleDateString()} 
                      {essay.category && ` • ${essay.category}`}
                    </div>
                    <p className="text-green-300 mb-3 line-clamp-2">{essay.excerpt}</p>
                    <a 
                      href={essay.substackUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 text-sm underline"
                    >
                      Read Full Essay →
                    </a>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <a 
                  href={substackUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-green-900/40 hover:bg-green-800/60 text-green-300 border border-green-500/40 rounded transition-colors text-sm"
                >
                  Subscribe to My Substack
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </TabSystem>
  );
};

export default EssaysContent;