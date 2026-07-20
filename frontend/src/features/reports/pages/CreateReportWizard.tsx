import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  Layers,
  AlertTriangle,
  X,
  Check,
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
    const mockSamples = [
      'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&q=80&w=800',
    ];
    const randomImg = mockSamples[Math.floor(Math.random() * mockSamples.length)];
    setImages((prev) => [...prev, randomImg]);
    toast.success('Image evidence attached');
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
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
        title: 'Report Dispatched',
        message: `Your issue "${title}" was dispatched to municipal control center.`,
        type: 'SUCCESS',
      })
    );

    setIsSubmitting(false);
    toast.success('Issue report submitted successfully!');
    navigate('/my-reports');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      {/* Wizard Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
          <Sparkles className="w-3.5 h-3.5" /> Municipal Dispatch Wizard
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Submit a Civic Issue
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Fill out the step-by-step telemetry form to alert field repair crews.
        </p>
      </div>

      {/* Wizard Progress Bar */}
      <div className="flex items-center justify-between px-4 relative">
        <div className="absolute top-4 left-8 right-8 h-1 bg-slate-200 dark:bg-slate-800 -z-10 rounded-full" />
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
            <div key={s.num} className="flex flex-col items-center gap-1.5 bg-slate-50 dark:bg-[#040711] px-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                onClick={() => isDone && setStep(s.num as any)}
                className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center cursor-pointer transition-all ${
                  isDone
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                    : isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-500/20'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
              </motion.div>
              <span
                className={`text-[11px] font-extrabold ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : isDone
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-slate-400'
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Contents with AnimatePresence */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card glass>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Step 1: Attach Photo Evidence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  onClick={handleImageAdd}
                  className="border-2 border-dashed border-indigo-500/30 hover:border-indigo-500/60 rounded-2xl p-8 text-center bg-indigo-500/5 dark:bg-indigo-950/20 space-y-3 cursor-pointer transition-colors group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                      Click to upload photo evidence or capture image
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Supports PNG, JPG or WEBP up to 10MB</p>
                  </div>
                  <Button variant="outline" size="sm" type="button">
                    Attach Image
                  </Button>
                </div>

                {images.length > 0 && (
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400">
                      Attached Photos ({images.length})
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {images.map((img, idx) => (
                        <div key={idx} className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 dark:border-slate-800 shadow-sm group">
                          <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
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
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card glass>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Step 2: Confirm Location Pin
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  label="Location Landmark / Address"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="e.g. 452 Main St near central library"
                />
                <MapPicker
                  value={location}
                  onChange={(coords, addr) => {
                    setLocation(coords);
                    if (addr) setLocationName(addr);
                  }}
                  height="360px"
                />

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                    Back
                  </Button>
                  <Button variant="primary" onClick={() => setStep(3)} rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Continue to Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card glass>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Step 3: Issue Details & Severity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <Input
                  label="Issue Title"
                  placeholder="e.g. Deep hazard pothole blocking right lane"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                {/* Interactive Category Selector Chips */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400 mb-2">
                    Category Tag
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { id: 'POTHOLE', label: 'Pothole / Road' },
                      { id: 'STREET_LIGHT', label: 'Streetlight Grid' },
                      { id: 'WATER_LEAKAGE', label: 'Water Leakage' },
                      { id: 'GARBAGE', label: 'Sanitation / Trash' },
                      { id: 'TRAFFIC', label: 'Traffic Signal' },
                      { id: 'PARK_MAINTENANCE', label: 'Park Maintenance' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id as ReportCategory)}
                        className={`px-3 py-2.5 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between ${
                          category === cat.id
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                        }`}
                      >
                        <span>{cat.label}</span>
                        {category === cat.id && <Check className="w-3.5 h-3.5 text-white" />}
                      </button>
                    ))}
                  </div>
                </div>

                <Select
                  label="Priority Severity"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as ReportPriority)}
                  options={[
                    { value: 'LOW', label: 'Low (Minor cosmetic / non-urgent)' },
                    { value: 'MEDIUM', label: 'Medium (Standard maintenance)' },
                    { value: 'HIGH', label: 'High (Disruptive / causes traffic hazard)' },
                    { value: 'CRITICAL', label: 'Critical (Immediate safety emergency)' },
                  ]}
                />

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
                    Preview Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card glass>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-5 h-5" /> Step 4: Final Review & Confirmation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        {category}
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-2">{title}</h3>
                    </div>
                    <span className="text-xs font-black text-rose-600 uppercase tracking-wider">{priority} PRIORITY</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{description}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-3 border-t border-slate-200 dark:border-slate-800 font-semibold">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    <span>{locationName}</span>
                  </div>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {images.map((img, idx) => (
                      <img key={idx} src={img} alt="Preview" className="rounded-2xl h-24 w-full object-cover border border-slate-200 dark:border-slate-800" />
                    ))}
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={() => setStep(3)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
                    Back to Edit
                  </Button>
                  <Button
                    variant="success"
                    className="py-3 px-8 text-base shadow-lg shadow-emerald-500/25 font-bold"
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    rightIcon={<CheckCircle2 className="w-5 h-5" />}
                  >
                    Dispatch Issue Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
