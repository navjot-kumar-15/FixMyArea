import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { setSelectedReport } from '@/store/slices/reportSlice';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusChip, PriorityChip } from '@/components/ui/StatusChip';
import { ReportsMap } from '@/components/map/ReportsMap';
import {
  FileText,
  PlusCircle,
  CheckCircle2,
  Clock,
  ThumbsUp,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const reports = useSelector((state: RootState) => state.reports.reports);

  const myReports = reports.filter((r) => r.reportedBy.id === user?.id || r.reportedBy.name === user?.name);
  const resolvedCount = reports.filter((r) => r.status === 'RESOLVED').length;
  const activeCount = reports.filter((r) => r.status === 'IN_PROGRESS' || r.status === 'PENDING').length;

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-700 p-8 md:p-10 text-white shadow-2xl overflow-hidden shimmer-card">
        {/* Glow circles */}
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10 space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-indigo-100">
            <Award className="w-4 h-4 text-yellow-300 fill-yellow-300" /> Community Protector • Level 4
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Hi, {user?.name || 'Citizen'}!
          </h1>
          
          <p className="text-indigo-100 text-sm leading-relaxed max-w-md">
            Track reported issues, upvote local solutions, and help make your municipal neighborhood safer and cleaner.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Button
              variant="primary"
              className="bg-white text-indigo-600 hover:bg-slate-50 font-bold border-none shadow-lg shadow-indigo-900/20"
              onClick={() => navigate('/report')}
              leftIcon={<PlusCircle className="w-4 h-4" />}
            >
              Report New Issue
            </Button>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/15 backdrop-blur-sm"
              onClick={() => navigate('/map')}
              leftIcon={<Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />}
            >
              Explore Map
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Level bar */}
      <Card glass className="p-5 border border-indigo-500/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center justify-center md:justify-start gap-1.5">
              <Zap className="w-4 h-4 text-indigo-500 fill-indigo-500" /> Neighborhood Impact Level
            </h3>
            <p className="text-xs text-slate-400">Gain XP by reporting valid issues and upvoting resolutions.</p>
          </div>
          <div className="flex-1 w-full max-w-md space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-500">
              <span>750 XP</span>
              <span>1000 XP (Next Level)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5">
              <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600" style={{ width: '75%' }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total City Reports', val: reports.length, icon: FileText, bg: 'bg-blue-500/10 text-blue-600' },
          { label: 'Active In-Progress', val: activeCount, icon: Clock, bg: 'bg-amber-500/10 text-amber-600' },
          { label: 'Successfully Resolved', val: resolvedCount, icon: CheckCircle2, bg: 'bg-emerald-500/10 text-emerald-600' },
          { label: 'Community Rating', val: '98.2%', icon: TrendingUp, bg: 'bg-purple-500/10 text-purple-600' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} glass className="p-5 relative overflow-hidden border border-slate-150 dark:border-slate-850 hover:shadow-glow hover:-translate-y-1 transition-all">
              <CardContent className="p-0 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{item.val}</div>
                  <div className="text-xs font-semibold text-slate-400">{item.label}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Interactive Map & Recent Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Issues List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Recent Reported Issues</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/map')} rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {reports.slice(0, 4).map((report) => (
              <Card
                key={report.id}
                glass
                className="cursor-pointer hover:border-indigo-500/40 transition-all overflow-hidden"
                onClick={() => {
                  dispatch(setSelectedReport(report));
                  navigate(`/report/${report.id}`);
                }}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {report.images[0] && (
                      <div className="w-full sm:w-36 h-28 rounded-2xl overflow-hidden border shrink-0">
                        <img
                          src={report.images[0]}
                          alt={report.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <StatusChip status={report.status} />
                          <PriorityChip priority={report.priority} />
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                        {report.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {report.description}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60 text-xs text-slate-500">
                        <span>{report.locationName}</span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 font-semibold text-indigo-600">
                            <ThumbsUp className="w-3.5 h-3.5 fill-indigo-100 dark:fill-indigo-950" /> {report.upvotesCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Live Map Widget */}
        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Live Area Heatmap</h3>
          <ReportsMap
            reports={reports}
            height="460px"
            onSelectReport={(r) => {
              dispatch(setSelectedReport(r));
              navigate(`/report/${r.id}`);
            }}
          />
        </div>
      </div>
    </div>
  );
};
