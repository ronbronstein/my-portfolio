export interface Sticker {
    id: string;
    title: string;
    slug: string;
    description: string;
    imageUrl: string;
    price?: number;
    shopUrl?: string;
  }
  
  export const stickers: Sticker[] = [
    {
      id: 'matrix-code',
      title: 'Matrix Code',
      slug: 'matrix-code',
      description: 'Digital rain cascade in sticker form',
      imageUrl: '/images/stickers/matrix-code.jpg',
      price: 4.99,
      shopUrl: 'https://your-shop-url.com/stickers/matrix-code'
    },
    {
      id: 'neo-pixel',
      title: 'Neo Pixel Art',
      slug: 'neo-pixel',
      description: 'Pixel art sticker of Neo dodging bullets',
      imageUrl: '/images/stickers/neo-pixel.jpg',
      price: 3.99,
      shopUrl: 'https://your-shop-url.com/stickers/neo-pixel'
    },
    // Add more stickers as needed
  ];
  
  export const shopUrl = 'https://your-sticker-shop.com';