import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { ColumnDef } from '@tanstack/react-table';
import { Report } from '@/types';
import { DataTable } from '@/components/table/DataTable';
import { StatusChip, PriorityChip } from '@/components/ui/StatusChip';
import { Button } from '@/components/ui/Button';
import { setSelectedReport, assignWorkerToReport } from '@/store/slices/reportSlice';
import { Avatar } from '@/components/ui/Avatar';
import { ArrowRight, MapPin, Eye, UserPlus, X, Check } from 'lucide-react';
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
            <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{info.row.original.title}</div>
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-blue-500" /> {info.row.original.locationName}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
        cell: (info) => (
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {info.getValue() as string}
          </span>
        ),
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: (info) => <PriorityChip priority={info.getValue() as any} />,
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => <StatusChip status={info.getValue() as any} />,
      },
      {
        accessorKey: 'assignedWorker',
        header: 'Assigned Worker',
        cell: (info) => {
          const worker = info.row.original.assignedWorker;
          return worker ? (
            <span className="text-xs font-bold text-purple-650 dark:text-purple-400">{worker.name}</span>
          ) : (
            <span className="text-xs text-slate-450 italic">Unassigned</span>
          );
        },
      },
      {
        id: 'actions',
        header: 'Action',
        cell: (info) => (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedReportId(info.row.original.id)}
              leftIcon={<UserPlus className="w-3.5 h-3.5" />}
            >
              Assign
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                dispatch(setSelectedReport(info.row.original));
                navigate(`/report/${info.row.original.id}`);
              }}
              leftIcon={<Eye className="w-3.5 h-3.5" />}
            >
              Manage
            </Button>
          </div>
        ),
      },
    ],
    [dispatch, navigate]
  );

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Admin Reports Management Directory
        </h1>
        <p className="text-xs text-slate-400">
          Search, filter, assign field workers, and update status for all municipal reports across the city grid.
        </p>
      </div>

      <DataTable columns={columns} data={reports} searchPlaceholder="Filter reports by title or location..." />

      {/* Task Delegation Modal */}
      {selectedReportId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-150 dark:border-slate-800">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-4.5 h-4.5 text-indigo-500" /> Delegate Task Assignment
              </h3>
              <button onClick={() => setSelectedReportId(null)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {workers.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setActiveWorkerId(w.id)}
                  className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    activeWorkerId === w.id
                      ? 'border-indigo-650 bg-indigo-50 dark:bg-indigo-950/60 font-bold'
                      : 'border-slate-150 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar src={w.avatarUrl} name={w.name} size="sm" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{w.name}</div>
                      <div className="text-[10px] text-slate-455">{w.specialization}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-extrabold">{w.status}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setSelectedReportId(null)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={() => handleQuickAssign(selectedReportId)} leftIcon={<Check className="w-4 h-4" />}>
                Confirm Delegate
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
