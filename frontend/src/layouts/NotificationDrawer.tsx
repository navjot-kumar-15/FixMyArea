import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import {
  closeNotificationDrawer,
  markAllAsRead,
  markAsRead,
  deleteNotification,
} from '@/store/slices/notificationSlice';
import { Drawer } from '@/components/ui/Drawer';
import { Bell, CheckCheck, Trash2, Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

function formatRelativeTime(dateStr: string) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export const NotificationDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const { items, isDrawerOpen } = useSelector((state: RootState) => state.notifications);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'WARNING':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'ALERT':
        return <AlertCircle className="w-5 h-5 text-rose-500" />;
      default:
        return <Info className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <Drawer
      isOpen={isDrawerOpen}
      onClose={() => dispatch(closeNotificationDrawer())}
      title={
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Notifications & Alerts
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Real-time updates on civic reports and assignments
            </p>
          </div>
        </div>
      }
      footer={
        items.length > 0 && (
          <button
            onClick={() => dispatch(markAllAsRead())}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        )
      }
    >
      {items.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Bell className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            All caught up!
          </h4>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            You don't have any unread notifications or civic updates at the moment.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((notification) => (
            <div
              key={notification.id}
              onClick={() => dispatch(markAsRead(notification.id))}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative group ${
                notification.isRead
                  ? 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/60'
                  : 'bg-indigo-50/40 dark:bg-indigo-950/30 border-indigo-200/80 dark:border-indigo-800/60 shadow-sm'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0 pr-6">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    {notification.title}
                    {!notification.isRead && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                    )}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {notification.message}
                  </p>
                  <span className="text-[10px] font-mono text-slate-400 mt-2 block">
                    {formatRelativeTime(notification.createdAt)}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteNotification(notification.id));
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-500 transition-opacity absolute top-3 right-3"
                  title="Delete notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
};
