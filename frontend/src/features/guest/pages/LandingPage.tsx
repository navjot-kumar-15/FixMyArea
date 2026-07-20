import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
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
  Building2,
  Users2,
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
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-16 px-6 text-center">
        {/* Futuristic Glowing Backdrops */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/15 blur-[130px] pointer-events-none" />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto space-y-8 relative z-10"
        >
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-md text-xs font-bold text-indigo-600 dark:text-indigo-300 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 animate-pulse" />
              <span>Next-Gen Municipal Governance System</span>
            </div>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1]"
          >
            Empowering Cities With <br className="hidden sm:block" />
            <span className="text-gradient">Real-Time Civic Intelligence</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-xl text-slate-600 dark:text-slate-350 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Report potholes, outages, and hazards instantly. Bridge the gap between community reports and automated field crew dispatches.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button
              variant="gradient"
              size="lg"
              className="shadow-xl px-8 font-extrabold text-base"
              onClick={() => navigate('/report')}
              leftIcon={<MapPin className="w-5 h-5 text-white/90 fill-white/20" />}
            >
              Report an Issue Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="backdrop-blur-md font-bold px-7 border-slate-300 dark:border-slate-800"
              onClick={() => navigate('/map')}
              rightIcon={<ArrowRight className="w-5 h-5 text-indigo-500" />}
            >
              Explore Live Map
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Live Operational Ticker Stats */}
      <section className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-slate-900/90 dark:bg-slate-950/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl relative overflow-hidden shimmer-card"
        >
          <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

          {[
            { label: 'Active Reports', val: '439', icon: Activity, color: 'text-indigo-400', sub: 'Updated 2m ago' },
            { label: 'Crews En Route', val: '24', icon: Zap, color: 'text-yellow-400', sub: 'Live GPS tracked' },
            { label: 'Resolved This Month', val: '1,894', icon: CheckCircle2, color: 'text-emerald-400', sub: '99.4% satisfaction' },
            { label: 'Avg Dispatch Speed', val: '4.2h', icon: Clock, color: 'text-cyan-400', sub: '3x faster than avg' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center space-y-2 py-2 relative z-10">
                <div className="flex justify-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center border border-slate-700/50">
                    <Icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-black text-white tracking-tight">{stat.val}</div>
                <div>
                  <div className="text-[11px] uppercase font-bold text-slate-300 tracking-wider">{stat.label}</div>
                  <div className="text-[9px] text-slate-500 font-medium">{stat.sub}</div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* Interactive Live Issue Submission Simulator */}
      <section className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl glass-card p-6 md:p-10 border border-indigo-500/25 relative overflow-hidden shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-200/60 dark:border-slate-850">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
                <Radio className="w-3.5 h-3.5 animate-pulse" /> Live Simulator
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Try CivicConnect Instant Dispatch
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Simulate how an issue is classified and assigned to field crews in seconds.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Input Form */}
            <form onSubmit={handleSimulate} className="space-y-5">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400 mb-2">
                  Select Issue Type
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
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                      }`}
                    >
                      <span>{cat}</span>
                      {simCategory === cat && <Check className="w-3.5 h-3.5 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400 mb-2">
                  Simulated Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={simLocation}
                    onChange={(e) => setSimLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="gradient"
                size="md"
                className="w-full font-bold"
                isLoading={simState === 'analyzing'}
                leftIcon={<Send className="w-4 h-4" />}
              >
                {simState === 'analyzing' ? 'Processing Telemetry...' : 'Simulate Dispatch Trigger'}
              </Button>
            </form>

            {/* Live Output Simulation Visualizer */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 min-h-[220px] flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  DISPATCH CONSOLE OUTPUT
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
                    <AlertTriangle className="w-8 h-8 text-slate-600 mx-auto animate-bounce" />
                    <p className="text-xs text-slate-400 font-medium">Select an issue category and click simulate to test real-time routing logic.</p>
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
                        <div className="text-xs font-bold text-indigo-300">AI Priority Classifier Engine</div>
                        <div className="text-[10px] text-slate-400">Evaluating geotag severity and crew availability...</div>
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
                        <div className="text-xs font-extrabold text-white">WORK ORDER DISPATCHED</div>
                        <div className="text-[10px] text-emerald-300">Assigned: Marcus Vance (Roadway Unit #4)</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                      <div className="p-2 rounded bg-slate-800/80">Category: <span className="font-bold text-white">{simCategory}</span></div>
                      <div className="p-2 rounded bg-slate-800/80">Est. ETA: <span className="font-bold text-emerald-400">45 Mins</span></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="text-[9px] text-slate-500 font-mono text-right pt-2 border-t border-slate-850">
                GEO: {simLocation}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
            <Award className="w-3.5 h-3.5 text-emerald-400" /> Transparent Protocol
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Seamless Four-Step Workflow
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Direct end-to-end integration connecting residents directly with public works crews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Snap & Tag',
              desc: 'Upload photo evidence of the issue with auto-detected GPS position mapping.',
              icon: Camera,
              color: 'text-indigo-500 bg-indigo-500/10'
            },
            {
              step: '02',
              title: 'Smart Dispatch',
              desc: 'System routes work order to the nearest specialized field worker based on availability.',
              icon: Layers,
              color: 'text-purple-500 bg-purple-500/10'
            },
            {
              step: '03',
              title: 'Track Progress',
              desc: 'Receive live push notifications as crews change status from Pending to En Route.',
              icon: Clock,
              color: 'text-cyan-500 bg-cyan-500/10'
            },
            {
              step: '04',
              title: 'Photo Verification',
              desc: 'Inspect completion photos uploaded on-site by field crews before issue closing.',
              icon: CheckCircle2,
              color: 'text-emerald-500 bg-emerald-500/10'
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.step} glass hoverEffect className="p-6 space-y-4 relative group">
                <div className="text-4xl font-black text-indigo-500/15 group-hover:text-indigo-500/30 transition-colors">
                  {item.step}
                </div>
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="max-w-4xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Everything you need to know about CivicConnect.</p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Is CivicConnect free for citizens?',
              a: 'Yes. Resident issue reporting, interactive map exploration, and notification tracking are 100% free for all citizens.',
            },
            {
              q: 'How fast are issues dispatched to field crews?',
              a: 'Urgent hazards like water main bursts or live wire issues are dispatched within 2 hours; standard repairs within 24 hours.',
            },
            {
              q: 'Can I track repairs anonymously?',
              a: 'Yes. Reports can be submitted either as a guest or with a registered profile. Your personal details remain fully confidential.',
            },
          ].map((faq, idx) => (
            <Card key={idx} glass className="p-5 space-y-2 hover:border-indigo-500/30">
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center justify-between">
                {faq.q}
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{faq.a}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
