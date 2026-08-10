import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, ErrorState } from '@/components/ui';
import { MockAuthService } from '@/services/mockAuth';
import { Lock, CheckCircle2 } from 'lucide-react';

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await MockAuthService.resetPassword('mock_token', password);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-white font-display tracking-tight">
          Reset Your Password
        </h1>
        <p className="text-xs text-slate-400">
          Create a new secure password for your CivicConnect account.
        </p>
      </div>

      {error && <ErrorState title="Reset Error" message={error} />}

      {success ? (
        <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Password Reset Successful</h3>
            <p className="text-xs text-slate-300">
              You can now sign in with your new credentials.
            </p>
          </div>
          <Button
            variant="primary"
            className="w-full justify-center"
            onClick={() => navigate('/login')}
          >
            Sign In Now
          </Button>
        </div>
      ) : (
        <form onSubmit={handleReset} className="space-y-4">
          <Input
            label="New Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
          />

          <Input
            label="Confirm New Password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center py-3 text-sm font-bold"
            isLoading={isLoading}
          >
            Update Password
          </Button>
        </form>
      )}

      <div className="text-center">
        <Link to="/login" className="text-xs font-bold text-slate-400 hover:text-white">
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};
