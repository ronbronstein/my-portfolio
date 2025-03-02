'use client';

import { Music } from '@/lib/sanity.client';

interface MusicContentProps {
  music: Music;
}

export default function MusicContent({ music }: MusicContentProps) {
  const sanitizeSpotifyUrl = (url: string) => {
    // Ensure the URL is properly formatted for embedding
    if (url.includes('spotify.com/playlist/')) {
      const playlistId = url.split('playlist/')[1]?.split('?')[0];
      if (playlistId) {
        return `https://open.spotify.com/embed/playlist/${playlistId}`;
      }
    }
    return url;
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        {music.genre && (
          <span className="px-2 py-1 mr-2 text-xs rounded-full bg-green-900/30 text-green-300 border border-green-500/20">
            {music.genre}
          </span>
        )}
        {music.mood && (
          <span className="px-2 py-1 text-xs rounded-full bg-green-900/30 text-green-300 border border-green-500/20">
            Mood: {music.mood}
          </span>
        )}
      </div>
      
      {music.description && (
        <p className="text-green-300 mb-6">{music.description}</p>
      )}
      
      {music.playlistUrl && (
        <div className="w-full border border-green-500/30 rounded-md overflow-hidden bg-black/70">
          <iframe
            src={sanitizeSpotifyUrl(music.playlistUrl)}
            width="100%"
            height="380"
            frameBorder="0"
            allowTransparency={true}
            allow="encrypted-media"
            className="w-full"
          ></iframe>
        </div>
      )}
      
      {music.tracks && music.tracks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-green-400 text-lg mb-3">Featured Tracks</h3>
          <ul className="space-y-2">
            {music.tracks.map((track, index) => (
              <li 
                key={index}
                className="px-3 py-2 bg-green-900/20 rounded border border-green-500/20"
              >
                <span className="text-green-300 font-medium">{track.title}</span>
                {track.artist && (
                  <span className="text-green-400/70 ml-2">by {track.artist}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}