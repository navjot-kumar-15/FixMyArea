import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Calendar as CalendarIcon, Clock, MapPin, PlusCircle, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

export const WorkerCalendarPage: React.FC = () => {
  const [schedule, setSchedule] = useState([
    { time: '08:00 AM - 10:00 AM', title: 'Pothole Repair Patrol', location: 'Market St & 4th Ave', status: 'COMPLETED' },
    { time: '10:30 AM - 12:30 PM', title: 'Streetlight Replacement', location: '742 Evergreen Terrace', status: 'IN_PROGRESS' },
    { time: '01:30 PM - 03:30 PM', title: 'Water Leak Inspection', location: '128 Pine Hill Road', status: 'PENDING' },
    { time: '04:00 PM - 05:00 PM', title: 'Garbage Clearance Audit', location: 'Oakridge Park Gate 2', status: 'PENDING' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('09:00 AM - 11:00 AM');
  const [newLocation, setNewLocation] = useState('');

  const handleAddShift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) {
      toast.error('All fields are required');
      return;
    }

    const shiftObj = {
      time: newTime,
      title: newTitle.trim(),
      location: newLocation.trim(),
      status: 'PENDING',
    };

    setSchedule((prev) => [...prev, shiftObj]);
    toast.success(`Shift task "${newTitle}" created!`);
    setIsModalOpen(false);
    setNewTitle('');
    setNewLocation('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-purple-650" /> Work Shift & Dispatch Schedule
          </h1>
          <p className="text-xs text-slate-400">
            Daily task timeline and geographic patrol routes for field crews.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)} leftIcon={<PlusCircle className="w-4 h-4" />}>
          Add Shift Alert
        </Button>
      </div>

      <Card glass>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-500" /> Today's Shift Schedule (July 20, 2026)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {schedule.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400">{item.time}</span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">{item.title}</h4>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{item.location}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                item.status === 'COMPLETED' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-250 dark:border-emerald-900' : item.status === 'IN_PROGRESS' ? 'bg-indigo-100 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-455 border border-indigo-250 dark:border-indigo-900' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-350 border border-slate-250 dark:border-slate-800'
              }`}>
                {item.status}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add Shift Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-150 dark:border-slate-800">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-indigo-505" /> Add Shift Patrol
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddShift} className="space-y-4">
              <Input
                label="Shift Title"
                placeholder="e.g. Traffic Sign Audit"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />

              <Input
                label="Location / Block Address"
                placeholder="e.g. 5th Ave / Oak Rd"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                required
              />

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Time Interval</label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-700 dark:text-slate-350 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                  <option value="10:30 AM - 12:30 PM">10:30 AM - 12:30 PM</option>
                  <option value="01:30 PM - 03:30 PM">01:30 PM - 03:30 PM</option>
                  <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-850">
                <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" leftIcon={<Check className="w-4 h-4" />}>
                  Save Shift Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
