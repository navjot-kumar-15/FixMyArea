import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { setSelectedReport } from '@/store/slices/reportSlice';
import { Card, CardContent } from '@/components/ui/Card';
import { StatusChip, PriorityChip } from '@/components/ui/StatusChip';
import { EmptyState } from '@/components/ui/EmptyState';
import { Bookmark, MapPin, ThumbsUp, MessageSquare } from 'lucide-react';

export const BookmarksPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reports = useSelector((state: RootState) => state.reports.reports);

  const bookmarkedReports = reports.filter((r) => r.isBookmarked);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-blue-600 fill-blue-600" /> Bookmarked Issues
        </h1>
        <p className="text-xs text-slate-500">
          Saved reports you are tracking for status updates and resolutions.
        </p>
      </div>

      {bookmarkedReports.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookmarkedReports.map((report) => (
            <Card
              key={report.id}
              glass
              className="cursor-pointer hover:border-blue-500/50 transition-all"
              onClick={() => {
                dispatch(setSelectedReport(report));
                navigate(`/report/${report.id}`);
              }}
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <StatusChip status={report.status} />
                    <PriorityChip priority={report.priority} />
                  </div>
                  <Bookmark className="w-4 h-4 text-blue-600 fill-blue-600" />
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                  {report.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2">{report.description}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" /> {report.locationName}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-blue-600">
                      <ThumbsUp className="w-3.5 h-3.5" /> {report.upvotesCount}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-600">
                      <MessageSquare className="w-3.5 h-3.5" /> {report.commentsCount}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No bookmarked issues yet"
          description="Bookmark issues from the dashboard or nearby map to track their resolution progress."
          actionLabel="Explore Nearby Map"
          onAction={() => navigate('/map')}
        />
      )}
    </div>
  );
};
