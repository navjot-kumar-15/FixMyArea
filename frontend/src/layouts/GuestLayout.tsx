import React from 'react';
import { motion } from 'framer-motion';
import { TopNavbar } from './TopNavbar';
import { NotificationDrawer } from '@/components/feedback/NotificationDrawer';
import { Layers, Heart, Sparkles } from 'lucide-react';

export const GuestLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#040711] flex flex-col font-sans transition-colors relative overflow-hidden bg-grid-pattern">
      {/* Ambient Background Glow Orbs */}
      <div className="aurora-blob aurora-1 pointer-events-none" />
      <div className="aurora-blob aurora-2 pointer-events-none" />
      <div className="aurora-blob aurora-3 pointer-events-none" />

      <TopNavbar />

      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 relative z-10 pt-16"
      >
        {children}
      </motion.main>

      {/* Public Landing Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-850 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl py-14 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-slate-900 dark:text-white text-xl tracking-tight">
                Civic<span className="text-indigo-600 dark:text-indigo-400">Connect</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Empowering smart cities with real-time municipal issue reporting, field worker dispatching, and transparent community governance.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <li><a href="/map" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Public Issues Map</a></li>
              <li><a href="/#how-it-works" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">How It Works</a></li>
              <li><a href="/report" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Submit a Report</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Portals</h4>
            <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <li><a href="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Citizen Console</a></li>
              <li><a href="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Field Worker Gateway</a></li>
              <li><a href="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Admin Command Center</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Support</h4>
            <ul className="space-y-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <li><a href="/help" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Help Center & FAQ</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-200/60 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium gap-4">
          <div>&copy; {new Date().getFullYear()} CivicConnect Municipal Platform. All rights reserved.</div>
          <div className="flex items-center gap-1">
            Built for safer, smarter communities <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </footer>

      <NotificationDrawer />
    </div>
  );
};
