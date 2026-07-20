import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { BarChart3, TrendingUp, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts';

export const AdminAnalyticsPage: React.FC = () => {
  const responseTimeData = [
    { district: 'Downtown', avgHours: 3.2 },
    { district: 'Westside', avgHours: 4.8 },
    { district: 'East Commercial', avgHours: 6.1 },
    { district: 'South Bay', avgHours: 2.9 },
  ];

  const slaData = [
    { week: 'W1', sla: 94 },
    { week: 'W2', sla: 96 },
    { week: 'W3', sla: 98 },
    { week: 'W4', sla: 97 },
  ];

  return (
    <div className="space-y-8 pb-16">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-blue-600" /> Deep-Dive Infrastructure Analytics
        </h1>
        <p className="text-xs text-slate-500">
          Response speed benchmarks, district SLA compliance, and dispatch efficiency metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card glass>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" /> Average Resolution Time (Hours by District)
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData}>
                <XAxis dataKey="district" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="avgHours" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card glass>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" /> SLA Compliance % Target Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={slaData}>
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[80, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="sla" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
