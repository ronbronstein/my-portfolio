// sanity/schema.ts
import { type SchemaTypeDefinition } from 'sanity'
import project from './schemas/project'
import music from './schemas/music'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, music],
}