import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { UserRole } from '@/types';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface RoleBasedRouteProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ allowedRoles, children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const role = user?.role || 'guest';

  if (!allowedRoles.includes(role)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">403 - Access Forbidden</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
          Your current role (<span className="font-bold uppercase">{role}</span>) does not have sufficient permissions to view this domain area.
        </p>
        <Button variant="primary" onClick={() => (window.location.href = '/')}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return <>{children}</>;
};
