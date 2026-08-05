import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { addWorker, updateWorkerDetails, updateWorkerStatus } from '@/store/slices/workerSlice';
import { GlassCard, MagneticButton, StatusBadge } from '@/components/ui/DesignSystem';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { WorkerProfile } from '@/types';
import {
  Briefcase,
  Star,
  Search,
  PlusCircle,
  Phone,
  MapPin,
  X,
  Check,
  Eye,
  Edit3,
  Filter,
  Layers,
  Sparkles,
  Hash,
  Compass,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminWorkersPage: React.FC = () => {
  const dispatch = useDispatch();
  const workers = useSelector((state: RootState) => state.workers.workers);
  const reports = useSelector((state: RootState) => state.reports.reports);

  // Filters State
  const [search, setSearch] = useState('');
  const [areaFilter, setAreaFilter] = useState<string>('ALL');
  const [pincodeFilter, setPincodeFilter] = useState<string>('ALL');
  const [specFilter, setSpecFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingWorker, setEditingWorker] = useState<WorkerProfile | null>(null);
  const [inspectWorker, setInspectWorker] = useState<WorkerProfile | null>(null);

  // New Worker Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newSpec, setNewSpec] = useState('Road Works & Infrastructure');
  const [newArea, setNewArea] = useState('Downtown North');
  const [newPincode, setNewPincode] = useState('94102');
  const [newLocationDetails, setNewLocationDetails] = useState('Central Depot');

  // Extract unique areas & pincodes for dropdowns
  const uniqueAreas = Array.from(new Set(workers.map((w) => w.assignedArea))).filter(Boolean);
  const uniquePincodes = Array.from(new Set(workers.map((w) => w.pincode))).filter(Boolean);
  const uniqueSpecs = Array.from(new Set(workers.map((w) => w.specialization))).filter(Boolean);

  const filteredWorkers = workers.filter((w) => {
    const query = search.toLowerCase().trim();
    const matchesSearch =
      !query ||
      w.name.toLowerCase().includes(query) ||
      w.email.toLowerCase().includes(query) ||
      w.phone.toLowerCase().includes(query) ||
      w.specialization.toLowerCase().includes(query) ||
      w.assignedArea.toLowerCase().includes(query) ||
      (w.pincode && w.pincode.toLowerCase().includes(query)) ||
      (w.locationDetails && w.locationDetails.toLowerCase().includes(query));

    const matchesArea = areaFilter === 'ALL' || w.assignedArea === areaFilter;
    const matchesPincode = pincodeFilter === 'ALL' || w.pincode === pincodeFilter;
    const matchesSpec = specFilter === 'ALL' || w.specialization === specFilter;
    const matchesStatus = statusFilter === 'ALL' || w.status === statusFilter;

    return matchesSearch && matchesArea && matchesPincode && matchesSpec && matchesStatus;
  });

  const handleRegisterWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim() || !newPhone.trim()) {
      toast.error('Name, email, and phone are required');
      return;
    }

    const workerObj: WorkerProfile = {
      id: `usr-worker-${workers.length + 1}`,
      name: newName.trim(),
      email: newEmail.trim(),
      phone: newPhone.trim(),
      avatarUrl: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250`,
      specialization: newSpec,
      assignedArea: newArea,
      pincode: newPincode,
      locationDetails: newLocationDetails,
      activeTasksCount: 0,
      completedTasksCount: 0,
      rating: 5.0,
      status: 'AVAILABLE',
    };

    dispatch(addWorker(workerObj));
    toast.success(`Registered field worker ${newName}!`);
    setIsAddModalOpen(false);
    setNewName('');
    setNewEmail('');
    setNewPhone('');
  };

  const handleSaveEditWorker = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWorker) return;

    dispatch(updateWorkerDetails(editingWorker));
    toast.success(`Updated details for ${editingWorker.name}`);
    setEditingWorker(null);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <GlassCard className="p-6 md:p-8 border border-purple-500/30 glow-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display flex items-center gap-2">
              <Briefcase className="w-8 h-8 text-purple-500" /> Municipal Field Crew Roster
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Multi-parameter location radar: view and filter workers by district area, postal pincode, specialization, and live duty status.
            </p>
          </div>

          <MagneticButton
            variant="accent"
            size="md"
            icon={PlusCircle}
            onClick={() => setIsAddModalOpen(true)}
          >
            Register Field Worker
          </MagneticButton>
        </div>
      </GlassCard>

      {/* Advanced Filter Console */}
      <GlassCard className="p-5 space-y-4">
        <div className="flex items-center gap-2 text-sm font-extrabold text-slate-900 dark:text-white font-display border-b border-slate-200/60 dark:border-slate-800 pb-3">
          <Filter className="w-4 h-4 text-purple-500" /> Field Crew Location & Specialty Filter Console
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Text Search */}
          <div className="lg:col-span-2">
            <Input
              placeholder="Search by worker name, pincode, area, phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-purple-500" />}
            />
          </div>

          {/* Area Filter Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-display">
              Territory Area
            </label>
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-display font-medium"
            >
              <option value="ALL">All District Areas</option>
              {uniqueAreas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Pincode Filter Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-display">
              Postal Pincode
            </label>
            <select
              value={pincodeFilter}
              onChange={(e) => setPincodeFilter(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-display font-medium"
            >
              <option value="ALL">All Pincodes</option>
              {uniquePincodes.map((pin) => (
                <option key={pin} value={pin}>
                  PIN: {pin}
                </option>
              ))}
            </select>
          </div>

          {/* Duty Status Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-display">
              Duty Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-display font-medium"
            >
              <option value="ALL">All Duty Statuses</option>
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="ON_TASK">ON_TASK</option>
              <option value="OFF_DUTY">OFF_DUTY</option>
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Roster Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredWorkers.map((worker) => {
          const activeTaskCount = reports.filter(
            (r) => (r.assignedWorker?.id === worker.id || r.assignedWorker?.name === worker.name) && r.status !== 'RESOLVED'
          ).length;

          return (
            <GlassCard key={worker.id} sectionType="directory" className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <Avatar src={worker.avatarUrl} name={worker.name} size="lg" />
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-slate-900 dark:text-white font-display">
                        {worker.name}
                      </h3>
                      <span
                        className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border font-display ${
                          worker.status === 'AVAILABLE'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                            : worker.status === 'ON_TASK'
                            ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                            : 'bg-slate-500/10 text-slate-500 border-slate-500/20'
                        }`}
                      >
                        {worker.status.replace('_', ' ')}
                      </span>
                    </div>

                    <p className="text-xs text-purple-600 dark:text-purple-300 font-extrabold font-display">
                      {worker.specialization}
                    </p>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1 font-display shrink-0">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {worker.rating}
                </span>
              </div>

              {/* Location details & Pincode tags */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-3 border-t border-slate-200/60 dark:border-slate-800/60">
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                  <MapPin className="w-4 h-4 text-purple-500 shrink-0" />
                  <span className="truncate">{worker.assignedArea}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium">
                  <Hash className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>PIN: {worker.pincode || '94101'}</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium col-span-2">
                  <Compass className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="truncate">{worker.locationDetails || 'Sector Operational Hub'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs">
                <span className="font-extrabold text-slate-900 dark:text-white font-display">
                  {activeTaskCount} Active Work Orders
                </span>
                <span className="text-slate-400 font-medium">{worker.completedTasksCount} Total Resolved</span>
              </div>

              {/* Action Controls */}
              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between gap-2">
                <MagneticButton
                  variant="ghost"
                  size="sm"
                  icon={Edit3}
                  onClick={() => setEditingWorker(worker)}
                >
                  Edit Area & Info
                </MagneticButton>

                <MagneticButton
                  variant="glass"
                  size="sm"
                  icon={Eye}
                  onClick={() => setInspectWorker(worker)}
                >
                  Inspect Profile
                </MagneticButton>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Inspect Worker Details Modal */}
      {inspectWorker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <GlassCard className="p-6 md:p-8 max-w-lg w-full space-y-6 border border-purple-500/30">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <Avatar src={inspectWorker.avatarUrl} name={inspectWorker.name} size="md" />
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">{inspectWorker.name}</h3>
                  <p className="text-xs text-purple-500 font-bold">{inspectWorker.specialization}</p>
                </div>
              </div>
              <button onClick={() => setInspectWorker(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-semibold">Assigned Area:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{inspectWorker.assignedArea}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-semibold">Postal Pincode:</span>
                  <span className="font-bold text-indigo-500">{inspectWorker.pincode || '94101'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-semibold">Base Location:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{inspectWorker.locationDetails || 'Sector Hub'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-semibold">Phone Contact:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{inspectWorker.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-semibold">Rating Score:</span>
                  <span className="font-bold text-amber-500">⭐ {inspectWorker.rating} / 5.0</span>
                </div>
              </div>

              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white font-display pt-2">
                Dispatched Work Orders ({reports.filter((r) => r.assignedWorker?.name === inspectWorker.name).length})
              </h4>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {reports
                  .filter((r) => r.assignedWorker?.name === inspectWorker.name)
                  .map((r) => (
                    <div key={r.id} className="p-3 rounded-xl bg-slate-200/40 dark:bg-slate-850 flex items-center justify-between text-xs font-display">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{r.title}</div>
                        <div className="text-[10px] text-slate-400">{r.locationName}</div>
                      </div>
                      <StatusBadge status={r.status} size="sm" />
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <MagneticButton variant="primary" size="sm" onClick={() => setInspectWorker(null)}>
                Close Inspector
              </MagneticButton>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Edit Worker Details Modal */}
      {editingWorker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <GlassCard className="p-6 max-w-md w-full space-y-4 border border-purple-500/30">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-slate-800">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 font-display">
                <Edit3 className="w-5 h-5 text-purple-500" /> Edit Worker Roster Profile
              </h3>
              <button onClick={() => setEditingWorker(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditWorker} className="space-y-4">
              <Input
                label="Worker Name"
                value={editingWorker.name}
                onChange={(e) => setEditingWorker({ ...editingWorker, name: e.target.value })}
                required
              />

              <Input
                label="Phone Number"
                value={editingWorker.phone}
                onChange={(e) => setEditingWorker({ ...editingWorker, phone: e.target.value })}
                required
              />

              <Input
                label="Assigned Territory Area"
                value={editingWorker.assignedArea}
                onChange={(e) => setEditingWorker({ ...editingWorker, assignedArea: e.target.value })}
                required
              />

              <Input
                label="Postal Pincode"
                value={editingWorker.pincode || ''}
                onChange={(e) => setEditingWorker({ ...editingWorker, pincode: e.target.value })}
                required
              />

              <Input
                label="Specific Depot / Location Details"
                value={editingWorker.locationDetails || ''}
                onChange={(e) => setEditingWorker({ ...editingWorker, locationDetails: e.target.value })}
              />

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <MagneticButton variant="ghost" size="sm" type="button" onClick={() => setEditingWorker(null)}>
                  Cancel
                </MagneticButton>
                <MagneticButton variant="accent" size="sm" type="submit" icon={Check}>
                  Save Changes
                </MagneticButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* Add Worker Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
          <GlassCard className="p-6 max-w-md w-full space-y-4 border border-purple-500/30">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200/60 dark:border-slate-800">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2 font-display">
                <PlusCircle className="w-5 h-5 text-purple-500" /> Register Crew Member
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
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
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-display">
                  Specialization
                </label>
                <select
                  value={newSpec}
                  onChange={(e) => setNewSpec(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-display font-medium"
                >
                  <option value="Road Works & Infrastructure">Road Works & Infrastructure</option>
                  <option value="Electrical & Street Lighting">Electrical & Street Lighting</option>
                  <option value="Water Utilities & Sanitation">Water Utilities & Sanitation</option>
                  <option value="Waste & Public Health">Waste & Public Health</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Assigned Territory"
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                  required
                />
                <Input
                  label="Pincode / Zip"
                  value={newPincode}
                  onChange={(e) => setNewPincode(e.target.value)}
                  required
                />
              </div>

              <Input
                label="Depot / Base Landmark"
                placeholder="e.g. Sector 4 Central Substation"
                value={newLocationDetails}
                onChange={(e) => setNewLocationDetails(e.target.value)}
              />

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                <MagneticButton variant="ghost" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </MagneticButton>
                <MagneticButton variant="accent" size="sm" type="submit" icon={Check}>
                  Register Worker
                </MagneticButton>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
