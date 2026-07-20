import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Report } from '@/types';
import { StatusChip, PriorityChip } from '../ui/StatusChip';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

// Colored marker icons
const createStatusIcon = (status: Report['status']) => {
  const colorMap = {
    PENDING: '#f59e0b',
    IN_PROGRESS: '#3b82f6',
    RESOLVED: '#10b981',
    REJECTED: '#ef4444',
  };
  const color = colorMap[status] || '#3b82f6';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 24 32">
    <path fill="${color}" stroke="#ffffff" stroke-width="1.5" d="M12 0C5.37 0 0 5.37 0 12c0 9 12 20 12 20s12-11 12-20c0-6.63-5.37-12-12-12zm0 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
  </svg>`;

  return L.divIcon({
    className: 'custom-map-pin',
    html: svg,
    iconSize: [32, 42],
    iconAnchor: [16, 42],
    popupAnchor: [0, -36],
  });
};

interface ReportsMapProps {
  reports: Report[];
  onSelectReport?: (report: Report) => void;
  height?: string;
  center?: [number, number];
}

export const ReportsMap: React.FC<ReportsMapProps> = ({
  reports,
  onSelectReport,
  height = '500px',
  center = [37.7749, -122.4194],
}) => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
      <div style={{ height }} className="w-full z-10">
        <MapContainer
          center={center}
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {reports.map((report) => (
            <Marker
              key={report.id}
              position={[report.coordinates.lat, report.coordinates.lng]}
              icon={createStatusIcon(report.status)}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-1 space-y-2 max-w-xs">
                  <div className="flex items-center gap-2">
                    <StatusChip status={report.status} />
                    <PriorityChip priority={report.priority} />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{report.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2">{report.description}</p>
                  <div className="flex items-center text-xs text-slate-400 gap-1 pt-1 border-t border-slate-100">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    <span className="truncate">{report.locationName}</span>
                  </div>
                  {onSelectReport && (
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full mt-2 text-xs py-1"
                      onClick={() => onSelectReport(report)}
                      rightIcon={<ArrowRight className="w-3 h-3" />}
                    >
                      View Details
                    </Button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
