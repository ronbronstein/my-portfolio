// src/components/nodes/NodeSystem.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import BaseNode from './BaseNode';
import MatrixModal from '../shared/MatrixModal';
import { nodeContent } from '@/lib/nodeContent';
import { MATRIX_THEME } from '@/lib/theme';

interface NodeType {
  id: string;
  title: string;
  x: number;
  y: number;
  isLocked: boolean;
  dependencies?: string[];
}

const nodeVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.2 * index,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const NodeSystem = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [activeNodeId, setActiveNodeId] = useState<string>('intro');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize nodes with proper positions
  useEffect(() => {
    const calculateNodes = () => {
      const centerX = window.innerWidth / 2 - 60;  // Center point
      const centerY = window.innerHeight / 2 - 60; // Center point
      const spacing = 300; // Increased spacing

      const newNodes: NodeType[] = [
        { 
          id: 'intro', 
          title: 'Introduction', 
          x: centerX,
          y: centerY,
          isLocked: false 
        },
        { 
          id: 'work', 
          title: 'Work', 
          x: centerX + spacing,
          y: centerY - spacing,
          isLocked: true, 
          dependencies: ['intro'] 
        },
        { 
          id: 'music', 
          title: 'Music', 
          x: centerX + spacing,
          y: centerY + spacing,
          isLocked: true, 
          dependencies: ['intro'] 
        },
        { 
          id: 'stickers', 
          title: 'Stickers', 
          x: centerX + spacing * 2,
          y: centerY - spacing,
          isLocked: true, 
          dependencies: ['work'] 
        },
        { 
          id: 'essays', 
          title: 'Essays', 
          x: centerX + spacing * 2,
          y: centerY + spacing,
          isLocked: true, 
          dependencies: ['music'] 
        },
        { 
          id: 'cv', 
          title: 'CV', 
          x: centerX - spacing,
          y: centerY + spacing,
          isLocked: true, 
          dependencies: ['intro'] 
        }
      ];

      setNodes(newNodes);
    };

    calculateNodes();
    window.addEventListener('resize', calculateNodes);
    return () => window.removeEventListener('resize', calculateNodes);
  }, []);

  // Handle node click
  const handleNodeClick = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node && !node.isLocked) {
      setActiveNodeId(nodeId);
      setSelectedNode(nodeId);
      
      setNodes(prevNodes => 
        prevNodes.map(n => ({
          ...n,
          isLocked: n.dependencies?.includes(nodeId) ? false : n.isLocked
        }))
      );
    }
  };

  // Draw connections
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(node => {
      if (node.dependencies) {
        node.dependencies.forEach(depId => {
          const dependentNode = nodes.find(n => n.id === depId);
          if (dependentNode) {
            ctx.beginPath();
            ctx.moveTo(node.x + 48, node.y + 48);
            ctx.lineTo(dependentNode.x + 48, dependentNode.y + 48);
            
            const gradient = ctx.createLinearGradient(
              node.x + 48, node.y + 48,
              dependentNode.x + 48, dependentNode.y + 48
            );

            if (node.isLocked) {
              gradient.addColorStop(0, 'rgba(0, 50, 0, 0.3)');
              gradient.addColorStop(1, 'rgba(0, 50, 0, 0.3)');
            } else {
              gradient.addColorStop(0, 'rgba(0, 255, 70, 0.4)');
              gradient.addColorStop(1, 'rgba(0, 255, 70, 0.1)');
            }

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        });
      }
    });
  }, [nodes, activeNodeId]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Modal */}
      <MatrixModal
        isOpen={selectedNode !== null}
        onClose={() => setSelectedNode(null)}
        title={selectedNode ? nodeContent[selectedNode as keyof typeof nodeContent]?.title || '' : ''}
      >
        {selectedNode && (
          <div className="whitespace-pre-line">
            {nodeContent[selectedNode as keyof typeof nodeContent]?.content || ''}
          </div>
        )}
      </MatrixModal>

      {/* Connection lines */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />
      
      {/* Nodes */}
      <div className="relative z-20">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className="absolute"
            style={{ 
              left: node.x,
              top: node.y,
            }}
            variants={nodeVariants}
            initial="initial"
            animate="animate"
            custom={index}
          >
            <BaseNode
              id={node.id}
              title={node.title}
              isLocked={node.isLocked}
              isActive={activeNodeId === node.id}
              onClick={() => handleNodeClick(node.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NodeSystem;