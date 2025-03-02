'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BaseNode from './BaseNode';
import MatrixModal from '../shared/MatrixModal';
import { nodeContent } from '@/lib/nodeContent';
import { MATRIX_THEME } from '@/lib/theme';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import LoadingSequence from '../matrix/LoadingSequence';
import { useSanityContentContext } from '@/components/SanityContentProvider';
import ProjectContent from '@/components/content/ProjectContent';
import MusicContent from '@/components/content/MusicContent';
import EssayContent from '@/components/content/EssayContent';
import StickerContent from '@/components/content/StickerContent';
import { Project, Music, Essay, Sticker } from '@/lib/sanity.client';

// Sound hook for node interaction sounds
const useSound = () => {
  const playNodeUnlock = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const audio = new Audio('/sounds/node-unlock.mp3');
      audio.volume = 0.5;
      audio.play();
    } catch (err) {
      console.log('Error playing sound:', err);
    }
  };

  const playNodeSelect = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const audio = new Audio('/sounds/node-select.mp3');
      audio.volume = 0.4;
      audio.play();
    } catch (err) {
      console.log('Error playing sound:', err);
    }
  };

  return { playNodeUnlock, playNodeSelect };
};

interface NodeType {
  id: string;
  title: string;
  x: number;
  y: number;
  isLocked: boolean;
  dependencies?: string[];
}

// Type for selected content based on node type
type SelectedContentType = {
  work: Project | null;
  music: Music | null;
  essays: Essay | null;
  stickers: Sticker | null;
  intro: null;
}

