import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Layers, MapPin, Users, PlusCircle, X, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminServiceAreasPage: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [selectedState, setSelectedState] = useState('California');
  const [selectedCity, setSelectedCity] = useState('San Francisco');

  const [areas, setAreas] = useState([
    { id: 'area-1', name: 'Downtown North', code: 'DT-N01', city: 'San Francisco', activeReports: 14, workers: 3, status: 'OPTIMAL' },
    { id: 'area-2', name: 'Westside Heights', code: 'WS-H02', city: 'San Francisco', activeReports: 8, workers: 2, status: 'OPTIMAL' },
    { id: 'area-3', name: 'East Commercial Grid', code: 'EC-G03', city: 'San Francisco', activeReports: 22, workers: 4, status: 'HIGH_LOAD' },
    { id: 'area-4', name: 'South Bay Waterfront', code: 'SB-W04', city: 'San Francisco', activeReports: 5, workers: 2, status: 'OPTIMAL' },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [newWorkers, setNewWorkers] = useState(1);

  const handleAddArea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newCode.trim()) {
      toast.error('All fields are required');
      return;
    }

    const areaObj = {
      id: `area-${areas.length + 1}`,
      name: newName.trim(),
      code: newCode.trim().toUpperCase(),
      city: selectedCity,
      activeReports: 0,
      workers: Number(newWorkers),
      status: 'OPTIMAL',
    };

    setAreas((prev) => [areaObj, ...prev]);
    toast.success(`District ${newName} defined in ${selectedCity}, ${selectedState}!`);
    setIsAddModalOpen(false);
    setNewName('');
    setNewCode('');
    setNewWorkers(1);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-650" /> Geographic Territory & Service Areas
          </h1>
          <p className="text-xs text-slate-400">
            Multi-jurisdiction hierarchy: Country → State → City → Service Areas.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsAddModalOpen(true)} leftIcon={<PlusCircle className="w-4 h-4" />}>
          Define New District
        </Button>
      </div>

      {/* Country / State / City Filter Selector */}
      <Card glass className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">Country</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">State / Province</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="California">California</option>
              <option value="New York">New York</option>
              <option value="Texas">Texas</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase text-slate-400 block mb-1">City / Municipality</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="San Francisco">San Francisco</option>
              <option value="Los Angeles">Los Angeles</option>
              <option value="San Jose">San Jose</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {areas.map((area) => (
          <Card key={area.id} glass className="p-5">
            <CardContent className="p-0 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-150 dark:bg-indigo-950/60 text-indigo-755 dark:text-indigo-300">
                    {area.code}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{area.name}</h3>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  area.status === 'OPTIMAL' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-250 dark:border-emerald-900' : 'bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-250 dark:border-amber-900'
                }`}>
                  {area.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-0.5">
                  <div className="text-slate-400">Active Reports</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">{area.activeReports}</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-slate-400">Assigned Crews</div>
                  <div className="text-base font-bold text-slate-900 dark:text-white">{area.workers} Field Crews</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add District Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-indigo-500" /> Define Service Boundary
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddArea} className="space-y-4">
              <Input
                label="District Name"
                placeholder="e.g. North Industrial Sector"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />

              <Input
                label="District Code ID"
                placeholder="e.g. NI-S05"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                required
              />

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Crew Allocation Size</label>
                <select
                  value={newWorkers}
                  onChange={(e) => setNewWorkers(Number(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value={1}>1 Field Crew</option>
                  <option value={2}>2 Field Crews</option>
                  <option value={3}>3 Field Crews</option>
                  <option value={4}>4 Field Crews</option>
                  <option value={5}>5 Field Crews</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-850">
                <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" leftIcon={<Check className="w-4 h-4" />}>
                  Save Geofence Area
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
