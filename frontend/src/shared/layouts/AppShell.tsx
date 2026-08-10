import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles, Sun, Moon } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleTheme } from '@/store/slices/themeSlice';
import { ToastProvider } from '@/components/ui/Toast';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans relative overflow-x-hidden bg-grid-pattern">
        {/* Ambient Aurora Orbs */}
        <div className="aurora-blob aurora-1 pointer-events-none" />
        <div className="aurora-blob aurora-2 pointer-events-none" />
        <div className="aurora-blob aurora-3 pointer-events-none" />

        {/* Foundation Shell Header */}
        <header className="sticky top-0 z-40 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight flex items-center gap-1.5 font-display">
                Civic<span className="text-indigo-400">Connect</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] uppercase font-mono tracking-wider">
                  Phase 1 Foundation
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Design System Shell
            </div>

            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title={`Toggle ${mode === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              {mode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 relative z-10"
        >
          {children}
        </motion.main>

        {/* Foundation Shell Footer */}
        <footer className="border-t border-slate-900 bg-slate-950/60 backdrop-blur-xl py-6 px-6 text-center text-xs text-slate-500">
          CivicConnect Core Design System & Foundation Layer &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </ToastProvider>
  );
};
