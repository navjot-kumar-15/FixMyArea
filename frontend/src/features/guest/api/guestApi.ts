import { baseApi } from '@/api/baseApi';
import { Report } from '@/types';

export interface LandingStats {
  totalReportsResolved: number;
  activeWorkersCount: number;
  averageResolutionHours: number;
  satisfactionRatePercent: number;
}

export const guestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLandingStats: builder.query<LandingStats, void>({
      query: () => '/guest/stats',
    }),
    getPublicRecentIssues: builder.query<Report[], { limit?: number } | void>({
      query: (arg) => `/guest/issues?limit=${arg?.limit || 6}`,
      providesTags: ['Report'],
    }),
    submitGuestInquiry: builder.mutation<void, { name: string; email: string; message: string }>({
      query: (inquiryData) => ({
        url: '/guest/contact',
        method: 'POST',
        body: inquiryData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetLandingStatsQuery,
  useGetPublicRecentIssuesQuery,
  useSubmitGuestInquiryMutation,
} = guestApi;
