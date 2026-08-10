import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui';
import {
  Layers,
  MapPin,
  ShieldCheck,
  Zap,
  ArrowRight,
  UserCheck,
  Briefcase,
  CheckCircle2,
  Sparkles,
  BarChart3,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { switchRole } from '@/store/slices/authSlice';
import { UserRole } from '@/types';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLaunchRole = (role: UserRole) => {
    dispatch(switchRole(role));
    if (role === 'admin') navigate('/admin/dashboard');
    else if (role === 'worker') navigate('/worker/dashboard');
    else if (role === 'citizen') navigate('/dashboard');
    else navigate('/explore');
  };

  return (
    <div className="space-y-16 py-6 pb-20">
      {/* 1. Hero Section */}
      <section className="text-center space-y-6 max-w-4xl mx-auto pt-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold">
          <Sparkles className="w-3.5 h-3.5" /> Next-Generation Civic Engagement Platform
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display tracking-tight leading-tight">
          Modern Infrastructure Reporting &amp;{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Field Operations
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          CivicConnect bridges citizens, municipal workers, and city leaders through spatial issue mapping, role-gated permission dispatching, and real-time proof of resolution.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/register')}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Get Started Free
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/explore')}
            leftIcon={<MapPin className="w-4 h-4 text-cyan-400" />}
          >
            Explore Live City Map
          </Button>
        </div>
      </section>

      {/* 2. Live Municipal Stats Ticker */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">1,482+</div>
          <div className="text-xs text-slate-400 font-medium">Issues Resolved</div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">98.4%</div>
          <div className="text-xs text-slate-400 font-medium">Dispatch SLA Score</div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">24 Wards</div>
          <div className="text-xs text-slate-400 font-medium">Municipal Service Coverage</div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl text-center space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">&lt; 2.4 hrs</div>
          <div className="text-xs text-slate-400 font-medium">Avg Response Time</div>
        </div>
      </section>

      {/* 3. Role-Based Entry Consoles */}
      <section className="space-y-6 max-w-5xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Tailored Experiences by Role
          </h2>
          <p className="text-xs text-slate-400">
            Dedicated operational workspaces designed around specific user workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Citizen Console */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl space-y-4 flex flex-col justify-between hover:border-indigo-500/50 transition-colors group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Citizen Portal</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Report local infrastructure issues, track real-time resolution timelines, upvote community concerns, and receive notifications.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between mt-4"
              onClick={() => handleLaunchRole('citizen')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Launch Citizen Experience
            </Button>
          </div>

          {/* Worker Console */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl space-y-4 flex flex-col justify-between hover:border-cyan-500/50 transition-colors group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Field Worker Console</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Field HUD for municipal crews to accept dispatched tasks, view GPS route maps, update progress, and upload photo proof of fix.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between mt-4"
              onClick={() => handleLaunchRole('worker')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Launch Worker Experience
            </Button>
          </div>

          {/* Admin Console */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl space-y-4 flex flex-col justify-between hover:border-purple-500/50 transition-colors group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">Admin Command Suite</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Executive oversight center to manage worker assignments, dispatch crews, monitor city analytics, and configure service boundaries.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-between mt-4"
              onClick={() => handleLaunchRole('admin')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Launch Admin Experience
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Platform Features Grid */}
      <section className="max-w-5xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-950 border border-slate-800 backdrop-blur-2xl space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-xl font-bold text-white font-display">Built for Modern Smart Cities</h2>
            <p className="text-xs text-slate-400">High-trust infrastructure, strict RBAC security, and real-time mapping.</p>
          </div>
          <Link to="/register">
            <Button variant="primary" size="sm">Create Free Account</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Zap className="w-4 h-4" /> Live Heatmaps
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Spatial map visualization with status indicators and category overlays.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" /> Proof-of-Resolution
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Field workers upload resolution photos to ensure full transparency and accountability.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <BarChart3 className="w-4 h-4" /> City Analytics
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              In-depth trend metrics on resolution throughput, worker load, and ward performance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
