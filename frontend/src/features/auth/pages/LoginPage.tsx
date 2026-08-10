import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Input, ErrorState } from '@/components/ui';
import { MockAuthService, DEMO_USERS } from '@/services/mockAuth';
import { loginSuccess } from '@/store/slices/authSlice';
import { UserRole } from '@/types';
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('citizen@civic.gov');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const session = await MockAuthService.login(email, password);
      dispatch(loginSuccess({ user: session.user, token: session.token }));

      // Role Resolution Redirection
      const role = session.user.role;
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'worker') navigate('/worker/dashboard');
      else navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSelectPersona = (role: UserRole) => {
    if (role === 'guest') return;
    const demo = DEMO_USERS[role];
    setEmail(demo.email);
    setPassword('password123');
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-white font-display tracking-tight">
          Welcome Back to CivicConnect
        </h1>
        <p className="text-xs text-slate-400">
          Sign in to access your role-gated municipal console.
        </p>
      </div>

      {/* Quick Demo Credentials Bar */}
      <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 space-y-2">
        <div className="text-[11px] font-bold text-indigo-400 flex items-center gap-1.5 uppercase font-mono tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> Quick Demo Persona Switcher:
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(['citizen', 'worker', 'admin'] as UserRole[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => handleQuickSelectPersona(r)}
              className="py-1.5 px-2 rounded-xl bg-slate-900 border border-slate-700/80 hover:border-indigo-500 text-[11px] font-semibold text-slate-200 capitalize transition-colors text-center"
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {error && <ErrorState title="Sign In Error" message={error} />}

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@civic.gov"
          leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
        />

        <div className="space-y-1">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
          />
          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center py-3 text-sm font-bold mt-2"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Sign In to Console
        </Button>
      </form>

      <div className="text-center text-xs text-slate-400">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="font-bold text-indigo-400 hover:text-indigo-300">
          Register New Account
        </Link>
      </div>
    </div>
  );
};
