import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, ErrorState } from '@/components/ui';
import { MockAuthService } from '@/services/mockAuth';
import { Mail, CheckCircle2, ArrowLeft } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await MockAuthService.forgotPassword(email);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to process request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-white font-display tracking-tight">
          Forgot Password?
        </h1>
        <p className="text-xs text-slate-400">
          Enter your account email to receive a password reset link.
        </p>
      </div>

      {error && <ErrorState title="Request Error" message={error} />}

      {submitted ? (
        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Reset Link Sent</h3>
            <p className="text-xs text-slate-300">
              Check your inbox at <span className="text-white font-bold">{email}</span> for instructions.
            </p>
          </div>
          <Link
            to="/reset-password"
            className="inline-block px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500"
          >
            Demo: Continue to Reset Screen
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Account Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="citizen@civic.gov"
            leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center py-3 text-sm font-bold"
            isLoading={isLoading}
          >
            Send Reset Instructions
          </Button>
        </form>
      )}

      <div className="text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
};
