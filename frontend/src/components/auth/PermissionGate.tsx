import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { UserRole } from '@/types';
import { PermissionKey, hasPermission } from '@/permissions';

interface PermissionGateProps {
  permission?: PermissionKey;
  allowedRoles?: UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({
  permission,
  allowedRoles,
  children,
  fallback = null,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const role: UserRole = user?.role || 'guest';

  // 1. Role check
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <>{fallback}</>;
  }

  // 2. Permission key check
  if (permission && !hasPermission(role, permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
