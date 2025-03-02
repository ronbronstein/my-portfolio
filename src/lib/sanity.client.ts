import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-05-03';

// Create a client for fetching data
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production
  perspective: 'published',
});

// Create an image builder
const builder = imageUrlBuilder(client);

// Helper function to get image URLs
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Type definitions for our content
export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: any;
  technologies?: string[];
  description?: string;
  link?: string;
  content?: any[];
}

export interface Music {
  _id: string;
  title: string;
  slug: { current: string };
  playlistUrl: string;
  description?: string;
  genre?: string;
  mood?: string;
  tracks?: { title: string; artist: string }[];
}

export interface Essay {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  category?: string;
  excerpt?: string;
  mainImage?: any;
  content?: any[];
  tags?: string[];
}

export interface Sticker {
  _id: string;
  title: string;
  slug: { current: string };
  stickerImage: any;
  description: string;
  price: number;
  shopifyProductId?: string;
  aiPrompt?: string;
  collection?: any;
  tags?: string[];
  inStock: boolean;
}