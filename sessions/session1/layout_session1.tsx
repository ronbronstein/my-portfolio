// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MatrixRain from '@/components/matrix/MatrixRain';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ron Bronstein Portfolio',
  description: 'Creative technologist and developer portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-green-500 relative min-h-screen`}>
        <MatrixRain />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}