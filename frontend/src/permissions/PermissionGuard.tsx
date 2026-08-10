import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { hasPermission, PermissionKey } from './index';

interface PermissionGuardProps {
  permission: PermissionKey;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const useHasPermission = (permission: PermissionKey): boolean => {
  const user = useSelector((state: RootState) => state.auth.user);
  return hasPermission(user?.role, permission);
};

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permission,
  children,
  fallback = null,
}) => {
  const isAllowed = useHasPermission(permission);

  if (!isAllowed) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
};
