// src/data/nodeContent.ts
interface NodeContentItem {
  title: string;
  content: string;
  unlocksNodes: string[]; // This needs to be defined for all nodes
}

export const nodeContent: Record<string, NodeContentItem> = {
    intro: {
      title: "Welcome to The Matrix",
      content: `
        Hello, I'm Ron Bronstein.
        
        Navigate through this digital landscape to discover my work, music, and creative projects. Each node contains a piece of my digital identity.
        
        Click the connected nodes to explore further.
      `,
      unlocksNodes: ['work', 'music']
    },
    work: {
      title: "Professional Matrix",
      content: `
        My professional journey spans across:
        
        • Software Development
        • Creative Technology
        • Digital Innovation
        • Interactive Experiences
        
        Each project represents a unique challenge in the digital realm.
      `,
      unlocksNodes: ['stickers']
    },
    music: {
      title: "Sonic Frequencies",
      content: `
        Music is my digital pulse:
        
        • Curated Playlists
        • Sound Design
        • Audio Engineering
        • Musical Projects
        
        Explore my musical universe.
      `,
      unlocksNodes: ['essays']
    },
    stickers: {
      title: "Digital Art Matrix",
      content: `
        AI-generated sticker collection:
        
        • Unique Designs
        • Limited Editions
        • Custom Collections
        • Digital Art Fusion
        
        Each sticker tells a story.
      `,
      unlocksNodes: [] // Empty array, but still defined
    },
    essays: {
      title: "Digital Thoughts",
      content: `
        Exploring ideas through writing:
        
        • Tech Insights
        • Creative Process
        • Industry Analysis
        • Future Visions
        
        Dive into my thought process.
      `,
      unlocksNodes: [] // Empty array, but still defined
    }
  };
  
// Messages to display when a node is locked
export const lockMessages: Record<string, string> = {
  work: "Explore my introduction to unlock professional work",
  music: "Explore my introduction to unlock music section",
  stickers: "Check out my professional work to unlock stickers",
  essays: "Listen to my music to unlock essays"
};