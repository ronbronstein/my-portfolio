// File: src/lib/constants.ts
// Centralized constants file to avoid duplication and inconsistencies

// Matrix theme settings
export const MATRIX_THEME = {
    // Character sets
    CHARS: {
      STANDARD: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン",
      ENHANCED: "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789+×÷=≠≈∞√∆∇∫∮∑∏∈∋⊂⊃⊆⊇⊥∥∠∟∂∇",
      MINIMAL: "01"
    },
    
    // Colors
    COLORS: {
      PRIMARY: "#00FF41", // Bright matrix green
      SECONDARY: "#0D7A0D", // Darker matrix green
      ACCENT: "#50C878", // Emerald green for highlights
      BACKGROUND: "#000300", // Near-black with slight green tint
      TEXT: {
        PRIMARY: "#E4FFE9", // Off-white with green tint
        SECONDARY: "#B3FFB8", // Light green
      }
    },
    
    // Animation timings
    TIMING: {
      FAST: 300,    // 300ms
      MEDIUM: 800,  // 800ms
      SLOW: 1500,   // 1.5s
      VERY_SLOW: 3000 // 3s
    },
    
    // Z-index layers
    Z_INDEX: {
      BACKGROUND: -1,
      BASE: 1,
      NODES: 20,
      MODAL: 50,
      OVERLAY: 40,
      EFFECTS: 60
    },
    
    // Breakpoints (matching Tailwind defaults)
    BREAKPOINTS: {
      SM: 640,
      MD: 768,
      LG: 1024,
      XL: 1280,
      XXL: 1536
    },
    
    // Easter eggs
    EASTER_EGGS: {
      KONAMI: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
      MATRIX: ['t', 'h', 'e', 'r', 'e', 'i', 's', 'n', 'o', 's', 'p', 'o', 'o', 'n'],
      RABBIT: ['f', 'o', 'l', 'l', 'o', 'w', 't', 'h', 'e', 'w', 'h', 'i', 't', 'e', 'r', 'a', 'b', 'b', 'i', 't']
    }
  };
