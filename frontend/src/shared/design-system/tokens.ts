import { ReportCategory, ReportPriority, ReportStatus, UserRole } from '../../types';

export const CATEGORY_TOKENS: Record<ReportCategory, { label: string; color: string; bg: string; icon: string }> = {
  POTHOLE: { label: 'Road & Pothole', color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20', icon: 'Construction' },
  STREET_LIGHT: { label: 'Street Light', color: 'text-yellow-500', bg: 'bg-yellow-500/10 border-yellow-500/20', icon: 'Zap' },
  WATER_LEAKAGE: { label: 'Water Leakage', color: 'text-cyan-500', bg: 'bg-cyan-500/10 border-cyan-500/20', icon: 'Droplets' },
  GARBAGE: { label: 'Garbage & Sanitation', color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: 'Trash2' },
  TRAFFIC: { label: 'Traffic & Signals', color: 'text-rose-500', bg: 'bg-rose-500/10 border-rose-500/20', icon: 'AlertTriangle' },
  PARK_MAINTENANCE: { label: 'Park & Greenspace', color: 'text-lime-500', bg: 'bg-lime-500/10 border-lime-500/20', icon: 'Trees' },
  OTHER: { label: 'General Infrastructure', color: 'text-indigo-500', bg: 'bg-indigo-500/10 border-indigo-500/20', icon: 'HelpCircle' },
};

export const PRIORITY_TOKENS: Record<ReportPriority, { label: string; color: string; bg: string; pulseBg: string }> = {
  LOW: { label: 'Low', color: 'text-slate-400', bg: 'bg-slate-500/10 border-slate-500/20', pulseBg: 'bg-slate-400' },
  MEDIUM: { label: 'Medium', color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20', pulseBg: 'bg-blue-400' },
  HIGH: { label: 'High', color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20', pulseBg: 'bg-orange-400' },
  CRITICAL: { label: 'Critical Urgent', color: 'text-rose-500 font-bold', bg: 'bg-rose-500/15 border-rose-500/30', pulseBg: 'bg-rose-500 animate-ping' },
};

export const STATUS_TOKENS: Record<ReportStatus, { label: string; color: string; bg: string; dot: string }> = {
  PENDING: { label: 'Pending Review', color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20', dot: 'bg-amber-500' },
  IN_PROGRESS: { label: 'Work In Progress', color: 'text-cyan-500', bg: 'bg-cyan-500/10 border-cyan-500/20', dot: 'bg-cyan-500 animate-pulse' },
  RESOLVED: { label: 'Resolved & Closed', color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20', dot: 'bg-emerald-500' },
  REJECTED: { label: 'Declined', color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/20', dot: 'bg-rose-400' },
};

export const ROLE_TOKENS: Record<UserRole, { label: string; badgeBg: string; text: string; description: string }> = {
  guest: { label: 'Public Visitor', badgeBg: 'bg-slate-500/10 border-slate-500/20', text: 'text-slate-400', description: 'Read-only access to city reports & map' },
  citizen: { label: 'Active Citizen', badgeBg: 'bg-indigo-500/10 border-indigo-500/20', text: 'text-indigo-400', description: 'Can report issues, upvote, comment & track resolutions' },
  worker: { label: 'Field Worker', badgeBg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-400', description: 'Can view assigned work, update progress & upload proof of fix' },
  admin: { label: 'City Administrator', badgeBg: 'bg-purple-500/10 border-purple-500/20', text: 'text-purple-400', description: 'Full system management, dispatching, users & analytics' },
};
