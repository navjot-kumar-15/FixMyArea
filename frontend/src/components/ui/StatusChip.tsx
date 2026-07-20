import React from 'react';
import { ReportStatus, ReportPriority } from '@/types';
import { Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

export const StatusChip: React.FC<{ status: ReportStatus }> = ({ status }) => {
  const config = {
    PENDING: {
      label: 'Pending',
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
      dot: 'bg-amber-500',
      icon: Clock,
    },
    IN_PROGRESS: {
      label: 'In Progress',
      bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/25',
      dot: 'bg-indigo-500',
      icon: AlertCircle,
    },
    RESOLVED: {
      label: 'Resolved',
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
      dot: 'bg-emerald-500',
      icon: CheckCircle2,
    },
    REJECTED: {
      label: 'Rejected',
      bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/25',
      dot: 'bg-rose-500',
      icon: XCircle,
    },
  };

  const current = config[status] || config.PENDING;
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-xs ${current.bg}`}
    >
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${current.dot} opacity-75`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${current.dot}`} />
      </span>
      <Icon className="w-3.5 h-3.5" />
      {current.label}
    </span>
  );
};

export const PriorityChip: React.FC<{ priority: ReportPriority }> = ({ priority }) => {
  const config = {
    LOW: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    MEDIUM: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
    HIGH: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25 font-bold',
    CRITICAL: 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30 font-extrabold animate-pulse shadow-xs',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border ${config[priority]}`}
    >
      {priority}
    </span>
  );
};
