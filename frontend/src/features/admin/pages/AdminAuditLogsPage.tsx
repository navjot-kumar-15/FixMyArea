import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { ShieldCheck, User, Clock, FileText, CheckCircle2 } from 'lucide-react';

export const AdminAuditLogsPage: React.FC = () => {
  const auditLogs = [
    { id: 'log-1', action: 'REPORT_DISPATCHED', user: 'Eleanor Vance (Admin)', detail: 'Assigned task #RPT-101 to Marcus Vance', time: '10 mins ago' },
    { id: 'log-2', action: 'STATUS_RESOLVED', user: 'Marcus Vance (Worker)', detail: 'Uploaded resolution proof for Pothole #RPT-102', time: '45 mins ago' },
    { id: 'log-3', action: 'USER_REGISTERED', user: 'Sarah Miller (Citizen)', detail: 'Created new citizen account in Downtown North', time: '2 hours ago' },
    { id: 'log-4', action: 'REPORT_SUBMITTED', user: 'Alex Johnson (Citizen)', detail: 'Submitted issue report #RPT-103', time: '3 hours ago' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-red-600" /> Platform Security & Audit Trail
        </h1>
        <p className="text-xs text-slate-500">
          Immutable log of administrative decisions, worker dispatches, and user role updates.
        </p>
      </div>

      <Card glass>
        <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-4 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300">
                    {log.action}
                  </span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{log.user}</span>
                </div>
                <p className="text-xs text-slate-500">{log.detail}</p>
              </div>
              <span className="text-[10px] text-slate-400 font-medium shrink-0">{log.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
