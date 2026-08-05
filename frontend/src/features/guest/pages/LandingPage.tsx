import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard, MagneticButton } from '@/components/ui/DesignSystem';
import {
  Layers,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Camera,
  ChevronDown,
  Activity,
  Award,
  Zap,
  ShieldCheck,
  Send,
  AlertTriangle,
  Radio,
  Check,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Interactive Live Simulator State
  const [simCategory, setSimCategory] = useState<'Pothole' | 'Streetlight' | 'Water Leak' | 'Hazard'>('Pothole');
  const [simLocation, setSimLocation] = useState('742 Evergreen Terrace');
  const [simState, setSimState] = useState<'idle' | 'analyzing' | 'dispatched'>('idle');

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setSimState('analyzing');
    setTimeout(() => {
      setSimState('dispatched');
    }, 1400);
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-16 px-6 text-center">
        {/* Glowing Backdrops */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/15 blur-[130px] pointer-events-none" />

        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-md text-xs font-bold text-indigo-600 dark:text-indigo-300 font-display shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span>Next-Gen Municipal Governance System</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] font-display">
            Empowering Cities With <br className="hidden sm:block" />
            <span className="text-gradient">Real-Time Civic Intelligence</span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Report potholes, outages, and hazards instantly. Bridge the gap between community reports and automated field crew dispatches.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <MagneticButton
              variant="primary"
              size="lg"
              icon={MapPin}
              onClick={() => navigate('/report')}
            >
              Report an Issue Now
            </MagneticButton>

            <MagneticButton
              variant="glass"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/map')}
            >
              Explore Live Map
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Live Operational Ticker Stats */}
      <section className="max-w-6xl mx-auto px-6">
        <GlassCard className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 border border-indigo-500/30 glow-card">
          {[
            { label: 'Active Reports', val: '439', icon: Activity, color: 'text-indigo-500', sub: 'Updated 2m ago' },
            { label: 'Crews En Route', val: '24', icon: Zap, color: 'text-amber-500', sub: 'Live GPS tracked' },
            { label: 'Resolved This Month', val: '1,894', icon: CheckCircle2, color: 'text-emerald-500', sub: '99.4% satisfaction' },
            { label: 'Avg Dispatch Speed', val: '4.2h', icon: Clock, color: 'text-cyan-500', sub: '3x faster than avg' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center space-y-2 py-2">
                <div className="flex justify-center">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                  {stat.val}
                </div>
                <div>
                  <div className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider font-display">
                    {stat.label}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">{stat.sub}</div>
                </div>
              </div>
            );
          })}
        </GlassCard>
      </section>

      {/* Interactive Live Simulator */}
      <section className="max-w-5xl mx-auto px-6">
        <GlassCard className="p-8 md:p-10 border border-indigo-500/30 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-200/60 dark:border-slate-800/60">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold font-display mb-2">
                <Radio className="w-4 h-4 text-indigo-500 animate-pulse" /> Live Dispatch Simulator
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                Try CivicConnect Dispatch Engine
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Simulate how an issue is classified and assigned to field crews in seconds.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Input Form */}
            <form onSubmit={handleSimulate} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-display">
                  Select Issue Category
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['Pothole', 'Streetlight', 'Water Leak', 'Hazard'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSimCategory(cat);
                        setSimState('idle');
                      }}
                      className={`px-3.5 py-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between font-display ${
                        simCategory === cat
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                          : 'bg-slate-100/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                      }`}
                    >
                      <span>{cat}</span>
                      {simCategory === cat && <Check className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-display">
                  Simulated Location Landmark
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-indigo-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={simLocation}
                    onChange={(e) => setSimLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <MagneticButton
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                isLoading={simState === 'analyzing'}
                icon={Send}
              >
                {simState === 'analyzing' ? 'Routing Telemetry...' : 'Simulate Dispatch Trigger'}
              </MagneticButton>
            </form>

            {/* Live Visualizer Console */}
            <div className="p-6 rounded-2xl bg-slate-950 text-white border border-slate-800 min-h-[230px] flex flex-col justify-between relative overflow-hidden shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 font-display">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  TELEMETRY ENGINE OUTPUT
                </span>
                <span className="text-[10px] text-indigo-400 font-mono">STATUS: {simState.toUpperCase()}</span>
              </div>

              <AnimatePresence mode="wait">
                {simState === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="my-auto text-center space-y-2 py-4"
                  >
                    <AlertTriangle className="w-8 h-8 text-indigo-400 mx-auto animate-bounce" />
                    <p className="text-xs text-slate-400 font-medium">Select an issue category and trigger simulation to view response latency.</p>
                  </motion.div>
                )}

                {simState === 'analyzing' && (
                  <motion.div
                    key="analyzing"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="my-auto space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center animate-spin">
                        <Activity className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-indigo-300 font-display">AI Dispatch Matrix</div>
                        <div className="text-[10px] text-slate-400 font-medium">Evaluating geotag severity & nearest active crew...</div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full w-2/3 animate-pulse" />
                    </div>
                  </motion.div>
                )}

                {simState === 'dispatched' && (
                  <motion.div
                    key="dispatched"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="my-auto space-y-3"
                  >
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 shrink-0" />
                      <div>
                        <div className="text-xs font-extrabold text-white font-display">WORK ORDER DISPATCHED</div>
                        <div className="text-[10px] text-emerald-300 font-medium">Assigned: Marcus Vance (Patrol Unit #4)</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">Category: <span className="font-bold text-white">{simCategory}</span></div>
                      <div className="p-2 rounded bg-slate-900 border border-slate-800">Est. Arrival: <span className="font-bold text-emerald-400">35 Mins</span></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="text-[9px] text-slate-500 font-mono text-right pt-2 border-t border-slate-850">
                GEO: {simLocation}
              </div>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
};
