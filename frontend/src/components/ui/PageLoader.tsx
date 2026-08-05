import React from 'react';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

export const PageLoader: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative flex items-center justify-center mb-6">
        {/* Pulsing Backing Glow */}
        <motion.div
          className="absolute w-24 h-24 rounded-3xl bg-indigo-500/20 dark:bg-indigo-500/30 blur-xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Rotating Outer Ring */}
        <motion.div
          className="w-16 h-16 rounded-2xl border-2 border-indigo-500/30 border-t-indigo-600 dark:border-t-indigo-400"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />

        {/* Center Logo Icon */}
        <motion.div
          className="absolute w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Layers className="w-5 h-5" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
          Civic<span className="text-indigo-600 dark:text-indigo-400">Connect</span>
        </span>
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-1">
          Loading module resources...
        </p>
      </motion.div>
    </div>
  );
};
