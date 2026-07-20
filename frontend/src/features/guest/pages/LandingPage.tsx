import React from 'react';
import { useNavigate } from 'react-router-dom';
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
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 text-center">
        {/* Futuristic Glowing Backdrops */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-xs font-bold text-indigo-600 dark:text-indigo-400 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> Connecting Communities & City Crews
          </div>

          <h1 className="text-4xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Smart Solutions for <span className="text-gradient">Faster Civic Repairs</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Report potholes, water leaks, and grid failure instantly. Track municipal crews from live dispatch dispatch to completion verification.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              className="shadow-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20 px-8"
              onClick={() => navigate('/report')}
              leftIcon={<MapPin className="w-5 h-5 text-indigo-200 fill-indigo-200" />}
            >
              Report a Civic Issue
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="backdrop-blur-md"
              onClick={() => navigate('/map')}
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Explore Public Map
            </Button>
          </div>
        </div>
      </section>

      {/* Live Operational Ticker */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-3xl bg-slate-900 text-white border border-slate-800/80 shadow-2xl relative overflow-hidden shimmer-card">
          {[
            { label: 'Active Reports', val: '439', icon: Activity, color: 'text-indigo-400' },
            { label: 'Crews En Route', val: '24', icon: Zap, color: 'text-yellow-400' },
            { label: 'Resolved This Month', val: '1,894', icon: CheckCircle2, color: 'text-emerald-400' },
            { label: 'Avg Dispatch Speed', val: '4.2h', icon: Clock, color: 'text-blue-400' },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center space-y-1.5 py-2">
                <div className="flex justify-center">
                  <Icon className={`w-5 h-5 ${stat.color} animate-pulse`} />
                </div>
                <div className="text-2xl md:text-3xl font-black tracking-tight">{stat.val}</div>
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <Award className="w-3.5 h-3.5 text-emerald-400" /> Operational Protocol
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Seamless Four-Step Workflow
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Direct real-time connection between citizens and public dispatch crews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Snap & Tag',
              desc: 'Upload a picture of the issue and tag coordinates via GPS or address maps.',
              icon: Camera,
              color: 'text-indigo-500 bg-indigo-500/10'
            },
            {
              step: '02',
              title: 'Live Dispatch',
              desc: 'System triggers route alerts and alerts specialized local field crews.',
              icon: Layers,
              color: 'text-blue-500 bg-blue-500/10'
            },
            {
              step: '03',
              title: 'Track Repairs',
              desc: 'Receive instant status alerts as crews update dispatch stages.',
              icon: Clock,
              color: 'text-yellow-500 bg-yellow-500/10'
            },
            {
              step: '04',
              title: 'Resolution Proof',
              desc: 'Inspect photo evidence of completion uploaded directly by the crew on site.',
              icon: CheckCircle2,
              color: 'text-emerald-500 bg-emerald-500/10'
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.step} glass className="p-6 relative space-y-4 hover:border-indigo-500/30">
                <div className="text-4xl font-black text-indigo-500/15">
                  {item.step}
                </div>
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="max-w-4xl mx-auto px-6 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Common Inquiries
          </h2>
          <p className="text-xs text-slate-400">Essential answers to platform capabilities.</p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Is CivicConnect free for citizens?',
              a: 'Yes. Resident issue tagging, map exploration, and notification tracking are fully free.',
            },
            {
              q: 'How fast are issues dispatched to field crews?',
              a: 'Urgent hazards are dispatched in 2 hours; non-urgent issues are delegated in 24 hours.',
            },
            {
              q: 'Can I track repairs anonymously?',
              a: 'Yes. Reports can be filed as guests or registered accounts. Personal profiles remain confidential.',
            },
          ].map((faq, idx) => (
            <Card key={idx} glass className="p-5 space-y-2 border border-slate-150 dark:border-slate-850 hover:border-indigo-500/20">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center justify-between">
                {faq.q}
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
