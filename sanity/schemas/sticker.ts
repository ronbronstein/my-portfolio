// sanity/schemas/sticker.ts
export default {
    name: 'sticker',
    title: 'Sticker',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'title',
          maxLength: 96,
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'stickerImage',
        title: 'Sticker Image',
        type: 'image',
        options: {
          hotspot: true,
        },
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        validation: (Rule: any) => Rule.required().precision(2),
      },
      {
        name: 'shopifyProductId',
        title: 'Shopify Product ID',
        type: 'string',
      },
      {
        name: 'aiPrompt',
        title: 'AI Generation Prompt',
        type: 'text',
        description: 'The prompt used to generate this sticker',
      },
      {
        name: 'collection',
        title: 'Collection',
        type: 'reference',
        to: [{ type: 'stickerCollection' }],
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags',
        },
      },
      {
        name: 'inStock',
        title: 'In Stock',
        type: 'boolean',
        initialValue: true,
      },
    ],
  };