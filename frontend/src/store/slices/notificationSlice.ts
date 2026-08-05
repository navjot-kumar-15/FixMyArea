import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationItem } from '@/types';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Worker Assigned',
    message: 'Marcus Vance has been assigned to your reported issue: "Hazardous Deep Pothole".',
    type: 'INFO',
    isRead: false,
    reportId: 'rep-101',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 'n-2',
    title: 'Issue Resolved! 🎉',
    message: 'Water Pipe Leak on Parkline Dr has been marked as Resolved with photo verification.',
    type: 'SUCCESS',
    isRead: false,
    reportId: 'rep-103',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'n-3',
    title: 'High Support Notice',
    message: 'Your report "Broken Solar Streetlight" reached over 50 upvotes and is prioritized.',
    type: 'ALERT',
    isRead: true,
    reportId: 'rep-102',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

interface NotificationState {
  items: NotificationItem[];
  isOpen: boolean;
  isDrawerOpen: boolean;
}

const initialState: NotificationState = {
  items: INITIAL_NOTIFICATIONS,
  isOpen: false,
  isDrawerOpen: false,
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    toggleNotificationDrawer: (state) => {
      state.isOpen = !state.isOpen;
      state.isDrawerOpen = state.isOpen;
    },
    closeNotificationDrawer: (state) => {
      state.isOpen = false;
      state.isDrawerOpen = false;
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const item = state.items.find((n) => n.id === action.payload);
      if (item) {
        item.isRead = true;
      }
    },
    markAllAsRead: (state) => {
      state.items.forEach((n) => {
        n.isRead = true;
      });
    },
    addNotification: (state, action: PayloadAction<Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>>) => {
      const newNotif: NotificationItem = {
        ...action.payload,
        id: `n-${Date.now()}`,
        isRead: false,
        createdAt: new Date().toISOString(),
      };
      state.items.unshift(newNotif);
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((n) => n.id !== action.payload);
    },
  },
});

export const {
  toggleNotificationDrawer,
  closeNotificationDrawer,
  markAsRead,
  markAllAsRead,
  addNotification,
  deleteNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
