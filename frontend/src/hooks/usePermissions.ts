import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { hasPermission, PermissionKey } from '@/permissions';

export const usePermissions = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role || 'guest';

  const checkPermission = (permission: PermissionKey): boolean => {
    return hasPermission(role, permission);
  };

  return {
    role,
    user,
    checkPermission,
    canCreateReport: checkPermission('canCreateReport'),
    canAssignWorker: checkPermission('canAssignWorker'),
    canUpdateProgress: checkPermission('canUpdateProgress'),
    canManageUsers: checkPermission('canManageUsers'),
    canViewAdminDashboard: checkPermission('canViewAdminDashboard'),
    canViewWorkerDashboard: checkPermission('canViewWorkerDashboard'),
  };
};
