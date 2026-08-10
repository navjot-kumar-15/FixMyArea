import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { switchRole } from '@/store/slices/authSlice';

export const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden bg-grid-pattern">
      <div className="aurora-blob aurora-1 pointer-events-none" />
      <div className="aurora-blob aurora-3 pointer-events-none" />

      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-2xl text-center space-y-6 relative z-10 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto shadow-lg shadow-rose-500/10">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-rose-400 uppercase tracking-widest">
            HTTP 403 — Access Forbidden
          </div>
          <h1 className="text-2xl font-extrabold text-white font-display">
            Insufficient Role Privilege
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your current persona (<span className="text-white font-bold capitalize">{user?.role || 'Guest'}</span>) does not possess the permissions required for this administrative operation.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs font-mono text-slate-400 space-y-2">
          <div className="text-[11px] text-indigo-400 font-bold">Dev Quick Switcher:</div>
          <div className="flex justify-center gap-2">
            <button
              onClick={() => {
                dispatch(switchRole('admin'));
                navigate('/admin/dashboard');
              }}
              className="px-2.5 py-1 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600 text-xs font-bold"
            >
              Switch to Admin Role
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            className="w-full justify-center"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};
