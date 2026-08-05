import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface VelvetCardProps {
  children: ReactNode;
  className?: string;
  glow?: 'cyan' | 'amber' | 'emerald' | 'rose' | 'indigo' | 'none';
  onClick?: () => void;
}

export const VelvetCard: React.FC<VelvetCardProps> = ({
  children,
  className = '',
  glow = 'none',
  onClick,
}) => {
  const glowStyles = {
    cyan: 'hover:shadow-cyan-500/10 hover:border-cyan-500/30',
    amber: 'hover:shadow-amber-500/10 hover:border-amber-500/30',
    emerald: 'hover:shadow-emerald-500/10 hover:border-emerald-500/30',
    rose: 'hover:shadow-rose-500/10 hover:border-rose-500/30',
    indigo: 'hover:shadow-indigo-500/15 hover:border-indigo-500/40',
    none: '',
  };

  return (
    <motion.div
      whileHover={onClick ? { y: -3, scale: 1.005 } : undefined}
      whileTap={onClick ? { scale: 0.99 } : undefined}
      onClick={onClick}
      className={`bg-slate-900/60 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-6 shadow-2xl transition-all duration-300 ${
        glowStyles[glow]
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};
