import React from 'react';
import { motion } from 'framer-motion';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ComponentType<{ className?: string }>;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className = '' }) => {
  return (
    <div className={`flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 w-fit ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer z-10 ${
              isActive
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-200/50 dark:border-slate-700/50"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {Icon && <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : ''}`} />}
            <span className="relative z-10">{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={`relative z-10 px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                isActive ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
