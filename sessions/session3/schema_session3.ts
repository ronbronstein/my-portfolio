// sanity/schema.ts
import { type SchemaTypeDefinition } from 'sanity'
import project from './schemas/project'
import music from './schemas/music'
import essay from './schemas/essay'
import sticker from './schemas/sticker'
import stickerCollection from './schemas/stickerCollection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, music, essay, sticker, stickerCollection],
};