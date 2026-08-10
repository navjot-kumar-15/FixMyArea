import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, ErrorState } from '@/components/ui';
import { MockAuthService } from '@/services/mockAuth';
import { loginSuccess } from '@/store/slices/authSlice';
import { Mail, CheckCircle2, RefreshCw } from 'lucide-react';

export const VerifyEmailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userEmail = (location.state as any)?.email || 'user@civic.gov';
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resent, setResent] = useState(false);

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-digit-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const session = await MockAuthService.verifyEmail(code);
      dispatch(loginSuccess({ user: session.user, token: session.token }));

      const role = session.user.role;
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'worker') navigate('/worker/dashboard');
      else navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Verification failed. Try demo code 123456.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setResent(true);
    setOtp(['1', '2', '3', '4', '5', '6']);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div className="space-y-6 text-center sm:text-left">
      <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-2 mx-auto sm:mx-0">
        <Mail className="w-6 h-6" />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-white font-display tracking-tight">
          Verify Your Email
        </h1>
        <p className="text-xs text-slate-400">
          We sent a 6-digit code to <span className="text-white font-bold">{userEmail}</span>
        </p>
      </div>

      {error && <ErrorState title="Verification Error" message={error} />}

      {resent && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> A new code has been sent to your email.
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-6">
        <div className="flex justify-center gap-2 sm:gap-3">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              id={`otp-digit-${idx}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-11 h-13 sm:w-12 sm:h-14 rounded-2xl bg-slate-900 border border-slate-700/80 text-center text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono transition-all"
            />
          ))}
        </div>

        <div className="text-xs text-slate-500 text-center font-mono">
          Demo verification code: <span className="text-indigo-400 font-bold">123456</span>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full justify-center py-3 text-sm font-bold"
          isLoading={isLoading}
        >
          Verify & Continue
        </Button>
      </form>

      <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        Didn&apos;t receive code?{' '}
        <button
          type="button"
          onClick={handleResend}
          className="font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" /> Resend Code
        </button>
      </div>
    </div>
  );
};
