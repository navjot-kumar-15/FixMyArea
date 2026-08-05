import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { VelvetCard } from '@/components/ui/VelvetCard';
import { StatPulseWidget } from '@/components/ui/StatPulseWidget';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import {
  FileText,
  Users,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  Radio,
  PlusCircle,
  Briefcase,
  PieChart as PieIcon,
  Activity,
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
  const navigate = useNavigate();
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
    { name: 'Potholes', value: 35, color: '#6366f1' },
    { name: 'Streetlights', value: 25, color: '#a855f7' },
    { name: 'Water Leak', value: 20, color: '#10b981' },
    { name: 'Sanitation', value: 15, color: '#f59e0b' },
    { name: 'Parks', value: 5, color: '#06b6d4' },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Executive Command Header */}
      <VelvetCard glow="indigo" className="p-8 relative overflow-hidden">
        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" /> LIVE DISPATCH MATRIX
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-400">
              <ShieldCheck className="w-4 h-4" /> Municipal Governance Desk
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight">
              City Operations Console
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Real-time municipal telemetry stream, field worker load balancing, emergency triage, and SLA enforcement.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="gradient"
              size="md"
              onClick={() => navigate('/admin/users')}
              leftIcon={<Users className="w-4 h-4" />}
            >
              Manage Users
            </Button>
          </div>
        </div>
      </VelvetCard>

      {/* Telemetry Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatPulseWidget
          title="Total System Reports"
          value={reports.length}
          subtitle="All Municipal Sectors"
          trend="+14% this month"
          glow="indigo"
          icon={<FileText className="w-6 h-6" />}
        />
        <StatPulseWidget
          title="Pending Dispatch"
          value={pendingCount}
          subtitle="Awaiting Field Unit"
          glow="amber"
          icon={<AlertTriangle className="w-6 h-6" />}
        />
        <StatPulseWidget
          title="Verified Resolved"
          value={resolvedCount}
          subtitle="Community Confirmed"
          glow="emerald"
          icon={<CheckCircle2 className="w-6 h-6" />}
        />
        <StatPulseWidget
          title="Active Field Units"
          value={workers.length}
          subtitle="Patrolling District 4"
          glow="cyan"
          icon={<Users className="w-6 h-6" />}
        />
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Area Chart */}
        <VelvetCard glow="cyan" className="lg:col-span-2 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" /> Monthly Inflow & Resolution Velocity
            </h3>
            <span className="text-xs font-bold text-slate-500 font-mono">2026 Q1-Q2</span>
          </div>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.7} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#090d1a', borderColor: '#1e293b', borderRadius: '14px', color: '#fff' }} />
                <Area type="monotone" dataKey="reports" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorReports)" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </VelvetCard>

        {/* Category Density */}
        <VelvetCard glow="amber" className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-purple-400" /> Category Density
            </h3>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} innerRadius={45} paddingAngle={4} labelLine={false}>
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#090d1a', borderColor: '#1e293b', borderRadius: '14px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-xs text-slate-400">
            {categoryDistribution.map((cat) => (
              <span key={cat.name} className="flex items-center gap-1 font-semibold">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                {cat.name}
              </span>
            ))}
          </div>
        </VelvetCard>
      </div>

      {/* Field Worker Roster Overview */}
      <VelvetCard glow="indigo" className="p-6 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" /> Field Dispatch Roster
          </h3>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/admin/workers')}
            leftIcon={<Briefcase className="w-4 h-4" />}
          >
            Manage Roster
          </Button>
        </div>

        <div className="divide-y divide-slate-800">
          {workers.map((worker) => (
            <div key={worker.id} className="py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar src={worker.avatarUrl} name={worker.name} size="md" />
                <div>
                  <h4 className="text-base font-bold text-white">{worker.name}</h4>
                  <p className="text-xs text-slate-400">
                    {worker.specialization} • District: <span className="text-indigo-400 font-semibold">{worker.assignedArea}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{worker.activeTasksCount} Active Dispatch</div>
                  <div className="text-xs text-slate-500">{worker.completedTasksCount} Resolved</div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  ⭐ {worker.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </VelvetCard>
    </div>
  );
};
