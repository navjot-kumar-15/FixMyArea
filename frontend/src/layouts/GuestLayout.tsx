import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Layers, MapPin, Activity, Info, LogIn, UserPlus, Eye, Search } from 'lucide-react';
import { Button } from '@/components/ui';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface GuestLayoutProps {
  children?: React.ReactNode;
}

export const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col relative overflow-x-hidden bg-grid-pattern">
      {/* Dynamic Ambient Background Blobs */}
      <div className="aurora-blob aurora-1 pointer-events-none" />
      <div className="aurora-blob aurora-2 pointer-events-none" />
      <div className="aurora-blob aurora-3 pointer-events-none" />

      {/* Top Glass Application Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white font-display">
              Civic<span className="text-indigo-400">Connect</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink
              to="/explore"
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                  isActive ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`
              }
            >
              <MapPin className="w-3.5 h-3.5" /> Explore Feed &amp; Map
            </NavLink>

            <NavLink
              to="/activity"
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                  isActive ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`
              }
            >
              <Activity className="w-3.5 h-3.5" /> City Activity Pulse
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                  isActive ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`
              }
            >
              <Info className="w-3.5 h-3.5" /> About Platform
            </NavLink>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/explore')}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Search Reports"
            >
              <Search className="w-4 h-4" />
            </button>

            {isAuthenticated ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/dashboard')}
              >
                Go to Console
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate('/login')}
                  leftIcon={<LogIn className="w-3.5 h-3.5" />}
                >
                  Sign In
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate('/register')}
                  leftIcon={<UserPlus className="w-3.5 h-3.5" />}
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Guest Mode Ambient Banner */}
        <div className="bg-gradient-to-r from-indigo-950/80 via-purple-950/60 to-slate-950 border-b border-indigo-500/20 px-4 py-1 text-[11px] text-center text-indigo-300 font-medium flex items-center justify-center gap-2">
          <Eye className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>You are exploring CivicConnect in Public Guest Mode. Sign in to submit reports or vote on issues.</span>
        </div>
      </header>

      {/* Main Public Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-8 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex justify-center gap-6 text-slate-400 font-medium">
            <Link to="/explore" className="hover:text-white">Explore Map</Link>
            <Link to="/activity" className="hover:text-white">City Activity</Link>
            <Link to="/about" className="hover:text-white">Platform Info</Link>
            <Link to="/showcase" className="hover:text-white">Design System</Link>
          </div>
          <p>© 2026 CivicConnect Municipal Platform. Zero-Legacy Kinetic Glass Architecture.</p>
        </div>
      </footer>
    </div>
  );
};
