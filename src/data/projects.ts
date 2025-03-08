export interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    technologies: string[];
    imageUrl?: string;
    link?: string;
  }
  
  export const projects: Project[] = [
    {
      id: 'digital-marketing',
      title: 'Digital Marketing Agency',
      slug: 'digital-marketing',
      description: 'Agency website with lead generation focus',
      technologies: ['Next.js', 'TailwindCSS', 'React'],
      imageUrl: '/images/projects/marketing.jpg',
      link: 'https://yourdigitalagency.com'
    },
    {
      id: 'transient-studio',
      title: 'Transient Studio',
      slug: 'transient-studio',
      description: 'Boutique sample shop for music producers',
      technologies: ['React', 'Node.js', 'Web Audio API'],
      imageUrl: '/images/projects/transient.jpg',
      link: 'https://transientstudio.com'
    },
    // Add more projects as needed
  ];
