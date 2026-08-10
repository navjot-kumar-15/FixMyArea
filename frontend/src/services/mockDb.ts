import { AuditLog, Comment, NotificationItem, Report, ReportCategory, ReportPriority, ReportStatus, ServiceArea, User, UserRole, WorkerProfile } from '../types';

// Default initial seed data
export const INITIAL_USERS: User[] = [
  {
    id: 'usr_guest_0',
    name: 'Guest Visitor',
    email: 'guest@civicconnect.org',
    role: 'guest',
    status: 'ACTIVE',
    createdAt: '2026-08-01T10:00:00Z',
  },
  {
    id: 'usr_cit_1',
    name: 'Aarav Sharma',
    email: 'citizen@civicconnect.org',
    role: 'citizen',
    status: 'ACTIVE',
    phone: '+91 98765 43210',
    pincode: '400001',
    areaName: 'Central District',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-07-15T12:00:00Z',
  },
  {
    id: 'usr_wrk_1',
    name: 'Rajesh Kumar',
    email: 'worker@civicconnect.org',
    role: 'worker',
    status: 'ACTIVE',
    phone: '+91 98123 45678',
    areaName: 'North Ward Maintenance',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-06-10T09:30:00Z',
  },
  {
    id: 'usr_adm_1',
    name: 'Priya Verma',
    email: 'admin@civicconnect.org',
    role: 'admin',
    status: 'ACTIVE',
    phone: '+91 99000 11223',
    areaName: 'Metropolitan Admin Hub',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    createdAt: '2026-05-01T08:00:00Z',
  },
];

export const INITIAL_WORKERS: WorkerProfile[] = [
  {
    id: 'usr_wrk_1',
    name: 'Rajesh Kumar',
    email: 'worker@civicconnect.org',
    phone: '+91 98123 45678',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    specialization: 'Roads & Infrastructure',
    assignedArea: 'Central District (Ward 4)',
    activeTasksCount: 2,
    completedTasksCount: 48,
    rating: 4.9,
    status: 'ON_TASK',
  },
  {
    id: 'usr_wrk_2',
    name: 'Vikram Singh',
    email: 'vikram.singh@civicconnect.org',
    phone: '+91 97654 32109',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    specialization: 'Electrical & Street Lighting',
    assignedArea: 'West Bay Ward',
    activeTasksCount: 1,
    completedTasksCount: 32,
    rating: 4.7,
    status: 'AVAILABLE',
  },
  {
    id: 'usr_wrk_3',
    name: 'Sanjay Patel',
    email: 'sanjay.patel@civicconnect.org',
    phone: '+91 96543 21098',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    specialization: 'Sanitation & Sewage Management',
    assignedArea: 'East Industrial Zone',
    activeTasksCount: 0,
    completedTasksCount: 65,
    rating: 4.8,
    status: 'AVAILABLE',
  },
];

