import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { CheckCircle, ShieldCheck, MapPin } from 'lucide-react';

export const WorkerHistoryPage: React.FC = () => {
  const historyItems = [
    {
      title: 'Deep Hazard Pothole Repair',
      location: 'Market St & 4th Ave, Downtown',
      date: 'July 18, 2026',
      beforeImg: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800',
      afterImg: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
      notes: 'Filled hazard hole with asphalt, leveled surface, and repainted traffic lane.',
    },
    {
      title: 'Broken High-Bay Streetlight',
      location: '742 Evergreen Terrace',
      date: 'July 15, 2026',
      beforeImg: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800',
      afterImg: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&q=80&w=800',
      notes: 'Replaced dead LED ballast unit and restored night lighting.',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-emerald-600" /> Resolved Tasks History
        </h1>
        <p className="text-xs text-slate-500">
          Archived records of completed field repairs with before & after photo verification.
        </p>
      </div>

      <div className="space-y-6">
        {historyItems.map((item, idx) => (
          <Card key={idx} glass>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>{item.title}</span>
                <span className="text-xs text-slate-400 font-normal">{item.date}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>{item.location}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Worker Notes:</strong> {item.notes}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Before Repair</span>
                  <div className="rounded-xl overflow-hidden aspect-video border">
                    <img src={item.beforeImg} alt="Before" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase text-emerald-600">After Resolution</span>
                  <div className="rounded-xl overflow-hidden aspect-video border border-emerald-500/40">
                    <img src={item.afterImg} alt="After" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
