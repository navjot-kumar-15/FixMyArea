import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Wrench, ShieldCheck, AlertCircle } from 'lucide-react';

export interface TimelineStep {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'current' | 'upcoming' | 'rejected';
  actorName?: string;
  actorRole?: string;
  proofImage?: string;
  notes?: string;
}

interface TimelineProps {
  steps: TimelineStep[];
}

export const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  const getIcon = (status: TimelineStep['status'], idx: number) => {
    if (status === 'completed') {
      return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    }
    if (status === 'current') {
      return <Wrench className="w-5 h-5 text-indigo-500 animate-pulse" />;
    }
    if (status === 'rejected') {
      return <AlertCircle className="w-5 h-5 text-rose-500" />;
    }
    return <Clock className="w-5 h-5 text-slate-400 dark:text-slate-600" />;
  };

  return (
    <div className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800 space-y-8 my-4">
      {steps.map((step, index) => {
        const isCurrent = step.status === 'current';
        const isCompleted = step.status === 'completed';

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            {/* Timeline Dot Icon */}
            <div
              className={`absolute -left-[35px] top-0 p-1.5 rounded-full border-2 bg-white dark:bg-slate-900 shadow-md ${
                isCompleted
                  ? 'border-emerald-500 text-emerald-500'
                  : isCurrent
                  ? 'border-indigo-500 text-indigo-500 ring-4 ring-indigo-500/20'
                  : 'border-slate-300 dark:border-slate-700 text-slate-400'
              }`}
            >
              {getIcon(step.status, index)}
            </div>

            {/* Content Card */}
            <div
              className={`p-4 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800/40 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  {step.title}
                  {isCurrent && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500 text-white">
                      In Progress
                    </span>
                  )}
                </h4>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  {step.timestamp}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                {step.description}
              </p>

              {step.actorName && (
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                  <span>
                    Action by: <strong className="text-slate-700 dark:text-slate-200">{step.actorName}</strong> ({step.actorRole})
                  </span>
                </div>
              )}

              {step.notes && (
                <div className="mt-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800 text-xs italic text-slate-600 dark:text-slate-300">
                  "{step.notes}"
                </div>
              )}

              {step.proofImage && (
                <div className="mt-3">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Resolution Evidence:
                  </p>
                  <img
                    src={step.proofImage}
                    alt="Proof of resolution"
                    className="w-full max-w-sm h-44 object-cover rounded-lg border border-slate-200 dark:border-slate-700 shadow-md"
                  />
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
