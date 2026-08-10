import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, ErrorState } from '@/components/ui';
import { MockAuthService } from '@/services/mockAuth';
import { UserRole } from '@/types';
import { User, Mail, Lock, Building, ArrowRight, Shield } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('citizen');
  const [ward, setWard] = useState('Ward 4 - Metro East');
  const [department, setDepartment] = useState('Public Works & Infrastructure');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await MockAuthService.register({
        name,
        email,
        password,
        role,
        ward: role === 'citizen' ? ward : undefined,
        department: role === 'worker' ? department : undefined,
      });

      // Redirect to Email OTP Verification
      navigate('/verify-email', { state: { email } });
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-extrabold text-white font-display tracking-tight">
          Create CivicConnect Account
        </h1>
        <p className="text-xs text-slate-400">
          Join the modern municipal civic engagement network.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
        <div className={`flex-1 py-1 text-center rounded-lg ${step === 1 ? 'bg-indigo-600 text-white font-bold' : 'text-slate-500'}`}>
          1. Account Details
        </div>
        <div className={`flex-1 py-1 text-center rounded-lg ${step === 2 ? 'bg-indigo-600 text-white font-bold' : 'text-slate-500'}`}>
          2. Role & Jurisdiction
        </div>
      </div>

      {error && <ErrorState title="Registration Error" message={error} />}

      {step === 1 ? (
        <form onSubmit={handleNext} className="space-y-4">
          <Input
            label="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Aarav Sharma"
            leftIcon={<User className="w-4 h-4 text-slate-400" />}
          />

          <Input
            label="Email Address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="aarav@civic.gov"
            leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full justify-center py-3 text-sm font-bold mt-2"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Continue to Role Setup
          </Button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Select Persona Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['citizen', 'worker', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`p-3 rounded-2xl border text-xs font-bold text-center capitalize transition-all ${
                    role === r
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/25'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {role === 'citizen' && (
            <Input
              label="Municipal Ward / Jurisdiction"
              value={ward}
              onChange={(e) => setWard(e.target.value)}
              placeholder="e.g. Ward 4 - Metro East"
              leftIcon={<Building className="w-4 h-4 text-slate-400" />}
            />
          )}

          {role === 'worker' && (
            <Input
              label="Department Unit"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="e.g. Public Works & Sanitation"
              leftIcon={<Shield className="w-4 h-4 text-slate-400" />}
            />
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(1)}
              className="flex-1 justify-center"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-2 justify-center py-3 text-sm font-bold"
              isLoading={isLoading}
            >
              Complete Registration
            </Button>
          </div>
        </form>
      )}

      <div className="text-center text-xs text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-indigo-400 hover:text-indigo-300">
          Sign In
        </Link>
      </div>
    </div>
  );
};