export const INITIAL_REPORTS: Report[] = [
  {
    id: 'rep_101',
    title: 'Hazardous Deep Pothole on Main Avenue',
    description: 'A large, deep pothole has formed near the pedestrian crossing. Multiple vehicles have suffered tire damage.',
    category: 'POTHOLE',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    locationName: '104 Main Avenue, Central District',
    coordinates: { lat: 19.076, lng: 72.8777 },
    images: [
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
    ],
    reportedBy: {
      id: 'usr_cit_1',
      name: 'Aarav Sharma',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
    assignedWorker: {
      id: 'usr_wrk_1',
      name: 'Rajesh Kumar',
      phone: '+91 98123 45678',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    upvotesCount: 24,
    isUpvoted: true,
    isBookmarked: true,
    commentsCount: 3,
    createdAt: '2026-08-08T14:30:00Z',
    updatedAt: '2026-08-09T09:15:00Z',
  },
  {
    id: 'rep_102',
    title: 'Flickering Street Lamp & Dark Alleyway',
    description: 'Streetlight #SL-402 is completely out, leaving the alley behind Market Street completely dark at night.',
    category: 'STREET_LIGHT',
    priority: 'MEDIUM',
    status: 'PENDING',
    locationName: 'Market Street Alley, Ward 4',
    coordinates: { lat: 19.082, lng: 72.883 },
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80',
    ],
    reportedBy: {
      id: 'usr_cit_2',
      name: 'Ananya Gupta',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    },
    upvotesCount: 12,
    isUpvoted: false,
    isBookmarked: false,
    commentsCount: 1,
    createdAt: '2026-08-09T18:45:00Z',
    updatedAt: '2026-08-09T18:45:00Z',
  },
  {
    id: 'rep_103',
    title: 'Burst Main Pipe Leaking Water',
    description: 'Clean drinking water is bursting from a cracked main underground pipe, flooding the road.',
    category: 'WATER_LEAKAGE',
    priority: 'CRITICAL',
    status: 'IN_PROGRESS',
    locationName: 'Park View Road, Sector 7',
    coordinates: { lat: 19.071, lng: 72.871 },
    images: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80',
    ],
    reportedBy: {
      id: 'usr_cit_3',
      name: 'Rohan Mehta',
    },
    assignedWorker: {
      id: 'usr_wrk_2',
      name: 'Vikram Singh',
      phone: '+91 97654 32109',
    },
    upvotesCount: 45,
    isUpvoted: false,
    isBookmarked: false,
    commentsCount: 7,
    createdAt: '2026-08-10T08:10:00Z',
    updatedAt: '2026-08-10T10:20:00Z',
  },
  {
    id: 'rep_104',
    title: 'Overflowing Community Garbage Bin',
    description: 'Sanitation bin has not been cleared for 3 days. Trash is spilling into the walkway creating odor issues.',
    category: 'GARBAGE',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    locationName: 'Green Park Gate 2',
    coordinates: { lat: 19.088, lng: 72.865 },
    images: [
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    ],
    reportedBy: {
      id: 'usr_cit_1',
      name: 'Aarav Sharma',
    },
    assignedWorker: {
      id: 'usr_wrk_3',
      name: 'Sanjay Patel',
    },
    upvotesCount: 19,
    isUpvoted: true,
    commentsCount: 2,
    completionProof: {
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
      notes: 'Cleared all waste with heavy truck sanitation team and disinfected the area thoroughly.',
      resolvedAt: '2026-08-10T12:00:00Z',
    },
    createdAt: '2026-08-07T11:00:00Z',
    updatedAt: '2026-08-10T12:00:00Z',
  },
];

export const INITIAL_COMMENTS: Record<string, Comment[]> = {
  rep_101: [
    {
      id: 'cmt_1',
      reportId: 'rep_101',
      user: { id: 'usr_cit_1', name: 'Aarav Sharma', role: 'citizen' },
      content: 'I almost hit this pothole last night. Hope the roads department fixes it soon!',
      createdAt: '2026-08-08T15:00:00Z',
    },
    {
      id: 'cmt_2',
      reportId: 'rep_101',
      user: { id: 'usr_adm_1', name: 'Priya Verma', role: 'admin' },
      content: 'Report verified. Field technician Rajesh Kumar has been dispatched to patch the surface.',
      createdAt: '2026-08-09T09:15:00Z',
    },
  ],
};

