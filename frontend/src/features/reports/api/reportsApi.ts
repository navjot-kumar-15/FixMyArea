import { baseApi } from '@/api/baseApi';
import { Report, CreateReportInput } from '@/types';

export interface GetReportsFilters {
  status?: string;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReports: builder.query<Report[], GetReportsFilters | void>({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters?.status) params.append('status', filters.status);
        if (filters?.category) params.append('category', filters.category);
        if (filters?.search) params.append('search', filters.search);
        const queryStr = params.toString();
        return `/reports${queryStr ? `?${queryStr}` : ''}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Report' as const, id })),
              { type: 'Report', id: 'LIST' },
            ]
          : [{ type: 'Report', id: 'LIST' }],
    }),
    getReportById: builder.query<Report, string>({
      query: (id) => `/reports/${id}`,
      providesTags: (result, error, id) => [{ type: 'Report', id }],
    }),
    createReport: builder.mutation<Report, CreateReportInput>({
      query: (reportInput) => ({
        url: '/reports',
        method: 'POST',
        body: reportInput,
      }),
      invalidatesTags: [{ type: 'Report', id: 'LIST' }],
    }),
    upvoteReport: builder.mutation<Report, string>({
      query: (reportId) => ({
        url: `/reports/${reportId}/upvote`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Report', id }],
    }),
    addReportComment: builder.mutation<void, { reportId: string; comment: string }>({
      query: ({ reportId, comment }) => ({
        url: `/reports/${reportId}/comments`,
        method: 'POST',
        body: { comment },
      }),
      invalidatesTags: (result, error, { reportId }) => [{ type: 'Report', id: reportId }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetReportsQuery,
  useGetReportByIdQuery,
  useCreateReportMutation,
  useUpvoteReportMutation,
  useAddReportCommentMutation,
} = reportsApi;
