import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  description?: string;
  gradient?: string;
  iconColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  changeType = 'positive',
  description,
  gradient = 'from-indigo-500/10 via-indigo-500/5 to-transparent',
  iconColor = 'text-indigo-500 bg-indigo-500/10',
}) => {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl dark:shadow-slate-950/50 group`}
    >
      {/* Background Subtle Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`} />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {value}
            </h3>
            {change && (
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  changeType === 'positive'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                    : changeType === 'negative'
                    ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/40'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {changeType === 'positive' ? (
                  <TrendingUp className="w-3 h-3" />
                ) : changeType === 'negative' ? (
                  <TrendingDown className="w-3 h-3" />
                ) : null}
                {change}
              </span>
            )}
          </div>
          {description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {description}
            </p>
          )}
        </div>

        <div className={`p-3.5 rounded-2xl ${iconColor} shadow-inner`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};
