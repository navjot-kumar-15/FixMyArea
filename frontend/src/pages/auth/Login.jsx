import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/Input';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate login
    navigate('/dashboard');
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Log in to access your dashboard">
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input 
          id="email" 
          label="Email Address" 
          type="email" 
          placeholder="you@example.com" 
          icon={Mail} 
          required 
        />
        
        <div>
          <Input 
            id="password" 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            icon={Lock} 
            required 
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-0.5rem' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" style={{ accentColor: 'var(--color-primary)' }} />
              Remember me
            </label>
            <Link to="/forgot-password" style={{ fontSize: '0.875rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500 }}>
              Forgot password?
            </Link>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          <LogIn size={18} /> Sign In
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '1.5rem' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>Sign up</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
