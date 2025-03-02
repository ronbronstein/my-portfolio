import NodeSystem from '@/components/nodes/NodeSystem';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-8 left-8 z-20">
        <h1 className="text-2xl font-bold text-green-500">Ron Bronstein</h1>
        <p className="text-green-600 mt-2">Navigate through the nodes to explore</p>
      </div>
      <NodeSystem />
    </div>
  );
}