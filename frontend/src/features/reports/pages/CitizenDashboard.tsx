import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { setSelectedReport, toggleUpvote } from '@/store/slices/reportSlice';
import { VelvetCard } from '@/components/ui/VelvetCard';
import { StatPulseWidget } from '@/components/ui/StatPulseWidget';
import { ReportsMap } from '@/components/map/ReportsMap';
import {
  Sparkles,
  MapPin,
  ThumbsUp,
  MessageSquare,
  PlusCircle,
  TrendingUp,
  CheckCircle2,
  Flame,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const CitizenDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const reports = useSelector((state: RootState) => state.reports.reports);

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
    <div className="space-y-8 pb-20">
      {/* Velvet Welcome Header */}
      <VelvetCard glow="indigo" className="p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400">
              <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" /> Civic Impact Steward • Level 3
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight">
              Welcome back, {user?.name || 'Citizen'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 max-w-xl font-medium">
              Monitor neighborhood infrastructure, track dispatch status, and upvote community repairs in real time.
            </p>
          </div>

          <Button
            variant="gradient"
            size="lg"
            onClick={() => navigate('/report')}
            leftIcon={<PlusCircle className="w-5 h-5" />}
          >
            Report New Issue
          </Button>
        </div>
      </VelvetCard>

      {/* Gamified XP Progress Velvet Banner */}
      <VelvetCard glow="amber" className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xl font-bold">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-white">Civic Rank: Neighborhood Guardian</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">
                  TOP 5% CONTRIBUTOR
                </span>
              </div>
              <p className="text-xs text-slate-400">Earned 1,420 Impact XP this month across 8 verified reports.</p>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>Next Rank: Champion</span>
              <span>1,420 / 2,000 XP</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden p-0.5 border border-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 w-3/4" />
            </div>
          </div>
        </div>
      </VelvetCard>

      {/* Telemetry Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatPulseWidget
          title="Active Telemetry"
          value={reports.length}
          subtitle="Real-time Reports"
          trend="+12% this week"
          glow="indigo"
          icon={<TrendingUp className="w-6 h-6" />}
        />
        <StatPulseWidget
          title="Verified Resolved"
          value={resolvedCount}
          subtitle="Fixed by Crews"
          glow="emerald"
          icon={<CheckCircle2 className="w-6 h-6" />}
        />
        <StatPulseWidget
          title="My Dispatched Issues"
          value={myReports.length}
          subtitle="Tracked by You"
          glow="amber"
          icon={<MapPin className="w-6 h-6" />}
        />
        <StatPulseWidget
          title="Impact Upvotes"
          value={totalUpvotesReceived}
          subtitle="Community Support"
          glow="rose"
          icon={<Flame className="w-6 h-6" />}
        />
      </div>

      {/* Main Content Layout: Stream + Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Reports Stream */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-white font-display tracking-tight flex items-center gap-2">
              <Flame className="w-6 h-6 text-amber-500" /> Neighborhood Stream
            </h2>

            <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    activeCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredReports.map((report) => (
              <VelvetCard
                key={report.id}
                onClick={() => {
                  dispatch(setSelectedReport(report));
                  navigate(`/report/${report.id}`);
                }}
                className="p-6 transition-all cursor-pointer hover:border-slate-700"
              >
                <div className="flex flex-col md:flex-row gap-5">
                  {report.images && report.images[0] && (
                    <div className="w-full md:w-44 h-32 rounded-2xl overflow-hidden shrink-0 border border-slate-800">
                      <img src={report.images[0]} alt={report.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-800 text-indigo-400">
                        {report.category}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-display">
                      {report.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {report.description}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{report.locationName}</span>
                      </div>

                      <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => dispatch(toggleUpvote(report.id))}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            report.isUpvoted
                              ? 'bg-indigo-600 text-white shadow-md'
                              : 'bg-slate-950 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{report.upvotesCount}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </VelvetCard>
            ))}
          </div>
        </div>

        {/* Live Interactive Map Widget */}
        <div className="space-y-4 sticky top-20">
          <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-400" /> GIS Telemetry Radar
          </h3>

          <div className="rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl">
            <ReportsMap
              reports={filteredReports}
              height="450px"
              onSelectReport={(r) => {
                dispatch(setSelectedReport(r));
                navigate(`/report/${r.id}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
