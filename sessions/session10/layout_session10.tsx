// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientOnly from '@/components/ClientOnly';
import MatrixRain from '@/components/matrix/MatrixRain'; // Use the compatibility layer
import MatrixEasterEggs from '@/components/easter-eggs/matrix-effects';
import StructuredDataWrapper from '@/components/StructuredDataWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ron Bronstein | Creative Developer',
  description: 'Interactive Matrix-themed portfolio showcasing software development, music, digital art, and writings by Ron Bronstein.',
  keywords: ['developer', 'portfolio', 'matrix theme', 'creative coding', 'interactive design', 'Ron Bronstein'],
  authors: [{ name: 'Ron Bronstein' }],
  creator: 'Ron Bronstein',
  publisher: 'Ron Bronstein',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ronbronstein.com',
    title: 'Ron Bronstein | Creative Developer Portfolio',
    description: 'Interactive Matrix-themed portfolio showcasing software development, music, digital art, and writings by Ron Bronstein.',
    siteName: 'Ron Bronstein Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ron Bronstein Portfolio - Matrix Theme',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ron Bronstein | Creative Developer',
    description: 'Interactive Matrix-themed portfolio showcasing software development, music, digital art, and writings by Ron Bronstein.',
    images: ['/twitter-image.jpg'],
    creator: '@ronbronstein',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-green-500 relative min-h-screen`}>
        <ClientOnly>
          {/* Use regular MatrixRain with appropriate parameters */}
          <MatrixRain 
            density={0.9}
            fadeAlpha={0.03}
            speed={0.8}
          />
          
          {/* Add Matrix easter eggs */}
          <MatrixEasterEggs />
        </ClientOnly>
        
        {/* Structured data for SEO */}
        <StructuredDataWrapper />
        
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}