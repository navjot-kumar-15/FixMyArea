import React from 'react';
import { TopNavbar } from './TopNavbar';
import { NotificationDrawer } from '@/components/feedback/NotificationDrawer';
import { Layers } from 'lucide-react';

export const GuestLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors">
      <TopNavbar />
      <main className="flex-1">{children}</main>
      
      {/* Public Landing Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-slate-900 dark:text-white text-lg">CivicConnect</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Empowering cities with real-time issue reporting, field worker dispatching, and transparent municipal management.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Platform</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li><a href="/map" className="hover:text-blue-600">Public Issues Map</a></li>
              <li><a href="/#how-it-works" className="hover:text-blue-600">How It Works</a></li>
              <li><a href="/report" className="hover:text-blue-600">Submit a Report</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Roles</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li><a href="/login" className="hover:text-blue-600">Citizen Portal</a></li>
              <li><a href="/login" className="hover:text-blue-600">Worker Dashboard</a></li>
              <li><a href="/login" className="hover:text-blue-600">Admin Control Center</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">Support & Legal</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li><a href="/help" className="hover:text-blue-600">Help Center & FAQ</a></li>
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} CivicConnect Platform. All rights reserved.
        </div>
      </footer>

      <NotificationDrawer />
    </div>
  );
};
