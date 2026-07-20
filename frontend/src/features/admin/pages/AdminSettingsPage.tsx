import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Settings, Sparkles, Bell, Shield, Database } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminSettingsPage: React.FC = () => {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('System configuration saved successfully!');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-slate-700 dark:text-slate-200" /> Platform System Configuration
        </h1>
        <p className="text-xs text-slate-500">
          Configure AI auto-dispatch rules, notification gateways, and backup intervals.
        </p>
      </div>

      <Card glass>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" /> AI Auto-Dispatch Engine Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Max Radius for Automatic Worker Matching (km)" defaultValue="5.0" />
            <Input label="Critical Safety Alert Dispatch SLA (Hours)" defaultValue="2.0" />

            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">Enable Automated Push Notifications</h4>
                <p className="text-[11px] text-slate-500">Alert citizens instantly when field workers update report status.</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary">
                Save System Settings
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
