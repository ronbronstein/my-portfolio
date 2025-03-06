export interface Essay {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    substackUrl: string;
    category?: string;
    publishedAt: string;
  }
  
  export const essays: Essay[] = [
    {
      id: 'matrix-web-design',
      title: 'The Philosophy of The Matrix in Web Design',
      slug: 'matrix-philosophy-web-design',
      excerpt: 'Exploring how The Matrix\'s themes can inspire better web experiences',
      substackUrl: 'https://your-substack.substack.com/p/matrix-philosophy',
      category: 'Design',
      publishedAt: '2023-08-15'
    },
    {
      id: 'interactive-storytelling',
      title: 'Interactive Storytelling Through Web Development',
      slug: 'interactive-storytelling',
      excerpt: 'How web technologies enable new forms of digital storytelling',
      substackUrl: 'https://your-substack.substack.com/p/interactive-storytelling',
      category: 'Development',
      publishedAt: '2023-06-22'
    },
    // Add more essays as needed
  ];
  
  export const substackUrl = 'https://your-substack.substack.com';