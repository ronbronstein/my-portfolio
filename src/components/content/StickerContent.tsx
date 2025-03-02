'use client';

import { urlFor, Sticker } from '@/lib/sanity.client';
import Image from 'next/image';

interface StickerContentProps {
  sticker: Sticker;
}

export default function StickerContent({ sticker }: StickerContentProps) {
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sticker Image */}
        <div className="flex-1">
          {sticker.stickerImage && (
            <div className="rounded overflow-hidden border border-green-500/30 bg-black/30">
              <Image
                src={urlFor(sticker.stickerImage).width(500).height(500).url()}
                alt={sticker.title}
                width={500}
                height={500}
                className="w-full h-auto object-contain"
              />
            </div>
          )}
        </div>
        
        {/* Sticker Details */}
        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-green-400">
              {formatPrice(sticker.price)}
            </div>
            <div>
              {sticker.inStock ? (
                <span className="px-2 py-1 text-xs rounded-full bg-green-900/50 text-green-300 border border-green-500/30">
                  In Stock
                </span>
              ) : (
                <span className="px-2 py-1 text-xs rounded-full bg-red-900/50 text-red-300 border border-red-500/30">
                  Sold Out
                </span>
              )}
            </div>
          </div>
          
          <p className="text-green-300">{sticker.description}</p>
          
          {sticker.collection && (
            <div className="text-green-400/80">
              Collection: <span className="text-green-300">{sticker.collection.title}</span>
            </div>
          )}
          
          {sticker.aiPrompt && (
            <div className="mt-6">
              <h3 className="text-green-400 text-sm mb-2">AI Generation Prompt:</h3>
              <div className="p-3 bg-black/50 rounded border border-green-500/20 text-green-300/90 text-sm">
                {sticker.aiPrompt}
              </div>
            </div>
          )}
          
          {sticker.shopifyProductId && (
            <a 
              href={`https://yourshopifystore.com/products/${sticker.slug.current}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-4 px-6 py-3 bg-green-900/40 hover:bg-green-800/60 text-green-300 border border-green-500/40 rounded transition-colors text-center w-full md:w-auto"
            >
              Add to Cart
            </a>
          )}
        </div>
      </div>
      
      {sticker.tags && sticker.tags.length > 0 && (
        <div className="mt-6 pt-4 border-t border-green-500/20">
          <div className="flex flex-wrap gap-2">
            {sticker.tags.map((tag) => (
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