import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui';
import { AuthPromptModal } from '@/components/auth/AuthPromptModal';
import { CATEGORY_TOKENS, STATUS_TOKENS } from '@/shared/design-system/tokens';
import {
  MapPin,
  Clock,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  User,
} from 'lucide-react';

export const PublicReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalAction, setAuthModalAction] = useState('');

  const triggerAuthPrompt = (actionName: string) => {
    setAuthModalAction(actionName);
    setAuthModalOpen(true);
  };

  const report = {
    id: id || 'rep_101',
    title: 'Hazardous Pothole near Central Junction',
    description:
      'Deep road cavity causing severe traffic slowdowns and potential axle damage to vehicles. First reported during heavy monsoon rains. Municipality crews assigned to Ward 4.',
    category: 'POTHOLE' as const,
    status: 'RESOLVED' as const,
    priority: 'HIGH' as const,
    locationName: 'Central Junction, Ward 4 - Metro East',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    upvotesCount: 42,
    commentsCount: 4,
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    reporterName: 'Aarav Sharma',
    resolutionProof: {
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
      notes: 'Road surface patched and sealed with asphalt compound by Ward 4 Public Works Crew.',
      resolvedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
      workerName: 'Rajesh Kumar (Field Squad Leader)',
    },
  };

  const categoryToken = CATEGORY_TOKENS[report.category] || CATEGORY_TOKENS.OTHER;
  const statusToken = STATUS_TOKENS[report.status] || STATUS_TOKENS.PENDING;

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">
      <AuthPromptModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        intentAction={authModalAction}
        actionDescription="Joining the community discussion, voting on issues, and receiving status updates requires an authenticated CivicConnect user account."
      />

      {/* Top Back Navigation */}
      <button
        onClick={() => navigate('/explore')}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Explore Feed
      </button>

      {/* Main Glass Detail Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
        
        {/* Header Badges & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${categoryToken.bg} ${categoryToken.color}`}>
              {categoryToken.label}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase flex items-center gap-1.5 ${statusToken.bg} ${statusToken.color}`}>
              <span className={`w-2 h-2 rounded-full ${statusToken.dot}`} />
              {statusToken.label}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerAuthPrompt('upvote this report')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-300 hover:text-indigo-400 hover:border-indigo-500/40 flex items-center gap-1.5 transition-colors"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              <span>{report.upvotesCount} Upvotes</span>
            </button>

            <button
              onClick={() => triggerAuthPrompt('bookmark this report')}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors"
              title="Bookmark Report"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Incident Title */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {report.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {report.locationName}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" /> Reported by {report.reporterName}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" /> {new Date(report.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Media Preview Image */}
        <div className="h-64 sm:h-96 w-full rounded-2xl bg-slate-950 overflow-hidden border border-slate-800 relative">
          <img src={report.imageUrl} alt={report.title} className="w-full h-full object-cover" />
        </div>

        {/* Description Body */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Incident Description</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
            {report.description}
          </p>
        </div>

        {/* Worker Proof of Resolution Section */}
        {report.resolutionProof && (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                <CheckCircle2 className="w-5 h-5" /> Municipal Proof of Resolution
              </div>
              <span className="text-[11px] font-mono text-emerald-300">
                Resolved: {new Date(report.resolutionProof.resolvedAt).toLocaleTimeString()}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400">Worker Fixed Photo</div>
                <img
                  src={report.resolutionProof.imageUrl}
                  alt="Resolution Proof"
                  className="w-full h-44 object-cover rounded-xl border border-emerald-500/30"
                />
              </div>

              <div className="space-y-2 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-400">Resolution Notes</div>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    {report.resolutionProof.notes}
                  </p>
                </div>
                <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Verified by {report.resolutionProof.workerName}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Community Discussion Section */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" /> Community Activity ({report.commentsCount})
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => triggerAuthPrompt('post a comment')}
            >
              Add Comment
            </Button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-bold text-white">Vikram Rao</span>
                <span className="font-mono text-[10px]">2 hours ago</span>
              </div>
              <p className="text-slate-300">Great to see Ward 4 maintenance team resolving this quickly!</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
