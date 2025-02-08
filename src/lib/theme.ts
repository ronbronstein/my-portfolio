// src/lib/theme.ts
export const MATRIX_THEME = {
    colors: {
      // Softer matrix greens
      primary: {
        light: '#7DFFAF',    // Soft highlight green
        main: '#00CF4D',     // Main interactive green
        dark: '#004D1D',     // Dark background green
        glow: '#00FF4D33'    // Glow effect with alpha
      },
      // Background shades
      background: {
        deep: '#000300',     // Slightly matrix-tinted black
        surface: '#001007',  // Very dark green for surfaces
        overlay: 'rgba(0, 12, 3, 0.85)' // Modal overlay
      },
      // Text variations
      text: {
        bright: '#E4FFE9',   // Almost white with slight green
        primary: '#B3FFB8',  // Main text
        secondary: '#00CF4D' // Secondary text
      },
      // Special effects
      effects: {
        nodeLine: 'rgba(0, 207, 77, 0.3)',     // Connection lines base
        nodeLineActive: 'rgba(0, 207, 77, 0.6)', // Active connection
        nodeGlow: '0 0 15px rgba(0, 207, 77, 0.3)', // Soft node glow
        activeGlow: '0 0 20px rgba(0, 207, 77, 0.5)' // Active state glow
      }
    },
    animation: {
      // Timing configurations
      timing: {
        fast: 0.2,
        medium: 0.4,
        slow: 0.6
      },
      // Rain effect
      rain: {
        initialOpacity: 1,
        finalOpacity: 0.15,
        transitionDuration: 5000, // 5 seconds fade
        characterSize: 14
      },
      // Node animations
      nodes: {
        hover: {
          scale: 1.05,
          duration: 0.3
        },
        float: {
          y: 5, // Float distance in pixels
          duration: 3 // Seconds per cycle
        }
      }
    },
    layout: {
      modal: {
        width: 'max-w-4xl',
        padding: 'p-8'
      },
      nodes: {
        size: {
          normal: 'w-28 h-28',
          large: 'w-32 h-32'
        },
        spacing: {
          min: 180, // Minimum pixels between nodes
          optimal: 250 // Optimal spacing
        }
      }
    }
  };
  
  // Animation variants for Framer Motion
  export const nodeVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    },
    float: {
      y: [0, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  export const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };
  
  // Matrix rain character set (unchanged but moved to bottom)
  export const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";