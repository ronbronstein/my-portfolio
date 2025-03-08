// src/app/structuredData.tsx - Change to a proper React component
'use client';

import React, { useEffect } from 'react';

export default function StructuredData() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;
    
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Developer Name",
      "url": "https://example.com",
      "jobTitle": "Creative Developer",
      "knowsAbout": [
        "Software Development",
        "Web Development",
        "Interactive Design"
      ],
      "sameAs": [
        "https://twitter.com/example",
        "https://github.com/example"
      ],
      "mainEntityOfPage": {
        "@type": "WebSite",
        "name": "Portfolio",
        "url": "https://example.com",
        "description": "Interactive Matrix-themed portfolio"
      }
    };
    
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);
  
  return null;
}
