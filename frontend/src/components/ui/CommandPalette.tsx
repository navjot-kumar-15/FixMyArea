import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setRole, logout } from '@/store/slices/authSlice';
import { toggleTheme } from '@/store/slices/themeSlice';
import {
  Search,
  Command,
  LayoutDashboard,
  PlusCircle,
  Map,
  Bookmark,
  User,
  Shield,
  Briefcase,
  Moon,
  Sun,
  LogOut,
  FileText,
  Users,
  Settings,
  BarChart2,
  MapPin,
  CheckCircle2,
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
  const { user } = useSelector((state: RootState) => state.theme ? state.auth : state.auth);
  const mode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by listener in navbar
        }
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

  const handleRoleSwitch = (role: 'citizen' | 'worker' | 'admin') => {
    dispatch(setRole(role));
    onClose();
    if (role === 'citizen') navigate('/dashboard');
    else if (role === 'worker') navigate('/worker/dashboard');
    else if (role === 'admin') navigate('/admin/dashboard');
  };

  const navigationGroup = [
    { title: 'Citizen Dashboard', icon: LayoutDashboard, action: () => handleNavigate('/dashboard'), role: 'all' },
    { title: 'Create New Issue Report', icon: PlusCircle, action: () => handleNavigate('/report'), role: 'citizen' },
    { title: 'Interactive Issues Map', icon: Map, action: () => handleNavigate('/map'), role: 'all' },
    { title: 'My Submitted Reports', icon: FileText, action: () => handleNavigate('/my-reports'), role: 'citizen' },
    { title: 'Bookmarked Reports', icon: Bookmark, action: () => handleNavigate('/bookmarks'), role: 'citizen' },
    { title: 'Worker Tasks & Assignments', icon: Briefcase, action: () => handleNavigate('/worker/tasks'), role: 'worker' },
    { title: 'Worker Calendar', icon: CalendarIcon, action: () => handleNavigate('/worker/calendar'), role: 'worker' },
    { title: 'Admin Command Center', icon: Shield, action: () => handleNavigate('/admin/dashboard'), role: 'admin' },
    { title: 'Manage City Reports', icon: CheckCircle2, action: () => handleNavigate('/admin/reports'), role: 'admin' },
    { title: 'User & Citizen Directory', icon: Users, action: () => handleNavigate('/admin/users'), role: 'admin' },
    { title: 'Service Areas & Jurisdictions', icon: MapPin, action: () => handleNavigate('/admin/areas'), role: 'admin' },
    { title: 'Analytics & Heatmaps', icon: BarChart2, action: () => handleNavigate('/admin/analytics'), role: 'admin' },
    { title: 'System & AI Settings', icon: Settings, action: () => handleNavigate('/admin/settings'), role: 'admin' },
  ];

  const filteredNav = navigationGroup.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
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
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50"
        >
          {/* Input Header */}
          <div className="flex items-center px-4 py-3.5 border-b border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
            <Search className="w-5 h-5 text-indigo-500 mr-3 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command, page name, or issue ID... (Press Esc to exit)"
              className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus:outline-none"
            />
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-200/60 dark:bg-slate-800 px-2 py-1 rounded-md ml-2 shrink-0">
              <Command className="w-3 h-3" /> K
            </div>
          </div>

          {/* Quick Demo Role Switcher Bar */}
          <div className="px-4 py-2 bg-indigo-50/60 dark:bg-indigo-950/30 border-b border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between text-xs">
            <span className="text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Instant Role Switcher:
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleRoleSwitch('citizen')}
                className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors font-medium"
              >
                Citizen
              </button>
              <button
                onClick={() => handleRoleSwitch('worker')}
                className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors font-medium"
              >
                Worker
              </button>
              <button
                onClick={() => handleRoleSwitch('admin')}
                className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors font-medium"
              >
                Admin
              </button>
            </div>
          </div>

          {/* Options List */}
          <div className="max-h-96 overflow-y-auto p-2 space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Navigation & Actions
            </div>
            {filteredNav.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={item.action}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800/80 text-left group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-500 group-hover:text-white transition-colors text-slate-600 dark:text-slate-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-indigo-500">Jump →</span>
                </button>
              );
            })}

            <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider pt-3">
              Preferences
            </div>

            {/* Theme Switcher Button */}
            <button
              onClick={() => {
                dispatch(toggleTheme());
                onClose();
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800/80 text-left group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-amber-500">
                  {mode === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </div>
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  Switch to {mode === 'dark' ? 'Light' : 'Dark'} Mode
                </span>
              </div>
              <span className="text-xs text-slate-400">Toggle</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={() => {
                dispatch(logout());
                handleNavigate('/login');
              }}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 text-left group transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400">
                  <LogOut className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-rose-600 dark:text-rose-400">
                  Sign Out of Session
                </span>
              </div>
              <span className="text-xs text-rose-400">Exit</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
