import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, UserRole } from '@/types';

// Pre-defined demo users for immediate testing
export const DEMO_USERS: Record<Exclude<UserRole, 'guest'>, User> = {
  citizen: {
    id: 'usr-citizen-1',
    name: 'Alex Johnson',
    email: 'citizen@civicconnect.org',
    role: 'citizen',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    phone: '+1 (555) 234-5678',
    areaId: 'area-1',
    areaName: 'Downtown North',
    createdAt: new Date().toISOString(),
  },
  worker: {
    id: 'usr-worker-1',
    name: 'Marcus Vance',
    email: 'worker@civicconnect.org',
    role: 'worker',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    phone: '+1 (555) 876-5432',
    areaId: 'area-1',
    areaName: 'Downtown North',
    createdAt: new Date().toISOString(),
  },
  admin: {
    id: 'usr-admin-1',
    name: 'Eleanor Vance',
    email: 'admin@civicconnect.org',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    phone: '+1 (555) 999-0000',
    areaId: 'area-global',
    areaName: 'Metropolitan District',
    createdAt: new Date().toISOString(),
  },
};

const savedUserStr = localStorage.getItem('civic_user');
const savedToken = localStorage.getItem('civic_access_token');
const savedUser = savedUserStr ? JSON.parse(savedUserStr) : DEMO_USERS.admin;
const defaultToken = savedToken || 'demo-admin-token';

const initialState: AuthState = {
  user: savedUser,
  token: defaultToken,
  isAuthenticated: true,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
      localStorage.setItem('civic_user', JSON.stringify(action.payload.user));
      localStorage.setItem('civic_access_token', action.payload.token);
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    switchRole: (state, action: PayloadAction<UserRole>) => {
      if (action.payload === 'guest') {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        localStorage.removeItem('civic_user');
        localStorage.removeItem('civic_access_token');
      } else {
        const selectedUser = DEMO_USERS[action.payload] || DEMO_USERS.admin;
        state.user = selectedUser;
        state.token = `demo-${action.payload}-token`;
        state.isAuthenticated = true;
        localStorage.setItem('civic_user', JSON.stringify(selectedUser));
        localStorage.setItem('civic_access_token', state.token);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('civic_user');
      localStorage.removeItem('civic_access_token');
      localStorage.removeItem('civic_refresh_token');
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('civic_user', JSON.stringify(state.user));
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, switchRole, logout, updateProfile } =
  authSlice.actions;

export const setRole = switchRole;

export default authSlice.reducer;
