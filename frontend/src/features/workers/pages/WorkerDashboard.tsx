import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RootState } from '@/store';
import { setSelectedReport } from '@/store/slices/reportSlice';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusChip, PriorityChip } from '@/components/ui/StatusChip';
import { Avatar } from '@/components/ui/Avatar';
import { Briefcase, CheckCircle2, Clock, Star, MapPin, ArrowRight, Zap, Target, ShieldAlert } from 'lucide-react';

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
      {/* Worker Hero Banner */}
      <motion.div
        variants={itemVariants}
        className="rounded-3xl bg-gradient-to-r from-purple-800 via-indigo-900 to-slate-900 p-8 text-white shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-purple-500/30 relative overflow-hidden shimmer-card"
      >
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <Avatar src={workerProfile.avatarUrl} name={workerProfile.name} size="xl" />
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-200 border border-purple-400/30">
                {workerProfile.specialization}
              </span>
              <span className="text-[11px] font-extrabold text-yellow-300 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-yellow-300" /> {workerProfile.rating} Rating
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight">{workerProfile.name}</h1>
            <p className="text-xs text-slate-300 font-medium">
              Assigned Patrol District: <strong className="text-white">{workerProfile.assignedArea}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Button
            variant="secondary"
            className="bg-white text-indigo-900 hover:bg-slate-100 font-extrabold shadow-lg border-none"
            onClick={() => navigate('/worker/tasks')}
            leftIcon={<Briefcase className="w-4.5 h-4.5 text-indigo-600" />}
          >
            Assigned Queue ({pendingTasks.length})
          </Button>
        </div>
      </motion.div>

      {/* Target Meter Progress */}
      <motion.div variants={itemVariants}>
        <Card glass className="p-5 border border-purple-500/20 shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-1.5">
                <Target className="w-4 h-4 text-purple-400" /> Weekly Resolution Target
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Targeting 95% SLA completion speed on emergency dispatches.</p>
            </div>
            <div className="flex-grow max-w-md w-full space-y-1.5">
              <div className="flex justify-between text-[11px] font-extrabold text-slate-400">
                <span>SLA Target: 95%</span>
                <span className="text-emerald-400 font-black">Current: 97.4%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700">
                <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-sm" style={{ width: '97.4%' }} />
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Metrics Row */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: 'Active Work Tasks', val: pendingTasks.length, icon: Briefcase, color: 'bg-purple-500/10 text-purple-400' },
          { label: 'Total Completed Repairs', val: workerProfile.completedTasksCount, icon: CheckCircle2, color: 'bg-emerald-500/10 text-emerald-400' },
          { label: 'Avg Resolution Speed', val: '4.2 Hours', icon: Clock, color: 'bg-cyan-500/10 text-cyan-400' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <Card key={idx} glass hoverEffect className="p-5">
              <CardContent className="p-0 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center shrink-0`}>
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

      {/* Assigned Tasks Table / Cards */}
      <motion.div variants={itemVariants} className="space-y-4">
        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Active Dispatch Queue</h3>

        <div className="space-y-4">
          {assignedTasks.map((task) => (
            <Card
              key={task.id}
              glass
              hoverEffect
              className="cursor-pointer border-slate-200/80 dark:border-slate-850"
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
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{task.category}</span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white">{task.title}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{task.locationName}</span>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="font-bold" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Inspect Task
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
