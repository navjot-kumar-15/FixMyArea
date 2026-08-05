import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { setSelectedReport, updateReportStatus } from '@/store/slices/reportSlice';
import { VelvetCard } from '@/components/ui/VelvetCard';
import { StatPulseWidget } from '@/components/ui/StatPulseWidget';
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
import { Button } from '@/components/ui/Button';
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
    <div className="space-y-8 pb-20">
      {/* Tactical Response Header */}
      <VelvetCard glow="indigo" className="p-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-2xl font-display shadow-lg shadow-indigo-500/30">
              {workerProfile.name[0]}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
                  {workerProfile.specialization} Patrol Unit
                </span>
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {workerProfile.rating} Rating
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-black text-white font-display tracking-tight">
                {workerProfile.name}
              </h1>
              <p className="text-xs text-slate-400">
                Assigned Patrol Sector: <strong className="text-white font-bold">{workerProfile.assignedArea}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOnDuty(!isOnDuty)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-all shadow-lg ${
              isOnDuty
                ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                : 'bg-rose-500 text-white shadow-rose-500/20'
            }`}
          >
            <Power className="w-4 h-4" />
            <span>{isOnDuty ? 'ACTIVE ON DUTY' : 'OFF DUTY'}</span>
          </button>
        </div>
      </VelvetCard>

      {/* Target Metric Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatPulseWidget
          title="Active Dispatch Queue"
          value={activeTasks.length}
          subtitle="En Route Tasks"
          trend="Immediate Priority"
          glow="amber"
          icon={<Briefcase className="w-6 h-6" />}
        />
        <StatPulseWidget
          title="Completed Repairs"
          value={workerProfile.completedTasksCount}
          subtitle="This Month"
          trend="+8 this week"
          glow="emerald"
          icon={<CheckCircle2 className="w-6 h-6" />}
        />
        <StatPulseWidget
          title="Avg SLA Repair Velocity"
          value="3.8 Hours"
          subtitle="SLA Target 4.5 Hours"
          glow="cyan"
          icon={<Clock className="w-6 h-6" />}
        />
      </div>

      {/* Dispatch Radar & Active Task Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Active Tasks List */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-white font-display tracking-tight flex items-center gap-2">
              <Navigation className="w-6 h-6 text-indigo-400" /> Dispatch Task Queue
            </h2>
            <span className="text-xs font-bold text-slate-400">
              {activeTasks.length} Assigned Items
            </span>
          </div>

          <div className="space-y-4">
            {assignedTasks.map((task) => (
              <VelvetCard
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
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-slate-800 text-indigo-400">
                        {task.category}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase font-mono">
                        STATUS: {task.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-display">
                      {task.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {task.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
                      <MapPin className="w-4 h-4 text-indigo-400" />
                      <span>{task.locationName}</span>
                    </div>
                  </div>

                  {/* Status Action Buttons */}
                  <div className="flex flex-wrap sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
                    {task.status !== 'RESOLVED' && (
                      <Button
                        variant="gradient"
                        size="sm"
                        onClick={(e) => handleStatusChange(task.id, 'IN_PROGRESS', e)}
                        leftIcon={<Zap className="w-3.5 h-3.5" />}
                      >
                        Start Repair
                      </Button>
                    )}

                    {task.status !== 'RESOLVED' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => handleStatusChange(task.id, 'RESOLVED', e)}
                        leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      >
                        Mark Fixed
                      </Button>
                    )}
                  </div>
                </div>
              </VelvetCard>
            ))}
          </div>
        </div>

        {/* Tactical Field Radar Map */}
        <div className="space-y-4 sticky top-20">
          <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-400" /> Patrol Sector Map
          </h3>

          <div className="rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl">
            <ReportsMap
              reports={assignedTasks}
              height="480px"
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
