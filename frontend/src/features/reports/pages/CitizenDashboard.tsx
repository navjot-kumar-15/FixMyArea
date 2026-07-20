import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Sparkles,
  MapPin,
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const reports = useSelector((state: RootState) => state.reports.reports);

  const resolvedCount = reports.filter((r) => r.status === 'RESOLVED').length;
  const activeCount = reports.filter((r) => r.status === 'IN_PROGRESS' || r.status === 'PENDING').length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 pb-12"
    >
      {/* Welcome Hero Banner */}
      <motion.div
        variants={itemVariants}
        className="relative rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-10 text-white shadow-2xl overflow-hidden shimmer-card border border-indigo-400/30"
      >
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-purple-500/25 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs font-extrabold text-indigo-100 shadow-sm">
            <Award className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span>Community Protector • Level 4</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Welcome back, {user?.name || 'Citizen'}!
          </h1>

          <p className="text-indigo-100 text-sm leading-relaxed max-w-md font-medium">
            Track reported issues, upvote neighborhood fixes, and help keep municipal services running smoothly.
          </p>

          <div className="pt-3 flex flex-wrap gap-3">
            <Button
              variant="secondary"
              className="bg-white text-indigo-700 hover:bg-slate-50 font-extrabold shadow-lg shadow-indigo-900/30 border-none"
              onClick={() => navigate('/report')}
              leftIcon={<PlusCircle className="w-4.5 h-4.5" />}
            >
              Report New Issue
            </Button>
            <Button
              variant="outline"
              className="border-white/40 text-white hover:bg-white/15 backdrop-blur-md font-bold"
              onClick={() => navigate('/map')}
              leftIcon={<Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />}
            >
              Live Heatmap
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Progress XP Bar */}
      <motion.div variants={itemVariants}>
        <Card glass className="p-5 border border-indigo-500/20 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-500 fill-indigo-500" /> Neighborhood Impact Progress
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Earn impact XP by logging valid reports and verifying resolutions.</p>
            </div>
            <div className="flex-1 w-full max-w-md space-y-1.5">
              <div className="flex justify-between text-[11px] font-extrabold text-slate-600 dark:text-slate-400">
                <span>750 XP</span>
                <span className="text-indigo-600 dark:text-indigo-400">1000 XP (Level 5)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5 border border-slate-300/40 dark:border-slate-700">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-sm" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Metrics Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total City Reports', val: reports.length, icon: FileText, bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' },
          { label: 'Active In-Progress', val: activeCount, icon: Clock, bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
          { label: 'Successfully Resolved', val: resolvedCount, icon: CheckCircle2, bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
          { label: 'Resolution Rate', val: '98.2%', icon: TrendingUp, bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} glass hoverEffect className="p-5">
              <CardContent className="p-0 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{item.val}</div>
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">{item.label}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      {/* Main Grid: Interactive Map & Recent Reports */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Recent Issues List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Recent Reported Issues</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/my-reports')} rightIcon={<ArrowRight className="w-4 h-4" />}>
              View My Reports
            </Button>
          </div>

          <div className="space-y-4">
            {reports.slice(0, 4).map((report) => (
              <Card
                key={report.id}
                glass
                hoverEffect
                className="cursor-pointer overflow-hidden border-slate-200/80 dark:border-slate-850"
                onClick={() => {
                  dispatch(setSelectedReport(report));
                  navigate(`/report/${report.id}`);
                }}
              >
                <CardContent className="p-5">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {report.images[0] && (
                      <div className="w-full sm:w-36 h-28 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shrink-0">
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
                        <span className="text-[10px] text-slate-400 font-bold">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-1">
                        {report.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-medium">
                        {report.description}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-850 text-xs text-slate-500">
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-indigo-500" /> {report.locationName}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 font-extrabold text-indigo-600 dark:text-indigo-400">
                            <ThumbsUp className="w-3.5 h-3.5" /> {report.upvotesCount}
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
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Live Area Map</h3>
          <ReportsMap
            reports={reports}
            height="460px"
            onSelectReport={(r) => {
              dispatch(setSelectedReport(r));
              navigate(`/report/${r.id}`);
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
