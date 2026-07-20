import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Users, Search, Shield, UserPlus, Mail, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 'usr-1', name: 'Alex Johnson', email: 'citizen@civicconnect.org', role: 'citizen', status: 'ACTIVE' },
    { id: 'usr-2', name: 'Marcus Vance', email: 'worker@civicconnect.org', role: 'worker', status: 'ACTIVE' },
    { id: 'usr-3', name: 'Eleanor Vance', email: 'admin@civicconnect.org', role: 'admin', status: 'ACTIVE' },
    { id: 'usr-4', name: 'Sarah Miller', email: 'sarah@example.com', role: 'citizen', status: 'ACTIVE' },
  ]);

  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'citizen' | 'worker' | 'admin'>('citizen');

  const toggleUserRole = (id: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextRole = u.role === 'citizen' ? 'worker' : u.role === 'worker' ? 'admin' : 'citizen';
          toast.success(`Updated role for ${u.name} to ${nextRole.toUpperCase()}`);
          return { ...u, role: nextRole };
        }
        return u;
      })
    );
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) {
      toast.error('All fields are required');
      return;
    }

    const newUser = {
      id: `usr-${users.length + 1}`,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      status: 'ACTIVE',
    };

    setUsers((prev) => [newUser, ...prev]);
    toast.success(`User ${newName} registered successfully!`);
    setIsAddModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewRole('citizen');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-650" /> Platform Accounts & User Directory
          </h1>
          <p className="text-xs text-slate-400">
            Manage citizen, field worker, and administrator accounts and permission roles.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsAddModalOpen(true)} leftIcon={<UserPlus className="w-4 h-4" />}>
          Add User Account
        </Button>
      </div>

      <Input
        placeholder="Filter accounts by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        leftIcon={<Search className="w-4 h-4" />}
      />

      <Card glass>
        <CardContent className="p-0 divide-y divide-slate-100 dark:divide-slate-800">
          {users
            .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
            .map((user) => (
              <div key={user.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar name={user.name} size="md" />
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {user.name}
                      <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        {user.role}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {user.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" onClick={() => toggleUserRole(user.id)} leftIcon={<Shield className="w-3.5 h-3.5" />}>
                    Cycle Role
                  </Button>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-500" /> Create Platform Account
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-200">
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

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Security Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="citizen">Citizen (Public Access)</option>
                  <option value="worker">Field Worker (Repair Dispatch)</option>
                  <option value="admin">Administrator (System Commander)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-850">
                <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" leftIcon={<Check className="w-4 h-4" />}>
                  Save Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
