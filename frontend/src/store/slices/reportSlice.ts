import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Report, ReportStatus, FilterState, Comment } from '@/types';

export const MOCK_REPORTS: Report[] = [
  {
    id: '64f1a2b3c4d5e6f7a8b9c0d1',
    title: 'Hazardous Deep Pothole on Main Street',
    description: 'A large and deep pothole causing vehicle damage and traffic slowdown right near the central intersection.',
    category: 'POTHOLE',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    locationName: '452 Main St, San Francisco, CA',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    images: [
      'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800',
    ],
    reportedBy: {
      id: '64f1a2b3c4d5e6f7a8b9c001',
      name: 'Alex Johnson',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    },
    assignedWorker: {
      id: '64f1a2b3c4d5e6f7a8b9c002',
      name: 'Marcus Vance',
      phone: '+1 (555) 901-2345',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    },
    upvotesCount: 42,
    isUpvoted: true,
    isBookmarked: true,
    commentsCount: 3,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c0d2',
    title: 'Broken Solar Streetlight flickering dangerously',
    description: 'The streetlight outside the primary school has been completely black for two nights, making it unsafe for kids and pedestrians.',
    category: 'STREET_LIGHT',
    priority: 'CRITICAL',
    status: 'PENDING',
    locationName: '742 Evergreen Terrace, San Francisco, CA',
    coordinates: { lat: 37.7849, lng: -122.4094 },
    images: [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800',
    ],
    reportedBy: {
      id: '64f1a2b3c4d5e6f7a8b9c001',
      name: 'Alex Johnson',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    },
    upvotesCount: 18,
    isUpvoted: false,
    isBookmarked: false,
    commentsCount: 2,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c0d3',
    title: 'Major Water Pipe Leak Overflowing Road',
    description: 'Clean drinking water is bursting from a cracked underground pipe near the community center park.',
    category: 'WATER_LEAKAGE',
    priority: 'HIGH',
    status: 'IN_PROGRESS',
    locationName: '1450 Sunset Blvd, San Francisco, CA',
    coordinates: { lat: 37.7649, lng: -122.4294 },
    images: [
      'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&q=80&w=800',
    ],
    reportedBy: {
      id: '64f1a2b3c4d5e6f7a8b9c001',
      name: 'Alex Johnson',
    },
    assignedWorker: {
      id: '64f1a2b3c4d5e6f7a8b9c002',
      name: 'Marcus Vance',
      phone: '+1 (555) 901-2345',
    },
    upvotesCount: 67,
    isUpvoted: false,
    isBookmarked: false,
    commentsCount: 9,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c0d4',
    title: 'Illegal Trash Dumping behind Shopping Plaza',
    description: 'Multiple garbage bags and plastic containers dumped illegally near the public storm drain.',
    category: 'GARBAGE',
    priority: 'MEDIUM',
    status: 'RESOLVED',
    locationName: '88 Valencia St, San Francisco, CA',
    coordinates: { lat: 37.7549, lng: -122.4194 },
    images: [
      'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&q=80&w=800',
    ],
    reportedBy: {
      id: '64f1a2b3c4d5e6f7a8b9c001',
      name: 'Alex Johnson',
    },
    assignedWorker: {
      id: '64f1a2b3c4d5e6f7a8b9c002',
      name: 'Marcus Vance',
      phone: '+1 (555) 901-2345',
    },
    upvotesCount: 12,
    isUpvoted: false,
    isBookmarked: false,
    commentsCount: 1,
    completionProof: {
      imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
      notes: 'Area cleared and hazardous waste disposed.',
      resolvedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
];

export const MOCK_COMMENTS: Record<string, Comment[]> = {
  '64f1a2b3c4d5e6f7a8b9c0d1': [
    {
      id: '64f1a2b3c4d5e6f7a8b9c501',
      reportId: '64f1a2b3c4d5e6f7a8b9c0d1',
      user: { id: '64f1a2b3c4d5e6f7a8b9c099', name: 'Eleanor Vance', role: 'admin' },
      content: 'Dispatching worker Marcus Vance from District Maintenance Team.',
      createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
    {
      id: '64f1a2b3c4d5e6f7a8b9c502',
      reportId: '64f1a2b3c4d5e6f7a8b9c0d1',
      user: { id: '64f1a2b3c4d5e6f7a8b9c002', name: 'Marcus Vance', role: 'worker' },
      content: 'On site with cold asphalt patch crew. Should complete work by 3 PM.',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    },
  ],
};

interface ReportState {
  reports: Report[];
  selectedReport: Report | null;
  comments: Record<string, Comment[]>;
  filters: FilterState;
  loading: boolean;
  error: string | null;
}

const initialState: ReportState = {
  reports: MOCK_REPORTS,
  selectedReport: MOCK_REPORTS[0],
  comments: MOCK_COMMENTS,
  filters: {
    status: 'ALL',
    category: 'ALL',
    priority: 'ALL',
    searchQuery: '',
    radiusKm: 10,
  },
  loading: false,
  error: null,
};

export const reportSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    addReport: (state, action: PayloadAction<Omit<Report, 'id' | 'createdAt' | 'updatedAt' | 'upvotesCount' | 'commentsCount'>>) => {
      const newReport: Report = {
        ...action.payload,
        id: `64f1a2b3c4d5e6f7a8b9c${Date.now().toString().slice(-3)}`,
        upvotesCount: 1,
        isUpvoted: true,
        isBookmarked: false,
        commentsCount: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.reports.unshift(newReport);
    },
    toggleUpvote: (state, action: PayloadAction<string>) => {
      const report = state.reports.find((r) => r.id === action.payload);
      if (report) {
        if (report.isUpvoted) {
          report.isUpvoted = false;
          report.upvotesCount = Math.max(0, report.upvotesCount - 1);
        } else {
          report.isUpvoted = true;
          report.upvotesCount += 1;
        }
      }
      if (state.selectedReport?.id === action.payload) {
        state.selectedReport = { ...report! };
      }
    },
    toggleBookmark: (state, action: PayloadAction<string>) => {
      const report = state.reports.find((r) => r.id === action.payload);
      if (report) {
        report.isBookmarked = !report.isBookmarked;
      }
      if (state.selectedReport?.id === action.payload) {
        state.selectedReport = { ...report! };
      }
    },
    setSelectedReport: (state, action: PayloadAction<Report | null>) => {
      state.selectedReport = action.payload;
    },
    updateReportStatus: (
      state,
      action: PayloadAction<{
        reportId: string;
        status: ReportStatus;
        completionProof?: { imageUrl: string; notes: string };
      }>
    ) => {
      const report = state.reports.find((r) => r.id === action.payload.reportId);
      if (report) {
        report.status = action.payload.status;
        report.updatedAt = new Date().toISOString();
        if (action.payload.completionProof) {
          report.completionProof = {
            ...action.payload.completionProof,
            resolvedAt: new Date().toISOString(),
          };
        }
      }
      if (state.selectedReport?.id === action.payload.reportId) {
        state.selectedReport = { ...report! };
      }
    },
    assignWorkerToReport: (
      state,
      action: PayloadAction<{ reportId: string; worker: { id: string; name: string; phone?: string } }>
    ) => {
      const report = state.reports.find((r) => r.id === action.payload.reportId);
      if (report) {
        report.assignedWorker = action.payload.worker;
        report.status = 'IN_PROGRESS';
        report.updatedAt = new Date().toISOString();
      }
      if (state.selectedReport?.id === action.payload.reportId) {
        state.selectedReport = { ...report! };
      }
    },
    addComment: (
      state,
      action: PayloadAction<{ reportId: string; user: { id: string; name: string; role: any }; content: string }>
    ) => {
      const { reportId, user, content } = action.payload;
      const newComment: Comment = {
        id: `64f1a2b3c4d5e6f7a8b9c${Date.now().toString().slice(-3)}`,
        reportId,
        user,
        content,
        createdAt: new Date().toISOString(),
      };
      if (!state.comments[reportId]) {
        state.comments[reportId] = [];
      }
      state.comments[reportId].push(newComment);
      const report = state.reports.find((r) => r.id === reportId);
      if (report) {
        report.commentsCount += 1;
      }
    },
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  addReport,
  toggleUpvote,
  toggleBookmark,
  setSelectedReport,
  updateReportStatus,
  assignWorkerToReport,
  addComment,
  setFilters,
} = reportSlice.actions;

export default reportSlice.reducer;
