import React from 'react';
import { motion } from 'framer-motion';
import { TopNavbar } from './TopNavbar';
import { Sidebar } from './Sidebar';
import { NotificationDrawer } from '@/components/feedback/NotificationDrawer';
import { Shield } from 'lucide-react';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 flex flex-col font-sans transition-colors relative overflow-x-hidden bg-grid-pattern">
      <div className="aurora-blob aurora-2 pointer-events-none" />
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
          <div className="max-w-[1800px] mx-auto">
            {/* Neon scanline accent */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-indigo-500/0 animate-pulse" />
            
            <div className="flex items-center gap-2.5 mb-6 px-4 py-2 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-xs font-bold text-slate-200 w-fit backdrop-blur-md shadow-lg shadow-emerald-500/10">
              <Shield className="w-4 h-4 text-emerald-400" />
              Metropolitan Security Command Gateway
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-1" />
            </div>

            {children}
          </div>
        </motion.main>
      </div>

      <NotificationDrawer />
    </div>
  );
};
