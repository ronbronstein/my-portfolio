// src/lib/theme.ts
export const MATRIX_THEME = {
    colors: {
      primary: '#00ff00', // Matrix green
      background: '#000000',
      backgroundTransparent: 'rgba(0, 0, 0, 0.9)',
      text: {
        primary: '#ffffff',
        secondary: '#00ff00',
      },
      accent: {
        dark: '#003300',
        light: '#006600',
      }
    },
    animation: {
      rainSpeed: 1.5,
      fadeInDuration: 0.3,
      nodeTransition: 0.5,
    },
    fonts: {
      matrix: "'Courier New', monospace", // We'll update this with a more Matrix-like font later
    }
  };
  
  // Utility function for Matrix text effects
  export const matrixTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };
  
  // Matrix rain character set
  export const MATRIX_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";