import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden bg-grid-pattern">
      {/* Dynamic Ambient Aurora Orbs */}
      <div className="aurora-blob aurora-1 pointer-events-none" />
      <div className="aurora-blob aurora-2 pointer-events-none" />
      <div className="aurora-blob aurora-3 pointer-events-none" />

      {/* Main Container Container */}
      <div className="w-full max-w-5xl rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
        
        {/* Form Container (Left on Desktop) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between relative z-10">
          <div>
            {/* Header Brand */}
            <div className="flex items-center justify-between mb-8">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-white font-display">
                  Civic<span className="text-indigo-400">Connect</span>
                </span>
              </Link>
            </div>

            {/* Form Content */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </div>

          <div className="mt-8 text-xs text-slate-500 flex items-center justify-between pt-4 border-t border-slate-800/60">
            <span>Protected by CivicConnect RBAC Encryption</span>
            <span className="font-mono text-[10px]">v2.5.0</span>
          </div>
        </div>

        {/* Civic Showcase Panel (Right on Desktop) */}
        <div className="hidden lg:col-span-5 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-purple-950/60 p-10 lg:flex flex-col justify-between border-l border-slate-800/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Direct Civic Engagement
            </div>

            <h2 className="text-2xl font-extrabold text-white font-display leading-tight">
              Transforming Municipal Service Delivery
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-md">
                <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-200">Role-Gated Access</div>
                  <div className="text-[11px] text-slate-400">Strict permission isolation for Citizens, Field Workers, and City Admins.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-md">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-200">Spatial Incident Mapping</div>
                  <div className="text-[11px] text-slate-400">Pinpoint infrastructure issues with live GPS coordinates and pulse markers.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/60 backdrop-blur-md">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-200">Proof of Resolution</div>
                  <div className="text-[11px] text-slate-400">Worker photo verification and real-time status updates.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-[11px] text-slate-400 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60 font-mono">
            &quot;Empowering citizens and municipal teams through seamless collaboration.&quot;
          </div>
        </div>

      </div>
    </div>
  );
};
