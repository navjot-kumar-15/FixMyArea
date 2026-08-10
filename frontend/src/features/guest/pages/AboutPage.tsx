import React from 'react';
import { Layers, ShieldCheck, MapPin, CheckCircle2, UserCheck, Briefcase, Zap } from 'lucide-react';
import { Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12 max-w-4xl mx-auto pb-20">
      {/* Header Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/20 backdrop-blur-2xl text-center space-y-4">
        <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/30">
          <Layers className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
          About CivicConnect Platform
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          CivicConnect is a next-generation municipal platform built to modernize civic engagement, field worker dispatching, and executive city governance.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-display">1. Empower Citizens</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Report issues in under 30 seconds with GPS mapping, media attachments, and community upvotes.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Briefcase className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-display">2. Mobilize Field Workers</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Dedicated mobile HUD for municipal crews to accept work orders and submit photo proof of resolution.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white font-display">3. Transparent Governance</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Executive oversight with audit logging, department analytics, and ward SLA guarantees.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
        <h2 className="text-xl font-bold text-white font-display">Ready to Participate in Smart Civic Infrastructure?</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="outline" onClick={() => navigate('/login')}>
            Sign In
          </Button>
          <Button variant="primary" onClick={() => navigate('/register')}>
            Register Free Account
          </Button>
        </div>
      </div>
    </div>
  );
};
