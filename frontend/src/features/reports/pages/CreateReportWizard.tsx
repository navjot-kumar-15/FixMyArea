import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { addReport } from '@/store/slices/reportSlice';
import { addNotification } from '@/store/slices/notificationSlice';
import { RootState } from '@/store';
import { MapPicker } from '@/components/map/MapPicker';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { GlassCard, MagneticButton } from '@/components/ui/DesignSystem';
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
  X,
  Check,
  Zap,
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
    await new Promise((res) => setTimeout(res, 900));

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
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Wizard Title Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold text-indigo-600 dark:text-indigo-400">
          <Sparkles className="w-3.5 h-3.5" /> Dispatch Intelligence Wizard
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display">
          Report Civic Issue
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto font-medium">
          Step-by-step telemetry to route your report directly to the nearest municipal field response team.
        </p>
      </div>

      {/* Stepper Progress Bar */}
      <div className="flex items-center justify-between px-4 relative">
        <div className="absolute top-5 left-10 right-10 h-0.5 bg-slate-200 dark:bg-slate-800 -z-10 rounded-full" />
        {[
          { num: 1, label: 'Evidence', icon: Camera },
          { num: 2, label: 'Location Pin', icon: MapPin },
          { num: 3, label: 'Intelligence', icon: FileText },
          { num: 4, label: 'Dispatch Review', icon: CheckCircle2 },
        ].map((s) => {
          const Icon = s.icon;
          const isActive = step === s.num;
          const isDone = step > s.num;

          return (
            <div key={s.num} className="flex flex-col items-center gap-2 bg-[#f6f8fd] dark:bg-[#030712] px-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => isDone && setStep(s.num as any)}
                className={`w-11 h-11 rounded-2xl font-bold text-xs flex items-center justify-center transition-all ${
                  isDone
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 ring-4 ring-indigo-500/20'
                    : 'bg-slate-200 dark:bg-slate-800/80 text-slate-500'
                }`}
              >
                {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </motion.button>
              <span
                className={`text-xs font-bold font-display ${
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

      {/* Step Views */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard className="p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">Step 1: Visual Evidence</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Attach photo or video proof of the issue.</p>
                </div>
              </div>

              <div
                onClick={handleImageAdd}
                className="border-2 border-dashed border-indigo-500/30 hover:border-indigo-500/60 rounded-3xl p-10 text-center bg-indigo-500/5 dark:bg-indigo-950/20 space-y-4 cursor-pointer transition-colors group"
              >
                <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform shadow-md">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900 dark:text-white font-display">
                    Tap to upload photo evidence
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Supports PNG, JPG, HEIC up to 15MB</p>
                </div>
                <MagneticButton variant="glass" size="sm" type="button">
                  Upload Photo
                </MagneticButton>
              </div>

              {images.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                    Attached Photos ({images.length})
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 dark:border-slate-800 shadow-sm group">
                        <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <MagneticButton variant="primary" size="lg" icon={ArrowRight} iconPosition="right" onClick={() => setStep(2)}>
                  Next: Location Pin
                </MagneticButton>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard className="p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">Step 2: Location Radar</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pinpoint exact coordinates for field crew navigation.</p>
                </div>
              </div>

              <Input
                label="Street Landmark / Address"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                placeholder="e.g. Market St & 4th Ave, Downtown"
              />

              <div className="rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800">
                <MapPicker
                  value={location}
                  onChange={(coords, addr) => {
                    setLocation(coords);
                    if (addr) setLocationName(addr);
                  }}
                  height="360px"
                />
              </div>

              <div className="flex justify-between pt-4">
                <MagneticButton variant="ghost" icon={ArrowLeft} onClick={() => setStep(1)}>
                  Back
                </MagneticButton>
                <MagneticButton variant="primary" size="lg" icon={ArrowRight} iconPosition="right" onClick={() => setStep(3)}>
                  Next: Intelligence Details
                </MagneticButton>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard className="p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">Step 3: Issue Intelligence</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Provide issue title, category tag, and severity level.</p>
                </div>
              </div>

              <Input
                label="Issue Title"
                placeholder="e.g. Deep hazard pothole blocking right lane"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-display">
                  Category Tag
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
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
                      className={`px-3.5 py-3 rounded-xl text-xs font-bold border transition-all text-left flex items-center justify-between font-display ${
                        category === cat.id
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                          : 'bg-slate-100/60 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {category === cat.id && <Check className="w-4 h-4 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              <Select
                label="Severity Rating"
                value={priority}
                onChange={(e) => setPriority(e.target.value as ReportPriority)}
                options={[
                  { value: 'LOW', label: 'Low (Minor cosmetic / non-urgent)' },
                  { value: 'MEDIUM', label: 'Medium (Standard repair schedule)' },
                  { value: 'HIGH', label: 'High (Disruptive / causes traffic hazard)' },
                  { value: 'CRITICAL', label: 'Critical (Immediate safety risk)' },
                ]}
              />

              <Textarea
                label="Full Description"
                rows={4}
                placeholder="Describe the issue, dimensions, potential hazards, and how long it has been present..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="flex justify-between pt-4">
                <MagneticButton variant="ghost" icon={ArrowLeft} onClick={() => setStep(2)}>
                  Back
                </MagneticButton>
                <MagneticButton
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => {
                    if (!title || !description) {
                      toast.error('Title and description required');
                      return;
                    }
                    setStep(4);
                  }}
                >
                  Next: Review Dispatch
                </MagneticButton>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard className="p-8 space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-200/60 dark:border-slate-800/60 pb-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">Step 4: Dispatch Telemetry Review</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Verify your report details before broadcasting to municipal control.</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-display">
                      {category}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-2 font-display">{title}</h3>
                  </div>
                  <span className="text-xs font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider font-display">
                    {priority} PRIORITY
                  </span>
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
                    <img key={idx} src={img} alt="Preview" className="rounded-2xl h-28 w-full object-cover border border-slate-200 dark:border-slate-800" />
                  ))}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <MagneticButton variant="ghost" icon={ArrowLeft} onClick={() => setStep(3)}>
                  Back
                </MagneticButton>
                <MagneticButton
                  variant="accent"
                  size="lg"
                  isLoading={isSubmitting}
                  icon={Zap}
                  onClick={handleSubmit}
                >
                  Confirm & Broadcast Report
                </MagneticButton>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
