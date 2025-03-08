// src/components/nodes/NodeSystem.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BaseNode from './BaseNode';
import MatrixModal from '../shared/MatrixModal';
import { nodeContent, lockMessages } from '@/data/nodeContent';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import LoadingSequence from '../matrix/LoadingSequence';
import ClientOnly from '../ClientOnly';
import WorkContent from '../content/WorkContent';
import MusicContent from '../content/MusicContent';
import StickersContent from '../content/StickersContent';
import EssaysContent from '../content/EssaysContent';
import ConnectionLine from './ConnectionLine';
import TextDecoder from '@/components/matrix/TextDecoder';
import { Node } from '@/types';



const NodeSystem = () => {
  // Client-side state flag to prevent hydration mismatches
  const [isClient, setIsClient] = useState(false);
  
  // Basic state
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [activeNodeId, setActiveNodeId] = useState<string>('intro');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showLockMessage, setShowLockMessage] = useState<string | null>(null);
  
  // Viewport dimensions - use null for initial SSR state
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Detect mobile screens - safely with hydration in mind
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 380px)');

  // Mark as client-side rendered to avoid hydration mismatches
  useEffect(() => {
    setIsClient(true);
    
    // Update dimensions only on client side
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // Set initial dimensions
    updateDimensions();
    
    // Add resize listener
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Handle initial mount and loading sequence
  useEffect(() => {
    if (!isClient) return; // Skip on server
    
    const timer = setTimeout(() => {
      setMounted(true);
      // Give the loading sequence time to complete
      setTimeout(() => {
        setLoading(false);
      }, 3000); // Shorter loading sequence
    }, 500);

    return () => clearTimeout(timer);
  }, [isClient]); // Only run when isClient changes

  // Calculate node positions based on screen size - safely
  const calculateNodePositions = useMemo(() => {
    // Don't calculate if dimensions aren't set yet
    if (dimensions.width === 0) return [];
    
    const spacing = isMobile ? 180 : 300;
    const nodeSize = isMobile ? 80 : 120;
    
    // Use state-based dimensions instead of direct window access
    const viewportWidth = dimensions.width;
    const viewportHeight = dimensions.height;
    
    const centerX = viewportWidth / 2 - (nodeSize / 2);
    const centerY = viewportHeight / 2 - (nodeSize / 2);

    if (isMobile) {
      return [
        { 
          id: 'intro', 
          title: 'Intro',
          x: centerX,
          y: isSmallMobile ? 100 : centerY - spacing,
          isLocked: false,
          lockMessage: '' 
        },
        { 
          id: 'work', 
          title: 'Work',
          x: centerX - spacing / 2,
          y: isSmallMobile ? 220 : centerY,
          isLocked: true,
          dependencies: ['intro'],
          lockMessage: lockMessages.work
        },
        { 
          id: 'music', 
          title: 'Music',
          x: centerX + spacing / 2,
          y: isSmallMobile ? 340 : centerY,
          isLocked: true,
          dependencies: ['intro'],
          lockMessage: lockMessages.music
        },
        { 
          id: 'stickers', 
          title: 'Stickers',
          x: centerX - spacing / 2,
          y: isSmallMobile ? 460 : centerY + spacing,
          isLocked: true,
          dependencies: ['work'],
          lockMessage: lockMessages.stickers
        },
        { 
          id: 'essays', 
          title: 'Essays',
          x: centerX + spacing / 2,
          y: isSmallMobile ? 580 : centerY + spacing,
          isLocked: true,
          dependencies: ['music'],
          lockMessage: lockMessages.essays
        }
      ];
    }

    return [
      { 
        id: 'intro', 
        title: 'Introduction',
        x: centerX,
        y: centerY,
        isLocked: false,
        lockMessage: ''
      },
      { 
        id: 'work', 
        title: 'Work',
        x: centerX - spacing * 0.8,
        y: centerY - spacing * 0.6,
        isLocked: true,
        dependencies: ['intro'],
        lockMessage: lockMessages.work
      },
      { 
        id: 'music', 
        title: 'Music',
        x: centerX + spacing * 0.7,
        y: centerY - spacing * 0.4,
        isLocked: true,
        dependencies: ['intro'],
        lockMessage: lockMessages.music
      },
      { 
        id: 'stickers', 
        title: 'Stickers',
        x: centerX - spacing * 0.5,
        y: centerY + spacing * 0.7,
        isLocked: true,
        dependencies: ['work'],
        lockMessage: lockMessages.stickers
      },
      { 
        id: 'essays', 
        title: 'Essays',
        x: centerX + spacing * 0.9,
        y: centerY + spacing * 0.5,
        isLocked: true,
        dependencies: ['music'],
        lockMessage: lockMessages.essays
      }
    ];
  }, [isMobile, isSmallMobile, dimensions]); // Also depend on dimensions 

  // Update nodes on screen size change or component mount
  useEffect(() => {
    if (!mounted || loading || !isClient || dimensions.width === 0) return;

    const updateNodes = () => {
      setNodes(calculateNodePositions);
    };

    updateNodes();
  }, [mounted, loading, calculateNodePositions, isClient, dimensions]);

  // Handle node click
  const handleNodeClick = (nodeId: string) => {
    if (!isClient) return; // Safety check
    
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    if (node.isLocked) {
      // Show lock message
      setShowLockMessage(node.lockMessage || null);
      setTimeout(() => setShowLockMessage(null), 3000);
      return;
    }
    
    setActiveNodeId(nodeId);
    setSelectedNode(nodeId);
    
    // Check which nodes to unlock based on nodeContent
    const nodeInfo = nodeContent[nodeId as keyof typeof nodeContent];
    if (nodeInfo && nodeInfo.unlocksNodes && nodeInfo.unlocksNodes.length > 0) {
      setNodes(prevNodes => 
        prevNodes.map(n => ({
          ...n,
          isLocked: nodeInfo.unlocksNodes.includes(n.id) ? false : n.isLocked
        }))
      );
    }
  };

// Content rendering
const getNodeContent = () => {
  if (!selectedNode) return null;
  
  // For the intro node, use our text decoder effect
  if (selectedNode === 'intro') {
    return (
      <div className="whitespace-pre-line h-full flex items-center justify-center">
        <TextDecoder 
          text={nodeContent.intro.content}
          duration={2000}
          className="text-green-300 block"
        />
      </div>
    );
  }
  
  // Other nodes remain the same
  switch (selectedNode) {
    case 'work':
      return <WorkContent isMobile={isMobile} />;
    case 'music':
      return <MusicContent isMobile={isMobile} />;
    case 'stickers':
      return <StickersContent isMobile={isMobile} />;
    case 'essays':
      return <EssaysContent isMobile={isMobile} />;
    default:
      return null;
  }
};

  // During SSR, return a simple loading placeholder to avoid hydration mismatch
  if (!isClient) {
    return <div className="fixed inset-0 bg-black"></div>;
  }

  return (
    <ClientOnly>
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingSequence />
        ) : (
          <motion.div 
            className="fixed inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            suppressHydrationWarning
          >
            {/* Connection lines - only render on client side */}
            {isClient && nodes.flatMap(node => 
              (node.dependencies || []).map(depId => {
                const dependentNode = nodes.find(n => n.id === depId);
                if (!dependentNode) return null;
                
                const nodeOffset = isMobile ? 10 : 12;
                const startX = node.x + nodeOffset;
                const startY = node.y + nodeOffset;
                const endX = dependentNode.x + nodeOffset;
                const endY = dependentNode.y + nodeOffset;
                
                return (
                  <ConnectionLine 
                    key={`${node.id}-${depId}`}
                    startX={startX}
                    startY={startY}
                    endX={endX}
                    endY={endY}
                    isActive={!node.isLocked && activeNodeId === depId}
                    isLocked={node.isLocked}
                  />
                );
              })
            )}
            
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
  
            {/* Lock message tooltip */}
            <AnimatePresence>
              {showLockMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 border border-green-500/40 
                           px-6 py-3 rounded-lg text-green-400 text-center max-w-xs z-50"
                >
                  {showLockMessage}
                </motion.div>
              )}
            </AnimatePresence>
  
            <MatrixModal
              isOpen={selectedNode !== null}
              onClose={() => setSelectedNode(null)}
              title={selectedNode ? nodeContent[selectedNode as keyof typeof nodeContent]?.title || '' : ''}
              isMobile={isMobile}
            >
              {getNodeContent()}
            </MatrixModal>
          </motion.div>
        )}
      </AnimatePresence>
    </ClientOnly>
  );
};

export default NodeSystem;
