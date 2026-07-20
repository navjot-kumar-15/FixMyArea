import React from 'react';
import { TopNavbar } from './TopNavbar';
import { Sidebar } from './Sidebar';
import { NotificationDrawer } from '@/components/feedback/NotificationDrawer';

export const CitizenLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors">
      <TopNavbar />
      <div className="flex flex-1 w-full max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto min-w-0">{children}</main>
      </div>
      <NotificationDrawer />
    </div>
  );
};
