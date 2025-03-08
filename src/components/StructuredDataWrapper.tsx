// src/components/StructuredDataWrapper.tsx
'use client';

import dynamic from 'next/dynamic';

// Now this dynamic import is inside a Client Component, so it's allowed
const StructuredData = dynamic(
  () => import('@/app/structuredData'),
  { ssr: false }
);

export default function StructuredDataWrapper() {
  return <StructuredData />;
}
