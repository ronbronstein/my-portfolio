'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BaseNode from './BaseNode';
import MatrixModal from '../shared/MatrixModal';
import { nodeContent } from '@/lib/nodeContent';
import { MATRIX_THEME } from '@/lib/theme';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import LoadingSequence from '../matrix/LoadingSequence';

interface NodeType {
  id: string;
  title: string;
  x: number;
  y: number;
  isLocked: boolean;
  dependencies?: string[];
}

const NodeSystem = () => {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [activeNodeId, setActiveNodeId] = useState<string>('intro');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Detect mobile screens
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 380px)');

  // Handle initial mount and loading sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      // Give the loading sequence time to complete
      setTimeout(() => {
        setLoading(false);
      }, 4000); // Adjust this time to match your loading sequence duration
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Calculate node positions based on screen size
  const calculateNodePositions = useMemo(() => {
    const spacing = isMobile ? 180 : 300;
    const nodeSize = isMobile ? 80 : 120;
    
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    const centerX = viewportWidth / 2 - (nodeSize / 2);
    const centerY = viewportHeight / 2 - (nodeSize / 2);

    if (isMobile) {
      return [
        { 
          id: 'intro', 
          title: 'Intro',
          x: centerX,
          y: isSmallMobile ? 100 : centerY - spacing,
          isLocked: false 
        },
        { 
          id: 'work', 
          title: 'Work',
          x: centerX - spacing / 2,
          y: isSmallMobile ? 220 : centerY,
          isLocked: true,
          dependencies: ['intro']
        },
        { 
          id: 'music', 
          title: 'Music',
          x: centerX + spacing / 2,
          y: isSmallMobile ? 340 : centerY,
          isLocked: true,
          dependencies: ['intro']
        },
        { 
          id: 'stickers', 
          title: 'Stickers',
          x: centerX - spacing / 2,
          y: isSmallMobile ? 460 : centerY + spacing,
          isLocked: true,
          dependencies: ['work']
        },
        { 
          id: 'essays', 
          title: 'Essays',
          x: centerX + spacing / 2,
          y: isSmallMobile ? 580 : centerY + spacing,
          isLocked: true,
          dependencies: ['music']
        }
      ];
    }

    return [
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
        y: centerY - spacing / 2,
        isLocked: true,
        dependencies: ['intro']
      },
      { 
        id: 'music', 
        title: 'Music',
        x: centerX + spacing,
        y: centerY + spacing / 2,
        isLocked: true,
        dependencies: ['intro']
      },
      { 
        id: 'stickers', 
        title: 'Stickers',
        x: centerX + spacing * 2,
        y: centerY - spacing / 2,
        isLocked: true,
        dependencies: ['work']
      },
      { 
        id: 'essays', 
        title: 'Essays',
        x: centerX + spacing * 2,
        y: centerY + spacing / 2,
        isLocked: true,
        dependencies: ['music']
      }
    ];
  }, [isMobile, isSmallMobile]);

  // Update nodes on screen size change or component mount
  useEffect(() => {
    if (!mounted || loading) return;

    const updateNodes = () => {
      setNodes(calculateNodePositions);
    };

    updateNodes();
    window.addEventListener('resize', updateNodes);
    return () => window.removeEventListener('resize', updateNodes);
  }, [mounted, loading, calculateNodePositions]);

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
    if (!mounted || loading) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Draw connections
    const drawConnections = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(node => {
        if (node.dependencies) {
          node.dependencies.forEach(depId => {
            const dependentNode = nodes.find(n => n.id === depId);
            if (dependentNode) {
              ctx.beginPath();

              const nodeOffset = isMobile ? 40 : 60;
              const startX = node.x + nodeOffset;
              const startY = node.y + nodeOffset;
              const endX = dependentNode.x + nodeOffset;
              const endY = dependentNode.y + nodeOffset;

              const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
              
              if (node.isLocked) {
                gradient.addColorStop(0, 'rgba(0, 50, 0, 0.3)');
                gradient.addColorStop(1, 'rgba(0, 50, 0, 0.3)');
              } else {
                gradient.addColorStop(0, 'rgba(0, 255, 70, 0.4)');
                gradient.addColorStop(1, 'rgba(0, 255, 70, 0.1)');
              }

              ctx.moveTo(startX, startY);
              ctx.lineTo(endX, endY);
              ctx.strokeStyle = gradient;
              ctx.lineWidth = isMobile ? 1 : 2;
              ctx.stroke();
            }
          });
        }
      });
    };

    drawConnections();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nodes, activeNodeId, isMobile, mounted, loading]);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <LoadingSequence />
      ) : (
        <motion.div 
          className="fixed inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-10"
          />
          
          <div className="relative z-20">
            {nodes.map((node, index) => (
              <motion.div
                key={node.id}
                className="absolute"
                style={{ 
                  left: node.x,
                  top: node.y,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  transition: { 
                    delay: index * (isMobile ? 0.05 : 0.1),
                    duration: 0.5 
                  } 
                }}
              >
                <BaseNode
                  id={node.id}
                  title={node.title}
                  isLocked={node.isLocked}
                  isActive={activeNodeId === node.id}
                  onClick={() => handleNodeClick(node.id)}
                  isMobile={isMobile}
                />
              </motion.div>
            ))}
          </div>

          <MatrixModal
            isOpen={selectedNode !== null}
            onClose={() => setSelectedNode(null)}
            title={selectedNode ? nodeContent[selectedNode as keyof typeof nodeContent]?.title || '' : ''}
            isMobile={isMobile}
          >
            {selectedNode && (
              <div className="whitespace-pre-line">
                {nodeContent[selectedNode as keyof typeof nodeContent]?.content || ''}
              </div>
            )}
          </MatrixModal>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NodeSystem;