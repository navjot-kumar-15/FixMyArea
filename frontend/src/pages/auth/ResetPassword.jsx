import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Save, CheckCircle } from 'lucide-react';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/Input';

const ResetPassword = () => {
  const [isComplete, setIsComplete] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsComplete(true);
  };

  return (
    <AuthLayout title="Create New Password" subtitle="Please enter your new password below">
      {!isComplete ? (
        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input 
            id="password" 
            label="New Password" 
            type="password" 
            placeholder="••••••••" 
            icon={Lock} 
            required 
          />

          <Input 
            id="confirmPassword" 
            label="Confirm New Password" 
            type="password" 
            placeholder="••••••••" 
            icon={Lock} 
            required 
          />

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            <Save size={18} /> Update Password
          </button>
        </form>
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{ width: '64px', height: '64px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <CheckCircle size={32} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>Password Updated!</h3>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Your password has been successfully reset.</p>
          
          <Link to="/login" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Go to Login
          </Link>
        </div>
      )}
    </AuthLayout>
  );
};

export default ResetPassword;
