// src/app/page.tsx
import NodeSystem from '@/components/nodes/NodeSystem';
import StructuredDataWrapper from '@/components/StructuredDataWrapper';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <StructuredDataWrapper />
      <div className="fixed top-4 left-4 z-30">
        <h1 className="text-2xl font-bold text-green-500">Ron Bronstein</h1>
        <p className="text-green-400/70">Creative Developer</p>
      </div>
      <NodeSystem />
    </div>
  );
}