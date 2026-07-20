import React from 'react';
import { motion } from 'framer-motion';
import { TopNavbar } from './TopNavbar';
import { Sidebar } from './Sidebar';
import { NotificationDrawer } from '@/components/feedback/NotificationDrawer';
import { Terminal } from 'lucide-react';

export const WorkerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 flex flex-col font-sans transition-colors relative overflow-x-hidden bg-grid-pattern">
      <div className="aurora-blob aurora-1 pointer-events-none" />
      <div className="aurora-blob aurora-3 pointer-events-none" />

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
          className="flex-1 md:pl-64 p-4 md:p-8 min-w-0 relative"
        >
          <div className="max-w-[1600px] mx-auto">
            {/* Subtle top glow line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-indigo-500/0" />
            
            <div className="flex items-center gap-2.5 mb-6 px-4 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs font-bold text-purple-300 w-fit backdrop-blur-md shadow-lg shadow-purple-500/10">
              <Terminal className="w-4 h-4 text-purple-400 animate-pulse" />
              Field Operation Terminal Active
            </div>

            {children}
          </div>
        </motion.main>
      </div>

      <NotificationDrawer />
    </div>
  );
};
