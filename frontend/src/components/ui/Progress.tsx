import React from 'react';
import { motion } from 'framer-motion';

interface ProgressProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showPercent?: boolean;
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  label,
  showPercent = true,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const variantGradients = {
    primary: 'from-indigo-500 via-indigo-600 to-purple-600',
    success: 'from-emerald-400 to-teal-600',
    warning: 'from-amber-400 to-orange-500',
    danger: 'from-rose-500 to-red-600',
    purple: 'from-purple-500 via-pink-500 to-rose-500',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {(label || showPercent) && (
        <div className="flex items-center justify-between text-xs font-bold">
          {label && <span className="text-slate-700 dark:text-slate-300">{label}</span>}
          {showPercent && <span className="text-slate-500 dark:text-slate-400">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-slate-200/50 dark:border-slate-800/50 ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`h-full rounded-full bg-gradient-to-r ${variantGradients[variant]} shadow-sm`}
        />
      </div>
    </div>
  );
};
