import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { switchRole, logout } from '@/store/slices/authSlice';
import { toggleTheme } from '@/store/slices/themeSlice';
import { toggleNotificationDrawer } from '@/store/slices/notificationSlice';
import { UserRole } from '@/types';
import { filterNavItems } from '@/permissions/navigation';
import {
  Sun,
  Moon,
  Bell,
  Search,
  User as UserIcon,
  LogOut,
  Shield,
  Briefcase,
  UserCheck,
  ChevronDown,
  Layers,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';

export const TopNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const mode = useSelector((state: RootState) => state.theme.mode);
  const notifications = useSelector((state: RootState) => state.notifications.items);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const role: UserRole = user?.role || 'guest';
  const isHomePage = location.pathname === '/';

  const roleBadges: Record<UserRole, { label: string; variant: any; icon: any }> = {
    guest: { label: 'Guest', variant: 'secondary', icon: UserIcon },
    citizen: { label: 'Citizen', variant: 'primary', icon: UserCheck },
    worker: { label: 'Worker', variant: 'purple', icon: Briefcase },
    admin: { label: 'Admin', variant: 'danger', icon: Shield },
  };

  const currentRoleConfig = roleBadges[role];

  // Role dashboard target URL
  const dashboardPath =
    role === 'admin'
      ? '/admin/dashboard'
      : role === 'worker'
      ? '/worker/dashboard'
      : '/dashboard';

  // Dynamic mobile nav items generated from permission matrix
  const currentNav = filterNavItems(role, 'navbar');

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-900/60 px-4 md:px-6 flex items-center justify-between transition-all">
        {/* Left: Mobile Menu Hamburger & Brand Logo */}
        <div className="flex items-center gap-3">
          {isAuthenticated && !isHomePage && (
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 animate-pulse" /> : <Menu className="w-6 h-6" />}
            </button>
          )}

          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform border border-indigo-400/25">
              <Layers className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight flex items-center gap-1">
                Civic<span className="text-indigo-600 dark:text-indigo-400">Connect</span>
              </span>
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block -mt-1">
                Municipal Core
              </span>
            </div>
          </a>
        </div>

        {/* Central Search Bar / Command Palette Trigger */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <button
            onClick={() => {
              const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
              window.dispatchEvent(event);
            }}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-slate-400 text-xs font-medium hover:border-indigo-500/50 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer shadow-inner"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-indigo-500" />
              <span>Search authorized modules & actions...</span>
            </span>
            <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
              ⌘K
            </span>
          </button>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Identity Switcher Dropdown - Only shown inside protected views */}
          {!isHomePage && isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-850 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-xs font-semibold"
              >
                <Badge variant={currentRoleConfig.variant} size="sm">
                  {currentRoleConfig.label}
                </Badge>
                <span className="hidden sm:inline text-slate-500 dark:text-slate-300">Identity Switcher</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-850 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800/85">
                    Change Persona
                  </div>
                  {(['citizen', 'worker', 'admin'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        dispatch(switchRole(r));
                        setRoleMenuOpen(false);
                        if (r === 'admin') navigate('/admin/dashboard');
                        else if (r === 'worker') navigate('/worker/dashboard');
                        else navigate('/dashboard');
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors mt-1 ${
                        user?.role === r
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 font-bold'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-355'
                      }`}
                    >
                      <span className="capitalize">{r === 'worker' ? 'Field Worker' : r}</span>
                      {user?.role === r && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* If on home page and authenticated, show quick link to dashboard */}
          {isHomePage && isAuthenticated && (
            <button
              onClick={() => navigate(dashboardPath)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all"
            >
              <span>Go to Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            title={`Switch to ${mode === 'light' ? 'Dark' : 'Light'} mode`}
          >
            {mode === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-yellow-400 fill-yellow-400" />}
          </button>

          {/* Notification Bell Button */}
          {isAuthenticated && (
            <button
              onClick={() => dispatch(toggleNotificationDrawer())}
              className="relative p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-350 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-extrabold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          {/* User Profile Menu / Guest Auth Actions */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              >
                <Avatar src={user.avatarUrl} name={user.name} size="sm" />
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-tight">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium truncate max-w-[120px]">
                    {user.role.toUpperCase()}
                  </div>
                </div>
              </button>

              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-850 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-850">
                    <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      {user.name}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate(dashboardPath);
                        setProfileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      Console Dashboard
                    </button>
                    <button
                      onClick={() => {
                        dispatch(logout());
                        setProfileMenuOpen(false);
                        navigate('/login');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/65 flex items-center gap-2 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <NavLink
                to="/login"
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold shadow-sm transition-colors"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                className="hidden sm:inline-flex px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 text-xs font-bold transition-colors"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Slide-Over Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative flex-1 max-w-xs w-full bg-white dark:bg-slate-950 p-6 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200 border-r border-slate-100 dark:border-slate-900">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                    <Layers className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-white text-base">CivicConnect</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <div className="px-3 mb-2 text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                  {role.toUpperCase()} CONSOLE
                </div>
                <nav className="space-y-1">
                  {currentNav.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <NavLink
                        key={item.id}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-3.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-md font-bold'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-450'}`} />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}
                </nav>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-900 text-xs text-slate-550 space-y-2">
              <div className="font-bold text-slate-900 dark:text-white">{user?.name || 'Guest User'}</div>
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    dispatch(logout());
                    setMobileMenuOpen(false);
                    navigate('/login');
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 text-xs font-bold text-center"
                >
                  Sign Out
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold text-center"
                >
                  Sign In
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
