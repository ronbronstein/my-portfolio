// sanity/schemas/project.ts
export default {
    name: 'project',
    title: 'Project',
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
        name: 'mainImage',
        title: 'Main image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'technologies',
        title: 'Technologies',
        type: 'array',
        of: [{ type: 'string' }],
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'link',
        title: 'Project Link',
        type: 'url',
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [
          {
            type: 'block',
          },
          {
            type: 'image',
            fields: [
              {
                type: 'text',
                name: 'alt',
                title: 'Alternative text',
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
    ],
  }