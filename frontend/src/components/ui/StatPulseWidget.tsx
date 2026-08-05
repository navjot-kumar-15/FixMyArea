import React, { ReactNode } from 'react';
import { VelvetCard } from './VelvetCard';

interface StatPulseWidgetProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: string;
  glow?: 'cyan' | 'amber' | 'emerald' | 'rose' | 'indigo';
}

export const StatPulseWidget: React.FC<StatPulseWidgetProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  glow = 'cyan',
}) => {
  const colorAccents = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  };

  return (
    <VelvetCard glow={glow} className="relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <span className="text-[10px] font-extrabold font-display uppercase tracking-widest text-slate-400">
            {title}
          </span>
          <div className="text-3xl font-black font-display tracking-tight text-white flex items-baseline gap-2">
            {value}
            {trend && (
              <span className="text-xs font-bold text-emerald-400 font-mono">
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
          )}
        </div>

        <div className={`p-3 rounded-2xl border ${colorAccents[glow]} shadow-lg transition-transform group-hover:scale-110`}>
          {icon}
        </div>
      </div>
    </VelvetCard>
  );
};
