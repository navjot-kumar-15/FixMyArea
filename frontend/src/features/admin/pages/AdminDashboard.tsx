import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { RootState } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatusChip, PriorityChip } from '@/components/ui/StatusChip';
import { Avatar } from '@/components/ui/Avatar';
import {
  FileText,
  Users,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  Layers,
  BarChart2,
  Radio,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const reports = useSelector((state: RootState) => state.reports.reports);
  const workers = useSelector((state: RootState) => state.workers.workers);

  const pendingCount = reports.filter((r) => r.status === 'PENDING').length;
  const resolvedCount = reports.filter((r) => r.status === 'RESOLVED').length;

  const monthlyData = [
    { month: 'Jan', reports: 42, resolved: 38 },
    { month: 'Feb', reports: 56, resolved: 50 },
    { month: 'Mar', reports: 68, resolved: 62 },
    { month: 'Apr', reports: 85, resolved: 79 },
    { month: 'May', reports: 92, resolved: 88 },
    { month: 'Jun', reports: 110, resolved: 104 },
  ];

  const categoryDistribution = [
    { name: 'Pothole', value: 35, color: '#6366f1' },
    { name: 'Streetlight', value: 25, color: '#a855f7' },
    { name: 'Water Leak', value: 20, color: '#10b981' },
    { name: 'Garbage', value: 15, color: '#f59e0b' },
    { name: 'Other', value: 5, color: '#64748b' },
  ];

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
      className="space-y-8 pb-16"
    >
      {/* Executive Command Header Banner */}
      <motion.div
        variants={itemVariants}
        className="rounded-3xl bg-slate-950 p-8 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800 relative overflow-hidden shimmer-card"
      >
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold animate-pulse">
          <Radio className="w-3.5 h-3.5" /> LIVE TELEMETRY STREAM
        </div>

        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-xs font-bold text-indigo-300">
            <ShieldCheck className="w-4 h-4 text-indigo-400" /> Executive Command Center
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">CivicConnect Console</h1>
          <p className="text-xs text-slate-400 max-w-lg font-medium">
            Real-time municipal telemetry, dispatch orchestration, worker load balancing, and SLA compliance metrics.
          </p>
        </div>
      </motion.div>

      {/* Metrics Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total System Reports', val: reports.length, icon: FileText, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
          { label: 'Pending Dispatch', val: pendingCount, icon: AlertTriangle, color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
          { label: 'Verified Resolved', val: resolvedCount, icon: CheckCircle2, color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
          { label: 'Active Field Crews', val: workers.length, icon: Users, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} glass hoverEffect className={`p-5 border ${item.color}`}>
              <CardContent className="p-0 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{item.val}</div>
                  <div className="text-xs font-extrabold text-slate-400">{item.label}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      {/* Analytics Charts Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Issue Trends Area Chart */}
        <Card glass className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" /> Monthly Issue Inflow & Resolution Velocity
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#090d1a', borderColor: '#1e293b', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="reports" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorReports)" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown Pie Chart */}
        <Card glass>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-purple-400" /> Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie data={categoryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} labelLine={false}>
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#090d1a', borderColor: '#1e293b', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 text-[10px] text-slate-400">
              {categoryDistribution.map((cat) => (
                <span key={cat.name} className="flex items-center gap-1 font-extrabold">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Field Worker Workload Monitor */}
      <motion.div variants={itemVariants}>
        <Card glass>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" /> Active Field Workers & Dispatch Workload
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-slate-100 dark:divide-slate-850">
              {workers.map((worker) => (
                <div key={worker.id} className="py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar src={worker.avatarUrl} name={worker.name} size="md" />
                    <div>
                      <div className="text-sm font-extrabold text-slate-900 dark:text-white">{worker.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {worker.specialization} • <span className="text-indigo-400 font-semibold">{worker.assignedArea}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-xs font-black text-slate-900 dark:text-white">{worker.activeTasksCount} Active Orders</div>
                      <div className="text-[11px] text-slate-400 font-bold">{worker.completedTasksCount} Resolved</div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                      <Radio className="w-3 h-3 text-amber-400 animate-pulse" /> {worker.rating} Rating
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
