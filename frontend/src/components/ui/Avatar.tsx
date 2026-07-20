import React from 'react';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className = '',
}) => {
  const sizeStyles = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  const getInitials = (n: string) => {
    return n
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm ${sizeStyles[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-sm ${sizeStyles[size]} ${className}`}
    >
      {getInitials(name)}
    </div>
  );
};
