import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '@/store';
import { toggleTheme } from '@/store/slices/themeSlice';
import { toggleNotificationDrawer } from '@/store/slices/notificationSlice';
import { logout, switchRole } from '@/store/slices/authSlice';
import { Avatar } from '@/components/ui/Avatar';
import {
  LayoutDashboard,
  PlusCircle,
  Map,
  FileText,
  User as UserIcon,
  Bell,
  Sun,
  Moon,
  Search,
  Users,
  BarChart3,
  LogOut,
  Briefcase,
  ShieldCheck,
  ChevronUp,
  CheckSquare,
  Sparkles,
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

export const FloatingHudDock: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const mode = useSelector((state: RootState) => state.theme.mode);
  const unreadCount = useSelector((state: RootState) =>
    state.notifications.items.filter((n) => !n.isRead).length
  );

  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);

  // Admin Central Dock Items (including Profile)
  const adminDockItems: NavItem[] = [
    { label: 'Ops Hub', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Work Orders', path: '/admin/reports', icon: FileText },
    { label: 'Workers', path: '/admin/workers', icon: Briefcase },
    { label: 'Users', path: '/admin/users', icon: Users },
    { label: 'Live Map', path: '/map', icon: Map },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Profile', path: '/profile', icon: UserIcon },
  ];

  const handleCommandOpen = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-2 sm:px-4 pointer-events-none">
      {/* Optional Role Switcher Drop-up Menu */}
      <AnimatePresence>
        {isRoleMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="pointer-events-auto mb-3 mx-auto max-w-xs p-3 rounded-2xl bg-slate-900/95 dark:bg-slate-950/95 border border-indigo-500/40 text-white shadow-2xl backdrop-blur-xl space-y-2"
          >
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 font-display px-2">
              Preview Role Views
            </div>
            <button
              onClick={() => {
                dispatch(switchRole('admin'));
                navigate('/admin/dashboard');
                setIsRoleMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-between font-display"
            >
              <span>👑 Administrator (Full Privilege)</span>
            </button>
            <button
              onClick={() => {
                dispatch(switchRole('worker'));
                navigate('/worker/dashboard');
                setIsRoleMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 text-slate-300 flex items-center justify-between font-display"
            >
              <span>👷 Field Worker View</span>
            </button>
            <button
              onClick={() => {
                dispatch(switchRole('citizen'));
                navigate('/dashboard');
                setIsRoleMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold hover:bg-slate-800 text-slate-300 flex items-center justify-between font-display"
            >
              <span>🏡 Citizen Public View</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: 80, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
        className="pointer-events-auto bg-slate-900/95 dark:bg-slate-950/95 text-white rounded-full p-1.5 sm:p-2 shadow-2xl shadow-indigo-950/60 flex items-center justify-between gap-1 sm:gap-2 border border-indigo-500/40 backdrop-blur-2xl max-w-full overflow-hidden"
      >
        {/* Left Section: Brand Badge, Role Dropdown & Command Palette */}
        <div className="flex items-center gap-1 sm:gap-1.5 pl-1 shrink-0">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 3 }}
            onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
            className="cursor-pointer px-2.5 py-1 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center gap-1.5 text-white shadow-md shadow-indigo-500/30 font-extrabold text-xs tracking-tight font-display shrink-0"
            title="Switch / Preview Role View"
          >
            <span>CC</span>
            <ChevronUp className={`w-3 h-3 transition-transform ${isRoleMenuOpen ? 'rotate-180' : ''}`} />
          </motion.div>

          <button
            onClick={handleCommandOpen}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:bg-indigo-500/20 hover:text-white transition-all border border-transparent hover:border-indigo-500/30"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded-md border border-slate-700">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Center Section: Responsive Admin Dock Items */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-800/80 p-1 rounded-full border border-slate-700/60 overflow-x-auto no-scrollbar max-w-[55vw] sm:max-w-none">
          {adminDockItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  relative flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-bold tracking-tight transition-all duration-300 select-none shrink-0 font-display
                  ${isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/60'}
                `}
                title={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDockNav"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 rounded-full shadow-md shadow-indigo-500/40"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="relative z-10 hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Section: Report Issue, Theme, Notifications & LOGOUT */}
        <div className="flex items-center gap-1 sm:gap-1.5 pr-1 shrink-0">
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/report')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-md shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all shrink-0 font-display"
            title="Report New Issue"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Report</span>
          </motion.button>

          <button
            onClick={() => dispatch(toggleNotificationDrawer())}
            className="relative p-2 rounded-full text-slate-300 hover:bg-indigo-500/20 hover:text-white transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-slate-900 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-full text-slate-300 hover:bg-indigo-500/20 hover:text-white transition-colors"
            title="Toggle Theme"
          >
            {mode === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => navigate('/profile')}
            className="p-1 rounded-full hover:ring-2 hover:ring-indigo-400 transition-all"
            title={`Profile: ${user?.name || 'Admin'}`}
          >
            <Avatar src={user?.avatarUrl} name={user?.name || 'Admin'} size="sm" />
          </button>

          {/* Explicit Logout Button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-full text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 transition-colors"
            title="Sign Out / Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </motion.nav>
    </div>
  );
};
