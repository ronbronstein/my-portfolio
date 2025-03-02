'use client';

import { urlFor, Project } from '@/lib/sanity.client';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectContentProps {
  project: Project;
}

export default function ProjectContent({ project }: ProjectContentProps) {
  return (
    <div className="space-y-6">
      {project.mainImage && (
        <div className="rounded overflow-hidden border border-green-500/30">
          <Image
            src={urlFor(project.mainImage).width(800).url()}
            alt={project.title}
            width={800}
            height={450}
            className="w-full h-auto"
          />
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies?.map((tech) => (
          <span 
            key={tech} 
            className="px-2 py-1 text-xs rounded-full bg-green-900/30 text-green-300 border border-green-500/20"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <p className="text-green-300">{project.description}</p>
      
      {project.link && (
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-green-900/30 hover:bg-green-800/40 text-green-300 border border-green-500/30 rounded transition-colors"
        >
          View Project
        </a>
      )}
      
      {project.content && (
        <div className="mt-8 text-green-300">
          {/* If you have PortableText, use it here */}
          {/* <PortableText value={project.content} /> */}
          <div className="space-y-4">
            {/* Simple fallback for content */}
            <p>View full project details for additional information.</p>
          </div>
        </div>
      )}
    </div>
  );
}