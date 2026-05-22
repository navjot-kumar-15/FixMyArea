import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import AuthLayout from '../../components/AuthLayout';
import Input from '../../components/Input';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <AuthLayout title="Create an Account" subtitle="Join FixMyArea to report issues securely">
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Input 
            id="firstName" 
            label="First Name" 
            placeholder="John" 
            icon={User} 
            required 
          />
          <Input 
            id="lastName" 
            label="Last Name" 
            placeholder="Doe" 
            required 
          />
        </div>
        
        <Input 
          id="email" 
          label="Email Address" 
          type="email" 
          placeholder="you@example.com" 
          icon={Mail} 
          required 
        />
        
        <Input 
          id="password" 
          label="Password" 
          type="password" 
          placeholder="••••••••" 
          icon={Lock} 
          required 
        />

        <Input 
          id="confirmPassword" 
          label="Confirm Password" 
          type="password" 
          placeholder="••••••••" 
          icon={Lock} 
          required 
        />

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          <UserPlus size={18} /> Create Account
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '1.5rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>Log in</Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