export const INITIAL_SERVICE_AREAS: ServiceArea[] = [
  {
    id: 'area_1',
    name: 'Central District (Ward 4)',
    city: 'Metropolis',
    state: 'State Central',
    coordinates: { lat: 19.076, lng: 72.8777 },
    totalReportsCount: 42,
    resolvedCount: 38,
  },
  {
    id: 'area_2',
    name: 'West Bay Ward',
    city: 'Metropolis',
    state: 'State Central',
    coordinates: { lat: 19.082, lng: 72.883 },
    totalReportsCount: 29,
    resolvedCount: 22,
  },
  {
    id: 'area_3',
    name: 'East Industrial Zone',
    city: 'Metropolis',
    state: 'State Central',
    coordinates: { lat: 19.071, lng: 72.871 },
    totalReportsCount: 65,
    resolvedCount: 59,
  },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_1',
    actor: { name: 'Priya Verma', email: 'admin@civicconnect.org', role: 'admin' },
    action: 'DISPATCH_WORKER',
    target: 'Report rep_101 -> Assigned to Rajesh Kumar',
    timestamp: '2026-08-09T09:15:00Z',
    ipAddress: '192.168.1.45',
  },
  {
    id: 'log_2',
    actor: { name: 'Sanjay Patel', email: 'sanjay.patel@civicconnect.org', role: 'worker' },
    action: 'RESOLVE_REPORT',
    target: 'Report rep_104 marked as RESOLVED with proof upload',
    timestamp: '2026-08-10T12:00:00Z',
    ipAddress: '192.168.1.88',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Worker Dispatched',
    message: 'Technician Rajesh Kumar was assigned to your reported issue on Main Avenue.',
    type: 'INFO',
    isRead: false,
    reportId: 'rep_101',
    createdAt: '2026-08-09T09:16:00Z',
  },
  {
    id: 'notif_2',
    title: 'Issue Resolved!',
    message: 'Sanitation report near Green Park Gate 2 has been resolved by Worker Sanjay Patel.',
    type: 'SUCCESS',
    isRead: true,
    reportId: 'rep_104',
    createdAt: '2026-08-10T12:01:00Z',
  },
];

