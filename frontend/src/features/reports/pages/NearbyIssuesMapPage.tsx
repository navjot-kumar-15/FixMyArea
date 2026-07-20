import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { setSelectedReport } from '@/store/slices/reportSlice';
import { ReportsMap } from '@/components/map/ReportsMap';
import { Input, Select } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Search, Filter, MapPin } from 'lucide-react';

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
    <div className="space-y-4 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <MapPin className="w-6 h-6 text-blue-600" /> Interactive Nearby Issues Explorer
          </h1>
          <p className="text-xs text-slate-500">
            View pin locations, status colors, and severity levels for municipal reports across the city.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <Card glass className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <Select
            label="Category Filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { value: 'ALL', label: 'All Categories' },
              { value: 'POTHOLE', label: 'Pothole' },
              { value: 'STREET_LIGHT', label: 'Streetlight' },
              { value: 'WATER_LEAKAGE', label: 'Water Leak' },
              { value: 'GARBAGE', label: 'Garbage' },
            ]}
          />
          <Select
            label="Status Filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'ALL', label: 'All Statuses' },
              { value: 'PENDING', label: 'Pending' },
              { value: 'IN_PROGRESS', label: 'In Progress' },
              { value: 'RESOLVED', label: 'Resolved' },
            ]}
          />
          <div className="flex items-end">
            <div className="text-xs text-slate-500 font-semibold px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg w-full text-center">
              Showing {filteredReports.length} Active Pins
            </div>
          </div>
        </div>
      </Card>

      {/* Fullscreen Interactive Leaflet Map */}
      <ReportsMap
        reports={filteredReports}
        height="600px"
        onSelectReport={(r) => {
          dispatch(setSelectedReport(r));
          navigate(`/report/${r.id}`);
        }}
      />
    </div>
  );
};
