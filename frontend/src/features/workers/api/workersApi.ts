import { baseApi } from '@/api/baseApi';
import { Report, Worker } from '@/types';

export interface UpdateTaskStatusInput {
  reportId: string;
  status: 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
  proofImages?: string[];
  notes?: string;
}

export const workersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWorkerTasks: builder.query<Report[], { workerId?: string } | void>({
      query: (arg) => `/workers/tasks${arg?.workerId ? `?workerId=${arg.workerId}` : ''}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Report' as const, id })),
              { type: 'Report', id: 'WORKER_LIST' },
            ]
          : [{ type: 'Report', id: 'WORKER_LIST' }],
    }),
    getWorkerProfile: builder.query<Worker, string>({
      query: (workerId) => `/workers/${workerId}`,
      providesTags: (result, error, id) => [{ type: 'Worker', id }],
    }),
    updateTaskStatus: builder.mutation<Report, UpdateTaskStatusInput>({
      query: ({ reportId, ...body }) => ({
        url: `/workers/tasks/${reportId}/status`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { reportId }) => [
        { type: 'Report', id: reportId },
        { type: 'Report', id: 'WORKER_LIST' },
        { type: 'Report', id: 'LIST' },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWorkerTasksQuery,
  useGetWorkerProfileQuery,
  useUpdateTaskStatusMutation,
} = workersApi;
