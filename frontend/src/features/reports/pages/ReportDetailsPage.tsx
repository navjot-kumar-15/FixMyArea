import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import {
  toggleUpvote,
  toggleBookmark,
  addComment,
  updateReportStatus,
  assignWorkerToReport,
} from '@/store/slices/reportSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusChip, PriorityChip } from '@/components/ui/StatusChip';
import { Avatar } from '@/components/ui/Avatar';
import { Textarea } from '@/components/ui/Input';
import { usePermissions } from '@/hooks/usePermissions';
import {
  ThumbsUp,
  Bookmark,
  MessageSquare,
  MapPin,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Briefcase,
  Upload,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ReportDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { canAssignWorker, canUpdateProgress } = usePermissions();

  const user = useSelector((state: RootState) => state.auth.user);
  const reports = useSelector((state: RootState) => state.reports.reports);
  const commentsMap = useSelector((state: RootState) => state.reports.comments);
  const workers = useSelector((state: RootState) => state.workers.workers);

  const report = reports.find((r) => r.id === id) || reports[0];
  const comments = commentsMap[report.id] || [];

  const [commentText, setCommentText] = useState('');
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedWorkerId, setSelectedWorkerId] = useState(workers[0]?.id);

  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [proofNotes, setProofNotes] = useState('');

  const handleUpvote = () => {
    dispatch(toggleUpvote(report.id));
    toast.success(report.isUpvoted ? 'Upvote removed' : 'Supported report!');
  };

  const handleBookmark = () => {
    dispatch(toggleBookmark(report.id));
    toast.success(report.isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks!');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    dispatch(
      addComment({
        reportId: report.id,
        user: {
          id: user?.id || 'guest',
          name: user?.name || 'Anonymous',
          role: user?.role || 'guest',
        },
        content: commentText.trim(),
      })
    );
    setCommentText('');
    toast.success('Comment posted');
  };

  const handleWorkerAssignment = () => {
    const worker = workers.find((w) => w.id === selectedWorkerId);
    if (worker) {
      dispatch(
        assignWorkerToReport({
          reportId: report.id,
          worker: { id: worker.id, name: worker.name, phone: worker.phone },
        })
      );
      toast.success(`Assigned task to ${worker.name}`);
      setAssignModalOpen(false);
    }
  };

  const handleMarkResolved = () => {
    dispatch(
      updateReportStatus({
        reportId: report.id,
        status: 'RESOLVED',
        completionProof: {
          imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
          notes: proofNotes || 'Work verified and completed by field crew.',
        },
      })
    );
    toast.success('Report resolved with completion proof!');
    setResolveModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Back Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
          Back to Reports
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleBookmark} leftIcon={<Bookmark className={`w-4 h-4 ${report.isBookmarked ? 'fill-blue-600 text-blue-600' : ''}`} />}>
            {report.isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success('Link copied to clipboard!')} leftIcon={<Share2 className="w-4 h-4" />}>
            Share
          </Button>
        </div>
      </div>

      {/* Main Details Card */}
      <Card glass>
        <CardContent className="p-6 md:p-8 space-y-6">
          {/* Header & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <StatusChip status={report.status} />
              <PriorityChip priority={report.priority} />
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{report.category}</span>
            </div>
            <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Reported {new Date(report.createdAt).toLocaleString()}
            </div>
          </div>

          {/* Title & Location */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {report.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{report.locationName}</span>
            </div>
          </div>

          {/* Photos Grid */}
          {report.images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {report.images.map((img, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-800 aspect-video">
                  <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Issue Details</h4>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {report.description}
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant={report.isUpvoted ? 'primary' : 'outline'}
              onClick={handleUpvote}
              leftIcon={<ThumbsUp className="w-4 h-4" />}
            >
              Support Issue ({report.upvotesCount})
            </Button>

            {/* Admin / Worker Control Buttons */}
            <div className="flex items-center gap-2">
              {canAssignWorker && report.status !== 'RESOLVED' && (
                <Button variant="secondary" size="sm" onClick={() => setAssignModalOpen(true)} leftIcon={<Briefcase className="w-4 h-4 text-purple-600" />}>
                  {report.assignedWorker ? `Reassign (${report.assignedWorker.name})` : 'Assign Field Worker'}
                </Button>
              )}

              {canUpdateProgress && report.status !== 'RESOLVED' && (
                <Button variant="success" size="sm" onClick={() => setResolveModalOpen(true)} leftIcon={<CheckCircle2 className="w-4 h-4" />}>
                  Mark Resolved (Upload Proof)
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Completion Proof Banner (if resolved) */}
      {report.completionProof && (
        <Card glass className="border-emerald-500/30 bg-emerald-50/20 dark:bg-emerald-950/20">
          <CardHeader>
            <CardTitle className="text-emerald-700 dark:text-emerald-400 flex items-center gap-2 text-base">
              <ShieldCheck className="w-5 h-5" /> Resolution Proof & Completion Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              <strong>Worker Notes:</strong> {report.completionProof.notes}
            </p>
            <div className="rounded-xl overflow-hidden max-w-md border border-emerald-500/20">
              <img src={report.completionProof.imageUrl} alt="Resolution Proof" className="w-full h-48 object-cover" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Discussion & Comments Thread */}
      <Card glass>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <MessageSquare className="w-5 h-5 text-blue-600" /> Discussion & Status History ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleAddComment} className="space-y-3">
            <Textarea
              rows={3}
              placeholder="Add an update or public comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="flex justify-end">
              <Button type="submit" variant="primary" size="sm">
                Post Comment
              </Button>
            </div>
          </form>

          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar name={c.user.name} size="sm" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        {c.user.name}
                        <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          {c.user.role}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 pl-10">{c.content}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Worker Assignment Modal */}
      {assignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl border">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Assign Field Worker</h3>
            <div className="space-y-2">
              {workers.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setSelectedWorkerId(w.id)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                    selectedWorkerId === w.id
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/60 font-bold'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar src={w.avatarUrl} name={w.name} size="sm" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{w.name}</div>
                      <div className="text-[10px] text-slate-500">{w.specialization}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold">{w.status}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setAssignModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleWorkerAssignment}>
                Confirm Assignment
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Resolve Modal */}
      {resolveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl border">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Upload Completion Proof</h3>
            <Textarea
              label="Resolution Notes"
              rows={3}
              placeholder="Describe repair actions taken..."
              value={proofNotes}
              onChange={(e) => setProofNotes(e.target.value)}
            />
            <div className="p-4 border-2 border-dashed rounded-xl text-center text-xs text-slate-500">
              <Upload className="w-6 h-6 text-blue-500 mx-auto mb-1" />
              Completion Photo Attached Automatically
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setResolveModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="success" size="sm" onClick={handleMarkResolved}>
                Mark Issue Resolved
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
