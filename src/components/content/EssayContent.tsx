'use client';

import { urlFor, Essay } from '@/lib/sanity.client';
import Image from 'next/image';

interface EssayContentProps {
  essay: Essay;
}

export default function EssayContent({ essay }: EssayContentProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center text-sm text-green-400/80">
        <time dateTime={essay.publishedAt}>
          {formatDate(essay.publishedAt)}
        </time>
        {essay.category && (
          <>
            <span className="mx-2">•</span>
            <span className="px-2 py-1 rounded-full bg-green-900/30 text-green-300 border border-green-500/20">
              {essay.category}
            </span>
          </>
        )}
      </div>

      {essay.mainImage && (
        <div className="rounded overflow-hidden border border-green-500/30">
          <Image
            src={urlFor(essay.mainImage).width(800).url()}
            alt={essay.title}
            width={800}
            height={450}
            className="w-full h-auto"
          />
        </div>
      )}
      
      {essay.excerpt && (
        <p className="text-green-300 text-lg font-medium italic border-l-4 border-green-500/30 pl-4">
          {essay.excerpt}
        </p>
      )}
      
      {essay.content && (
        <div className="mt-8 text-green-300">
          {/* If you have PortableText, use it here */}
          {/* <PortableText value={essay.content} /> */}
          <div className="space-y-4">
            {/* Simple fallback for content */}
            <p>Read the full essay for more insights.</p>
          </div>
        </div>
      )}
      
      {essay.tags && essay.tags.length > 0 && (
        <div className="mt-6 pt-4 border-t border-green-500/20">
          <div className="flex flex-wrap gap-2">
            {essay.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 text-xs rounded-full bg-green-900/30 text-green-300 border border-green-500/20"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}