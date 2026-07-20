import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addReport } from '@/store/slices/reportSlice';
import { addNotification } from '@/store/slices/notificationSlice';
import { RootState } from '@/store';
import { MapPicker } from '@/components/map/MapPicker';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ReportCategory, ReportPriority, LocationCoordinates } from '@/types';
import {
  UploadCloud,
  MapPin,
  FileText,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Camera,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const CreateReportWizard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800',
  ]);
  const [location, setLocation] = useState<LocationCoordinates>({ lat: 37.7749, lng: -122.4194 });
  const [locationName, setLocationName] = useState('Market St & 4th Ave, Downtown');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ReportCategory>('POTHOLE');
  const [priority, setPriority] = useState<ReportPriority>('HIGH');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageAdd = () => {
    // Mock image upload simulation
    const mockSamples = [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&q=80&w=800',
    ];
    const randomImg = mockSamples[Math.floor(Math.random() * mockSamples.length)];
    setImages((prev) => [...prev, randomImg]);
    toast.success('Image attached');
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      toast.error('Please enter title and description');
      return;
    }
    setIsSubmitting(true);
    await new Promise((res) => setTimeout(res, 1000));

    dispatch(
      addReport({
        title,
        description,
        category,
        priority,
        status: 'PENDING',
        locationName,
        coordinates: location,
        images,
        reportedBy: {
          id: user?.id || 'usr-citizen-1',
          name: user?.name || 'Alex Johnson',
          avatarUrl: user?.avatarUrl,
        },
      })
    );

    dispatch(
      addNotification({
        title: 'Report Submitted',
        message: `Your issue "${title}" was dispatched to municipal control center.`,
        type: 'SUCCESS',
      })
    );

    setIsSubmitting(false);
    toast.success('Issue report submitted successfully!');
    navigate('/my-reports');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Wizard Progress Bar */}
      <div className="flex items-center justify-between px-4">
        {[
          { num: 1, label: 'Photos', icon: Camera },
          { num: 2, label: 'GPS Pin', icon: MapPin },
          { num: 3, label: 'Details', icon: FileText },
          { num: 4, label: 'Review', icon: CheckCircle2 },
        ].map((s) => {
          const Icon = s.icon;
          const isActive = step === s.num;
          const isDone = step > s.num;
          return (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                  isDone
                    ? 'bg-emerald-600 text-white'
                    : isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-4 ring-blue-500/20'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
              </div>
              <span
                className={`hidden sm:inline text-xs font-semibold ${
                  isActive ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-400'
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step 1: Upload Proof */}
      {step === 1 && (
        <Card glass>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-blue-600" /> Step 1: Attach Photo Evidence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto">
                <UploadCloud className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                  Upload issue photo or snap from camera
                </h4>
                <p className="text-xs text-slate-500 mt-1">PNG, JPG or WEBP up to 10MB</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleImageAdd}>
                Add Photo Evidence
              </Button>
            </div>

            {images.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-slate-500">Attached Photos ({images.length})</label>
                <div className="grid grid-cols-3 gap-3">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative rounded-xl overflow-hidden aspect-video border border-slate-200 shadow-sm">
                      <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <Button variant="primary" onClick={() => setStep(2)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Continue to GPS Location
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: GPS Pin Location */}
      {step === 2 && (
        <Card glass>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" /> Step 2: Confirm Location Pin
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Location Landmark / Address"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="e.g. 452 Main St near public library"
            />
            <MapPicker
              value={location}
              onChange={(coords, addr) => {
                setLocation(coords);
                if (addr) setLocationName(addr);
              }}
              height="350px"
            />

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button variant="primary" onClick={() => setStep(3)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Continue to Issue Details
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Issue Details */}
      {step === 3 && (
        <Card glass>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Step 3: Issue Description & Category
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Issue Title"
              placeholder="e.g. Deep hazard pothole blocking right lane"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value as ReportCategory)}
                options={[
                  { value: 'POTHOLE', label: 'Pothole / Road Damage' },
                  { value: 'STREET_LIGHT', label: 'Streetlight & Lighting' },
                  { value: 'WATER_LEAKAGE', label: 'Water Leakage / Pipe Burst' },
                  { value: 'GARBAGE', label: 'Garbage & Sanitation' },
                  { value: 'TRAFFIC', label: 'Traffic Signal / Signage' },
                  { value: 'PARK_MAINTENANCE', label: 'Park Maintenance' },
                  { value: 'OTHER', label: 'Other Infrastructure Issue' },
                ]}
              />
              <Select
                label="Priority Severity"
                value={priority}
                onChange={(e) => setPriority(e.target.value as ReportPriority)}
                options={[
                  { value: 'LOW', label: 'Low (Minor cosmetic / non-urgent)' },
                  { value: 'MEDIUM', label: 'Medium (Standard maintenance)' },
                  { value: 'HIGH', label: 'High (Causes disruption)' },
                  { value: 'CRITICAL', label: 'Critical (Immediate safety hazard)' },
                ]}
              />
            </div>

            <Textarea
              label="Full Description"
              rows={4}
              placeholder="Describe the issue in detail, how long it has been present, and any safety hazards..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  if (!title || !description) {
                    toast.error('Title and description required');
                    return;
                  }
                  setStep(4);
                }}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Preview & Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Preview & Submit */}
      {step === 4 && (
        <Card glass>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-600">
              <Sparkles className="w-5 h-5" /> Step 4: Review Your Report
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">{title}</h3>
                </div>
                <span className="text-xs font-bold text-rose-600 uppercase">{priority} PRIORITY</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">{description}</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>{locationName}</span>
              </div>
            </div>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {images.map((img, idx) => (
                  <img key={idx} src={img} alt="Preview" className="rounded-xl h-24 w-full object-cover border" />
                ))}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setStep(3)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Back to Edit
              </Button>
              <Button
                variant="success"
                className="py-3 px-8 text-base shadow-lg shadow-emerald-500/20"
                onClick={handleSubmit}
                isLoading={isSubmitting}
                rightIcon={<CheckCircle2 className="w-5 h-5" />}
              >
                Confirm & Dispatch Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
