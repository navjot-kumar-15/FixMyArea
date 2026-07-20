import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PageLoader } from '@/components/ui/PageLoader';

// Layouts
import { GuestLayout } from '@/layouts/GuestLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { CitizenLayout } from '@/layouts/CitizenLayout';
import { WorkerLayout } from '@/layouts/WorkerLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

// Route Guards
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { RoleBasedRoute } from '@/routes/RoleBasedRoute';

// Lazy Loaded Pages
const LandingPage = lazy(() => import('@/features/guest/pages/LandingPage').then((m) => ({ default: m.LandingPage })));
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('@/features/auth/pages/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const ForgotPasswordPage = lazy(() => import('@/features/auth/pages/ForgotPasswordPage').then((m) => ({ default: m.ForgotPasswordPage })));

// Citizen Pages
const CitizenDashboard = lazy(() => import('@/features/reports/pages/CitizenDashboard').then((m) => ({ default: m.CitizenDashboard })));
const CreateReportWizard = lazy(() => import('@/features/reports/pages/CreateReportWizard').then((m) => ({ default: m.CreateReportWizard })));
const ReportDetailsPage = lazy(() => import('@/features/reports/pages/ReportDetailsPage').then((m) => ({ default: m.ReportDetailsPage })));
const MyReportsPage = lazy(() => import('@/features/reports/pages/MyReportsPage').then((m) => ({ default: m.MyReportsPage })));
const NearbyIssuesMapPage = lazy(() => import('@/features/reports/pages/NearbyIssuesMapPage').then((m) => ({ default: m.NearbyIssuesMapPage })));
const BookmarksPage = lazy(() => import('@/features/reports/pages/BookmarksPage').then((m) => ({ default: m.BookmarksPage })));
const ProfilePage = lazy(() => import('@/features/reports/pages/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const HelpCenterPage = lazy(() => import('@/features/reports/pages/HelpCenterPage').then((m) => ({ default: m.HelpCenterPage })));

// Worker Pages
const WorkerDashboard = lazy(() => import('@/features/workers/pages/WorkerDashboard').then((m) => ({ default: m.WorkerDashboard })));
const WorkerTasksPage = lazy(() => import('@/features/workers/pages/WorkerTasksPage').then((m) => ({ default: m.WorkerTasksPage })));
const WorkerCalendarPage = lazy(() => import('@/features/workers/pages/WorkerCalendarPage').then((m) => ({ default: m.WorkerCalendarPage })));
const WorkerHistoryPage = lazy(() => import('@/features/workers/pages/WorkerHistoryPage').then((m) => ({ default: m.WorkerHistoryPage })));

// Admin Pages
const AdminDashboard = lazy(() => import('@/features/admin/pages/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const AdminReportsPage = lazy(() => import('@/features/admin/pages/AdminReportsPage').then((m) => ({ default: m.AdminReportsPage })));
const AdminWorkersPage = lazy(() => import('@/features/admin/pages/AdminWorkersPage').then((m) => ({ default: m.AdminWorkersPage })));
const AdminUsersPage = lazy(() => import('@/features/admin/pages/AdminUsersPage').then((m) => ({ default: m.AdminUsersPage })));
const AdminServiceAreasPage = lazy(() => import('@/features/admin/pages/AdminServiceAreasPage').then((m) => ({ default: m.AdminServiceAreasPage })));
const AdminAnalyticsPage = lazy(() => import('@/features/admin/pages/AdminAnalyticsPage').then((m) => ({ default: m.AdminAnalyticsPage })));
const AdminAuditLogsPage = lazy(() => import('@/features/admin/pages/AdminAuditLogsPage').then((m) => ({ default: m.AdminAuditLogsPage })));
const AdminSettingsPage = lazy(() => import('@/features/admin/pages/AdminSettingsPage').then((m) => ({ default: m.AdminSettingsPage })));

const router = createBrowserRouter([
  // Public Landing Page
  {
    path: '/',
    element: (
      <GuestLayout>
        <Suspense fallback={<PageLoader />}>
          <LandingPage />
        </Suspense>
      </GuestLayout>
    ),
  },

  // Auth Routes
  {
    path: '/login',
    element: (
      <AuthLayout>
        <Suspense fallback={<PageLoader />}>
          <LoginPage />
        </Suspense>
      </AuthLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthLayout>
        <Suspense fallback={<PageLoader />}>
          <RegisterPage />
        </Suspense>
      </AuthLayout>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <AuthLayout>
        <Suspense fallback={<PageLoader />}>
          <ForgotPasswordPage />
        </Suspense>
      </AuthLayout>
    ),
  },

  // Citizen Domain Routes
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <Suspense fallback={<PageLoader />}>
            <CitizenDashboard />
          </Suspense>
        </CitizenLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/report',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <Suspense fallback={<PageLoader />}>
            <CreateReportWizard />
          </Suspense>
        </CitizenLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/report/:id',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <Suspense fallback={<PageLoader />}>
            <ReportDetailsPage />
          </Suspense>
        </CitizenLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-reports',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <Suspense fallback={<PageLoader />}>
            <MyReportsPage />
          </Suspense>
        </CitizenLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/map',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <Suspense fallback={<PageLoader />}>
            <NearbyIssuesMapPage />
          </Suspense>
        </CitizenLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/bookmarks',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <Suspense fallback={<PageLoader />}>
            <BookmarksPage />
          </Suspense>
        </CitizenLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <Suspense fallback={<PageLoader />}>
            <ProfilePage />
          </Suspense>
        </CitizenLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/help',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <Suspense fallback={<PageLoader />}>
            <HelpCenterPage />
          </Suspense>
        </CitizenLayout>
      </ProtectedRoute>
    ),
  },

  // Worker Domain Routes
  {
    path: '/worker/dashboard',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute allowedRoles={['worker', 'admin']}>
          <WorkerLayout>
            <Suspense fallback={<PageLoader />}>
              <WorkerDashboard />
            </Suspense>
          </WorkerLayout>
        </RoleBasedRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: '/worker/tasks',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute allowedRoles={['worker', 'admin']}>
          <WorkerLayout>
            <Suspense fallback={<PageLoader />}>
              <WorkerTasksPage />
            </Suspense>
          </WorkerLayout>
        </RoleBasedRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: '/worker/calendar',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute allowedRoles={['worker', 'admin']}>
          <WorkerLayout>
            <Suspense fallback={<PageLoader />}>
              <WorkerCalendarPage />
            </Suspense>
          </WorkerLayout>
        </RoleBasedRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: '/worker/history',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute allowedRoles={['worker', 'admin']}>
          <WorkerLayout>
            <Suspense fallback={<PageLoader />}>
              <WorkerHistoryPage />
            </Suspense>
          </WorkerLayout>
        </RoleBasedRoute>
      </ProtectedRoute>
    ),
  },

  // Admin Domain Routes
  {
    path: '/admin/dashboard',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <Suspense fallback={<PageLoader />}>
              <AdminDashboard />
            </Suspense>
          </AdminLayout>
        </RoleBasedRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/reports',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <Suspense fallback={<PageLoader />}>
              <AdminReportsPage />
            </Suspense>
          </AdminLayout>
        </RoleBasedRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/workers',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <Suspense fallback={<PageLoader />}>
              <AdminWorkersPage />
            </Suspense>
          </AdminLayout>
        </RoleBasedRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/users',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <Suspense fallback={<PageLoader />}>
              <AdminUsersPage />
            </Suspense>
          </AdminLayout>
        </RoleBasedRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/areas',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <Suspense fallback={<PageLoader />}>
              <AdminServiceAreasPage />
            </Suspense>
          </AdminLayout>
        </RoleBasedRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/analytics',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <Suspense fallback={<PageLoader />}>
              <AdminAnalyticsPage />
            </Suspense>
          </AdminLayout>
        </RoleBasedRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/audit',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <Suspense fallback={<PageLoader />}>
              <AdminAuditLogsPage />
            </Suspense>
          </AdminLayout>
        </RoleBasedRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin/settings',
    element: (
      <ProtectedRoute>
        <RoleBasedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <Suspense fallback={<PageLoader />}>
              <AdminSettingsPage />
            </Suspense>
          </AdminLayout>
        </RoleBasedRoute>
      </ProtectedRoute>
    ),
  },
]);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;
