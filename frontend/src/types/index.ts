export type UserRole = 'guest' | 'citizen' | 'worker' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  areaId?: string;
  areaName?: string;
  createdAt: string;
}

export type ReportStatus = 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
export type ReportPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type ReportCategory = 
  | 'POTHOLE'
  | 'STREET_LIGHT'
  | 'WATER_LEAKAGE'
  | 'GARBAGE'
  | 'TRAFFIC'
  | 'PARK_MAINTENANCE'
  | 'OTHER';

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface CompletionProof {
  imageUrl: string;
  notes: string;
  resolvedAt: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  category: ReportCategory;
  priority: ReportPriority;
  status: ReportStatus;
  locationName: string;
  coordinates: LocationCoordinates;
  images: string[];
  reportedBy: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
  assignedWorker?: {
    id: string;
    name: string;
    phone?: string;
    avatarUrl?: string;
  };
  upvotesCount: number;
  isUpvoted?: boolean;
  isBookmarked?: boolean;
  commentsCount: number;
  completionProof?: CompletionProof;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  reportId: string;
  user: {
    id: string;
    name: string;
    role: UserRole;
    avatarUrl?: string;
  };
  content: string;
  createdAt: string;
}

export interface WorkerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  specialization: string;
  assignedArea: string;
  activeTasksCount: number;
  completedTasksCount: number;
  rating: number;
  status: 'AVAILABLE' | 'ON_TASK' | 'OFF_DUTY';
}

export interface ServiceArea {
  id: string;
  name: string;
  city: string;
  state: string;
  coordinates: LocationCoordinates;
  totalReportsCount: number;
  resolvedCount: number;
}

export interface AuditLog {
  id: string;
  actor: {
    name: string;
    email: string;
    role: UserRole;
  };
  action: string;
  target: string;
  timestamp: string;
  ipAddress?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  isRead: boolean;
  reportId?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface FilterState {
  status?: ReportStatus | 'ALL';
  category?: ReportCategory | 'ALL';
  priority?: ReportPriority | 'ALL';
  searchQuery: string;
  radiusKm?: number;
}
