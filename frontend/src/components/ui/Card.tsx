import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glass = false,
  ...props
}) => {
  return (
    <div
      className={`rounded-xl border border-slate-200 dark:border-slate-800 transition-all ${
        glass
          ? 'glass-card'
          : 'bg-white dark:bg-slate-900 shadow-sm hover:shadow-md'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    className={`p-5 pb-3 border-b border-slate-100 dark:border-slate-800 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <h3
    className={`text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div
    className={`p-4 pt-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-xl flex items-center ${className}`}
    {...props}
  >
    {children}
  </div>
);
