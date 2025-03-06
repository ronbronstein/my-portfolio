// src/components/content/ProjectCard.tsx
'use client';

import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  isMobile?: boolean;
}

const ProjectCard = ({ project, isMobile = false }: ProjectCardProps) => {
  const { title, description, technologies, link } = project;
  
  return (
    <div className="border border-green-500/30 bg-black/30 p-4 rounded-lg">
      <h4 className={`${isMobile ? 'text-base' : 'text-lg'} text-green-400 mb-2`}>{title}</h4>
      <p className="text-green-300 mb-3 line-clamp-2">{description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {technologies.slice(0, isMobile ? 2 : 3).map(tech => (
          <span 
            key={tech} 
            className="px-2 py-1 text-xs bg-green-900/30 text-green-300 rounded-full"
          >
            {tech}
          </span>
        ))}
        {technologies.length > (isMobile ? 2 : 3) && (
          <span className="px-2 py-1 text-xs bg-green-900/30 text-green-300 rounded-full">
            +{technologies.length - (isMobile ? 2 : 3)}
          </span>
        )}
      </div>
      {link && (
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-green-400 hover:text-green-300 text-sm underline"
        >
          View Project →
        </a>
      )}
    </div>
  );
};

export default ProjectCard;