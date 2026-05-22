import { create } from 'zustand';

// Global state for reports using Zustand (KISS principle)
export const useReportStore = create((set) => ({
  reports: [],
  total: 0,
  page: 1,
  limit: 10,
  isLoading: false,
  error: null,
  
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setReportsData: (data) => set({ 
    reports: data.data, 
    total: data.total,
    page: data.page,
    limit: data.limit 
  }),
}));
