import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RootState } from '@/store';
import { MapPin, Sparkles, ChevronRight } from 'lucide-react';

export const WorkspaceHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const role = user?.role || 'citizen';

  const getWorkspaceTitle = () => {
    if (role === 'admin') return 'City Ops Desk';
    if (role === 'worker') return 'Tactical Field Command';
    return 'Civic Impact Hub';
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full pt-4 sm:pt-6 pb-2 px-3 sm:px-8 max-w-7xl mx-auto flex items-center justify-between z-20 relative gap-2"
    >
      {/* Workspace Brand & Sector Anchor */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="text-[10px] sm:text-xs font-bold font-display uppercase tracking-widest text-indigo-400 flex items-center gap-1 shrink-0">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" />
              CivicConnect
            </span>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-500 shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold text-slate-300 truncate">
              {getWorkspaceTitle()}
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-indigo-300 text-[10px] sm:text-xs font-medium shrink-0">
              <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-indigo-400" />
              <span>Metropolitan Sector 4</span>
            </div>
            <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] sm:text-[11px] font-semibold shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Grid Live
            </span>
          </div>
        </div>
      </div>

      {/* Role Workspace Quick Switcher Pills (ADMIN Privilege Only) & User Profile */}
      <div className="flex items-center gap-2 shrink-0">
        {user?.role === 'admin' && (
          <div className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-2xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => navigate('/dashboard')}
              className={`px-3 py-1 rounded-xl transition-all ${
                !location.pathname.startsWith('/admin') && !location.pathname.startsWith('/worker')
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Citizen View
            </button>
            <button
              onClick={() => navigate('/worker/dashboard')}
              className={`px-3 py-1 rounded-xl transition-all ${
                location.pathname.startsWith('/worker')
                  ? 'bg-slate-800 text-white font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Worker View
            </button>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className={`px-3 py-1 rounded-xl transition-all ${
                location.pathname.startsWith('/admin')
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Admin Ops
            </button>
          </div>
        )}

        {/* User Chip */}
        <div className="flex items-center gap-2 pl-1 sm:pl-2">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-white font-bold text-xs shrink-0">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-white leading-tight">
              {user?.name || 'Guest User'}
            </span>
            <span className="text-[10px] capitalize text-indigo-400 font-bold uppercase font-mono">
              {role}
            </span>
          </div>
        </div>
      </div>
    </motion.header>
  );
};
