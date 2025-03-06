// src/components/content/MusicContent.tsx
'use client';

import { nodeContent } from '@/data/nodeContent';
import { playlists } from '@/data/music';
import TabSystem from '../shared/TabSystem';
import MusicCard from './MusicCard';

interface MusicContentProps {
  isMobile?: boolean;
}

const MusicContent = ({ isMobile = false }: MusicContentProps) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'playlists', label: 'Playlists' },
  ];

  return (
    <TabSystem tabs={tabs} initialTabId="overview" isMobile={isMobile}>
      {(activeTabId) => (
        <>
          {activeTabId === 'overview' && (
            <div className="space-y-4">
              <div className="whitespace-pre-line mb-4">
                {nodeContent.music.content}
              </div>
              
              {/* Featured playlist */}
              {playlists.length > 0 && (
                <div className="mt-6">
                  <h3 className={`${isMobile ? 'text-lg' : 'text-xl'} text-green-400 mb-3`}>
                    Featured Playlist
                  </h3>
                  
                  <div className="p-4 border border-green-500/30 rounded-md bg-black/50 max-h-60">
                    <iframe
                      src={playlists[0].spotifyEmbedUrl}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allowTransparency={true}
                      allow="encrypted-media"
                      className="w-full h-full"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTabId === 'playlists' && (
            <div className="space-y-6">
              {playlists.map(playlist => (
                <div key={playlist.id} className="space-y-3">
                  <MusicCard playlist={playlist} isMobile={isMobile} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </TabSystem>
  );
};

export default MusicContent;