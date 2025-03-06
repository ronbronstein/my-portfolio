// src/components/nodes/NodeSystem.tsx
'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BaseNode from './BaseNode';
import MatrixModal from '../shared/MatrixModal';
import { nodeContent, lockMessages } from '@/data/nodeContent';
import { projects } from '@/data/projects';
import { playlists } from '@/data/music';
import { stickers, shopUrl } from '@/data/stickers';
import { essays, substackUrl } from '@/data/essays';
import { MATRIX_THEME } from '@/lib/theme';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import LoadingSequence from '../matrix/LoadingSequence';
import ClientOnly from '../ClientOnly';

interface NodeType {
  id: string;
  title: string;
  x: number;
  y: number;
  isLocked: boolean;
  dependencies?: string[];
  lockMessage?: string;
}

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
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
    if (nodeInfo && nodeInfo.unlocksNodes) {
      setNodes(prevNodes => 
        prevNodes.map(n => ({
          ...n,
          isLocked: nodeInfo.unlocksNodes.includes(n.id) ? false : n.isLocked
        }))
      );
    }
  };

  // Draw connections
  useEffect(() => {
    if (!mounted || loading || !isClient || nodes.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      if (!canvas) return; // Extra null check here
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawConnections(); // Call after resize
    };

    // Setup canvas
    handleResize();
    window.addEventListener('resize', handleResize);

    // Draw connections
    function drawConnections() {
      if (!canvas || !ctx) return; // Extra null checks
      
      // Clear the entire canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nodes
      nodes.forEach(node => {
        if (node.dependencies) {
          node.dependencies.forEach(depId => {
            const dependentNode = nodes.find(n => n.id === depId);
            if (dependentNode) {
              // Double check ctx isn't null before using it
              if (!ctx) return;
              
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
    }

    // Initial draw
    drawConnections();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [nodes, activeNodeId, isMobile, mounted, loading, isClient]);

  // Get content based on node type
  const getNodeContent = () => {
    if (!selectedNode) return null;
    
    switch (selectedNode) {
      case 'intro':
        return (
          <div className="whitespace-pre-line">
            {nodeContent.intro.content}
          </div>
        );
      case 'work':
        return (
          <div className="space-y-6">
            <div className="whitespace-pre-line mb-8">
              {nodeContent.work.content}
            </div>
            
            <h3 className="text-xl text-green-400 mb-4">Featured Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(project => (
                <div 
                  key={project.id} 
                  className="border border-green-500/30 bg-black/30 p-4 rounded-lg"
                >
                  <h4 className="text-lg text-green-400 mb-2">{project.title}</h4>
                  <p className="text-green-300 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map(tech => (
                      <span 
                        key={tech} 
                        className="px-2 py-1 text-xs bg-green-900/30 text-green-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 underline"
                    >
                      Visit Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'music':
        return (
          <div className="space-y-6">
            <div className="whitespace-pre-line mb-8">
              {nodeContent.music.content}
            </div>
            
            <h3 className="text-xl text-green-400 mb-4">Featured Playlists</h3>
            <div className="space-y-8">
              {playlists.map(playlist => (
                <div key={playlist.id} className="space-y-4">
                  <h4 className="text-lg text-green-400">{playlist.title}</h4>
                  <p className="text-green-300">{playlist.description}</p>
                  <div className="w-full border border-green-500/30 rounded-md overflow-hidden bg-black/70">
                    <iframe
                      src={playlist.spotifyEmbedUrl}
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allowTransparency={true}
                      allow="encrypted-media"
                      className="w-full"
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'stickers':
        return (
          <div className="space-y-6">
            <div className="whitespace-pre-line mb-8">
              {nodeContent.stickers.content}
            </div>
            
            <h3 className="text-xl text-green-400 mb-4">Featured Stickers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {stickers.map(sticker => (
                <div 
                  key={sticker.id} 
                  className="border border-green-500/30 bg-black/30 p-4 rounded-lg"
                >
                  <h4 className="text-lg text-green-400 mb-2">{sticker.title}</h4>
                  <p className="text-green-300 mb-3">{sticker.description}</p>
                  {sticker.shopUrl && (
                    <a 
                      href={sticker.shopUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 underline"
                    >
                      View in Shop →
                    </a>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href={shopUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-green-900/40 hover:bg-green-800/60 text-green-300 border border-green-500/40 rounded transition-colors"
              >
                Visit Full Sticker Shop
              </a>
            </div>
          </div>
        );
      case 'essays':
        return (
          <div className="space-y-6">
            <div className="whitespace-pre-line mb-8">
              {nodeContent.essays.content}
            </div>
            
            <h3 className="text-xl text-green-400 mb-4">Featured Essays</h3>
            <div className="space-y-6">
              {essays.map(essay => (
                <div 
                  key={essay.id} 
                  className="border border-green-500/30 bg-black/30 p-4 rounded-lg"
                >
                  <h4 className="text-lg text-green-400 mb-2">{essay.title}</h4>
                  <div className="text-xs text-green-300/70 mb-2">
                    {new Date(essay.publishedAt).toLocaleDateString()} 
                    {essay.category && ` • ${essay.category}`}
                  </div>
                  <p className="text-green-300 mb-3">{essay.excerpt}</p>
                  <a 
                    href={essay.substackUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 underline"
                  >
                    Read Full Essay →
                  </a>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href={substackUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-green-900/40 hover:bg-green-800/60 text-green-300 border border-green-500/40 rounded transition-colors"
              >
                Subscribe to My Substack
              </a>
            </div>
          </div>
        );
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