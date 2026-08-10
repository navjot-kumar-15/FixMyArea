import React from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something Went Wrong',
  message = 'An unexpected error occurred while loading this view. Please try again or check back later.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`p-8 rounded-3xl bg-rose-500/10 border border-rose-500/20 backdrop-blur-xl text-center flex flex-col items-center justify-center max-w-md mx-auto my-6 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-500 flex items-center justify-center mb-4 shadow-lg shadow-rose-500/10">
        <AlertOctagon className="w-7 h-7 animate-pulse" />
      </div>
      <h3 className="text-base font-extrabold text-white mb-2">{title}</h3>
      <p className="text-xs text-slate-400 mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <Button
          variant="danger"
          size="sm"
          onClick={onRetry}
          leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
};
