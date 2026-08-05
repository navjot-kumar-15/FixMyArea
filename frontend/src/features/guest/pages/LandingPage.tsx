import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { VelvetCard } from '@/components/ui/VelvetCard';
import { StatPulseWidget } from '@/components/ui/StatPulseWidget';
import {
  Compass,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Activity,
  Zap,
  Radio,
  Send,
  AlertCircle,
  Shield,
  Layers,
  Heart,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Interactive Live Simulator State
  const [simCategory, setSimCategory] = useState<'Pothole' | 'Streetlight' | 'Water Leak' | 'Hazard'>('Pothole');
  const [simLocation, setSimLocation] = useState('742 Evergreen Terrace, Sector 4');
  const [simState, setSimState] = useState<'idle' | 'analyzing' | 'dispatched'>('idle');

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setSimState('analyzing');
    setTimeout(() => {
      setSimState('dispatched');
    }, 1200);
  };

  return (
    <div className="space-y-16 pb-24 overflow-hidden">
      {/* Hero Experience Section */}
      <section className="relative pt-12 md:pt-20 pb-12 px-4 text-center">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/10 blur-[140px] pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-xl text-xs font-extrabold text-cyan-400 font-display shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>CIVIC CONNECT URBAN TELEMETRY CORE</span>
          </div>

          <h1 className="text-4xl sm:text-7xl font-black text-white tracking-tight leading-[1.1] font-display">
            The Living Pulse of <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Your Municipal Grid
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Transforming urban issue reporting into real-time spatial telemetry. Connect directly with field crew dispatch units.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="gradient"
              size="lg"
              onClick={() => navigate('/explore')}
              leftIcon={<Compass className="w-5 h-5" />}
            >
              Explore Live City Map
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/login')}
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Sign In to Console
            </Button>
          </div>
        </div>
      </section>

      {/* Live Telemetry Pulse Widgets */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatPulseWidget
          title="Active Telemetry Reports"
          value="439"
          subtitle="Updated 2m ago"
          glow="cyan"
          trend="+12%"
          icon={<Activity className="w-6 h-6" />}
        />
        <StatPulseWidget
          title="Field Crews En Route"
          value="24"
          subtitle="Live GPS tracked"
          glow="amber"
          icon={<Zap className="w-6 h-6" />}
        />
        <StatPulseWidget
          title="Monthly Resolutions"
          value="1,894"
          subtitle="99.4% SLA resolution"
          glow="emerald"
          icon={<CheckCircle2 className="w-6 h-6" />}
        />
        <StatPulseWidget
          title="Avg Dispatch Velocity"
          value="4.2h"
          subtitle="3x faster than target"
          glow="rose"
          icon={<Clock className="w-6 h-6" />}
        />
      </section>

      {/* Live Interactive Dispatch Simulator */}
      <section className="max-w-5xl mx-auto px-4">
        <VelvetCard glow="indigo" className="p-6 md:p-10 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold font-display mb-2">
                <Radio className="w-4 h-4 text-indigo-400 animate-pulse" /> Live Telemetry Engine Simulator
              </div>
              <h3 className="text-2xl font-black text-white font-display">
                Simulate Spatial Dispatch
              </h3>
              <p className="text-xs text-slate-400">
                Experience automated issue triage and field crew assignment.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Input Form */}
            <form onSubmit={handleSimulate} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  Issue Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Pothole', 'Streetlight', 'Water Leak', 'Hazard'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSimCategory(cat);
                        setSimState('idle');
                      }}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                        simCategory === cat
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/20'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">
                  Simulated Geofence Landmark
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-indigo-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={simLocation}
                    onChange={(e) => setSimLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="md"
                className="w-full"
                isLoading={simState === 'analyzing'}
                leftIcon={<Send className="w-4 h-4" />}
              >
                {simState === 'analyzing' ? 'Routing Telemetry...' : 'Trigger Dispatch Engine'}
              </Button>
            </form>

            {/* Output Visualizer */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 min-h-[220px] flex flex-col justify-between relative shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-850 pb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5 font-display">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  TELEMETRY ENGINE OUTPUT
                </span>
                <span className="text-[10px] text-cyan-400 font-mono">
                  {simState.toUpperCase()}
                </span>
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
                    <AlertCircle className="w-8 h-8 text-indigo-400 mx-auto animate-bounce" />
                    <p className="text-xs text-slate-400 font-medium">Select a category and trigger dispatch to simulate response.</p>
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
                        <div className="text-xs font-bold text-indigo-300">Evaluating Geofence Severity</div>
                        <div className="text-[10px] text-slate-400">Locating nearest available technician...</div>
                      </div>
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
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 shrink-0" />
                      <div>
                        <div className="text-xs font-extrabold text-white">WORK ORDER DISPATCHED</div>
                        <div className="text-[10px] text-emerald-300">Assigned: Unit #04 (Marcus Vance)</div>
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
        </VelvetCard>
      </section>
    </div>
  );
};
