import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import {
  toggleNotificationDrawer,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from '@/store/slices/notificationSlice';
import { X, Bell, CheckCheck, Trash2, Info, CheckCircle2, AlertTriangle, MessageSquare } from 'lucide-react';
import { Button } from '../ui/Button';

export const NotificationDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state: RootState) => state.notifications);

  if (!isOpen) return null;

  const unreadCount = items.filter((n) => !n.isRead).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'SUCCESS':
        return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case 'ALERT':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'WARNING':
        return <AlertTriangle className="w-5 h-5 text-rose-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={() => dispatch(toggleNotificationDrawer())}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col z-10 animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">Notifications</h3>
                <p className="text-xs text-slate-500">{unreadCount} unread updates</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={() => dispatch(markAllAsRead())}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-medium flex items-center gap-1"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => dispatch(toggleNotificationDrawer())}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length > 0 ? (
              items.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => dispatch(markAsRead(notif.id))}
                  className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${
                    notif.isRead
                      ? 'bg-slate-50/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 opacity-75'
                      : 'bg-white dark:bg-slate-800 border-blue-100 dark:border-blue-900/50 shadow-sm'
                  }`}
                >
                  {!notif.isRead && (
                    <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-600" />
                  )}
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getIcon(notif.type)}</div>
                    <div className="flex-1 pr-4">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        {notif.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-2 block font-medium">
                        {new Date(notif.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteNotification(notif.id));
                    }}
                    className="absolute bottom-3 right-3 p-1 rounded text-slate-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/60 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-slate-400 text-sm">
                No notifications right now.
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => dispatch(toggleNotificationDrawer())}
            >
              Close Panel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
