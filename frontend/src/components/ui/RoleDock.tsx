import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RootState } from '@/store';
import { getNavItemsForRole } from '@/permissions/navigation';
import { toggleNotificationDrawer } from '@/store/slices/notificationSlice';
import { logout } from '@/store/slices/authSlice';
import { Bell, LogOut } from 'lucide-react';

export const RoleDock: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role || 'guest';
  const unreadCount = useSelector((state: RootState) =>
    state.notifications.items.filter((n) => !n.isRead).length
  );

  // Get strictly permitted navigation items for the active persona
  const dockItems = getNavItemsForRole(role);

  if (dockItems.length === 0) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-full px-2 sm:px-4 pointer-events-none flex justify-center">
      <motion.nav
        aria-label="Role Navigation Dock"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="pointer-events-auto flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-slate-950/90 backdrop-blur-2xl border border-slate-800/80 shadow-2xl shadow-slate-950/80 text-white max-w-[96vw] sm:max-w-none overflow-hidden"
      >
        {/* Navigation Items (Scrollable on small mobile screens) */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-full border border-slate-800/60 overflow-x-auto no-scrollbar max-w-[calc(100vw-110px)] sm:max-w-none">
          {dockItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                aria-label={item.label}
                className={`
                  relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all select-none font-display shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500
                  ${isActive ? 'text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}
                `}
                title={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="roleDockActive"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-md shadow-indigo-500/30"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <Icon className={`relative z-10 w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="relative z-10 hidden lg:inline whitespace-nowrap">{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Global Controls: Notifications & Logout (if authenticated) */}
        {user && (
          <div className="flex items-center gap-1 pl-1 shrink-0">
            <button
              onClick={() => dispatch(toggleNotificationDrawer())}
              aria-label={`Notifications (${unreadCount} unread)`}
              className="relative p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-slate-950 animate-pulse" />
              )}
            </button>

            <button
              onClick={handleLogout}
              aria-label="Sign Out of Session"
              className="p-2 rounded-full text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors shrink-0 focus:outline-none focus:ring-2 focus:ring-rose-500"
              title="Sign Out / Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.nav>
    </div>
  );
};
