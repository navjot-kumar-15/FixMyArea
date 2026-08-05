import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 ${className}`}>
      <NavLink
        to="/"
        className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
      </NavLink>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-slate-400 dark:text-slate-600" />
            {item.path && !isLast ? (
              <NavLink
                to={item.path}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium"
              >
                {item.label}
              </NavLink>
            ) : (
              <span className={`font-bold ${isLast ? 'text-slate-900 dark:text-white' : ''}`}>
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