// Local Storage In-Memory Service Class
class MockDatabase {
  private reports: Report[] = INITIAL_REPORTS;
  private users: User[] = INITIAL_USERS;
  private workers: WorkerProfile[] = INITIAL_WORKERS;
  private comments: Record<string, Comment[]> = INITIAL_COMMENTS;
  private auditLogs: AuditLog[] = INITIAL_AUDIT_LOGS;
  private notifications: NotificationItem[] = INITIAL_NOTIFICATIONS;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const storedReports = localStorage.getItem('civic_reports');
      if (storedReports) this.reports = JSON.parse(storedReports);
    } catch {
      // Fallback to initial
    }
  }

  private persistReports() {
    try {
      localStorage.setItem('civic_reports', JSON.stringify(this.reports));
    } catch {
      // Ignore
    }
  }

  // Reports API
  public getReports(): Report[] {
    return [...this.reports];
  }

  public getReportById(id: string): Report | undefined {
    return this.reports.find((r) => r.id === id);
  }

  public createReport(input: {
    title: string;
    description: string;
    category: ReportCategory;
    priority: ReportPriority;
    locationName: string;
    coordinates: { lat: number; lng: number };
    images: string[];
    user: User;
  }): Report {
    const newReport: Report = {
      id: `rep_${Date.now()}`,
      title: input.title,
      description: input.description,
      category: input.category,
      priority: input.priority,
      status: 'PENDING',
      locationName: input.locationName,
      coordinates: input.coordinates,
      images: input.images.length > 0 ? input.images : ['https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80'],
      reportedBy: {
        id: input.user.id,
        name: input.user.name,
        avatarUrl: input.user.avatarUrl,
      },
      upvotesCount: 1,
      isUpvoted: true,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.reports.unshift(newReport);
    this.persistReports();

    // Audit log
    this.addAuditLog(input.user, 'CREATE_REPORT', `Created report ${newReport.id}: ${newReport.title}`);
    return newReport;
  }

  public toggleUpvote(reportId: string): Report | null {
    const report = this.reports.find((r) => r.id === reportId);
    if (!report) return null;

    if (report.isUpvoted) {
      report.upvotesCount = Math.max(0, report.upvotesCount - 1);
      report.isUpvoted = false;
    } else {
      report.upvotesCount += 1;
      report.isUpvoted = true;
    }
    this.persistReports();
    return { ...report };
  }

  public toggleBookmark(reportId: string): Report | null {
    const report = this.reports.find((r) => r.id === reportId);
    if (!report) return null;

    report.isBookmarked = !report.isBookmarked;
    this.persistReports();
    return { ...report };
  }

  public assignWorker(reportId: string, workerId: string, adminUser: User): Report | null {
    const report = this.reports.find((r) => r.id === reportId);
    const worker = this.workers.find((w) => w.id === workerId);
    if (!report || !worker) return null;

    report.assignedWorker = {
      id: worker.id,
      name: worker.name,
      phone: worker.phone,
      avatarUrl: worker.avatarUrl,
    };
    report.status = 'IN_PROGRESS';
    report.updatedAt = new Date().toISOString();

    worker.activeTasksCount += 1;
    worker.status = 'ON_TASK';

    this.persistReports();
    this.addAuditLog(adminUser, 'ASSIGN_WORKER', `Assigned ${worker.name} to Report #${report.id}`);
    return { ...report };
  }

  public updateReportStatus(
    reportId: string,
    status: ReportStatus,
    proof?: { imageUrl: string; notes: string },
    user?: User
  ): Report | null {
    const report = this.reports.find((r) => r.id === reportId);
    if (!report) return null;

    report.status = status;
    report.updatedAt = new Date().toISOString();

    if (proof) {
      report.completionProof = {
        imageUrl: proof.imageUrl,
        notes: proof.notes,
        resolvedAt: new Date().toISOString(),
      };
    }

    if (status === 'RESOLVED' && report.assignedWorker) {
      const worker = this.workers.find((w) => w.id === report.assignedWorker?.id);
      if (worker) {
        worker.activeTasksCount = Math.max(0, worker.activeTasksCount - 1);
        worker.completedTasksCount += 1;
        if (worker.activeTasksCount === 0) worker.status = 'AVAILABLE';
      }
    }

    this.persistReports();
    if (user) {
      this.addAuditLog(user, 'UPDATE_STATUS', `Report #${report.id} status changed to ${status}`);
    }
    return { ...report };
  }

  // Comments
  public getComments(reportId: string): Comment[] {
    return this.comments[reportId] || [];
  }

  public addComment(reportId: string, user: User, content: string): Comment {
    const newComment: Comment = {
      id: `cmt_${Date.now()}`,
      reportId,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
      content,
      createdAt: new Date().toISOString(),
    };

    if (!this.comments[reportId]) {
      this.comments[reportId] = [];
    }
    this.comments[reportId].push(newComment);

    const report = this.reports.find((r) => r.id === reportId);
    if (report) {
      report.commentsCount += 1;
      this.persistReports();
    }
    return newComment;
  }

  // Users & Workers
  public getUsers(): User[] {
    return [...this.users];
  }

  public getWorkers(): WorkerProfile[] {
    return [...this.workers];
  }

  public toggleUserStatus(userId: string, adminUser: User): User | null {
    const usr = this.users.find((u) => u.id === userId);
    if (!usr) return null;
    usr.status = usr.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    this.addAuditLog(adminUser, 'TOGGLE_USER_STATUS', `User ${usr.email} status set to ${usr.status}`);
    return { ...usr };
  }

  // Audit Logs
  public getAuditLogs(): AuditLog[] {
    return [...this.auditLogs];
  }

  private addAuditLog(actor: User, action: string, target: string) {
    this.auditLogs.unshift({
      id: `log_${Date.now()}`,
      actor: { name: actor.name, email: actor.email, role: actor.role },
      action,
      target,
      timestamp: new Date().toISOString(),
    });
  }

  // Notifications
  public getNotifications(): NotificationItem[] {
    return [...this.notifications];
  }

  public markNotificationAsRead(id: string) {
    const n = this.notifications.find((item) => item.id === id);
    if (n) n.isRead = true;
  }
}

export const mockDb = new MockDatabase();
