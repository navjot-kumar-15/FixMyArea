import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import { GuestLayout } from '@/layouts/GuestLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { CitizenLayout } from '@/layouts/CitizenLayout';
import { WorkerLayout } from '@/layouts/WorkerLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

// Route Guards
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import { RoleBasedRoute } from '@/routes/RoleBasedRoute';

// Pages
import { LandingPage } from '@/features/guest/pages/LandingPage';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { RegisterPage } from '@/features/auth/pages/RegisterPage';
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage';

// Citizen Pages
import { CitizenDashboard } from '@/features/reports/pages/CitizenDashboard';
import { CreateReportWizard } from '@/features/reports/pages/CreateReportWizard';
import { ReportDetailsPage } from '@/features/reports/pages/ReportDetailsPage';
import { MyReportsPage } from '@/features/reports/pages/MyReportsPage';
import { NearbyIssuesMapPage } from '@/features/reports/pages/NearbyIssuesMapPage';
import { BookmarksPage } from '@/features/reports/pages/BookmarksPage';
import { ProfilePage } from '@/features/reports/pages/ProfilePage';
import { HelpCenterPage } from '@/features/reports/pages/HelpCenterPage';

// Worker Pages
import { WorkerDashboard } from '@/features/workers/pages/WorkerDashboard';
import { WorkerTasksPage } from '@/features/workers/pages/WorkerTasksPage';
import { WorkerCalendarPage } from '@/features/workers/pages/WorkerCalendarPage';
import { WorkerHistoryPage } from '@/features/workers/pages/WorkerHistoryPage';

// Admin Pages
import { AdminDashboard } from '@/features/admin/pages/AdminDashboard';
import { AdminReportsPage } from '@/features/admin/pages/AdminReportsPage';
import { AdminWorkersPage } from '@/features/admin/pages/AdminWorkersPage';
import { AdminUsersPage } from '@/features/admin/pages/AdminUsersPage';
import { AdminServiceAreasPage } from '@/features/admin/pages/AdminServiceAreasPage';
import { AdminAnalyticsPage } from '@/features/admin/pages/AdminAnalyticsPage';
import { AdminAuditLogsPage } from '@/features/admin/pages/AdminAuditLogsPage';
import { AdminSettingsPage } from '@/features/admin/pages/AdminSettingsPage';

const router = createBrowserRouter([
  // Public Landing Page
  {
    path: '/',
    element: (
      <GuestLayout>
        <LandingPage />
      </GuestLayout>
    ),
  },

  // Auth Routes
  {
    path: '/login',
    element: (
      <AuthLayout>
        <LoginPage />
      </AuthLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthLayout>
        <RegisterPage />
      </AuthLayout>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <AuthLayout>
        <ForgotPasswordPage />
      </AuthLayout>
    ),
  },

  // Citizen Domain Routes
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <CitizenDashboard />
        </CitizenLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/report',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <CreateReportWizard />
        </CitizenLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/report/:id',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <ReportDetailsPage />
        </CitizenLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/my-reports',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <MyReportsPage />
        </CitizenLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/map',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <NearbyIssuesMapPage />
        </CitizenLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/bookmarks',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <BookmarksPage />
        </CitizenLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <ProfilePage />
        </CitizenLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/help',
    element: (
      <ProtectedRoute>
        <CitizenLayout>
          <HelpCenterPage />
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
            <WorkerDashboard />
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
            <WorkerTasksPage />
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
            <WorkerCalendarPage />
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
            <WorkerHistoryPage />
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
            <AdminDashboard />
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
            <AdminReportsPage />
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
            <AdminWorkersPage />
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
            <AdminUsersPage />
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
            <AdminServiceAreasPage />
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
            <AdminAnalyticsPage />
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
            <AdminAuditLogsPage />
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
            <AdminSettingsPage />
          </AdminLayout>
        </RoleBasedRoute>
      </ProtectedRoute>
    ),
  },
]);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;
