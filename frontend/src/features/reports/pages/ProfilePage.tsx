import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { updateProfile } from '@/store/slices/authSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { User, Mail, Phone, MapPin, Shield, CheckCircle2, Camera } from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [areaName, setAreaName] = useState(user?.areaName || 'Downtown North');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((res) => setTimeout(res, 600));
    dispatch(updateProfile({ name, phone, areaName }));
    setIsSaving(false);
    toast.success('Profile settings updated!');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          User Account Profile
        </h1>
        <p className="text-xs text-slate-500">
          Manage your personal contact info, area preferences, and role permissions.
        </p>
      </div>

      <Card glass>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" /> General Profile Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="relative">
                <Avatar src={user?.avatarUrl} name={user?.name || 'User'} size="xl" />
                <button
                  type="button"
                  onClick={() => toast.success('Avatar upload feature simulated')}
                  className="absolute bottom-0 right-0 p-1.5 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{user?.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    Role: {user?.role}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                leftIcon={<User className="w-4 h-4" />}
              />
              <Input
                label="Email Address"
                value={user?.email || ''}
                disabled
                leftIcon={<Mail className="w-4 h-4" />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                leftIcon={<Phone className="w-4 h-4" />}
              />
              <Input
                label="Primary Municipal District"
                value={areaName}
                onChange={(e) => setAreaName(e.target.value)}
                leftIcon={<MapPin className="w-4 h-4" />}
              />
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" isLoading={isSaving} leftIcon={<CheckCircle2 className="w-4 h-4" />}>
                Save Profile Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Notification & Alert Preferences Card */}
      <Card glass>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-500" /> Notification & Alert Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Push Notifications</div>
              <div className="text-[10px] text-slate-400">Receive instant status updates when your report is dispatched or resolved</div>
            </div>
            <input type="checkbox" defaultChecked className="toggle-checkbox w-5 h-5 accent-indigo-600 rounded cursor-pointer" />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">SMS Critical Alerts</div>
              <div className="text-[10px] text-slate-400">Get text message notifications for severe hazard warnings in your district</div>
            </div>
            <input type="checkbox" defaultChecked className="toggle-checkbox w-5 h-5 accent-indigo-600 rounded cursor-pointer" />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Weekly Neighborhood Activity Digest</div>
              <div className="text-[10px] text-slate-400">Receive a weekly summary email of resolved municipal issues near your home</div>
            </div>
            <input type="checkbox" defaultChecked className="toggle-checkbox w-5 h-5 accent-indigo-600 rounded cursor-pointer" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

