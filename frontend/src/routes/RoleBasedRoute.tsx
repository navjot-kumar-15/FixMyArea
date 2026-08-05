import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { UserRole } from '@/types';
import { PermissionKey, hasPermission } from '@/permissions';
import { UnauthorizedPage } from '@/routes/UnauthorizedPage';

interface RoleBasedRouteProps {
  allowedRoles?: UserRole[];
  permission?: PermissionKey;
  children: React.ReactNode;
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  allowedRoles,
  permission,
  children,
}) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const role: UserRole = user?.role || 'guest';

  // 1. Role validation check
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <UnauthorizedPage />;
  }

  // 2. Granular permission key check
  if (permission && !hasPermission(role, permission)) {
    return <UnauthorizedPage />;
  }

  return <>{children}</>;
};
