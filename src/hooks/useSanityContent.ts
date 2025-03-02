import { useState, useEffect } from 'react';
import { client, Project, Music, Essay, Sticker } from '@/lib/sanity.client';

// Mock data to use when Sanity connection fails
const MOCK_DATA = {
  projects: [
    { 
      _id: 'mock-project-1', 
      title: 'Matrix-Themed Portfolio', 
      slug: { current: 'matrix-portfolio' },
      description: 'A Next.js portfolio with Matrix visual effects and interactive nodes.',
      technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
      link: 'https://github.com/yourusername/matrix-portfolio'
    },
    { 
      _id: 'mock-project-2', 
      title: 'Interactive Node System', 
      slug: { current: 'node-system' },
      description: 'Canvas-based interactive node visualization with unlock mechanics.',
      technologies: ['Canvas API', 'TypeScript', 'Animation'],
      link: 'https://github.com/yourusername/node-system'
    }
  ] as Project[],
  
  music: [
    { 
      _id: 'mock-music-1', 
      title: 'Matrix Inspirations', 
      slug: { current: 'matrix-inspirations' },
      playlistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX5Ejj0EkURtP',
      description: 'Music that inspired the Matrix trilogy and my development process.',
      genre: 'Electronic',
      mood: 'Dark',
      tracks: [
        { title: 'Clubbed to Death', artist: 'Rob Dougan' },
        { title: 'Spybreak!', artist: 'Propellerheads' }
      ]
    },
    {
      _id: 'mock-music-2',
      title: 'Coding Sessions',
      slug: { current: 'coding-sessions' },
      playlistUrl: 'https://open.spotify.com/playlist/37i9dQZF1DX5trt9i14X7j',
      description: 'Music to code by - perfect for late night sessions.',
      genre: 'Ambient',
      mood: 'Focused'
    }
  ] as Music[],
  
  essays: [
    {
      _id: 'mock-essay-1',
      title: 'The Philosophy of The Matrix in Web Design',
      slug: { current: 'matrix-philosophy-web-design' },
      publishedAt: '2023-08-15',
      category: 'Design',
      excerpt: 'Exploring how The Matrix\'s themes can inspire better web experiences.',
      tags: ['Philosophy', 'Design', 'UX']
    },
    {
      _id: 'mock-essay-2',
      title: 'Interactive Storytelling Through Web Development',
      slug: { current: 'interactive-storytelling' },
      publishedAt: '2023-06-22',
      category: 'Development',
      excerpt: 'How web technologies enable new forms of digital storytelling.',
      tags: ['Storytelling', 'Animation', 'User Experience']
    }
  ] as Essay[],
  
  stickers: [
    {
      _id: 'mock-sticker-1',
      title: 'Neo Pixel Art',
      slug: { current: 'neo-pixel' },
      description: 'Pixel art sticker of Neo dodging bullets.',
      price: 3.99,
      tags: ['Movies', 'Pixel Art', 'Matrix'],
      inStock: true
    },
    {
      _id: 'mock-sticker-2',
      title: 'Matrix Code Rain',
      slug: { current: 'code-rain' },
      description: 'The iconic green code cascade in sticker form.',
      price: 4.99,
      tags: ['Code', 'Green', 'Digital Rain'],
      inStock: true
    }
  ] as Sticker[]
};

// Hook for fetching all content types
export function useSanityContent() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [music, setMusic] = useState<Music[]>([]);
  const [essays, setEssays] = useState<Essay[]>([]);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    async function fetchAllContent() {
      try {
        setLoading(true);
        
        // Fetch data with timeout to prevent long waits for failed connections
        const fetchWithTimeout = async <T>(promise: Promise<T>, timeoutMs = 10000): Promise<T> => {
          let timeoutId: NodeJS.Timeout;
          
          const timeoutPromise = new Promise<never>((_, reject) => {
            timeoutId = setTimeout(() => {
              reject(new Error(`Request timed out after ${timeoutMs}ms`));
            }, timeoutMs);
          });
          
          return Promise.race([
            promise,
            timeoutPromise
          ]).finally(() => {
            clearTimeout(timeoutId);
          }) as Promise<T>;
        };
        
        try {
          // Use Promise.all to fetch all content types in parallel
          const results = await fetchWithTimeout(Promise.all([
            // Projects query
            client.fetch<Project[]>(`
              *[_type == "project"] {
                _id,
                title,
                slug,
                mainImage,
                technologies,
                description,
                link,
                "content": content[] {
                  ...,
                  // Handle image and code blocks in content
                  _type == "image" => {
                    "asset": asset->
                  }
                }
              }
            `),
            
            // Music query
            client.fetch<Music[]>(`
              *[_type == "music"] {
                _id,
                title,
                slug,
                playlistUrl,
                description,
                genre,
                mood,
                tracks
              }
            `),
            
            // Essays query
            client.fetch<Essay[]>(`
              *[_type == "essay"] | order(publishedAt desc) {
                _id,
                title,
                slug,
                publishedAt,
                category,
                excerpt,
                mainImage,
                "content": content[] {
                  ...,
                  _type == "image" => {
                    "asset": asset->
                  }
                },
                tags
              }
            `),
            
            // Stickers query
            client.fetch<Sticker[]>(`
              *[_type == "sticker"] {
                _id,
                title,
                slug,
                stickerImage,
                description,
                price,
                shopifyProductId,
                aiPrompt,
                "collection": collection->,
                tags,
                inStock
              }
            `)
          ]));
          
          // Set the data from the successful response
          const [projectData, musicData, essayData, stickerData] = results;
          
          setProjects(projectData);
          setMusic(musicData);
          setEssays(essayData);
          setStickers(stickerData);
          setUsingMockData(false);
          
        } catch (fetchError) {
          console.error('Error fetching from Sanity:', fetchError);
          console.log('Using mock data instead...');
          
          // Use mock data as fallback
          setProjects(MOCK_DATA.projects);
          setMusic(MOCK_DATA.music);
          setEssays(MOCK_DATA.essays);
          setStickers(MOCK_DATA.stickers);
          setUsingMockData(true);
          
          // Still set the error so we can inform users if needed
          setError(fetchError instanceof Error ? fetchError : new Error('Error connecting to Sanity'));
        }
        
      } catch (err) {
        console.error('Unexpected error in useSanityContent:', err);
        setError(err instanceof Error ? err : new Error('Unknown error in useSanityContent'));
        
        // Ensure we have mock data even if something unexpected happens
        if (projects.length === 0) setProjects(MOCK_DATA.projects);
        if (music.length === 0) setMusic(MOCK_DATA.music);
        if (essays.length === 0) setEssays(MOCK_DATA.essays);
        if (stickers.length === 0) setStickers(MOCK_DATA.stickers);
        setUsingMockData(true);
        
      } finally {
        setLoading(false);
      }
    }
    
    fetchAllContent();
  }, []);
  
  return { 
    projects, 
    music, 
    essays, 
    stickers, 
    loading, 
    error,
    usingMockData 
  };
}

// Specialized hooks for individual content types
export function useProjects() {
  const { projects, loading, error } = useSanityContent();
  return { projects, loading, error };
}

export function useMusic() {
  const { music, loading, error } = useSanityContent();
  return { music, loading, error };
}

export function useEssays() {
  const { essays, loading, error } = useSanityContent();
  return { essays, loading, error };
}

export function useStickers() {
  const { stickers, loading, error } = useSanityContent();
  return { stickers, loading, error };
}