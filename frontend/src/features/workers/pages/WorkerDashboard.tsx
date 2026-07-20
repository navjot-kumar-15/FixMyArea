import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { setSelectedReport } from '@/store/slices/reportSlice';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusChip, PriorityChip } from '@/components/ui/StatusChip';
import { Avatar } from '@/components/ui/Avatar';
import { Briefcase, CheckCircle2, Clock, Star, MapPin, ArrowRight, Zap, Target } from 'lucide-react';

export const WorkerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const reports = useSelector((state: RootState) => state.reports.reports);
  const workers = useSelector((state: RootState) => state.workers.workers);

  const workerProfile = workers.find((w) => w.id === user?.id || w.name === user?.name) || workers[0];

  const assignedTasks = reports.filter(
    (r) => r.assignedWorker?.id === workerProfile.id || r.assignedWorker?.name === workerProfile.name
  );
  const pendingTasks = assignedTasks.filter((r) => r.status === 'IN_PROGRESS' || r.status === 'PENDING');

  return (
    <div className="space-y-8 pb-12">
      {/* Worker Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-800 p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 shimmer-card">
        <div className="flex items-center gap-4">
          <Avatar src={workerProfile.avatarUrl} name={workerProfile.name} size="xl" />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white/20 text-white">
                {workerProfile.specialization}
              </span>
              <span className="text-[11px] font-bold text-yellow-300 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-yellow-300" /> {workerProfile.rating} Rating
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight">{workerProfile.name}</h1>
            <p className="text-xs text-indigo-100">
              Assigned Patrol District: <strong>{workerProfile.assignedArea}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            className="bg-white text-indigo-600 hover:bg-slate-50 font-bold border-none shadow-lg"
            onClick={() => navigate('/worker/tasks')}
            leftIcon={<Briefcase className="w-4 h-4" />}
          >
            Assigned Tasks ({pendingTasks.length})
          </Button>
        </div>
      </div>

      {/* Target Meter Progress */}
      <Card glass className="p-5 border border-indigo-500/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-purple-600" /> Weekly Resolution Target
            </h3>
            <p className="text-xs text-slate-400">Aim for 95% SLA completion speed on safety dispatches.</p>
          </div>
          <div className="flex-grow max-w-md w-full space-y-1">
            <div className="flex justify-between text-[11px] font-bold text-slate-500">
              <span>SLA Target: 95%</span>
              <span className="text-emerald-500 font-extrabold">Current: 97.4%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5">
              <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600" style={{ width: '97.4%' }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: 'Active Work Tasks', val: pendingTasks.length, icon: Briefcase, color: 'bg-purple-500/10 text-purple-600' },
          { label: 'Total Completed Repairs', val: workerProfile.completedTasksCount, icon: CheckCircle2, color: 'bg-emerald-500/10 text-emerald-600' },
          { label: 'Avg Resolution Speed', val: '4.2 Hours', icon: Clock, color: 'bg-blue-500/10 text-blue-600' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} glass className="p-5 hover:shadow-glow hover:-translate-y-1 transition-all border">
              <CardContent className="p-0 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center`}>
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

      {/* Assigned Tasks Table / Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Active Dispatch Queue</h3>

        <div className="space-y-4">
          {assignedTasks.map((task) => (
            <Card
              key={task.id}
              glass
              className="cursor-pointer hover:border-purple-500/50 transition-all"
              onClick={() => {
                dispatch(setSelectedReport(task));
                navigate(`/report/${task.id}`);
              }}
            >
              <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <StatusChip status={task.status} />
                    <PriorityChip priority={task.priority} />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{task.category}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">{task.title}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{task.locationName}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Inspect Task
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
