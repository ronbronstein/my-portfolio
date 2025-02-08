// src/app/page.tsx
import NodeSystem from '@/components/nodes/NodeSystem';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <NodeSystem />
    </div>
  );
}