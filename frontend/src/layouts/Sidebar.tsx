import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '@/store';
import { filterNavItems } from '@/permissions/navigation';
import { Sparkles } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role || 'guest';

  // Dynamic sidebar items generated strictly from permission matrix
  const sidebarNav = filterNavItems(role, 'sidebar');

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] fixed top-16 left-0 overflow-y-auto bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-900/60 p-4 flex flex-col justify-between hidden md:flex shrink-0 z-30 scrollbar-thin">
      <div className="space-y-6">
        <div>
          <div className="px-3.5 mb-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center justify-between">
            <span>{role.toUpperCase()} CONSOLE</span>
            <Sparkles className="w-3 h-3 text-indigo-500 animate-pulse" />
          </div>

          <nav className="space-y-1 relative">
            {sidebarNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className="relative flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all group"
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActiveBg"
                      className="absolute inset-0 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  <Icon
                    className={`relative z-10 w-4 h-4 transition-transform group-hover:scale-110 ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                    }`}
                  />
                  <span
                    className={`relative z-10 ${
                      isActive
                        ? 'text-white font-bold'
                        : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-100'
                    }`}
                  >
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer System Status Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 text-xs text-slate-600 dark:text-slate-400 space-y-1.5 shadow-sm relative overflow-hidden group mt-auto pt-4">
        <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-indigo-500/10 blur-lg group-hover:bg-indigo-500/20 transition-all" />
        <div className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="tracking-wide">GRID ONLINE</span>
        </div>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          Real-time municipal telemetry active.
        </p>
      </div>
    </aside>
  );
};
