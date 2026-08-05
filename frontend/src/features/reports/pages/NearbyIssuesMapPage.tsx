import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { setSelectedReport } from '@/store/slices/reportSlice';
import { ReportsMap } from '@/components/map/ReportsMap';
import { VelvetCard } from '@/components/ui/VelvetCard';
import { MapPin, Compass, Layers, Sparkles } from 'lucide-react';

export const NearbyIssuesMapPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reports = useSelector((state: RootState) => state.reports.reports);

  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredReports = reports.filter((r) => {
    const matchCat = categoryFilter === 'ALL' || r.category === categoryFilter;
    const matchStat = statusFilter === 'ALL' || r.status === statusFilter;
    return matchCat && matchStat;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Top Telemetry Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-extrabold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5" /> Spatial GIS Explorer
          </div>
          <h1 className="text-3xl font-black text-white font-display tracking-tight flex items-center gap-2">
            Interactive City Telemetry Map
          </h1>
          <p className="text-xs text-slate-400">
            Real-time geotagged reports with live status indicators across municipal districts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{filteredReports.length} Active Pins Displayed</span>
          </div>
        </div>
      </div>

      {/* Velvet Filter Bar */}
      <VelvetCard glow="cyan" className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
              Category Filter
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="ALL">All Categories</option>
              <option value="POTHOLE">Pothole</option>
              <option value="STREET_LIGHT">Streetlight</option>
              <option value="WATER_LEAKAGE">Water Leak</option>
              <option value="GARBAGE">Garbage</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
              Status Triage Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending Triage</option>
              <option value="IN_PROGRESS">In Progress En Route</option>
              <option value="RESOLVED">Resolved Proof-of-Fix</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setCategoryFilter('ALL');
                setStatusFilter('ALL');
              }}
              className="w-full px-4 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
      </VelvetCard>

      {/* Map Container */}
      <div className="rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl">
        <ReportsMap
          reports={filteredReports}
          height="620px"
          onSelectReport={(r) => {
            dispatch(setSelectedReport(r));
            navigate(`/report/${r.id}`);
          }}
        />
      </div>
    </div>
  );
};
