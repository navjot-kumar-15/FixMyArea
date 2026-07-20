import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure, switchRole } from '@/store/slices/authSlice';
import { RootState } from '@/store';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { UserRole } from '@/types';
import { Mail, Lock, LogIn, Sparkles, UserCheck, Briefcase, Shield, User, Fingerprint } from 'lucide-react';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const dispatch = dispatchTarget();
  function dispatchTarget() {
    return useDispatch();
  }
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'citizen@civicconnect.org',
      password: 'password123',
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      dispatch(loginStart());
      await new Promise((res) => setTimeout(res, 600));

      let role: UserRole = 'citizen';
      if (data.email.includes('admin')) role = 'admin';
      if (data.email.includes('worker')) role = 'worker';

      dispatch(switchRole(role));
      toast.success(`Signed in as ${role.toUpperCase()} successfully!`);
      window.location.href = role === 'admin' ? '/admin/dashboard' : role === 'worker' ? '/worker/dashboard' : '/dashboard';
    } catch (err: any) {
      dispatch(loginFailure('Invalid email or password'));
      toast.error('Login failed. Please check credentials.');
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    const credentials: Record<UserRole, { email: string; label: string }> = {
      citizen: { email: 'citizen@civicconnect.org', label: 'Citizen' },
      worker: { email: 'worker@civicconnect.org', label: 'Field Worker' },
      admin: { email: 'admin@civicconnect.org', label: 'Administrator' },
      guest: { email: 'guest@civicconnect.org', label: 'Guest' },
    };

    const target = credentials[role];
    setValue('email', target.email);
    setValue('password', 'password123');

    dispatch(switchRole(role));
    toast.success(`Logged in as ${target.label}! Redirecting...`);
    window.location.href = role === 'admin' ? '/admin/dashboard' : role === 'worker' ? '/worker/dashboard' : role === 'guest' ? '/' : '/dashboard';
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <div className="inline-flex p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 border border-indigo-150 dark:border-indigo-900/40 mx-auto">
          <Fingerprint className="w-8 h-8 animate-pulse" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          System Verification
        </h2>
        <p className="text-xs text-slate-400 max-w-xs mx-auto">
          Select an identity card for instant 1-click authentication.
        </p>
      </div>

      {/* 1-Click Instant Role Login Cards */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 animate-spin" /> Interactive Quick Bypass
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* Citizen Card */}
          <button
            type="button"
            onClick={() => handleQuickLogin('citizen')}
            className="p-4 rounded-2xl border border-blue-200 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/20 hover:border-blue-500/60 dark:hover:border-blue-500/60 text-left transition-all group shadow-sm flex flex-col justify-between h-32 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between w-full">
              <span className="p-2 rounded-xl bg-blue-600 text-white group-hover:scale-110 transition-transform">
                <UserCheck className="w-4.5 h-4.5" />
              </span>
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                Citizen
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Alex Johnson
              </div>
              <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                citizen@civicconnect.org
              </div>
            </div>
          </button>

          {/* Worker Card */}
          <button
            type="button"
            onClick={() => handleQuickLogin('worker')}
            className="p-4 rounded-2xl border border-purple-200 dark:border-purple-900 bg-purple-50/40 dark:bg-purple-950/20 hover:border-purple-500/60 dark:hover:border-purple-500/60 text-left transition-all group shadow-sm flex flex-col justify-between h-32 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between w-full">
              <span className="p-2 rounded-xl bg-purple-600 text-white group-hover:scale-110 transition-transform">
                <Briefcase className="w-4.5 h-4.5" />
              </span>
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                Worker
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Marcus Vance
              </div>
              <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                worker@civicconnect.org
              </div>
            </div>
          </button>

          {/* Admin Card */}
          <button
            type="button"
            onClick={() => handleQuickLogin('admin')}
            className="p-4 rounded-2xl border border-rose-200 dark:border-rose-900 bg-rose-50/40 dark:bg-rose-950/20 hover:border-rose-500/60 dark:hover:border-rose-500/60 text-left transition-all group shadow-sm flex flex-col justify-between h-32 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between w-full">
              <span className="p-2 rounded-xl bg-rose-600 text-white group-hover:scale-110 transition-transform">
                <Shield className="w-4.5 h-4.5" />
              </span>
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200">
                Admin
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                Eleanor Vance
              </div>
              <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                admin@civicconnect.org
              </div>
            </div>
          </button>

          {/* Guest Card */}
          <button
            type="button"
            onClick={() => handleQuickLogin('guest')}
            className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 hover:border-slate-500/60 dark:hover:border-slate-700/80 text-left transition-all group shadow-sm flex flex-col justify-between h-32 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between w-full">
              <span className="p-2 rounded-xl bg-slate-700 text-white group-hover:scale-110 transition-transform">
                <User className="w-4.5 h-4.5" />
              </span>
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                Guest
              </span>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Anonymous
              </div>
              <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                Public Landing
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-slate-200 dark:border-slate-850"></div>
        <span className="flex-shrink mx-4 text-[9px] font-extrabold uppercase text-slate-400 tracking-widest">
          Secure Terminal Bypass
        </span>
        <div className="flex-grow border-t border-slate-200 dark:border-slate-850"></div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 dark:bg-rose-950/40 border border-rose-500/25 text-xs text-rose-600 dark:text-rose-400 font-bold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Verification Email"
          type="email"
          placeholder="user@civicconnect.org"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Terminal Keyphrase"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-500">
            <input
              type="checkbox"
              className="rounded border-slate-350 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 bg-transparent"
              {...register('rememberMe')}
            />
            Keep Authenticated
          </label>
          <a href="/forgot-password" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
            Recover Access
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 font-bold"
          isLoading={loading}
          leftIcon={<LogIn className="w-4.5 h-4.5" />}
        >
          Verify Credentials
        </Button>
      </form>

      <div className="text-center text-xs text-slate-500 font-medium">
        Need system access?{' '}
        <a href="/register" className="font-bold text-indigo-600 hover:underline">
          Create Account
        </a>
      </div>
    </div>
  );
};
