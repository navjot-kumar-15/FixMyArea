import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export const ForgotPasswordPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async () => {
    await new Promise((res) => setTimeout(res, 800));
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Reset Your Password
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Enter your registered email and we'll send you instructions to reset your password.
        </p>
      </div>

      {submitted ? (
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
          <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">Check your inbox</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            We sent a password reset link to your email. Click the link in the email to set a new password.
          </p>
          <Button variant="outline" className="w-full mt-2" onClick={() => (window.location.href = '/login')}>
            Back to Sign In
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="user@civicconnect.org"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register('email')}
          />

          <Button type="submit" variant="primary" className="w-full py-3" isLoading={isSubmitting}>
            Send Reset Link
          </Button>
        </form>
      )}

      <div className="text-center text-xs">
        <a href="/login" className="inline-flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </a>
      </div>
    </div>
  );
};
