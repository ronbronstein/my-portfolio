// src/components/content/StickersContent.tsx
'use client';

import { nodeContent } from '@/data/nodeContent';
import { stickers, shopUrl } from '@/data/stickers';
import TabSystem from '../shared/TabSystem';

interface StickersContentProps {
  isMobile?: boolean;
}

const StickersContent = ({ isMobile = false }: StickersContentProps) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'stickers', label: 'Stickers' },
  ];

  return (
    <TabSystem tabs={tabs} initialTabId="overview" isMobile={isMobile}>
      {(activeTabId) => (
        <>
          {activeTabId === 'overview' && (
            <div className="space-y-4">
              <div className="whitespace-pre-line mb-4">
                {nodeContent.stickers.content}
              </div>
              
              {/* Featured sticker */}
              {stickers.length > 0 && (
                <div className="mt-6">
                  <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} text-green-400 mb-3`}>
                    Featured Sticker
                  </h3>
                  <div className="border border-green-500/30 bg-black/30 p-4 rounded-lg">
                    <h4 className={`${isMobile ? 'text-base' : 'text-lg'} text-green-400 mb-2`}>
                      {stickers[0].title}
                    </h4>
                    <p className="text-green-300 mb-3 line-clamp-2">{stickers[0].description}</p>
                    {stickers[0].shopUrl && (
                      <a 
                        href={stickers[0].shopUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 text-sm underline"
                      >
                        View in Shop →
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTabId === 'stickers' && (
            <div>
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-2 gap-4'}`}>
                {stickers.map(sticker => (
                  <div 
                    key={sticker.id} 
                    className="border border-green-500/30 bg-black/30 p-4 rounded-lg"
                  >
                    <h4 className={`${isMobile ? 'text-base' : 'text-lg'} text-green-400 mb-2`}>
                      {sticker.title}
                    </h4>
                    <p className="text-green-300 mb-3 line-clamp-2">{sticker.description}</p>
                    {sticker.shopUrl && (
                      <a 
                        href={sticker.shopUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 text-sm underline"
                      >
                        View in Shop →
                      </a>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <a 
                  href={shopUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-green-900/40 hover:bg-green-800/60 text-green-300 border border-green-500/40 rounded transition-colors text-sm"
                >
                  Visit Full Sticker Shop
                </a>
              </div>
            </div>
          )}
        </>
      )}
    </TabSystem>
  );
};

export default StickersContent;
