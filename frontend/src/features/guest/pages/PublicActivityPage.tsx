import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, MapPin, AlertCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';

export const PublicActivityPage: React.FC = () => {
  const navigate = useNavigate();

  const activities = [
    {
      id: 'act_1',
      type: 'RESOLVED',
      title: 'Water Leakage Repaired',
      location: 'Main Market Sector 7, Ward 6',
      time: '12 mins ago',
      actor: 'Public Works Squad 3',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      icon: CheckCircle2,
    },
    {
      id: 'act_2',
      type: 'DISPATCHED',
      title: 'Field Team Dispatched for Pothole Patching',
      location: 'Central Junction, Ward 4',
      time: '35 mins ago',
      actor: 'Ward 4 Supervisor',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
      icon: ShieldCheck,
    },
    {
      id: 'act_3',
      type: 'REPORTED',
      title: 'Broken Streetlamp Logged by Resident',
      location: 'Park Avenue, Ward 2',
      time: '1 hour ago',
      actor: 'Priya V.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      icon: AlertCircle,
    },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16">
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Real-Time Civic Pulse
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
          City Municipal Operations Activity Stream
        </h1>
        <p className="text-xs text-slate-400">
          Live stream of recently logged incidents, worker field dispatches, and completed city resolutions.
        </p>
      </div>

      <div className="space-y-4">
        {activities.map((act) => {
          const IconComponent = act.icon;
          return (
            <div
              key={act.id}
              className={`p-5 rounded-2xl border backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${act.bg}`}
            >
              <div className="flex items-start gap-3.5">
                <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 ${act.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white font-display">{act.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-indigo-400" /> {act.location}
                    </span>
                    <span>• {act.actor}</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 self-end sm:self-center shrink-0">
                <Clock className="w-3 h-3" /> {act.time}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <Button variant="primary" onClick={() => navigate('/explore')}>
          View All Active Reports on Map
        </Button>
      </div>
    </div>
  );
};
