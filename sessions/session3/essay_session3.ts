// sanity/schemas/essay.ts
export default {
    name: 'essay',
    title: 'Essay',
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
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
        options: {
          list: [
            { title: 'Technology', value: 'technology' },
            { title: 'Creative Process', value: 'creative' },
            { title: 'Industry Analysis', value: 'industry' },
            { title: 'Future Insights', value: 'future' },
          ],
        },
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        validation: (Rule: any) => Rule.max(200),
      },
      {
        name: 'mainImage',
        title: 'Main Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [
          {
            type: 'block',
            styles: [
              { title: 'Normal', value: 'normal' },
              { title: 'H2', value: 'h2' },
              { title: 'H3', value: 'h3' },
              { title: 'Quote', value: 'blockquote' },
            ],
            marks: {
              decorators: [
                { title: 'Strong', value: 'strong' },
                { title: 'Emphasis', value: 'em' },
                { title: 'Code', value: 'code' },
              ],
            },
          },
          {
            type: 'image',
            fields: [
              {
                type: 'text',
                name: 'alt',
                title: 'Alternative Text',
                validation: (Rule: any) => Rule.required(),
              },
              {
                type: 'text',
                name: 'caption',
                title: 'Caption',
              },
            ],
          },
          {
            type: 'code',
            options: {
              language: 'typescript',
            },
          },
        ],
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
    ],
  };