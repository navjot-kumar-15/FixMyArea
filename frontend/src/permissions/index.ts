import { UserRole } from '@/types';

export type PermissionKey =
  | 'canCreateReport'
  | 'canEditReport'
  | 'canDeleteReport'
  | 'canAssignWorker'
  | 'canUpdateProgress'
  | 'canVerifyReport'
  | 'canManageUsers'
  | 'canManageAreas'
  | 'canViewAdminDashboard'
  | 'canViewWorkerDashboard'
  | 'canComment'
  | 'canUpvote';

const ROLE_PERMISSIONS: Record<UserRole, Record<PermissionKey, boolean>> = {
  guest: {
    canCreateReport: false,
    canEditReport: false,
    canDeleteReport: false,
    canAssignWorker: false,
    canUpdateProgress: false,
    canVerifyReport: false,
    canManageUsers: false,
    canManageAreas: false,
    canViewAdminDashboard: false,
    canViewWorkerDashboard: false,
    canComment: false,
    canUpvote: false,
  },
  citizen: {
    canCreateReport: true,
    canEditReport: true, // Only own report
    canDeleteReport: false,
    canAssignWorker: false,
    canUpdateProgress: false,
    canVerifyReport: false,
    canManageUsers: false,
    canManageAreas: false,
    canViewAdminDashboard: false,
    canViewWorkerDashboard: false,
    canComment: true,
    canUpvote: true,
  },
  worker: {
    canCreateReport: true,
    canEditReport: false,
    canDeleteReport: false,
    canAssignWorker: false,
    canUpdateProgress: true,
    canVerifyReport: false,
    canManageUsers: false,
    canManageAreas: false,
    canViewAdminDashboard: false,
    canViewWorkerDashboard: true,
    canComment: true,
    canUpvote: true,
  },
  admin: {
    canCreateReport: true,
    canEditReport: true,
    canDeleteReport: true,
    canAssignWorker: true,
    canUpdateProgress: true,
    canVerifyReport: true,
    canManageUsers: true,
    canManageAreas: true,
    canViewAdminDashboard: true,
    canViewWorkerDashboard: true,
    canComment: true,
    canUpvote: true,
  },
};

export const hasPermission = (role: UserRole | undefined, permission: PermissionKey): boolean => {
  if (!role) return ROLE_PERMISSIONS.guest[permission];
  return ROLE_PERMISSIONS[role]?.[permission] ?? false;
};
