import React from 'react';
import { ReportStatus, ReportPriority } from '@/types';
import { Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

export const StatusChip: React.FC<{ status: ReportStatus }> = ({ status }) => {
  const config = {
    PENDING: {
      label: 'Pending',
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      icon: Clock,
    },
    IN_PROGRESS: {
      label: 'In Progress',
      bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      icon: AlertCircle,
    },
    RESOLVED: {
      label: 'Resolved',
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      icon: CheckCircle2,
    },
    REJECTED: {
      label: 'Rejected',
      bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      icon: XCircle,
    },
  };

  const current = config[status] || config.PENDING;
  const Icon = current.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${current.bg}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {current.label}
    </span>
  );
};

export const PriorityChip: React.FC<{ priority: ReportPriority }> = ({ priority }) => {
  const config = {
    LOW: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
    MEDIUM: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    HIGH: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    CRITICAL: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 font-bold animate-pulse',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider border ${config[priority]}`}
    >
      {priority}
    </span>
  );
};
