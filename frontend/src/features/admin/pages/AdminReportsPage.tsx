import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { ColumnDef } from '@tanstack/react-table';
import { Report } from '@/types';
import { DataTable } from '@/components/table/DataTable';
import { GlassCard, MagneticButton, StatusBadge } from '@/components/ui/DesignSystem';
import { setSelectedReport, assignWorkerToReport } from '@/store/slices/reportSlice';
import { Avatar } from '@/components/ui/Avatar';
import { ArrowRight, MapPin, Eye, UserPlus, X, Check, PlusCircle, Download, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminReportsPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reports = useSelector((state: RootState) => state.reports.reports);
  const workers = useSelector((state: RootState) => state.workers.workers);

  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [activeWorkerId, setActiveWorkerId] = useState(workers[0]?.id);

  const handleQuickAssign = (reportId: string) => {
    const worker = workers.find((w) => w.id === activeWorkerId);
    if (worker) {
      dispatch(
        assignWorkerToReport({
          reportId,
          worker: { id: worker.id, name: worker.name, phone: worker.phone },
        })
      );
      toast.success(`Assigned task to ${worker.name}`);
      setSelectedReportId(null);
    }
  };

  const columns = useMemo<ColumnDef<Report>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'Report Title',
        cell: (info) => (
          <div className="space-y-0.5">
            <div className="font-bold text-slate-900 dark:text-white line-clamp-1 font-display">
              {info.row.original.title}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" /> {info.row.original.locationName}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: (info) => (
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 font-display">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: (info) => {
          const prio = info.getValue() as string;
          return (
            <span
              className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full font-display ${
                prio === 'CRITICAL'
                  ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 animate-pulse'
                  : prio === 'HIGH'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  : 'bg-slate-500/10 text-slate-600 dark:text-slate-400'
              }`}
            >
              {prio}
            </span>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => <StatusBadge status={info.getValue() as any} size="sm" />,
      },
      {
        accessorKey: 'assignedWorker',
        header: 'Assigned Crew',
        cell: (info) => {
          const worker = info.row.original.assignedWorker;
          return worker ? (
            <span className="text-xs font-extrabold text-purple-600 dark:text-purple-400 font-display">
              {worker.name}
            </span>
          ) : (
            <span className="text-xs text-slate-400 italic">Unassigned</span>
          );
        },
      },
      {
        id: 'actions',
        header: 'Action',
        cell: (info) => (
          <div className="flex items-center gap-2">
            <MagneticButton
              variant="glass"
              size="sm"
              icon={UserPlus}
              onClick={() => setSelectedReportId(info.row.original.id)}
            >
              Assign
            </MagneticButton>
            <MagneticButton
              variant="primary"
              size="sm"
              icon={Eye}
              onClick={() => {
                dispatch(setSelectedReport(info.row.original));
                navigate(`/report/${info.row.original.id}`);
              }}
            >
              Manage
            </MagneticButton>
          </div>
        ),
      },
    ],
    [dispatch, navigate]
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <GlassCard className="p-6 md:p-8 border border-indigo-500/30 glow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display flex items-center gap-2">
              <FileText className="w-8 h-8 text-indigo-500" /> Municipal Work Order Control
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Search, filter, assign field workers, and manage lifecycle status for all city issue reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <MagneticButton
              variant="accent"
              size="md"
              icon={PlusCircle}
              onClick={() => navigate('/report')}
            >
              Report New Issue
            </MagneticButton>

            <MagneticButton
              variant="glass"
              size="md"
              icon={Download}
              onClick={() => {
                const csvContent =
                  'data:text/csv;charset=utf-8,' +
                  ['ID,Title,Category,Priority,Status,Location,Worker,Date']
                    .concat(
                      reports.map(
                        (r) =>
                          `"${r.id}","${r.title}","${r.category}","${r.priority}","${r.status}","${r.locationName}","${r.assignedWorker?.name || 'Unassigned'}","${r.createdAt}"`
                      )
                    )
                    .join('\n');
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute('download', `CivicConnect_Reports_${Date.now()}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                toast.success('CSV dataset exported successfully!');
              }}
            >
              Export CSV
            </MagneticButton>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-4 overflow-x-auto">
        <DataTable columns={columns} data={reports} searchPlaceholder="Filter work orders by title or location..." />
      </GlassCard>

      {/* Task Delegation Modal */}
      {selectedReportId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <GlassCard className="p-6 max-w-md w-full space-y-4 border border-indigo-500/30">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-slate-800">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 font-display">
                <UserPlus className="w-5 h-5 text-indigo-500" /> Delegate Task Assignment
              </h3>
              <button onClick={() => setSelectedReportId(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {workers.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setActiveWorkerId(w.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all font-display ${
                    activeWorkerId === w.id
                      ? 'border-indigo-500 bg-indigo-500/10 font-bold'
                      : 'border-slate-200/60 dark:border-slate-800 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar src={w.avatarUrl} name={w.name} size="sm" />
                    <div>
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white">{w.name}</div>
                      <div className="text-[10px] text-slate-400 font-medium">{w.specialization}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-extrabold">{w.status}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-200/60 dark:border-slate-800">
              <MagneticButton variant="ghost" size="sm" onClick={() => setSelectedReportId(null)}>
                Cancel
              </MagneticButton>
              <MagneticButton variant="primary" size="sm" onClick={() => handleQuickAssign(selectedReportId)} icon={Check}>
                Confirm Delegate
              </MagneticButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
