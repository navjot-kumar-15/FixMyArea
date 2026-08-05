import { baseApi } from '@/api/baseApi';
import { Worker, User } from '@/types';

export interface AdminAnalyticsData {
  totalReports: number;
  pendingCount: number;
  inProgressCount: number;
  resolvedCount: number;
  activeWorkers: number;
  categoryDistribution: { category: string; count: number }[];
  monthlyInflow: { month: string; reported: number; resolved: number }[];
}

export interface AuditLogItem {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  details: string;
  ipAddress: string;
}

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminAnalytics: builder.query<AdminAnalyticsData, { timeRange?: string } | void>({
      query: (arg) => `/admin/analytics?range=${arg?.timeRange || '30d'}`,
    }),
    getAllWorkers: builder.query<Worker[], void>({
      query: () => '/admin/workers',
      providesTags: ['Worker'],
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => '/admin/users',
      providesTags: ['User'],
    }),
    assignWorkerToReport: builder.mutation<void, { reportId: string; workerId: string }>({
      query: ({ reportId, workerId }) => ({
        url: `/admin/reports/${reportId}/assign`,
        method: 'POST',
        body: { workerId },
      }),
      invalidatesTags: [{ type: 'Report', id: 'LIST' }, 'Worker'],
    }),
    getAuditLogs: builder.query<AuditLogItem[], { limit?: number } | void>({
      query: (arg) => `/admin/audit-logs?limit=${arg?.limit || 50}`,
      providesTags: ['AuditLog'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAdminAnalyticsQuery,
  useGetAllWorkersQuery,
  useGetAllUsersQuery,
  useAssignWorkerToReportMutation,
  useGetAuditLogsQuery,
} = adminApi;
