// src/components/nodes/NodeSystem.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import BaseNode from './BaseNode';

interface NodeType {
  id: string;
  title: string;
  x: number;
  y: number;
  isLocked: boolean;
  dependencies?: string[];
}

const INITIAL_NODES: NodeType[] = [
  { id: 'intro', title: 'Introduction', x: 400, y: 300, isLocked: false },
  { id: 'work', title: 'Work', x: 600, y: 200, isLocked: true, dependencies: ['intro'] },
  { id: 'music', title: 'Music', x: 600, y: 400, isLocked: true, dependencies: ['intro'] },
  { id: 'stickers', title: 'Stickers', x: 800, y: 300, isLocked: true, dependencies: ['work', 'music'] },
  { id: 'essays', title: 'Essays', x: 1000, y: 300, isLocked: true, dependencies: ['stickers'] },
];

import MatrixModal from '../shared/MatrixModal';
import { nodeContent } from '@/lib/nodeContent';

const NodeSystem = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [nodes, setNodes] = useState<NodeType[]>(INITIAL_NODES);
  const [activeNodeId, setActiveNodeId] = useState<string>('intro');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Handle node click
  const handleNodeClick = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node && !node.isLocked) {
      setActiveNodeId(nodeId);
      setSelectedNode(nodeId);
      
      // Unlock dependent nodes
      setNodes(prevNodes => 
        prevNodes.map(n => ({
          ...n,
          isLocked: n.dependencies?.includes(nodeId) 
            ? false 
            : n.isLocked
        }))
      );
    }
  };

  // Draw connections between nodes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    nodes.forEach(node => {
      if (node.dependencies) {
        node.dependencies.forEach(depId => {
          const dependentNode = nodes.find(n => n.id === depId);
          if (dependentNode) {
            ctx.beginPath();
            ctx.moveTo(node.x + 12, node.y + 12);
            ctx.lineTo(dependentNode.x + 12, dependentNode.y + 12);
            ctx.strokeStyle = node.isLocked ? '#333' : '#00ff00';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });
      }
    });
  }, [nodes, activeNodeId]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      <MatrixModal
        isOpen={selectedNode !== null}
        onClose={() => setSelectedNode(null)}
        title={selectedNode ? nodeContent[selectedNode as keyof typeof nodeContent].title : ''}
      >
        {selectedNode && (
          <div className="whitespace-pre-line">
            {nodeContent[selectedNode as keyof typeof nodeContent].content}
          </div>
        )}
      </MatrixModal>
      {nodes.map((node) => (
        <BaseNode
          key={node.id}
          {...node}
          isActive={activeNodeId === node.id}
          onClick={() => handleNodeClick(node.id)}
        />
      ))}
    </div>
  );
};

export default NodeSystem;