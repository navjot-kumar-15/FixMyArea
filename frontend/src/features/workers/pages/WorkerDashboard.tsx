import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { setSelectedReport, updateReportStatus } from '@/store/slices/reportSlice';
import { GlassCard, MagneticButton, StatusBadge, StatWidget } from '@/components/ui/DesignSystem';
import { ReportsMap } from '@/components/map/ReportsMap';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Star,
  MapPin,
  Zap,
  Target,
  Navigation,
  Power,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const WorkerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const reports = useSelector((state: RootState) => state.reports.reports);
  const workers = useSelector((state: RootState) => state.workers.workers);

  const [isOnDuty, setIsOnDuty] = useState(true);

  const workerProfile = workers.find((w) => w.id === user?.id || w.name === user?.name) || workers[0];

  const assignedTasks = reports.filter(
    (r) => r.assignedWorker?.id === workerProfile.id || r.assignedWorker?.name === workerProfile.name
  );
  const activeTasks = assignedTasks.filter((r) => r.status === 'IN_PROGRESS' || r.status === 'PENDING');

  const handleStatusChange = (id: string, newStatus: 'IN_PROGRESS' | 'RESOLVED', e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(updateReportStatus({ reportId: id, status: newStatus }));
    toast.success(`Task status updated to ${newStatus.replace('_', ' ')}`);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Tactical Duty Header */}
      <GlassCard className="p-8 border border-purple-500/30 glow-card relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-purple-600/30 to-indigo-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-lg shadow-purple-500/30 font-display">
              {workerProfile.name[0]}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-300 text-xs font-bold font-display">
                  {workerProfile.specialization} Unit
                </span>
                <span className="text-xs font-bold text-amber-500 flex items-center gap-1 font-display">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {workerProfile.rating} Rating
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display">
                {workerProfile.name}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Assigned Patrol Sector: <strong className="text-slate-900 dark:text-white font-bold">{workerProfile.assignedArea}</strong>
              </p>
            </div>
          </div>

          {/* Duty Toggle Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOnDuty(!isOnDuty)}
              className={`
                px-5 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all font-display shadow-md
                ${isOnDuty
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                  : 'bg-rose-500 text-white shadow-rose-500/30'}
              `}
            >
              <Power className="w-4 h-4" />
              <span>{isOnDuty ? 'ACTIVE ON DUTY' : 'OFF DUTY'}</span>
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Target Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatWidget
          title="Active Dispatch Queue"
          value={activeTasks.length}
          subtitle="En Route Tasks"
          trend="Immediate Priority"
          trendDirection="up"
          icon={Briefcase}
          gradient="from-purple-600 to-indigo-600"
        />

        <StatWidget
          title="Completed Repairs"
          value={workerProfile.completedTasksCount}
          subtitle="This Month"
          trend="+8 resolved this week"
          trendDirection="up"
          icon={CheckCircle2}
          gradient="from-emerald-500 to-teal-600"
        />

        <StatWidget
          title="Avg SLA Repair Time"
          value="3.8 Hours"
          subtitle="Target 4.5 Hours"
          trend="SLA Compliant"
          trendDirection="up"
          icon={Clock}
          gradient="from-cyan-500 to-blue-600"
        />
      </div>

      {/* Tactical Waypoint Radar & Queue Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Active Tasks List */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight font-display flex items-center gap-2">
              <Navigation className="w-6 h-6 text-purple-500" /> Active Dispatch Tasks
            </h2>
            <span className="text-xs font-bold text-slate-500">
              {activeTasks.length} Assigned Items
            </span>
          </div>

          <div className="space-y-4">
            {assignedTasks.map((task) => (
              <GlassCard
                key={task.id}
                onClick={() => {
                  dispatch(setSelectedReport(task));
                  navigate(`/report/${task.id}`);
                }}
                className="p-5"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={task.status} />
                      <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider font-display">
                        {task.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white font-display">
                      {task.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium line-clamp-2">
                      {task.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold pt-1">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      <span>{task.locationName}</span>
                    </div>
                  </div>

                  {/* Task Action Controls */}
                  <div className="flex flex-wrap sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
                    {task.status !== 'RESOLVED' && (
                      <MagneticButton
                        variant="primary"
                        size="sm"
                        icon={Zap}
                        onClick={(e) => handleStatusChange(task.id, 'IN_PROGRESS', e)}
                      >
                        Start Repair
                      </MagneticButton>
                    )}

                    {task.status !== 'RESOLVED' && (
                      <MagneticButton
                        variant="accent"
                        size="sm"
                        icon={CheckCircle2}
                        onClick={(e) => handleStatusChange(task.id, 'RESOLVED', e)}
                      >
                        Mark Complete
                      </MagneticButton>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Right Column: Tactical Field Radar Map */}
        <div className="space-y-4 sticky top-6">
          <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight font-display flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" /> Tactical Patrol Radar
          </h3>

          <GlassCard className="p-2 overflow-hidden border border-purple-500/20">
            <ReportsMap
              reports={assignedTasks}
              height="480px"
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
