import React from 'react';
import { TopNavbar } from './TopNavbar';
import { Sidebar } from './Sidebar';
import { NotificationDrawer } from '@/components/feedback/NotificationDrawer';
import { Shield, Radio } from 'lucide-react';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors">
      <TopNavbar />
      <div className="flex flex-1 w-full max-w-[1800px] mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto min-w-0 bg-slate-950 relative">
          {/* Neon scanline accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/40 to-indigo-500/0 animate-pulse" />
          
          <div className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 w-fit">
            <Shield className="w-4 h-4 text-emerald-500" />
            Metropolitan Security Command Gateway
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-1" />
          </div>

          {children}
        </main>
      </div>
      <NotificationDrawer />
    </div>
  );
};
