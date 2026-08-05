import React, { useState } from 'react';
import { GlassCard, MagneticButton } from '@/components/ui/DesignSystem';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { User, UserStatus } from '@/types';
import {
  Users,
  Search,
  Shield,
  UserPlus,
  Mail,
  X,
  Check,
  Trash2,
  Edit3,
  Lock,
  Unlock,
  ShieldAlert,
  Ban,
  Filter,
  MapPin,
  Hash,
  AlertOctagon,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 'usr-1',
      name: 'Alex Johnson',
      email: 'citizen@civicconnect.org',
      role: 'citizen',
      status: 'ACTIVE',
      pincode: '94102',
      areaName: 'Downtown North',
      phone: '+1 (555) 123-4567',
      createdAt: '2026-01-15',
    },
    {
      id: 'usr-2',
      name: 'Marcus Vance',
      email: 'worker@civicconnect.org',
      role: 'worker',
      status: 'ACTIVE',
      pincode: '94102',
      areaName: 'Downtown North',
      phone: '+1 (555) 876-5432',
      createdAt: '2026-02-01',
    },
    {
      id: 'usr-3',
      name: 'Eleanor Vance',
      email: 'admin@civicconnect.org',
      role: 'admin',
      status: 'ACTIVE',
      pincode: '94103',
      areaName: 'Oakwood District',
      phone: '+1 (555) 999-0000',
      createdAt: '2025-11-10',
    },
    {
      id: 'usr-4',
      name: 'Sarah Miller',
      email: 'sarah@example.com',
      role: 'citizen',
      status: 'ACTIVE',
      pincode: '94110',
      areaName: 'Westside Heights',
      phone: '+1 (555) 234-5678',
      createdAt: '2026-03-12',
    },
    {
      id: 'usr-5',
      name: 'David Spammer',
      email: 'david.spam@example.com',
      role: 'citizen',
      status: 'BANNED',
      banReason: 'Repeated fake reports and violation of terms.',
      pincode: '94107',
      areaName: 'East End Sector',
      phone: '+1 (555) 666-7777',
      createdAt: '2026-02-20',
    },
  ]);

  // Filters State
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [pincodeFilter, setPincodeFilter] = useState<string>('ALL');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [banningUser, setBanningUser] = useState<User | null>(null);
  const [banReasonInput, setBanReasonInput] = useState('Terms of service violation');

  // New User State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPincode, setNewPincode] = useState('94102');
  const [newArea, setNewArea] = useState('Downtown North');
  const [newRole, setNewRole] = useState<'citizen' | 'worker' | 'admin'>('citizen');

  const uniquePincodes = Array.from(new Set(users.map((u) => u.pincode))).filter(Boolean);

  const handleBanUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!banningUser) return;

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === banningUser.id) {
          return {
            ...u,
            status: 'BANNED',
            banReason: banReasonInput.trim() || 'Blocked by system administrator',
          };
        }
        return u;
      })
    );

    toast.success(`User ${banningUser.name} has been BLOCKED & BANNED`);
    setBanningUser(null);
    setBanReasonInput('Terms of service violation');
  };

  const handleUnbanUser = (user: User) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === user.id) {
          return { ...u, status: 'ACTIVE', banReason: undefined };
        }
        return u;
      })
    );
    toast.success(`User ${user.name} has been UNBANNED & Restored`);
  };

  const toggleUserStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextStatus: UserStatus = u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
          toast.success(`Account status for ${u.name} set to ${nextStatus}`);
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
  };

  const handleCycleRole = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const roles: Array<'citizen' | 'worker' | 'admin'> = ['citizen', 'worker', 'admin'];
          const currentIndex = roles.indexOf(u.role as any);
          const nextRole = roles[(currentIndex + 1) % roles.length];
          toast.success(`Security role for ${u.name} updated to ${nextRole.toUpperCase()}`);
          return { ...u, role: nextRole };
        }
        return u;
      })
    );
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (confirm(`Are you sure you want to permanently delete user account "${name}"?`)) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success(`Account for ${name} removed`);
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      toast.error('Name and Email are required');
      return;
    }

    const newUserObj: User = {
      id: `usr-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim() || '+1 (555) 000-0000',
      pincode: newPincode,
      areaName: newArea,
      role: newRole,
      status: 'ACTIVE',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setUsers((prev) => [newUserObj, ...prev]);
    toast.success(`Platform account created for ${newName}!`);
    setIsAddModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
    setNewRole('citizen');
  };

  const handleSaveEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? editingUser : u)));
    toast.success(`User details updated for ${editingUser.name}`);
    setEditingUser(null);
  };

  const filteredUsers = users.filter((u) => {
    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      u.name.toLowerCase().includes(query) ||
      u.email.toLowerCase().includes(query) ||
      (u.phone && u.phone.toLowerCase().includes(query)) ||
      (u.pincode && u.pincode.toLowerCase().includes(query)) ||
      (u.areaName && u.areaName.toLowerCase().includes(query));

    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;
    const matchesPincode = pincodeFilter === 'ALL' || u.pincode === pincodeFilter;

    return matchesSearch && matchesRole && matchesStatus && matchesPincode;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <GlassCard className="p-6 md:p-8 border border-indigo-500/30 glow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display flex items-center gap-2">
              <Users className="w-8 h-8 text-indigo-500" /> Platform User Directory & Moderation
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Full administrative authority: create accounts, ban/unban users, cycle security roles, update pincodes, and audit access logs.
            </p>
          </div>

          <MagneticButton
            variant="primary"
            size="md"
            icon={UserPlus}
            onClick={() => setIsAddModalOpen(true)}
          >
            Create New Account
          </MagneticButton>
        </div>
      </GlassCard>

      {/* Filter Bar */}
      <GlassCard className="p-5 space-y-4">
        <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white font-display border-b border-slate-200/60 dark:border-slate-800 pb-3">
          <Filter className="w-4 h-4 text-indigo-500" /> User Directory Filter Controls
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input
            placeholder="Search by name, email, phone, pincode, area..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-indigo-500" />}
          />

          {/* Role Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-display">
              Filter Role
            </label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-display font-medium"
            >
              <option value="ALL">All Roles</option>
              <option value="citizen">Citizens</option>
              <option value="worker">Field Workers</option>
              <option value="admin">Administrators</option>
            </select>
          </div>

          {/* Account Status Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-display">
              Account Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-display font-medium"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="SUSPENDED">SUSPENDED</option>
              <option value="BANNED">BANNED / BLOCKED</option>
            </select>
          </div>

          {/* Pincode Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-display">
              Postal Pincode
            </label>
            <select
              value={pincodeFilter}
              onChange={(e) => setPincodeFilter(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-display font-medium"
            >
              <option value="ALL">All Pincodes</option>
              {uniquePincodes.map((pin) => (
                <option key={pin} value={pin}>
                  PIN: {pin}
                </option>
              ))}
            </select>
          </div>
        </div>
      </GlassCard>

      {/* User Directory Cards */}
      <div className="space-y-3">
        {filteredUsers.map((user) => (
          <GlassCard key={user.id} sectionType="directory" className="p-4 sm:p-5">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <Avatar name={user.name} size="md" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap font-display">
                    <span className="text-base font-extrabold text-slate-900 dark:text-white">
                      {user.name}
                    </span>

                    <span
                      className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border font-display ${
                        user.role === 'admin'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                          : user.role === 'worker'
                          ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                          : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20'
                      }`}
                    >
                      {user.role}
                    </span>

                    <span
                      className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border font-display ${
                        user.status === 'BANNED'
                          ? 'bg-red-600/20 text-red-600 dark:text-red-400 border-red-500/30 animate-pulse'
                          : user.status === 'ACTIVE'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {user.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-indigo-500" /> {user.email}
                    </span>
                    {user.pincode && (
                      <span className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300">
                        <Hash className="w-3.5 h-3.5 text-indigo-500" /> PIN: {user.pincode}
                      </span>
                    )}
                    {user.areaName && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-purple-500" /> {user.areaName}
                      </span>
                    )}
                  </div>

                  {user.status === 'BANNED' && user.banReason && (
                    <div className="text-xs text-rose-500 dark:text-rose-400 font-medium flex items-center gap-1 pt-0.5">
                      <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
                      <span>Block Reason: {user.banReason}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons for Ban, Unban, Edit, Role, Delete */}
              <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end border-t lg:border-t-0 pt-3 lg:pt-0 border-slate-200/60 dark:border-slate-800">
                <MagneticButton
                  variant="ghost"
                  size="sm"
                  icon={Shield}
                  onClick={() => handleCycleRole(user.id)}
                  title="Cycle Role"
                >
                  Role
                </MagneticButton>

                <MagneticButton
                  variant="ghost"
                  size="sm"
                  icon={Edit3}
                  onClick={() => setEditingUser(user)}
                  title="Edit User"
                >
                  Edit
                </MagneticButton>

                {user.status === 'BANNED' ? (
                  <MagneticButton
                    variant="accent"
                    size="sm"
                    icon={Unlock}
                    onClick={() => handleUnbanUser(user)}
                  >
                    Unban User
                  </MagneticButton>
                ) : (
                  <MagneticButton
                    variant="danger"
                    size="sm"
                    icon={Ban}
                    onClick={() => setBanningUser(user)}
                  >
                    Ban & Block
                  </MagneticButton>
                )}

                <MagneticButton
                  variant={user.status === 'ACTIVE' ? 'glass' : 'secondary'}
                  size="sm"
                  icon={Lock}
                  onClick={() => toggleUserStatus(user.id)}
                >
                  {user.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                </MagneticButton>

                <MagneticButton
                  variant="danger"
                  size="sm"
                  icon={Trash2}
                  onClick={() => handleDeleteUser(user.id, user.name)}
                />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Ban / Block Confirmation Modal */}
      {banningUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <GlassCard className="p-6 max-w-md w-full space-y-4 border border-rose-500/40">
            <div className="flex justify-between items-center pb-2 border-b border-rose-500/20">
              <h3 className="text-lg font-black text-rose-500 flex items-center gap-2 font-display">
                <Ban className="w-5 h-5" /> Ban Account: {banningUser.name}
              </h3>
              <button onClick={() => setBanningUser(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBanUser} className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                Blocking this account will immediately revoke login permissions and flag user telemetry for security review.
              </p>

              <Input
                label="Reason for Ban / Block"
                value={banReasonInput}
                onChange={(e) => setBanReasonInput(e.target.value)}
                placeholder="Specify violation reason..."
                required
              />

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <MagneticButton variant="ghost" size="sm" type="button" onClick={() => setBanningUser(null)}>
                  Cancel
                </MagneticButton>
                <MagneticButton variant="danger" size="sm" type="submit" icon={Ban}>
                  Confirm Ban & Block
                </MagneticButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <GlassCard className="p-6 max-w-md w-full space-y-4 border border-indigo-500/30">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-slate-800">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 font-display">
                <Edit3 className="w-5 h-5 text-indigo-500" /> Edit Platform User
              </h3>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditUser} className="space-y-4">
              <Input
                label="Full Name"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                required
              />

              <Input
                label="Phone Number"
                value={editingUser.phone || ''}
                onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Postal Pincode"
                  value={editingUser.pincode || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, pincode: e.target.value })}
                />
                <Input
                  label="District Area"
                  value={editingUser.areaName || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, areaName: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-display">
                  Security Role
                </label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-display font-medium"
                >
                  <option value="citizen">Citizen</option>
                  <option value="worker">Field Worker</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <MagneticButton variant="ghost" size="sm" type="button" onClick={() => setEditingUser(null)}>
                  Cancel
                </MagneticButton>
                <MagneticButton variant="accent" size="sm" type="submit" icon={Check}>
                  Update User
                </MagneticButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <GlassCard className="p-6 max-w-md w-full space-y-4 border border-indigo-500/30">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-slate-800">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 font-display">
                <UserPlus className="w-5 h-5 text-indigo-500" /> Create Platform Account
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="e.g. John Doe"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="e.g. john@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />

              <Input
                label="Phone Number"
                placeholder="e.g. +1 (555) 019-2834"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Pincode / Zip"
                  placeholder="e.g. 94102"
                  value={newPincode}
                  onChange={(e) => setNewPincode(e.target.value)}
                />
                <Input
                  label="District Area"
                  placeholder="e.g. Downtown North"
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-display">
                  Security Role
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 font-display font-medium"
                >
                  <option value="citizen">Citizen (Public Access)</option>
                  <option value="worker">Field Worker (Repair Dispatch)</option>
                  <option value="admin">Administrator (System Command)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <MagneticButton variant="ghost" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </MagneticButton>
                <MagneticButton variant="primary" size="sm" type="submit" icon={Check}>
                  Save Account
                </MagneticButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
