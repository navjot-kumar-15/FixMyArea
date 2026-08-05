import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RootState } from '@/store';
import { MapPin, ShieldAlert, Sparkles, User, ChevronRight } from 'lucide-react';

export const WorkspaceHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const role = user?.role || 'citizen';

  const getWorkspaceTitle = () => {
    if (location.pathname.startsWith('/admin')) return 'City Operations Center';
    if (location.pathname.startsWith('/worker')) return 'Tactical Field Command';
    return 'Civic Impact Hub';
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full pt-6 pb-2 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-between z-20 relative"
    >
      {/* Workspace Brand & Sector Anchor */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-display uppercase tracking-widest text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              CivicConnect
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {getWorkspaceTitle()}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
              <MapPin className="w-3 h-3 text-indigo-500" />
              <span>San Francisco Metropolitan Sector 4</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Grid Live
            </span>
          </div>
        </div>
      </div>

      {/* Role Workspace Quick Switcher Pills */}
      <div className="hidden md:flex items-center gap-2">
        {user?.role === 'admin' && (
          <div className="flex items-center gap-1 bg-slate-200/60 dark:bg-slate-900/60 p-1 rounded-2xl border border-slate-300/50 dark:border-slate-800/50 text-xs font-medium">
            <button
              onClick={() => navigate('/dashboard')}
              className={`px-3 py-1 rounded-xl transition-all ${
                !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/worker')
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Citizen View
            </button>
            <button
              onClick={() => navigate('/worker/dashboard')}
              className={`px-3 py-1 rounded-xl transition-all ${
                location.pathname.startsWith('/worker')
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Worker View
            </button>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className={`px-3 py-1 rounded-xl transition-all ${
                location.pathname.startsWith('/admin')
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Admin Ops
            </button>
          </div>
        )}

        {/* User Chip */}
        <div className="flex items-center gap-2.5 pl-2">
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold text-xs">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
              {user?.name || 'Citizen User'}
            </span>
            <span className="text-[10px] capitalize text-indigo-600 dark:text-indigo-400 font-semibold">
              {role} Account
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
