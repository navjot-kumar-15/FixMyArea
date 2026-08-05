import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, switchRole, loginFailure } from '@/store/slices/authSlice';
import { RootState } from '@/store';
import { Input } from '@/components/ui/Input';
import { GlassCard, MagneticButton } from '@/components/ui/DesignSystem';
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const getDashboardRoute = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'worker':
        return '/worker/dashboard';
      case 'citizen':
        return '/dashboard';
      default:
        return '/';
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      dispatch(loginStart());
      await new Promise((res) => setTimeout(res, 600));

      let role: UserRole = 'citizen';
      if (data.email.includes('admin')) role = 'admin';
      if (data.email.includes('worker')) role = 'worker';

      dispatch(switchRole(role));
      toast.success(`Signed in as ${role.toUpperCase()} successfully!`);
      navigate(getDashboardRoute(role));
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
    navigate(getDashboardRoute(role));
  };

  return (
    <GlassCard className="p-8 space-y-6 max-w-md mx-auto border border-indigo-500/30 glow-card">
      <div className="space-y-2 text-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto border border-indigo-500/20 shadow-md">
          <Fingerprint className="w-7 h-7" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight font-display">
          System Access
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto font-medium">
          Select a role to instantly sign in or enter credentials.
        </p>
      </div>

      {/* 1-Click Instant Role Login Cards */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-display">
          <Sparkles className="w-4 h-4 text-indigo-500" /> 1-Click Role Selection
        </div>
        <div className="grid grid-cols-2 gap-3">
          {/* Citizen Card */}
          <button
            type="button"
            onClick={() => handleQuickLogin('citizen')}
            className="p-3.5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 hover:border-indigo-500/50 text-left transition-all group flex flex-col justify-between h-28 cursor-pointer font-display"
          >
            <div className="flex items-center justify-between w-full">
              <span className="p-2 rounded-xl bg-indigo-600 text-white group-hover:scale-110 transition-transform">
                <UserCheck className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-300">
                Citizen
              </span>
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">Alex Johnson</div>
              <div className="text-[10px] text-slate-400 truncate">citizen@civicconnect.org</div>
            </div>
          </button>

          {/* Worker Card */}
          <button
            type="button"
            onClick={() => handleQuickLogin('worker')}
            className="p-3.5 rounded-2xl border border-purple-500/20 bg-purple-500/5 hover:border-purple-500/50 text-left transition-all group flex flex-col justify-between h-28 cursor-pointer font-display"
          >
            <div className="flex items-center justify-between w-full">
              <span className="p-2 rounded-xl bg-purple-600 text-white group-hover:scale-110 transition-transform">
                <Briefcase className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-300">
                Worker
              </span>
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">Marcus Vance</div>
              <div className="text-[10px] text-slate-400 truncate">worker@civicconnect.org</div>
            </div>
          </button>

          {/* Admin Card */}
          <button
            type="button"
            onClick={() => handleQuickLogin('admin')}
            className="p-3.5 rounded-2xl border border-rose-500/20 bg-rose-500/5 hover:border-rose-500/50 text-left transition-all group flex flex-col justify-between h-28 cursor-pointer font-display"
          >
            <div className="flex items-center justify-between w-full">
              <span className="p-2 rounded-xl bg-rose-600 text-white group-hover:scale-110 transition-transform">
                <Shield className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-300">
                Admin
              </span>
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">Eleanor Vance</div>
              <div className="text-[10px] text-slate-400 truncate">admin@civicconnect.org</div>
            </div>
          </button>

          {/* Guest Card */}
          <button
            type="button"
            onClick={() => handleQuickLogin('guest')}
            className="p-3.5 rounded-2xl border border-slate-500/20 bg-slate-500/5 hover:border-slate-500/50 text-left transition-all group flex flex-col justify-between h-28 cursor-pointer font-display"
          >
            <div className="flex items-center justify-between w-full">
              <span className="p-2 rounded-xl bg-slate-700 text-white group-hover:scale-110 transition-transform">
                <User className="w-4 h-4" />
              </span>
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-500/10 text-slate-600 dark:text-slate-300">
                Guest
              </span>
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900 dark:text-white">Anonymous</div>
              <div className="text-[10px] text-slate-400 truncate">Public Landing</div>
            </div>
          </button>
        </div>
      </div>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
        <span className="flex-shrink mx-4 text-[10px] font-bold uppercase text-slate-400 tracking-wider font-display">
          Or Enter Credentials
        </span>
        <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
      </div>

      {error && (
        <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 font-bold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Verification Email"
          type="email"
          placeholder="user@civicconnect.org"
          leftIcon={<Mail className="w-4 h-4 text-indigo-500" />}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4 text-indigo-500" />}
          error={errors.password?.message}
          {...register('password')}
        />

        <MagneticButton
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-2"
          isLoading={loading}
          icon={LogIn}
        >
          Sign In
        </MagneticButton>
      </form>
    </GlassCard>
  );
};
