import React from 'react';
import { useSelector } from 'react-redux';
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
  BarChart,
  Bar,
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const reports = useSelector((state: RootState) => state.reports.reports);
  const workers = useSelector((state: RootState) => state.workers.workers);

  const pendingCount = reports.filter((r) => r.status === 'PENDING').length;
  const activeCount = reports.filter((r) => r.status === 'IN_PROGRESS').length;
  const resolvedCount = reports.filter((r) => r.status === 'RESOLVED').length;

  // Chart Mock Data
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

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="rounded-3xl bg-slate-950 p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-900 relative overflow-hidden shimmer-card">
        {/* Radar wave animated grid element */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-bold animate-pulse">
          <Radio className="w-3.5 h-3.5" /> LIVE TELEMETRY
        </div>

        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-xs font-bold text-indigo-400">
            <ShieldCheck className="w-4 h-4" /> Metropolitan Executive Control Center
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">CivicConnect Console</h1>
          <p className="text-xs text-slate-400 max-w-lg">
            Real-time analytics, dispatch monitoring, worker workload balance, and municipal SLA performance.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { label: 'Total System Reports', val: reports.length, icon: FileText, color: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/10' },
          { label: 'Pending Dispatch', val: pendingCount, icon: AlertTriangle, color: 'bg-amber-500/10 text-amber-500 border-amber-500/10' },
          { label: 'Verified Resolved', val: resolvedCount, icon: CheckCircle2, color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/10' },
          { label: 'Active Field Crews', val: workers.length, icon: Users, color: 'bg-purple-500/10 text-purple-500 border-purple-500/10' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} glass className={`p-5 hover:shadow-glow hover:-translate-y-1 transition-all border ${item.color}`}>
              <CardContent className="p-0 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center`}>
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

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Issue Trends Area Chart */}
        <Card glass className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" /> Monthly Issue Inflow & Resolution Rate
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
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="reports" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#colorReports)" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown Pie Chart */}
        <Card glass>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-purple-600" /> Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72 flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie data={categoryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} labelLine={false} label>
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-3 text-[10px] text-slate-500">
              {categoryDistribution.map((cat) => (
                <span key={cat.name} className="flex items-center gap-1 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: cat.color }} />
                  {cat.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Field Worker Roster Table */}
      <Card glass>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600" /> Active Field Workers & Task Workload
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
            {workers.map((worker) => (
              <div key={worker.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar src={worker.avatarUrl} name={worker.name} size="md" />
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{worker.name}</div>
                    <div className="text-xs text-slate-500 font-medium">
                      {worker.specialization} • <span className="text-indigo-500">{worker.assignedArea}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-900 dark:text-white">{worker.activeTasksCount} Active</div>
                    <div className="text-[11px] text-slate-400 font-medium">{worker.completedTasksCount} Completed</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-yellow-50 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-900/40 flex items-center gap-1">
                    <Radio className="w-3 h-3 text-yellow-500 animate-pulse" /> {worker.rating} ★ Rating
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
