import React from 'react';
import { MapPin } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="auth-container">
      {/* Left side - Animated Gradient Graphic */}
      <div className="auth-left animate-gradient">
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px' }}>
          <MapPin color="white" size={48} style={{ margin: '0 auto 1.5rem auto' }} />
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>FixMyArea</h1>
          <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>
            Join your local community and help us build a better, safer neighborhood together.
          </p>
        </div>
      </div>

      {/* Right side - Form Container */}
      <div className="auth-right">
        <div className="auth-form-wrapper">
          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>
              {title}
            </h2>
            {subtitle && <p style={{ color: 'var(--color-text-muted)' }}>{subtitle}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