const NodeSystem = () => {
  // Client-side state flag to prevent hydration mismatches
  const [isClient, setIsClient] = useState(false);
  
  // Basic state
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [activeNodeId, setActiveNodeId] = useState<string>('intro');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Viewport dimensions
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  
  // Node content state
  const [selectedNode, setSelectedNode] = useState<keyof SelectedContentType | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  
  // Get Sanity content
  const { projects, music, essays, stickers, loading: contentLoading } = useSanityContentContext();
  
  // Get sound functions
  const { playNodeUnlock, playNodeSelect } = useSound();
  
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
      }, 4000); // Adjust this time to match your loading sequence duration
    }, 500);

    return () => clearTimeout(timer);
  }, [isClient]); // Only run when isClient changes

  // Calculate node positions based on screen size - safely
  const calculateNodePositions = useMemo(() => {
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
        x: centerX - spacing * 0.8,
        y: centerY - spacing * 0.6,
        isLocked: true,
        dependencies: ['intro']
      },
      { 
        id: 'music', 
        title: 'Music',
        x: centerX + spacing * 0.7,
        y: centerY - spacing * 0.4,
        isLocked: true,
        dependencies: ['intro']
      },
      { 
        id: 'stickers', 
        title: 'Stickers',
        x: centerX - spacing * 0.5,
        y: centerY + spacing * 0.7,
        isLocked: true,
        dependencies: ['work']
      },
      { 
        id: 'essays', 
        title: 'Essays',
        x: centerX + spacing * 0.9,
        y: centerY + spacing * 0.5,
        isLocked: true,
        dependencies: ['music']
      }
    ];
  }, [isMobile, isSmallMobile, dimensions]); // Also depend on dimensions 

  // Update nodes on screen size change or component mount
  useEffect(() => {
    if (!mounted || loading || !isClient) return;

    const updateNodes = () => {
      setNodes(calculateNodePositions);
    };

    updateNodes();
  }, [mounted, loading, calculateNodePositions, isClient]);

  // Handle node click with sound
  const handleNodeClick = (nodeId: string) => {
    if (!isClient) return; // Safety check
    
    const node = nodes.find(n => n.id === nodeId);
    if (node && !node.isLocked) {
      setActiveNodeId(nodeId);
      // Type cast to ensure type safety
      setSelectedNode(nodeId as keyof SelectedContentType);
      playNodeSelect();
      
      // Set default content item if available based on node type
      if (nodeId === 'work' && projects.length > 0) {
        setSelectedItemId(projects[0]._id);
      } else if (nodeId === 'music' && music.length > 0) {
        setSelectedItemId(music[0]._id);
      } else if (nodeId === 'essays' && essays.length > 0) {
        setSelectedItemId(essays[0]._id);
      } else if (nodeId === 'stickers' && stickers.length > 0) {
        setSelectedItemId(stickers[0]._id);
      } else {
        setSelectedItemId(null);
      }
      
      // Check if any nodes will be unlocked
      const willUnlockNodes = nodes.some(n => 
        n.dependencies?.includes(nodeId) && n.isLocked
      );

      if (willUnlockNodes) {
        playNodeUnlock();
      }
      
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

  // Draw connections
  useEffect(() => {
    if (!mounted || loading || !isClient) return;

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
  }, [nodes, activeNodeId, isMobile, mounted, loading, isClient]);

  // Get the selected work content
  const selectedWorkContent = useMemo(() => {
    if (selectedNode !== 'work' || !selectedItemId) return null;
    return projects.find(p => p._id === selectedItemId) || null;
  }, [selectedNode, selectedItemId, projects]);

  // Get the selected music content
  const selectedMusicContent = useMemo(() => {
    if (selectedNode !== 'music' || !selectedItemId) return null;
    return music.find(m => m._id === selectedItemId) || null;
  }, [selectedNode, selectedItemId, music]);

  // Get the selected essay content
  const selectedEssayContent = useMemo(() => {
    if (selectedNode !== 'essays' || !selectedItemId) return null;
    return essays.find(e => e._id === selectedItemId) || null;
  }, [selectedNode, selectedItemId, essays]);

  // Get the selected sticker content
  const selectedStickerContent = useMemo(() => {
    if (selectedNode !== 'stickers' || !selectedItemId) return null;
    return stickers.find(s => s._id === selectedItemId) || null;
  }, [selectedNode, selectedItemId, stickers]);

  // Get the modal title
  const getModalTitle = () => {
    if (selectedNode === 'work' && selectedWorkContent) {
      return selectedWorkContent.title;
    } else if (selectedNode === 'music' && selectedMusicContent) {
      return selectedMusicContent.title;
    } else if (selectedNode === 'essays' && selectedEssayContent) {
      return selectedEssayContent.title;
    } else if (selectedNode === 'stickers' && selectedStickerContent) {
      return selectedStickerContent.title;
    } else if (selectedNode) {
      return nodeContent[selectedNode]?.title || '';
    }
    
    return '';
  };

  // Render the appropriate content
  const renderContent = () => {
    if (!selectedNode) return null;
    
    // For the intro node, use static content
    if (selectedNode === 'intro') {
      return (
        <div className="whitespace-pre-line">
          {nodeContent[selectedNode]?.content || ''}
        </div>
      );
    }
    
    // Work content
    if (selectedNode === 'work') {
      if (selectedWorkContent) {
        return <ProjectContent project={selectedWorkContent} />;
      } else if (contentLoading) {
        return <div className="text-green-400">Loading work content...</div>;
      } else {
        return (
          <div className="whitespace-pre-line">
            {nodeContent[selectedNode]?.content || ''}
          </div>
        );
      }
    }
    
    // Music content
    if (selectedNode === 'music') {
      if (selectedMusicContent) {
        return <MusicContent music={selectedMusicContent} />;
      } else if (contentLoading) {
        return <div className="text-green-400">Loading music content...</div>;
      } else {
        return (
          <div className="whitespace-pre-line">
            {nodeContent[selectedNode]?.content || ''}
          </div>
        );
      }
    }
    
    // Essay content
    if (selectedNode === 'essays') {
      if (selectedEssayContent) {
        return <EssayContent essay={selectedEssayContent} />;
      } else if (contentLoading) {
        return <div className="text-green-400">Loading essay content...</div>;
      } else {
        return (
          <div className="whitespace-pre-line">
            {nodeContent[selectedNode]?.content || ''}
          </div>
        );
      }
    }
    
    // Sticker content
    if (selectedNode === 'stickers') {
      if (selectedStickerContent) {
        return <StickerContent sticker={selectedStickerContent} />;
      } else if (contentLoading) {
        return <div className="text-green-400">Loading sticker content...</div>;
      } else {
        return (
          <div className="whitespace-pre-line">
            {nodeContent[selectedNode]?.content || ''}
          </div>
        );
      }
    }
    
    return null;
  };

  // Determine if we should show loading
  const showLoading = loading || (contentLoading && !mounted);

  // During SSR, return a simple loading placeholder to avoid hydration mismatch
  if (!isClient) {
    return <div className="fixed inset-0 bg-black"></div>;
  }

  return (
    <AnimatePresence mode="wait">
      {showLoading ? (
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
            onClose={() => {
              setSelectedNode(null);
              setSelectedItemId(null);
            }}
            title={getModalTitle()}
            isMobile={isMobile}
          >
            {renderContent()}
          </MatrixModal>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NodeSystem;