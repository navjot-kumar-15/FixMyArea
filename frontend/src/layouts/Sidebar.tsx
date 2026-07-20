import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  MapPin,
  Bookmark,
  Users,
  Briefcase,
  Layers,
  BarChart3,
  ShieldCheck,
  Settings,
  HelpCircle,
  Calendar,
  CheckCircle,
  User,
  Radio,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role || 'guest';

  const citizenNav = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Report New Issue', icon: PlusCircle, path: '/report' },
    { label: 'My Reports', icon: FileText, path: '/my-reports' },
    { label: 'Nearby Map', icon: MapPin, path: '/map' },
    { label: 'Bookmarks', icon: Bookmark, path: '/bookmarks' },
    { label: 'Profile Settings', icon: User, path: '/profile' },
    { label: 'Help & FAQ', icon: HelpCircle, path: '/help' },
  ];

  const workerNav = [
    { label: 'Worker Overview', icon: LayoutDashboard, path: '/worker/dashboard' },
    { label: 'Assigned Work Orders', icon: Briefcase, path: '/worker/tasks' },
    { label: 'Shift Calendar', icon: Calendar, path: '/worker/calendar' },
    { label: 'Resolved History', icon: CheckCircle, path: '/worker/history' },
    { label: 'Profile Settings', icon: User, path: '/profile' },
  ];

  const adminNav = [
    { label: 'Admin Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Reports Directory', icon: FileText, path: '/admin/reports' },
    { label: 'Worker Roster', icon: Briefcase, path: '/admin/workers' },
    { label: 'User Accounts', icon: Users, path: '/admin/users' },
    { label: 'Service Areas', icon: Layers, path: '/admin/areas' },
    { label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { label: 'System Audit Logs', icon: ShieldCheck, path: '/admin/audit' },
    { label: 'System Settings', icon: Settings, path: '/admin/settings' },
  ];

  const currentNav =
    role === 'admin' ? adminNav : role === 'worker' ? workerNav : citizenNav;

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] sticky top-16 bg-white dark:bg-slate-950 border-r border-slate-200/60 dark:border-slate-900/60 p-4 flex flex-col justify-between hidden md:flex shrink-0">
      <div className="space-y-6">
        <div>
          <div className="px-3.5 mb-2.5 text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
            {role.toUpperCase()} CONSOLE
          </div>
          <nav className="space-y-1">
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-slate-100'
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

      {/* Footer Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/15 text-xs text-slate-600 dark:text-slate-400 space-y-1.5 shadow-sm">
        <div className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          SYSTEM SECURE
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
          Encrypted gateway connection active.
        </p>
      </div>
    </aside>
  );
};
