// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
// Import the original MatrixRain instead of EnhancedMatrixRain
import MatrixRain from '@/components/matrix/MatrixRain'; 
import ClientOnly from '@/components/ClientOnly';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ron Bronstein | Creative Developer',
  description: 'Interactive Matrix-themed portfolio showcasing software development, music, digital art, and writings by Ron Bronstein.',
  keywords: ['developer', 'portfolio', 'matrix theme', 'creative coding', 'interactive design', 'Ron Bronstein'],
  authors: [{ name: 'Ron Bronstein' }],
  creator: 'Ron Bronstein',
  publisher: 'Ron Bronstein',
  // Open Graph / Social media metadata
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ronbronstein.com', // Update with your actual domain
    title: 'Ron Bronstein | Creative Developer Portfolio',
    description: 'Interactive Matrix-themed portfolio showcasing software development, music, digital art, and writings by Ron Bronstein.',
    siteName: 'Ron Bronstein Portfolio',
    images: [
      {
        url: '/og-image.jpg', // You'll need to create this image
        width: 1200,
        height: 630,
        alt: 'Ron Bronstein Portfolio - Matrix Theme',
      },
    ],
  },
  // Twitter specific metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Ron Bronstein | Creative Developer',
    description: 'Interactive Matrix-themed portfolio showcasing software development, music, digital art, and writings by Ron Bronstein.',
    images: ['/twitter-image.jpg'], // You'll need to create this image
    creator: '@ronbronstein', // Update with your Twitter handle
  },
  // Robots settings
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
          <MatrixRain />
        </ClientOnly>
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}