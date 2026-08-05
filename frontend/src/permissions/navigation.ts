import { UserRole } from '@/types';
import { PermissionKey, hasPermission } from '@/permissions';
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
  Compass,
  Home,
  LogIn,
  UserPlus,
  Radio,
  LucideIcon,
} from 'lucide-react';

export interface NavItemConfig {
  id: string;
  label: string;
  path: string;
  icon: LucideIcon;
  permission?: PermissionKey;
  showInSidebar?: boolean;
  showInNavbar?: boolean;
  showInDock?: boolean;
  showInCommandPalette?: boolean;
}

// ----------------------------------------------------
// 1. GUEST NAVIGATION CONFIGURATION
// ----------------------------------------------------
export const GUEST_NAV_CONFIG: NavItemConfig[] = [
  { id: 'guest-home', label: 'Home', path: '/', icon: Home },
  { id: 'guest-explore', label: 'Explore', path: '/explore', icon: Compass },
  { id: 'guest-map', label: 'Map', path: '/map', icon: MapPin },
  { id: 'guest-help', label: 'Help & FAQ', path: '/help', icon: HelpCircle },
  { id: 'guest-login', label: 'Sign In', path: '/login', icon: LogIn },
  { id: 'guest-register', label: 'Register', path: '/register', icon: UserPlus },
];

// ----------------------------------------------------
// 2. CITIZEN NAVIGATION CONFIGURATION
// ----------------------------------------------------
export const CITIZEN_NAV_CONFIG: NavItemConfig[] = [
  { id: 'citizen-home', label: 'Home', path: '/', icon: Home },
  { id: 'citizen-dashboard', label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { id: 'citizen-explore', label: 'Explore', path: '/explore', icon: Compass },
  { id: 'citizen-map', label: 'Nearby Map', path: '/map', icon: MapPin },
  { id: 'citizen-report-new', label: 'Create Report', path: '/report', icon: PlusCircle, permission: 'canCreateReport' },
  { id: 'citizen-my-reports', label: 'My Reports', path: '/my-reports', icon: FileText },
  { id: 'citizen-bookmarks', label: 'Saved Reports', path: '/bookmarks', icon: Bookmark },
  { id: 'citizen-profile', label: 'Profile & Settings', path: '/profile', icon: User },
];

// ----------------------------------------------------
// 3. WORKER NAVIGATION CONFIGURATION
// ----------------------------------------------------
export const WORKER_NAV_CONFIG: NavItemConfig[] = [
  { id: 'worker-dashboard', label: 'Work Overview', path: '/worker/dashboard', icon: LayoutDashboard, permission: 'canViewWorkerDashboard' },
  { id: 'worker-tasks', label: 'Assignments', path: '/worker/tasks', icon: Briefcase, permission: 'canUpdateProgress' },
  { id: 'worker-calendar', label: 'Route Planner', path: '/worker/calendar', icon: Calendar },
  { id: 'worker-history', label: 'Completed Work', path: '/worker/history', icon: CheckCircle },
  { id: 'worker-profile', label: 'Profile & Settings', path: '/profile', icon: User },
];

// ----------------------------------------------------
// 4. ADMIN NAVIGATION CONFIGURATION
// ----------------------------------------------------
export const ADMIN_NAV_CONFIG: NavItemConfig[] = [
  { id: 'admin-dashboard', label: 'Admin Ops', path: '/admin/dashboard', icon: LayoutDashboard, permission: 'canViewAdminDashboard' },
  { id: 'admin-reports', label: 'Reports Directory', path: '/admin/reports', icon: FileText },
  { id: 'admin-workers', label: 'Worker Roster', path: '/admin/workers', icon: Briefcase, permission: 'canAssignWorker' },
  { id: 'admin-users', label: 'User Accounts', path: '/admin/users', icon: Users, permission: 'canManageUsers' },
  { id: 'admin-areas', label: 'Service Areas', path: '/admin/areas', icon: Layers, permission: 'canManageAreas' },
  { id: 'admin-analytics', label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  { id: 'admin-audit', label: 'Audit Logs', path: '/admin/audit', icon: ShieldCheck },
  { id: 'admin-settings', label: 'Platform Settings', path: '/admin/settings', icon: Settings },
  { id: 'admin-profile', label: 'Profile & Settings', path: '/profile', icon: User },
];

/**
 * Get isolated navigation items for the user's role
 */
export const getNavItemsForRole = (role: UserRole | undefined): NavItemConfig[] => {
  const currentRole = role || 'guest';
  let config: NavItemConfig[];

  switch (currentRole) {
    case 'admin':
      config = ADMIN_NAV_CONFIG;
      break;
    case 'worker':
      config = WORKER_NAV_CONFIG;
      break;
    case 'citizen':
      config = CITIZEN_NAV_CONFIG;
      break;
    case 'guest':
    default:
      config = GUEST_NAV_CONFIG;
      break;
  }

  // Filter out items where the user lacks permission
  return config.filter((item) => {
    if (item.permission && !hasPermission(currentRole, item.permission)) {
      return false;
    }
    return true;
  });
};

/**
 * Legacy compatibility helper
 */
export const filterNavItems = (
  role: UserRole | undefined,
  _filterType?: 'sidebar' | 'navbar' | 'dock' | 'command'
): NavItemConfig[] => {
  return getNavItemsForRole(role);
};
