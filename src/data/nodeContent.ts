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
        > System Access: Developer Protocol
        
        $ Skills.list
        • Software Development [███████████] 95%
        • Creative Technology [██████████░] 85% 
        • Digital Innovation [████████░░░] 70%
        • Interactive Experiences [███████████] 95%
        
        $ Projects.running
        Each project represents a unique challenge in the digital realm.
      `,
      unlocksNodes: ['stickers']
    },
    music: {
      title: "Sonic Frequencies",
      content: `
        > Audio Subsystem: Active
        
        $ Genres.analyze
        • Electronic [██████████] 
        • Ambient [████████░░] 
        • Experimental [███████░░░]
        • Soundscapes [██████████]
        
        $ Audio.stream
        Explore my musical universe.
      `,
      unlocksNodes: ['essays']
    },
    stickers: {
      title: "Digital Art Matrix",
      content: `
        > Visual Protocol: Initialized
        
        $ Designs.render
        • Unique Patterns [█████████░]
        • Limited Editions [████████░░]
        • Custom Collections [███████░░░]
        • Digital Fusion [██████████]
        
        $ Art.display
        Each sticker tells a story.
      `,
      unlocksNodes: [] // Empty array, but still defined
    },
    essays: {
      title: "Digital Thoughts",
      content: `
        > Memory Core: Connected
        
        $ Thoughts.catalog
        • Tech Insights [█████████░]
        • Creative Process [████████░░]
        • Industry Analysis [███████░░░]
        • Future Visions [██████████]
        
        $ Mind.read
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