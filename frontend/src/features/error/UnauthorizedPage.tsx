import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, LogIn, Home } from 'lucide-react';
import { Button } from '@/components/ui';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 relative overflow-hidden bg-grid-pattern">
      <div className="aurora-blob aurora-1 pointer-events-none" />
      <div className="aurora-blob aurora-2 pointer-events-none" />

      <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-2xl text-center space-y-6 relative z-10 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
          <ShieldAlert className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
            HTTP 401 — Authentication Required
          </div>
          <h1 className="text-2xl font-extrabold text-white font-display">
            Session Expired or Unauthorized
          </h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            You must be signed in to access this municipal portal resource. Please authenticate to continue.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1 justify-center"
            leftIcon={<Home className="w-4 h-4" />}
            onClick={() => navigate('/')}
          >
            Go Home
          </Button>
          <Button
            variant="primary"
            className="flex-1 justify-center"
            leftIcon={<LogIn className="w-4 h-4" />}
            onClick={() => navigate('/login')}
          >
            Sign In Now
          </Button>
        </div>
      </div>
    </div>
  );
};
