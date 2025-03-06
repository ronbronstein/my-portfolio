// src/app/page.tsx
import NodeSystem from '@/components/nodes/NodeSystem';
import dynamic from 'next/dynamic';

// Use dynamic import with no SSR
const StructuredData = dynamic(
  () => import('./structuredData'),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <StructuredData />
      <div className="fixed top-4 left-4 z-30">
        <h1 className="text-2xl font-bold text-green-500">Ron Bronstein</h1>
        <p className="text-green-400/70">Creative Developer</p>
      </div>
      <NodeSystem />
    </div>
  );
}