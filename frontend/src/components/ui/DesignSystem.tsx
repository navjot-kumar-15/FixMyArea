import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                                 GLASS CARD                                 */
/* -------------------------------------------------------------------------- */
interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  pulseBorder?: boolean;
  sectionType?: 'stat' | 'directory' | 'table' | 'banner' | 'default';
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glowOnHover = true,
  pulseBorder = false,
  sectionType = 'default',
  onClick,
  ...props
}) => {
  // Section-specific hover styles & motion rules
  const sectionHoverMotion = {
    stat: { y: -3, scale: 1.01 },
    directory: { y: -2 },
    table: { y: -1 },
    banner: { scale: 1.002 },
    default: { y: -2 },
  };

  const sectionStyles = {
    stat: 'hover:border-indigo-500/40 dark:hover:border-indigo-400/40 hover:shadow-xl hover:shadow-indigo-500/10',
    directory: 'hover:border-l-4 hover:border-l-purple-500 hover:border-purple-500/30 hover:shadow-lg',
    table: 'hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/40 dark:hover:bg-slate-900/40',
    banner: 'hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/15',
    default: 'hover:border-indigo-500/30 dark:hover:border-indigo-400/30 hover:shadow-md',
  };

  return (
    <motion.div
      whileHover={glowOnHover || onClick ? sectionHoverMotion[sectionType] : undefined}
      whileTap={onClick ? { scale: 0.985 } : undefined}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className={`
        glass-card rounded-2xl p-6 relative overflow-hidden transition-all duration-300
        ${pulseBorder ? 'pulse-border' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${sectionStyles[sectionType]}
        ${className}
      `}
      {...props}
    >
      {/* Ambient background accent light */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-500/5 dark:bg-indigo-400/10 rounded-full blur-2xl pointer-events-none" />
      {children}
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*                              MAGNETIC BUTTON                               */
/* -------------------------------------------------------------------------- */
interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'glass' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  disabled?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled = false,
  ...props
}) => {
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs font-semibold rounded-xl gap-1.5',
    md: 'px-5 py-2.5 text-sm font-semibold rounded-2xl gap-2',
    lg: 'px-7 py-3.5 text-base font-bold rounded-2xl gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:brightness-110 border border-indigo-400/30',
    secondary:
      'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md hover:bg-slate-800 dark:hover:bg-slate-100 border border-slate-700 dark:border-slate-200',
    accent:
      'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:brightness-110 border border-emerald-400/30',
    ghost:
      'bg-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/60',
    glass:
      'glass-panel text-slate-800 dark:text-slate-100 hover:bg-white/90 dark:hover:bg-slate-800/90 hover:border-indigo-500/30 border border-white/40 dark:border-white/10 shadow-md',
    danger:
      'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/20 hover:shadow-rose-500/40 hover:brightness-110 border border-rose-400/30',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02, y: disabled || isLoading ? 0 : -1 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center font-display tracking-tight transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed select-none
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1.5" />
      ) : Icon && iconPosition === 'left' ? (
        <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
      ) : null}

      {children && <span>{children}</span>}

      {!isLoading && Icon && iconPosition === 'right' && (
        <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'}`} />
      )}
    </motion.button>
  );
};

/* -------------------------------------------------------------------------- */
/*                                STATUS BADGE                                */
/* -------------------------------------------------------------------------- */
interface StatusBadgeProps {
  status: 'submitted' | 'assigned' | 'in_progress' | 'resolved' | 'rejected' | string;
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, size = 'md' }) => {
  const norm = status.toLowerCase();

  const config: Record<string, { bg: string; text: string; border: string; pulse: string; defaultLabel: string }> = {
    submitted: {
      bg: 'bg-amber-500/10 dark:bg-amber-500/15',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-500/30',
      pulse: 'bg-amber-500',
      defaultLabel: 'Submitted',
    },
    assigned: {
      bg: 'bg-blue-500/10 dark:bg-blue-500/15',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-500/30',
      pulse: 'bg-blue-500',
      defaultLabel: 'Assigned',
    },
    in_progress: {
      bg: 'bg-purple-500/10 dark:bg-purple-500/15',
      text: 'text-purple-700 dark:text-purple-300',
      border: 'border-purple-500/30',
      pulse: 'bg-purple-500',
      defaultLabel: 'In Progress',
    },
    resolved: {
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-500/30',
      pulse: 'bg-emerald-500',
      defaultLabel: 'Resolved',
    },
    rejected: {
      bg: 'bg-rose-500/10 dark:bg-rose-500/15',
      text: 'text-rose-700 dark:text-rose-300',
      border: 'border-rose-500/30',
      pulse: 'bg-rose-500',
      defaultLabel: 'Rejected',
    },
  };

  const activeConfig = config[norm] || {
    bg: 'bg-slate-500/10 dark:bg-slate-500/15',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-500/30',
    pulse: 'bg-slate-500',
    defaultLabel: status.replace('_', ' '),
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium border backdrop-blur-md transition-all
        ${size === 'sm' ? 'px-2.5 py-0.5 text-xs gap-1.5' : 'px-3 py-1 text-xs gap-2'}
        ${activeConfig.bg} ${activeConfig.text} ${activeConfig.border}
      `}
    >
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${activeConfig.pulse}`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${activeConfig.pulse}`} />
      </span>
      <span className="capitalize">{label || activeConfig.defaultLabel}</span>
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/*                                STAT WIDGET                                 */
/* -------------------------------------------------------------------------- */
interface StatWidgetProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  gradient?: string;
}

export const StatWidget: React.FC<StatWidgetProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendDirection = 'up',
  icon: Icon,
  gradient = 'from-indigo-500 to-purple-600',
}) => {
  return (
    <GlassCard sectionType="stat" className="flex flex-col justify-between h-full">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase font-display">
            {title}
          </p>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight font-display">
            {value}
          </h3>
        </div>
        <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-lg shadow-indigo-500/20`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between text-xs">
          {trend && (
            <span
              className={`font-semibold flex items-center gap-1 ${
                trendDirection === 'up'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : trendDirection === 'down'
                  ? 'text-rose-600 dark:text-rose-400'
                  : 'text-slate-500'
              }`}
            >
              {trendDirection === 'up' ? '↑' : trendDirection === 'down' ? '↓' : '•'} {trend}
            </span>
          )}
          {subtitle && <span className="text-slate-500 dark:text-slate-400 font-medium">{subtitle}</span>}
        </div>
      )}
    </GlassCard>
  );
};

/* -------------------------------------------------------------------------- */
/*                               SKELETON LOADER                              */
/* -------------------------------------------------------------------------- */
export const SkeletonLoader: React.FC<{ className?: string }> = ({ className = 'h-12 w-full' }) => {
  return (
    <div
      className={`bg-slate-200/70 dark:bg-slate-800/70 rounded-2xl animate-pulse shimmer-card ${className}`}
    />
  );
};
