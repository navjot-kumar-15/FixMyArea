import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { setSelectedReport } from '@/store/slices/reportSlice';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { StatusChip, PriorityChip } from '@/components/ui/StatusChip';
import { EmptyState } from '@/components/ui/EmptyState';
import { FileText, PlusCircle, Search, ThumbsUp, MessageSquare, MapPin } from 'lucide-react';

export const MyReportsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const reports = useSelector((state: RootState) => state.reports.reports);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const myReports = reports.filter((r) => {
    const isOwner = r.reportedBy.id === user?.id || r.reportedBy.name === user?.name;
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return isOwner && matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Submitted Issue Reports
          </h1>
          <p className="text-xs text-slate-500">
            Track real-time progress, worker assignments, and community support on your reports.
          </p>
        </div>
        <Button variant="primary" onClick={() => navigate('/report')} leftIcon={<PlusCircle className="w-4 h-4" />}>
          Report New Issue
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2">
          <Input
            placeholder="Search my reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={[
            { value: 'ALL', label: 'All Statuses' },
            { value: 'PENDING', label: 'Pending' },
            { value: 'IN_PROGRESS', label: 'In Progress' },
            { value: 'RESOLVED', label: 'Resolved' },
          ]}
        />
      </div>

      {/* Reports Grid */}
      {myReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myReports.map((report) => (
            <Card
              key={report.id}
              glass
              className="cursor-pointer hover:border-blue-500/50 transition-all"
              onClick={() => {
                dispatch(setSelectedReport(report));
                navigate(`/report/${report.id}`);
              }}
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StatusChip status={report.status} />
                    <PriorityChip priority={report.priority} />
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                  {report.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">{report.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" /> {report.locationName}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-blue-600">
                      <ThumbsUp className="w-3.5 h-3.5" /> {report.upvotesCount}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-600">
                      <MessageSquare className="w-3.5 h-3.5" /> {report.commentsCount}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No reports match filter"
          description="You have not submitted any reports matching the selected search criteria."
          actionLabel="Create New Report"
          onAction={() => navigate('/report')}
        />
      )}
    </div>
  );
};
