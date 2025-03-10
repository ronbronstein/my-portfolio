ron.b@Rons-MacBook-Air ~/Coding/ron-bronstein-website % tree -I "node_modules|.next|.git" -L 4
.
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── sounds
│   │   ├── matrix-rain.wav
│   │   ├── modal-close.wav
│   │   ├── modal-open.wav
│   │   ├── node-select.wav
│   │   └── node-unlock.wav
│   ├── vercel.svg
│   └── window.svg
├── sanity
│   ├── schema.ts
│   └── schemas
│       ├── essay.ts
│       ├── music.ts
│       ├── project.ts
│       ├── sticker.ts
│       └── stickerCollection.ts
├── sanity.cli.ts
├── sanity.config.ts
├── scripts
│   └── generate-sounds.js
├── sessions
│   ├── session1
│   │   ├── BaseNode_session1.tsx
│   │   ├── MatrixModal_session1.tsx
│   │   ├── MatrixRain_session1.tsx
│   │   ├── NodeSystem_session1.tsx
│   │   ├── layout_session1.tsx
│   │   ├── nodeContent_session1.ts
│   │   ├── page_session1.tsx
│   │   ├── session-summery.txt
│   │   ├── theme_session1.ts
│   │   └── tree_session1.txt
│   ├── session2
│   │   ├── BaseNode_session2.tsx
│   │   ├── DistortionEffect_session2.tsx
│   │   ├── env.local_session2.template
│   │   ├── sanity
│   │   │   ├── schema_session2.ts
│   │   │   └── schemas
│   │   ├── summary_session2.md
│   │   └── tree_session2.txt
│   ├── session3
│   │   ├── BaseNode_session3.tsx
│   │   ├── DistortionEffect_session3.tsx
│   │   ├── MatrixModal_session3.tsx
│   │   ├── MatrixRain_session3.tsx
│   │   ├── NodeSystem_session3.tsx
│   │   ├── essay_session3.ts
│   │   ├── music_session3.ts
│   │   ├── nodeContent_session3.ts
│   │   ├── project_session3.ts
│   │   ├── schema_session3.ts
│   │   ├── session3_summery.md
│   │   ├── stickerCollection_session3.ts
│   │   ├── sticker_session3.ts
│   │   ├── theme_session3.ts
│   │   └── tree_session3_session3.txt
│   └── session4
│       ├── components_matrix_GlitchText_session4.tsx
│       ├── components_matrix_LoadingSequence_session4.tsx
│       ├── components_nodes_BaseNode_session4.tsx
│       ├── components_nodes_NodeSystem_session4.tsx
│       ├── components_shared_MatrixModal_session4.tsx
│       ├── hooks_useMediaQuery_session4.ts
│       ├── summary_session4.md
│       └── tree_session4.txt
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── studio
│   │       └── [[...tool]]
│   ├── components
│   │   ├── SanityContentProvider.tsx
│   │   ├── content
│   │   │   ├── EssayContent.tsx
│   │   │   ├── MusicContent.tsx
│   │   │   ├── ProjectContent.tsx
│   │   │   └── StickerContent.tsx
│   │   ├── matrix
│   │   │   ├── GlitchText.tsx
│   │   │   ├── LoadingSequence.tsx
│   │   │   └── MatrixRain.tsx
│   │   ├── nodes
│   │   │   ├── BaseNode.tsx
│   │   │   ├── DistortionEffect.tsx
│   │   │   └── NodeSystem.tsx
│   │   ├── shared
│   │   │   └── MatrixModal.tsx
│   │   └── sound
│   │       └── SoundProvider.tsx
│   ├── hooks
│   │   ├── useMediaQuery.ts
│   │   └── useSanityContent.ts
│   ├── lib
│   │   ├── nodeContent.ts
│   │   ├── sanity.client.ts
│   │   └── theme.ts
│   ├── sanity
│   │   ├── env.ts
│   │   ├── lib
│   │   │   ├── client.ts
│   │   │   ├── image.ts
│   │   │   └── live.ts
│   │   ├── schemaTypes
│   │   │   └── index.ts
│   │   └── structure.ts
│   └── utils
│       └── soundEffects.ts
├── tailwind.config.ts
└── tsconfig.json

29 directories, 96 files