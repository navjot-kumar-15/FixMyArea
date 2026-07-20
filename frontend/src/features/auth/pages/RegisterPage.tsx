import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '@/store/slices/authSlice';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Mail, Lock, User as UserIcon, Phone, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Valid email address required'),
    phone: z.string().min(10, 'Valid phone number required'),
    role: z.enum(['citizen', 'worker', 'admin']),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'citizen',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    await new Promise((res) => setTimeout(res, 800));
    const newUser = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      phone: data.phone,
      areaName: 'Downtown North',
      createdAt: new Date().toISOString(),
    };
    dispatch(loginSuccess({ user: newUser, token: 'demo-jwt-token' }));
    toast.success('Account created successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Create Your CivicConnect Account
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Join thousands of citizens improving municipal infrastructure together.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="Jane Doe"
          leftIcon={<UserIcon className="w-4 h-4" />}
          error={errors.name?.message}
          {...register('name')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 000-0000"
            leftIcon={<Phone className="w-4 h-4" />}
            error={errors.phone?.message}
            {...register('phone')}
          />
        </div>

        <Select
          label="Account Role"
          options={[
            { value: 'citizen', label: 'Citizen (Report & Track Issues)' },
            { value: 'worker', label: 'Field Worker (Task Execution)' },
            { value: 'admin', label: 'Administrator (Manage Platform)' },
          ]}
          error={errors.role?.message}
          {...register('role')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3 mt-2"
          isLoading={isSubmitting}
          leftIcon={<UserPlus className="w-4 h-4" />}
        >
          Create Account
        </Button>
      </form>

      <div className="text-center text-xs text-slate-500">
        Already have an account?{' '}
        <a href="/login" className="font-bold text-blue-600 hover:underline">
          Sign In
        </a>
      </div>
    </div>
  );
};
