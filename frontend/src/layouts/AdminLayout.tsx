import React from 'react';
import { motion } from 'framer-motion';
import { FloatingHudDock } from '@/components/navigation/FloatingHudDock';
import { WorkspaceHeader } from '@/components/navigation/WorkspaceHeader';
import { NotificationDrawer } from './NotificationDrawer';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f6f8fd] dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors relative overflow-x-hidden bg-grid-pattern pb-32 sm:pb-36">
      <div className="aurora-blob aurora-2 pointer-events-none" />
      <div className="aurora-blob aurora-3 pointer-events-none" />

      <WorkspaceHeader />

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 relative z-10"
      >
        {children}
      </motion.main>

      <FloatingHudDock />
      <NotificationDrawer />
    </div>
  );
};
