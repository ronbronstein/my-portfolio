// sanity/schemas/music.ts
export default {
    name: 'music',
    title: 'Music',
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
      },
      {
        name: 'playlistUrl',
        title: 'Playlist URL',
        type: 'url',
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'genre',
        title: 'Genre',
        type: 'string',
      },
      {
        name: 'mood',
        title: 'Mood',
        type: 'string',
        options: {
          list: [
            { title: 'Focused', value: 'focused' },
            { title: 'Energetic', value: 'energetic' },
            { title: 'Relaxed', value: 'relaxed' },
            { title: 'Dark', value: 'dark' },
          ],
        },
      },
      {
        name: 'tracks',
        title: 'Featured Tracks',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'title', type: 'string', title: 'Track Title' },
              { name: 'artist', type: 'string', title: 'Artist' },
            ],
          },
        ],
      },
    ],
  }