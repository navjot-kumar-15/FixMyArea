import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '@/store';
import { setSelectedReport, toggleUpvote } from '@/store/slices/reportSlice';
import { GlassCard, MagneticButton, StatusBadge, StatWidget } from '@/components/ui/DesignSystem';
import { ReportsMap } from '@/components/map/ReportsMap';
import {
  Sparkles,
  MapPin,
  ThumbsUp,
  MessageSquare,
  PlusCircle,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShieldCheck,
  Flame,
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const reports = useSelector((state: RootState) => state.reports.reports);
  const selectedReport = useSelector((state: RootState) => state.reports.selectedReport);

  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const myReports = reports.filter((r) => r.reportedBy?.id === user?.id || r.reportedBy?.name === user?.name);
  const totalUpvotesReceived = myReports.reduce((acc, r) => acc + (r.upvotesCount || 0), 0);
  const resolvedCount = reports.filter((r) => r.status === 'RESOLVED').length;

  const categories = [
    { id: 'ALL', label: 'All Telemetry' },
    { id: 'POTHOLE', label: 'Road & Potholes' },
    { id: 'STREET_LIGHT', label: 'Lighting Grid' },
    { id: 'WATER_LEAKAGE', label: 'Water Infrastructure' },
    { id: 'GARBAGE', label: 'Sanitation' },
  ];

  const filteredReports = activeCategory === 'ALL'
    ? reports
    : reports.filter((r) => r.category === activeCategory);

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Welcome Banner with Gamification Pill */}
      <GlassCard className="p-8 border border-indigo-500/30 glow-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-600 dark:text-indigo-300 font-display">
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" /> Civic Impact Hub • Tier 3 Pioneer
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-display">
              Welcome back, {user?.name || 'Citizen'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Track neighborhood issues, verify field repair quality, and upvote critical infrastructure repairs in real time.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <MagneticButton
              variant="primary"
              size="lg"
              icon={PlusCircle}
              onClick={() => navigate('/report')}
            >
              Report New Issue
            </MagneticButton>
          </div>
        </div>
      </GlassCard>

      {/* Gamified Impact XP Radar Bar */}
      <GlassCard className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-amber-500/20 font-display">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-slate-900 dark:text-white font-display">Civic Level 5: Neighborhood Guardian</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold font-display">
                  TOP 5% CONTRIBUTOR
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Earned 1,420 Impact XP this month across 8 dispatches.</p>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400 font-display">
              <span>Next Rank: Civic Champion</span>
              <span>1,420 / 2,000 XP</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 w-3/4 shadow-sm" />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Bento Grid Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatWidget
          title="Active City Telemetry"
          value={reports.length}
          subtitle="Real-time Reports"
          trend="+12% vs last week"
          trendDirection="up"
          icon={TrendingUp}
          gradient="from-indigo-600 to-indigo-500"
        />

        <StatWidget
          title="Verified Resolved"
          value={resolvedCount}
          subtitle="Fixed by Field Crews"
          trend="96.8% SLA rate"
          trendDirection="up"
          icon={CheckCircle2}
          gradient="from-emerald-500 to-teal-600"
        />

        <StatWidget
          title="My Dispatched Issues"
          value={myReports.length}
          subtitle="Tracked by you"
          trend="2 currently active"
          trendDirection="up"
          icon={MapPin}
          gradient="from-purple-600 to-purple-500"
        />

        <StatWidget
          title="Community Impact Upvotes"
          value={totalUpvotesReceived}
          subtitle="Voices amplified"
          trend="Top Neighborhood Support"
          trendDirection="up"
          icon={Flame}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      {/* Main Content Layout: Stream + Live Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left 2 Columns: Category Stream */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-display flex items-center gap-2">
              <Flame className="w-6 h-6 text-amber-500" /> Neighborhood Activity Stream
            </h2>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 bg-slate-200/50 dark:bg-slate-900/50 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-800/60">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    px-3 py-1 rounded-xl text-xs font-bold transition-all font-display
                    ${activeCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards List */}
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <GlassCard
                key={report.id}
                onClick={() => {
                  dispatch(setSelectedReport(report));
                  navigate(`/report/${report.id}`);
                }}
                className="p-6 transition-all cursor-pointer"
              >
                <div className="flex flex-col md:flex-row gap-5">
                  {report.images && report.images[0] && (
                    <div className="w-full md:w-44 h-32 rounded-2xl overflow-hidden shrink-0 border border-slate-200/60 dark:border-slate-800">
                      <img src={report.images[0]} alt={report.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={report.status} />
                        <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-display">
                          {report.category}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display leading-snug">
                      {report.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
                      {report.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{report.locationName}</span>
                      </div>

                      <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => dispatch(toggleUpvote(report.id))}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all font-display ${
                            report.isUpvoted
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                              : 'bg-slate-200/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:bg-indigo-500/10'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{report.upvotesCount}</span>
                        </button>

                        <div className="flex items-center gap-1 text-xs text-slate-500 font-semibold font-display">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{report.commentsCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Right 1 Column: Live Interactive Map Widget */}
        <div className="space-y-4 sticky top-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight font-display flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-500" /> Live GIS Radar Map
          </h3>

          <GlassCard className="p-2 overflow-hidden border border-indigo-500/20">
            <ReportsMap
              reports={filteredReports}
              height="450px"
              onSelectReport={(r) => {
                dispatch(setSelectedReport(r));
                navigate(`/report/${r.id}`);
              }}
            />
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
