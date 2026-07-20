import React from 'react';
import { Layers, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { toggleTheme } from '@/store/slices/themeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Sun, Moon } from 'lucide-react';

export const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <div className="min-h-screen w-full flex bg-slate-50 dark:bg-slate-950 font-sans transition-colors">
      {/* Left Glassmorphic Hero Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-12 flex-col justify-between overflow-hidden text-white">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <span className="font-extrabold text-2xl tracking-tight">CivicConnect</span>
            <span className="block text-xs font-semibold text-blue-200 uppercase tracking-widest">
              Enterprise Portal
            </span>
          </div>
        </div>

        {/* Center Showcase */}
        <div className="relative z-10 space-y-6 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-100">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Next-Gen Civic Infrastructure Management
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight">
            Empowering Citizens, Field Workers & Local Authorities.
          </h1>
          <p className="text-blue-100 text-sm leading-relaxed">
            Report hazards, track repair progress with GPS precision, and maintain transparent public infrastructure across your city in real time.
          </p>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/15">
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
              <div className="text-xl font-bold">99.4%</div>
              <div className="text-[11px] text-blue-200 font-medium">Resolution Rate</div>
            </div>
            <div className="space-y-1">
              <MapPin className="w-5 h-5 text-amber-300" />
              <div className="text-xl font-bold">12,400+</div>
              <div className="text-[11px] text-blue-200 font-medium">Issues Solved</div>
            </div>
            <div className="space-y-1">
              <Layers className="w-5 h-5 text-blue-300" />
              <div className="text-xl font-bold">&lt; 24h</div>
              <div className="text-[11px] text-blue-200 font-medium">Avg Dispatch</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-xs text-blue-200">
          &copy; {new Date().getFullYear()} CivicConnect SaaS. Production Grade Platform.
        </div>
      </div>

      {/* Right Form Area */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-12 relative overflow-y-auto">
        <div className="flex justify-end">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mode === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-400" />}
          </button>
        </div>

        <div className="w-full max-w-md mx-auto my-auto py-8">{children}</div>

        <div className="text-center text-xs text-slate-400">
          By signing in, you agree to our Terms of Service & Privacy Policy.
        </div>
      </div>
    </div>
  );
};
