import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, ArrowLeft } from 'lucide-react';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/Input';

const ForgotPassword = () => {
  const [isSent, setIsSent] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <AuthLayout title="Reset Password" subtitle="Enter your email to receive a reset link">
      {!isSent ? (
        <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input 
            id="email" 
            label="Email Address" 
            type="email" 
            placeholder="you@example.com" 
            icon={Mail} 
            required 
          />

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            <Send size={18} /> Send Reset Link
          </button>
        </form>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{ width: '64px', height: '64px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <Mail size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Check your email</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>We've sent a password reset link to your email address.</p>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
          <ArrowLeft size={16} /> Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
