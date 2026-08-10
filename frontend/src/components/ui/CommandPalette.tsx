import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { switchRole, logout } from '@/store/slices/authSlice';
import { toggleTheme } from '@/store/slices/themeSlice';
import { getNavItemsForRole } from '@/permissions/navigation';
import { UserRole } from '@/types';
import {
  Search,
  Command,
  Moon,
  Sun,
  LogOut,
  Sparkles,
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const role: UserRole = user?.role || 'guest';
  const mode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleRoleSwitch = (targetRole: UserRole) => {
    dispatch(switchRole(targetRole));
    onClose();
    if (targetRole === 'citizen') navigate('/dashboard');
    else if (targetRole === 'worker') navigate('/worker/dashboard');
    else if (targetRole === 'admin') navigate('/admin/dashboard');
    else navigate('/');
  };

  // Dynamically filter searchable actions based strictly on user permission matrix
  const authorizedNavItems = getNavItemsForRole(role);

  const filteredItems = authorizedNavItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-50 text-white"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
            <Search className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type an authorized command or page name... (Press Esc to exit)"
              className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
            />
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-1 rounded-md ml-2 shrink-0">
              <Command className="w-3 h-3" /> K
            </div>
          </div>

          {/* Quick Demo Persona Switcher Bar */}
          <div className="px-4 py-2 bg-indigo-950/40 border-b border-indigo-900/40 flex items-center justify-between text-xs">
            <span className="text-indigo-400 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Quick Persona Switcher:
            </span>
            <div className="flex items-center gap-1.5">
              {(['citizen', 'worker', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => handleRoleSwitch(r)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors capitalize ${
                    role === r
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-indigo-500'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Authorized Options List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Authorized Actions for {role.toUpperCase()}
            </div>
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.path)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800 text-left group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 group-hover:text-indigo-400 font-mono">Jump →</span>
                </button>
              );
            })}

            <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono pt-3">
              Preferences
            </div>

            {/* Theme Switcher Button */}
            <button
              onClick={() => {
                dispatch(toggleTheme());
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-slate-800 text-left group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800 text-amber-400">
                  {mode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </div>
                <span className="text-sm font-medium text-slate-200">
                  Switch to {mode === 'dark' ? 'Light' : 'Dark'} Mode
                </span>
              </div>
              <span className="text-xs text-slate-500 font-mono">Toggle</span>
            </button>

            {/* Logout Button */}
            {user && (
              <button
                onClick={() => {
                  dispatch(logout());
                  handleNavigate('/login');
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-rose-950/40 text-left group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-rose-900/30 text-rose-400">
                    <LogOut className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-rose-400">
                    Sign Out of Session
                  </span>
                </div>
                <span className="text-xs text-rose-500 font-mono">Exit</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
