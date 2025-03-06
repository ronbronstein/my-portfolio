export interface Playlist {
    id: string;
    title: string;
    slug: string;
    description: string;
    spotifyEmbedUrl: string;
    genre?: string;
    mood?: string;
  }
  
  export const playlists: Playlist[] = [
    {
      id: 'coding-focus',
      title: 'Coding Focus',
      slug: 'coding-focus',
      description: 'Music to code by - perfect for late night sessions',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX5trt9i14X7j',
      genre: 'Electronic',
      mood: 'Focused'
    },
    {
      id: 'matrix-inspirations',
      title: 'Matrix Inspirations',
      slug: 'matrix-inspirations',
      description: 'Music that inspired the Matrix trilogy',
      spotifyEmbedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX5Ejj0EkURtP',
      genre: 'Electronic',
      mood: 'Dark'
    },
    // Add more playlists as needed
  ];