import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const role = user?.role || 'guest';

  const defaultHome =
    role === 'admin'
      ? '/admin/dashboard'
      : role === 'worker'
      ? '/worker/dashboard'
      : role === 'citizen'
      ? '/dashboard'
      : '/';

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-lg w-full bg-white/80 dark:bg-slate-900/80 border border-rose-500/30 rounded-3xl p-8 space-y-6 shadow-2xl backdrop-blur-xl">
        <div className="w-20 h-20 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/10 animate-bounce">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold font-display uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" /> 403 Access Forbidden
          </div>
          <h1 className="text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white">
            Permission Restricted
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
            Your current identity (<strong className="uppercase font-bold text-slate-900 dark:text-white">{role}</strong>) does not have authorization to view this module.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-left text-xs text-slate-500 space-y-1">
          <div className="font-bold text-slate-900 dark:text-slate-200">Security Policy Enforcement</div>
          <p className="text-[11px] leading-snug">
            Navigation and route access are strictly permission-gated. Direct URL navigation to restricted modules is audited and blocked.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="outline"
            size="md"
            className="flex-1"
            onClick={() => navigate(-1)}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Go Back
          </Button>
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            onClick={() => navigate(defaultHome)}
            leftIcon={<Home className="w-4 h-4" />}
          >
            Return to Authorized Home
          </Button>
        </div>
      </div>
    </div>
  );
};
