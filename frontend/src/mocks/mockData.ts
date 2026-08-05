/**
 * Centralized Mock Data Layer — Strictly Aligned with NestJS/MongoDB Schemas
 */

export interface MockCategory {
  id: string;
  name: string;
  description: string;
  department: string;
  icon: string;
  color: string;
  priority_weight: number;
  sla_hours: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MockLocation {
  id: string;
  name: string;
  type: 'country' | 'state' | 'city' | 'area';
  parent_id: string | null;
  latitude: number;
  longitude: number;
  is_active: boolean;
  is_serviceable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MockUser {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profile_picture_url: string;
  role: 'guest' | 'citizen' | 'worker' | 'admin';
  is_banned: boolean;
  is_blocked_by_admin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MockReport {
  id: string;
  title: string;
  description: string;
  category: string;
  category_details?: MockCategory;
  images: Array<{ url: string; public_id?: string }>;
  location: {
    type: 'Point';
    coordinates: { lat: number; lng: number };
  };
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  severity_score: number;
  created_by: {
    id: string;
    full_name: string;
    email: string;
    avatarUrl?: string;
  };
  assigned_worker?: {
    id: string;
    full_name: string;
    phone_number: string;
    avatarUrl?: string;
  };
  upvotes_count: number;
  downvotes_count: number;
  comments_count: number;
  views_count: number;
  supporters_count: number;
  is_verified: boolean;
  is_resolved: boolean;
  ai_analysis?: {
    detected_category: string;
    confidence: number;
    suggested_priority: string;
    toxicity_score: number;
  };
  tags: string[];
  moderation: {
    is_flagged: boolean;
    flagged_reason: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MockAssignment {
  id: string;
  report_id: string;
  worker_id: string;
  assigned_by: string;
  status: 'assigned' | 'accepted' | 'rejected' | 'in_progress' | 'completed' | 'reassigned';
  note?: string;
  assigned_at: string;
  completed_at?: string;
  is_active: boolean;
}

export interface MockProgressUpdate {
  id: string;
  report_id: string;
  worker_id: string;
  note: string;
  progress_percentage: number;
  images: Array<{ url: string }>;
  is_final_update: boolean;
  is_verified: boolean;
  createdAt: string;
}

export interface MockComment {
  id: string;
  report_id: string;
  user_id: string;
  user_name: string;
  user_role: string;
  user_avatar?: string;
  message: string;
  createdAt: string;
}

// ----------------------------------------------------------------------
// 1. MOCK CATEGORIES
// ----------------------------------------------------------------------
export const MOCK_CATEGORIES: MockCategory[] = [
  {
    id: '64f1a2b3c4d5e6f7a8b9c101',
    name: 'Road Infrastructure',
    description: 'Potholes, damaged asphalt, missing curb stops, and traffic hazards.',
    department: 'Public Works & Transportation',
    icon: 'construction',
    color: '#3b82f6',
    priority_weight: 4,
    sla_hours: 24,
    is_active: true,
    createdAt: '2026-01-15T08:00:00.000Z',
    updatedAt: '2026-01-15T08:00:00.000Z',
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c102',
    name: 'Electrical & Grid',
    description: 'Streetlight pole dark outages, damaged transformers, and exposed wiring.',
    department: 'Energy & Municipal Utilities',
    icon: 'zap',
    color: '#f59e0b',
    priority_weight: 5,
    sla_hours: 12,
    is_active: true,
    createdAt: '2026-01-15T08:00:00.000Z',
    updatedAt: '2026-01-15T08:00:00.000Z',
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c103',
    name: 'Water & Sanitation',
    description: 'Main pipe bursts, sewer backups, clean water leaks, and drainage blocks.',
    department: 'Water Reclamation Board',
    icon: 'droplet',
    color: '#06b6d4',
    priority_weight: 5,
    sla_hours: 6,
    is_active: true,
    createdAt: '2026-01-15T08:00:00.000Z',
    updatedAt: '2026-01-15T08:00:00.000Z',
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c104',
    name: 'Public Parks & Sanitation',
    description: 'Illegal dumping, uncollected trash bins, overgrown vegetation blocking signs.',
    department: 'Parks & Environmental Safety',
    icon: 'trees',
    color: '#10b981',
    priority_weight: 2,
    sla_hours: 48,
    is_active: true,
    createdAt: '2026-01-15T08:00:00.000Z',
    updatedAt: '2026-01-15T08:00:00.000Z',
  },
];

// ----------------------------------------------------------------------
// 2. MOCK LOCATIONS (Hierarchy: Country -> State -> City -> Area)
// ----------------------------------------------------------------------
export const MOCK_LOCATIONS: MockLocation[] = [
  {
    id: '64f1a2b3c4d5e6f7a8b9c201',
    name: 'United States',
    type: 'country',
    parent_id: null,
    latitude: 37.0902,
    longitude: -95.7129,
    is_active: true,
    is_serviceable: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c202',
    name: 'California',
    type: 'state',
    parent_id: '64f1a2b3c4d5e6f7a8b9c201',
    latitude: 36.7783,
    longitude: -119.4179,
    is_active: true,
    is_serviceable: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c203',
    name: 'San Francisco',
    type: 'city',
    parent_id: '64f1a2b3c4d5e6f7a8b9c202',
    latitude: 37.7749,
    longitude: -122.4194,
    is_active: true,
    is_serviceable: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c204',
    name: 'Metropolitan Sector 4',
    type: 'area',
    parent_id: '64f1a2b3c4d5e6f7a8b9c203',
    latitude: 37.7749,
    longitude: -122.4194,
    is_active: true,
    is_serviceable: true,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  },
];

// ----------------------------------------------------------------------
// 3. MOCK USERS
// ----------------------------------------------------------------------
export const MOCK_USERS: MockUser[] = [
  {
    id: '64f1a2b3c4d5e6f7a8b9c001',
    full_name: 'Alex Johnson',
    first_name: 'Alex',
    last_name: 'Johnson',
    email: 'citizen@civicconnect.org',
    phone_number: '+1 (555) 234-5678',
    profile_picture_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300',
    role: 'citizen',
    is_banned: false,
    is_blocked_by_admin: false,
    createdAt: '2026-02-01T10:00:00.000Z',
    updatedAt: '2026-02-01T10:00:00.000Z',
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c002',
    full_name: 'Marcus Vance',
    first_name: 'Marcus',
    last_name: 'Vance',
    email: 'worker@civicconnect.org',
    phone_number: '+1 (555) 901-2345',
    profile_picture_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300',
    role: 'worker',
    is_banned: false,
    is_blocked_by_admin: false,
    createdAt: '2026-01-20T09:00:00.000Z',
    updatedAt: '2026-01-20T09:00:00.000Z',
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c099',
    full_name: 'Eleanor Vance',
    first_name: 'Eleanor',
    last_name: 'Vance',
    email: 'admin@civicconnect.org',
    phone_number: '+1 (555) 888-9999',
    profile_picture_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300',
    role: 'admin',
    is_banned: false,
    is_blocked_by_admin: false,
    createdAt: '2026-01-01T08:00:00.000Z',
    updatedAt: '2026-01-01T08:00:00.000Z',
  },
];

// ----------------------------------------------------------------------
// 4. MOCK REPORTS
// ----------------------------------------------------------------------
export const MOCK_REPORTS: MockReport[] = [
  {
    id: '64f1a2b3c4d5e6f7a8b9c0d1',
    title: 'Hazardous Roadway Pothole on Main & 4th',
    description: 'Severe structural asphalt failure causing vehicle tire damage near the downtown arterial intersection.',
    category: 'Road Infrastructure',
    images: [{ url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800' }],
    location: {
      type: 'Point',
      coordinates: { lat: 37.7749, lng: -122.4194 },
    },
    address: '102 Main St',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    pincode: '94105',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    severity_score: 8.5,
    created_by: {
      id: '64f1a2b3c4d5e6f7a8b9c001',
      full_name: 'Alex Johnson',
      email: 'citizen@civicconnect.org',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300',
    },
    assigned_worker: {
      id: '64f1a2b3c4d5e6f7a8b9c002',
      full_name: 'Marcus Vance',
      phone_number: '+1 (555) 901-2345',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300',
    },
    upvotes_count: 42,
    downvotes_count: 0,
    comments_count: 5,
    views_count: 310,
    supporters_count: 42,
    is_verified: true,
    is_resolved: false,
    ai_analysis: {
      detected_category: 'Road Infrastructure',
      confidence: 0.96,
      suggested_priority: 'HIGH',
      toxicity_score: 0.01,
    },
    tags: ['pothole', 'hazard', 'main-street'],
    moderation: { is_flagged: false, flagged_reason: '' },
    createdAt: '2026-08-03T14:20:00.000Z',
    updatedAt: '2026-08-05T10:15:00.000Z',
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c0d2',
    title: 'Streetlight Substation Outage Sector 4',
    description: 'Illumination pole array #42 offline due to transformer fuse blow. Zero ambient lighting at night.',
    category: 'Electrical & Grid',
    images: [{ url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800' }],
    location: {
      type: 'Point',
      coordinates: { lat: 37.7849, lng: -122.4094 },
    },
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    pincode: '94102',
    status: 'PENDING',
    priority: 'MEDIUM',
    severity_score: 5.8,
    created_by: {
      id: '64f1a2b3c4d5e6f7a8b9c001',
      full_name: 'Alex Johnson',
      email: 'citizen@civicconnect.org',
    },
    upvotes_count: 18,
    downvotes_count: 0,
    comments_count: 2,
    views_count: 145,
    supporters_count: 18,
    is_verified: true,
    is_resolved: false,
    ai_analysis: {
      detected_category: 'Electrical & Grid',
      confidence: 0.92,
      suggested_priority: 'MEDIUM',
      toxicity_score: 0.0,
    },
    tags: ['lighting', 'outage', 'safety'],
    moderation: { is_flagged: false, flagged_reason: '' },
    createdAt: '2026-08-01T09:10:00.000Z',
    updatedAt: '2026-08-02T11:00:00.000Z',
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c0d3',
    title: 'Water Main Pressure Leak at Sunset Blvd',
    description: 'Clean water line rupture spilling onto public sidewalk and creating surface flooding.',
    category: 'Water & Sanitation',
    images: [{ url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=800' }],
    location: {
      type: 'Point',
      coordinates: { lat: 37.7649, lng: -122.4294 },
    },
    address: '1450 Sunset Blvd',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    pincode: '94122',
    status: 'IN_PROGRESS',
    priority: 'URGENT',
    severity_score: 9.2,
    created_by: {
      id: '64f1a2b3c4d5e6f7a8b9c001',
      full_name: 'Alex Johnson',
      email: 'citizen@civicconnect.org',
    },
    assigned_worker: {
      id: '64f1a2b3c4d5e6f7a8b9c002',
      full_name: 'Marcus Vance',
      phone_number: '+1 (555) 901-2345',
    },
    upvotes_count: 67,
    downvotes_count: 0,
    comments_count: 9,
    views_count: 520,
    supporters_count: 67,
    is_verified: true,
    is_resolved: false,
    ai_analysis: {
      detected_category: 'Water & Sanitation',
      confidence: 0.98,
      suggested_priority: 'URGENT',
      toxicity_score: 0.0,
    },
    tags: ['water-leak', 'flooding', 'urgent'],
    moderation: { is_flagged: false, flagged_reason: '' },
    createdAt: '2026-08-04T16:45:00.000Z',
    updatedAt: '2026-08-05T18:00:00.000Z',
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c0d4',
    title: 'Overgrown Vegetation Blocking Stop Sign',
    description: 'Tree branches obscured traffic control signage at high-traffic intersection.',
    category: 'Public Parks & Sanitation',
    images: [{ url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800' }],
    location: {
      type: 'Point',
      coordinates: { lat: 37.7549, lng: -122.4194 },
    },
    address: '88 Valencia St',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    pincode: '94110',
    status: 'RESOLVED',
    priority: 'LOW',
    severity_score: 3.2,
    created_by: {
      id: '64f1a2b3c4d5e6f7a8b9c001',
      full_name: 'Alex Johnson',
      email: 'citizen@civicconnect.org',
    },
    assigned_worker: {
      id: '64f1a2b3c4d5e6f7a8b9c002',
      full_name: 'Marcus Vance',
      phone_number: '+1 (555) 901-2345',
    },
    upvotes_count: 12,
    downvotes_count: 0,
    comments_count: 1,
    views_count: 90,
    supporters_count: 12,
    is_verified: true,
    is_resolved: true,
    ai_analysis: {
      detected_category: 'Public Parks & Sanitation',
      confidence: 0.89,
      suggested_priority: 'LOW',
      toxicity_score: 0.0,
    },
    tags: ['trees', 'signage', 'resolved'],
    moderation: { is_flagged: false, flagged_reason: '' },
    createdAt: '2026-07-28T08:00:00.000Z',
    updatedAt: '2026-07-30T15:30:00.000Z',
  },
];

// ----------------------------------------------------------------------
// 5. MOCK ASSIGNMENTS
// ----------------------------------------------------------------------
export const MOCK_ASSIGNMENTS: MockAssignment[] = [
  {
    id: '64f1a2b3c4d5e6f7a8b9c301',
    report_id: '64f1a2b3c4d5e6f7a8b9c0d1',
    worker_id: '64f1a2b3c4d5e6f7a8b9c002',
    assigned_by: '64f1a2b3c4d5e6f7a8b9c099',
    status: 'in_progress',
    note: 'Priority 1 dispatch for heavy road repair squad.',
    assigned_at: '2026-08-04T08:00:00.000Z',
    is_active: true,
  },
  {
    id: '64f1a2b3c4d5e6f7a8b9c302',
    report_id: '64f1a2b3c4d5e6f7a8b9c0d3',
    worker_id: '64f1a2b3c4d5e6f7a8b9c002',
    assigned_by: '64f1a2b3c4d5e6f7a8b9c099',
    status: 'in_progress',
    note: 'Urgent water shutoff and valve replacement dispatch.',
    assigned_at: '2026-08-05T09:30:00.000Z',
    is_active: true,
  },
];

// ----------------------------------------------------------------------
// 6. MOCK PROGRESS UPDATES
// ----------------------------------------------------------------------
export const MOCK_PROGRESS_UPDATES: MockProgressUpdate[] = [
  {
    id: '64f1a2b3c4d5e6f7a8b9c401',
    report_id: '64f1a2b3c4d5e6f7a8b9c0d1',
    worker_id: '64f1a2b3c4d5e6f7a8b9c002',
    note: 'Excavation completed and base layer gravel backfilled.',
    progress_percentage: 65,
    images: [{ url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=600' }],
    is_final_update: false,
    is_verified: true,
    createdAt: '2026-08-05T11:00:00.000Z',
  },
];

// ----------------------------------------------------------------------
// 7. MOCK COMMENTS
// ----------------------------------------------------------------------
export const MOCK_COMMENTS: MockComment[] = [
  {
    id: '64f1a2b3c4d5e6f7a8b9c501',
    report_id: '64f1a2b3c4d5e6f7a8b9c0d1',
    user_id: '64f1a2b3c4d5e6f7a8b9c001',
    user_name: 'Alex Johnson',
    user_role: 'citizen',
    user_avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300',
    message: 'Work crew is currently on scene with heavy equipment laying down asphalt!',
    createdAt: '2026-08-05T12:15:00.000Z',
  },
];
