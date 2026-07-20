import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { addWorker } from '@/store/slices/workerSlice';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Briefcase, Star, Search, PlusCircle, Phone, MapPin, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminWorkersPage: React.FC = () => {
  const dispatch = useDispatch();
  const workers = useSelector((state: RootState) => state.workers.workers);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newSpec, setNewSpec] = useState('Road Works & Infrastructure');
  const [newArea, setNewArea] = useState('Downtown North');

  const filteredWorkers = workers.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase()) || w.specialization.toLowerCase().includes(search.toLowerCase())
  );

  const handleRegisterWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim() || !newPhone.trim()) {
      toast.error('All fields are required');
      return;
    }

    const workerObj = {
      id: `usr-worker-${workers.length + 1}`,
      name: newName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim(),
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000)}?auto=format&fit=crop&q=80&w=250`,
      specialization: newSpec,
      assignedArea: newArea,
      activeTasksCount: 0,
      completedTasksCount: 0,
      rating: 5.0,
      status: 'AVAILABLE' as const,
    };

    dispatch(addWorker(workerObj));
    toast.success(`Registered worker ${newName} successfully!`);
    setIsAddModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-500" /> Municipal Field Crew Directory
          </h1>
          <p className="text-xs text-slate-400">
            Monitor worker availability, active workload capacity, and district performance ratings.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsAddModalOpen(true)} leftIcon={<PlusCircle className="w-4 h-4" />}>
          Register New Worker
        </Button>
      </div>

      <Input
        placeholder="Search field crew by name or specialization..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        leftIcon={<Search className="w-4 h-4" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWorkers.map((worker) => (
          <Card key={worker.id} glass className="p-5">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={worker.avatarUrl} name={worker.name} size="lg" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{worker.name}</h3>
                    <div className="text-xs text-indigo-650 dark:text-indigo-400 font-semibold">
                      {worker.specialization}
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-250 dark:border-amber-900 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-450" /> {worker.rating}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" /> {worker.assignedArea}
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" /> {worker.phone}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {worker.activeTasksCount} Active Work Orders
                </span>
                <span className="text-slate-400">{worker.completedTasksCount} Total Resolved</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Worker Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-indigo-505" /> Register Crew Member
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRegisterWorker} className="space-y-4">
              <Input
                label="Worker Name"
                placeholder="e.g. Marcus Vance"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="e.g. marcus@civicconnect.org"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />

              <Input
                label="Phone Number"
                placeholder="e.g. +1 (555) 019-2834"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                required
              />

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Specialization Specialty</label>
                <select
                  value={newSpec}
                  onChange={(e) => setNewSpec(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Road Works & Infrastructure">Road Works & Infrastructure</option>
                  <option value="Electrical & Street Lighting">Electrical & Street Lighting</option>
                  <option value="Water Utilities & Sanitation">Water Utilities & Sanitation</option>
                  <option value="Waste & Public Health">Waste & Public Health</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Assigned Territory Area</label>
                <select
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Downtown North">Downtown North</option>
                  <option value="Oakwood District">Oakwood District</option>
                  <option value="Westside Heights">Westside Heights</option>
                  <option value="East End Sector">East End Sector</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-850">
                <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" leftIcon={<Check className="w-4 h-4" />}>
                  Register Worker
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
