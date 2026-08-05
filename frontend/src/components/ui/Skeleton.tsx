import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
}) => {
  const baseClasses =
    'animate-pulse bg-slate-200/80 dark:bg-slate-800 rounded';

  if (variant === 'circular') {
    return <div className={`${baseClasses} rounded-full ${className}`} />;
  }

  if (variant === 'card') {
    return (
      <div
        className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3 animate-pulse" />
          <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-lg animate-pulse" />
        </div>
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/2 animate-pulse" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-3/4 animate-pulse" />
      </div>
    );
  }

  return <div className={`${baseClasses} ${className}`} />;
};
