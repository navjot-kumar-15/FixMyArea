import { User, UserRole } from '@/types';

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: number;
}

export interface RegisterPayload {
  email: string;
  name: string;
  password: string;
  role: UserRole;
  ward?: string;
  department?: string;
}

// Realistic pre-seeded demo accounts
export const DEMO_USERS: Record<UserRole, User> = {
  citizen: {
    id: 'usr_citizen_1',
    name: 'Aarav Sharma',
    email: 'citizen@civic.gov',
    role: 'citizen',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    areaName: 'Ward 4 - Metro East',
    createdAt: new Date().toISOString(),
  },
  worker: {
    id: 'usr_worker_1',
    name: 'Rajesh Kumar',
    email: 'worker@civic.gov',
    role: 'worker',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    areaName: 'Public Works & Roads',
    createdAt: new Date().toISOString(),
  },
  admin: {
    id: 'usr_admin_1',
    name: 'Director Elena Vance',
    email: 'admin@civic.gov',
    role: 'admin',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    createdAt: new Date().toISOString(),
  },
  guest: {
    id: 'usr_guest_0',
    name: 'Guest Explorer',
    email: 'guest@civic.gov',
    role: 'guest',
    createdAt: new Date().toISOString(),
  },
};

const STORAGE_KEY = 'civicconnect_auth_session';
const OTP_STORAGE_KEY = 'civicconnect_pending_otp';

export class MockAuthService {
  /**
   * Authenticate user with credentials
   */
  static async login(email: string, password: string): Promise<AuthSession> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check pre-seeded demo users
    const matchedRole = (Object.keys(DEMO_USERS) as UserRole[]).find(
      (r) => DEMO_USERS[r].email.toLowerCase() === email.toLowerCase()
    );

    let user: User;

    if (matchedRole && DEMO_USERS[matchedRole]) {
      user = DEMO_USERS[matchedRole];
    } else {
      if (!email.includes('@') || password.length < 6) {
        throw new Error('Invalid credentials. Password must be at least 6 characters.');
      }
      user = {
        id: `usr_${Date.now()}`,
        name: email.split('@')[0].replace('.', ' '),
        email,
        role: 'citizen',
        createdAt: new Date().toISOString(),
      };
    }

    const session: AuthSession = {
      user,
      token: `jwt_token_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  }

  /**
   * Register a new user and generate verification OTP
   */
  static async register(payload: RegisterPayload): Promise<{ email: string; otpCode: string }> {
    await new Promise((resolve) => setTimeout(resolve, 900));

    if (!payload.email.includes('@')) {
      throw new Error('Please provide a valid email address.');
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const pendingData = {
      ...payload,
      otpCode,
      createdAt: Date.now(),
    };

    localStorage.setItem(OTP_STORAGE_KEY, JSON.stringify(pendingData));
    return { email: payload.email, otpCode };
  }

  /**
   * Verify email with 6-digit OTP code
   */
  static async verifyEmail(otpEntered: string): Promise<AuthSession> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const pendingRaw = localStorage.getItem(OTP_STORAGE_KEY);
    if (!pendingRaw) {
      if (otpEntered === '123456' || otpEntered.length === 6) {
        return this.login('citizen@civic.gov', 'password123');
      }
      throw new Error('No pending registration found. Please register again.');
    }

    const pending = JSON.parse(pendingRaw);
    if (pending.otpCode !== otpEntered && otpEntered !== '123456') {
      throw new Error('Invalid verification code. Please check your email or try 123456.');
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: pending.name,
      email: pending.email,
      role: pending.role || 'citizen',
      areaName: pending.ward || pending.department,
      createdAt: new Date().toISOString(),
    };

    const session: AuthSession = {
      user: newUser,
      token: `jwt_token_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };

    localStorage.removeItem(OTP_STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  }

  /**
   * Request password reset link / OTP
   */
  static async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    await new Promise((resolve) => setTimeout(resolve, 700));
    if (!email.includes('@')) {
      throw new Error('Invalid email address.');
    }
    return {
      success: true,
      message: `Password reset instructions have been sent to ${email}.`,
    };
  }

  /**
   * Reset password with token
   */
  static async resetPassword(token: string, newPassword: string): Promise<{ success: boolean }> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (newPassword.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }
    return { success: true };
  }

  /**
   * Retrieve active session from storage
   */
  static getStoredSession(): AuthSession | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      const session: AuthSession = JSON.parse(raw);
      if (Date.now() > session.expiresAt) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return session;
    } catch {
      return null;
    }
  }

  /**
   * Terminate active session
   */
  static logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}
