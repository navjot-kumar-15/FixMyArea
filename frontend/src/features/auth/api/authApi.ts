import { baseApi } from "@/api/baseApi";
import { User, LoginCredentials, RegisterData } from "@/types";

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    register: builder.mutation<AuthResponse, RegisterData>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["User"],
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<User, Partial<User>>({
      query: (profileData) => ({
        url: "/auth/profile",
        method: "PATCH",
        body: profileData,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
  useUpdateProfileMutation,
} = authApi;
