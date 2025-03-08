// src/components/shared/TabSystem.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TabSystemProps } from '@/types';

interface Tab {
  id: string;
  label: string;
}



const TabSystem = ({ 
  tabs, 
  initialTabId, 
  children, 
  isMobile = false 
}: TabSystemProps) => {
  const [activeTabId, setActiveTabId] = useState(initialTabId || tabs[0].id);

  return (
    <div className="flex flex-col h-full">
      {/* Tab navigation */}
      <div className={`flex gap-1 ${isMobile ? 'mb-3' : 'mb-6'} border-b border-green-500/20`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`
              px-4 py-2 rounded-t-md text-sm font-medium transition-colors
              ${activeTabId === tab.id 
                ? 'bg-green-900/30 text-green-400 border-b-2 border-green-500' 
                : 'text-green-500/70 hover:text-green-400 hover:bg-green-900/20'}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div 
        key={activeTabId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex-1 overflow-auto"
      >
        {children(activeTabId)}
      </motion.div>
    </div>
  );
};

export default TabSystem;
