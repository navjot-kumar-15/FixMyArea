import React from 'react';
import { TopNavbar } from './TopNavbar';
import { Sidebar } from './Sidebar';
import { NotificationDrawer } from '@/components/feedback/NotificationDrawer';
import { ShieldAlert, Terminal } from 'lucide-react';

export const WorkerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans transition-colors">
      <TopNavbar />
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto min-w-0 bg-slate-950/40 relative">
          {/* Subtle top glow line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500/0 via-purple-500/40 to-indigo-500/0" />
          
          <div className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-purple-300 w-fit">
            <Terminal className="w-4 h-4 animate-pulse" /> Field Operation Terminal Active
          </div>

          {children}
        </main>
      </div>
      <NotificationDrawer />
    </div>
  );
};
