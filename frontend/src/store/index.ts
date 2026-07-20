import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '@/api/baseApi';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import reportReducer from './slices/reportSlice';
import workerReducer from './slices/workerSlice';
import notificationReducer from './slices/notificationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    reports: reportReducer,
    workers: workerReducer,
    notifications: notificationReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
