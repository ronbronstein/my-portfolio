// src/components/content/MusicCard.tsx
'use client';

import { Playlist } from '@/data/music';

interface MusicCardProps {
  playlist: Playlist;
  isMobile?: boolean;
}

const MusicCard = ({ playlist, isMobile = false }: MusicCardProps) => {
  const { title, description, spotifyEmbedUrl, genre, mood } = playlist;

  return (
    <div className="border border-green-500/30 bg-black/30 p-4 rounded-lg">
      <h4 className={`${isMobile ? 'text-base' : 'text-lg'} text-green-400 mb-2`}>{title}</h4>
      <div className="flex gap-2 mb-2">
        {genre && (
          <span className="px-2 py-1 text-xs bg-green-900/30 text-green-300 rounded-full">
            {genre}
          </span>
        )}
        {mood && (
          <span className="px-2 py-1 text-xs bg-green-900/30 text-green-300 rounded-full">
            {mood}
          </span>
        )}
      </div>
      <p className="text-green-300 mb-3 line-clamp-2">{description}</p>
      <a 
        href={spotifyEmbedUrl.replace('/embed/', '/')} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-green-400 hover:text-green-300 text-sm underline"
      >
        Listen on Spotify →
      </a>
    </div>
  );
};

export default MusicCard;