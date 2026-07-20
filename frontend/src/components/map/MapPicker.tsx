import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationCoordinates } from '@/types';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '../ui/Button';

// Custom Map Marker Icon
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapPickerProps {
  value: LocationCoordinates;
  onChange: (coords: LocationCoordinates, address?: string) => void;
  height?: string;
}

function LocationMarker({
  position,
  setPosition,
  onChange,
}: {
  position: LocationCoordinates;
  setPosition: (pos: LocationCoordinates) => void;
  onChange: (coords: LocationCoordinates, address?: string) => void;
}) {
  const map = useMapEvents({
    click(e) {
      const newPos = { lat: e.latlng.lat, lng: e.latlng.lng };
      setPosition(newPos);
      onChange(newPos, `Lat: ${newPos.lat.toFixed(4)}, Lng: ${newPos.lng.toFixed(4)}`);
    },
  });

  return (
    <Marker
      position={[position.lat, position.lng]}
      icon={markerIcon}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const pos = marker.getLatLng();
          const newPos = { lat: pos.lat, lng: pos.lng };
          setPosition(newPos);
          onChange(newPos, `Adjusted Pin Location (${newPos.lat.toFixed(4)}, ${newPos.lng.toFixed(4)})`);
        },
      }}
    />
  );
}

export const MapPicker: React.FC<MapPickerProps> = ({
  value,
  onChange,
  height = '350px',
}) => {
  const [position, setPosition] = useState<LocationCoordinates>(value);
  const [isLocating, setIsLocating] = useState(false);

  useEffect(() => {
    setPosition(value);
  }, [value]);

  const handleGetCurrentLocation = () => {
    if ('geolocation' in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setPosition(newPos);
          onChange(newPos, 'Current Detected Geolocation');
          setIsLocating(false);
        },
        (err) => {
          console.warn('Geolocation denied or failed, defaulting to city center:', err);
          setIsLocating(false);
        }
      );
    }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
      <div style={{ height }} className="w-full z-10">
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={setPosition} onChange={onChange} />
        </MapContainer>
      </div>

      {/* Floating GPS Button */}
      <div className="absolute top-3 right-3 z-20">
        <Button
          variant="secondary"
          size="sm"
          onClick={handleGetCurrentLocation}
          isLoading={isLocating}
          leftIcon={<Navigation className="w-4 h-4 text-blue-600" />}
          className="shadow-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-md"
        >
          Use My Location
        </Button>
      </div>

      {/* Helper Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md text-white text-xs px-4 py-2 flex items-center justify-between z-20">
        <div className="flex items-center gap-1.5 font-medium">
          <MapPin className="w-4 h-4 text-blue-400" />
          Click or drag marker to set issue location
        </div>
        <span className="font-mono text-slate-300">
          {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
        </span>
      </div>
    </div>
  );
};
