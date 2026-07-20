import React from 'react';
import { motion } from 'framer-motion';
import { TopNavbar } from './TopNavbar';
import { Sidebar } from './Sidebar';
import { NotificationDrawer } from '@/components/feedback/NotificationDrawer';

export const CitizenLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040711] flex flex-col font-sans transition-colors relative overflow-x-hidden bg-grid-pattern">
      {/* Ambient Background Glow Orbs */}
      <div className="aurora-blob aurora-1 pointer-events-none" />
      <div className="aurora-blob aurora-2 pointer-events-none" />

      {/* Fixed TopNavbar */}
      <TopNavbar />

      {/* Main Layout Area with Fixed Sidebar Offset */}
      <div className="flex flex-1 w-full pt-16 relative z-10">
        <Sidebar />
        <motion.main
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 md:pl-64 p-4 md:p-8 min-w-0"
        >
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </motion.main>
      </div>

      <NotificationDrawer />
    </div>
  );
};
