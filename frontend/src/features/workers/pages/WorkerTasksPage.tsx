import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { setSelectedReport, updateReportStatus } from '@/store/slices/reportSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusChip, PriorityChip } from '@/components/ui/StatusChip';
import { Textarea } from '@/components/ui/Input';
import { Briefcase, CheckCircle2, Clock, MapPin, Upload, AlertCircle, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export const WorkerTasksPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const reports = useSelector((state: RootState) => state.reports.reports);
  const workers = useSelector((state: RootState) => state.workers.workers);

  const workerProfile = workers.find((w) => w.id === user?.id || w.name === user?.name) || workers[0];
  const assignedTasks = reports.filter(
    (r) => r.assignedWorker?.id === workerProfile.id || r.assignedWorker?.name === workerProfile.name
  );

  const [activeTab, setActiveTab] = useState<'ALL' | 'PENDING' | 'IN_PROGRESS' | 'RESOLVED'>('ALL');
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [targetReportId, setTargetReportId] = useState<string | null>(null);
  const [proofNotes, setProofNotes] = useState('');

  const filteredTasks = assignedTasks.filter((t) => activeTab === 'ALL' || t.status === activeTab);

  const handleStartTask = (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(updateReportStatus({ reportId, status: 'IN_PROGRESS' }));
    toast.success('Task status updated to IN_PROGRESS!');
  };

  const handleCompleteTask = (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTargetReportId(reportId);
    setResolveModalOpen(true);
  };

  const submitCompletionProof = () => {
    if (!targetReportId) return;
    dispatch(
      updateReportStatus({
        reportId: targetReportId,
        status: 'RESOLVED',
        completionProof: {
          imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
          notes: proofNotes || 'Repair verified and completed on site.',
        },
      })
    );
    toast.success('Work task marked RESOLVED with photo evidence!');
    setResolveModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-purple-600" /> Assigned Work Orders Kanban
          </h1>
          <p className="text-xs text-slate-500">
            Field dispatch task queue for {workerProfile.name} ({workerProfile.assignedArea}).
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        {(['ALL', 'PENDING', 'IN_PROGRESS', 'RESOLVED'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.replace('_', ' ')} ({assignedTasks.filter((t) => tab === 'ALL' || t.status === tab).length})
          </button>
        ))}
      </div>

      {/* Task List / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => (
          <Card
            key={task.id}
            glass
            className="cursor-pointer hover:border-purple-500/50 transition-all flex flex-col justify-between"
            onClick={() => {
              dispatch(setSelectedReport(task));
              navigate(`/report/${task.id}`);
            }}
          >
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StatusChip status={task.status} />
                  <PriorityChip priority={task.priority} />
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">{task.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mt-1">{task.description}</p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="truncate">{task.locationName}</span>
              </div>

              {/* Status Action Button */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                {task.status === 'PENDING' && (
                  <Button variant="primary" size="sm" onClick={(e) => handleStartTask(task.id, e)} leftIcon={<Clock className="w-3.5 h-3.5" />}>
                    Start Task Work
                  </Button>
                )}
                {task.status === 'IN_PROGRESS' && (
                  <Button variant="success" size="sm" onClick={(e) => handleCompleteTask(task.id, e)} leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}>
                    Upload Proof & Resolve
                  </Button>
                )}
                {task.status === 'RESOLVED' && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Work Complete
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resolution Proof Upload Modal */}
      {resolveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl border">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Upload Completion Evidence</h3>
            <Textarea
              label="On-Site Repair Notes"
              rows={3}
              placeholder="Describe work completed by crew..."
              value={proofNotes}
              onChange={(e) => setProofNotes(e.target.value)}
            />
            <div className="p-4 border-2 border-dashed rounded-xl text-center text-xs text-slate-500 bg-slate-50 dark:bg-slate-800">
              <Upload className="w-6 h-6 text-purple-600 mx-auto mb-1" />
              Completion Photo Attached Automatically
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setResolveModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="success" size="sm" onClick={submitCompletionProof}>
                Submit & Complete Task
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
