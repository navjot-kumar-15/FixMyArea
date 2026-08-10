import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, EmptyState } from '@/components/ui';
import { AuthPromptModal } from '@/components/auth/AuthPromptModal';
import { CATEGORY_TOKENS, STATUS_TOKENS } from '@/shared/design-system/tokens';
import { Report } from '@/types';
import {
  Search,
  MapPin,
  ThumbsUp,
  Bookmark,
  Grid,
  Map as MapIcon,
  Sparkles,
  ArrowUpRight,
  PlusCircle,
} from 'lucide-react';

const MOCK_PUBLIC_REPORTS: Report[] = [
  {
    id: 'rep_101',
    title: 'Hazardous Pothole near Central Junction',
    description: 'Deep road cavity causing severe traffic slowdowns and potential axle damage to vehicles.',
    category: 'POTHOLE',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    locationName: 'Central Junction, Ward 4',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    upvotesCount: 42,
    commentsCount: 8,
    images: ['https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80'],
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date().toISOString(),
    reportedBy: { id: 'usr_1', name: 'Aarav Sharma' },
  },
  {
    id: 'rep_102',
    title: 'Broken Streetlamp on Park Avenue',
    description: 'Dark alley section with zero street illumination at night. Needs immediate bulb replacement.',
    category: 'STREET_LIGHT',
    status: 'PENDING',
    priority: 'MEDIUM',
    locationName: '14 Park Avenue, Ward 2',
    coordinates: { lat: 28.6150, lng: 77.2100 },
    upvotesCount: 18,
    commentsCount: 3,
    images: ['https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80'],
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date().toISOString(),
    reportedBy: { id: 'usr_2', name: 'Priya Verma' },
  },
  {
    id: 'rep_103',
    title: 'Water Pipe Leakage near Sector 7',
    description: 'Fresh clean water continuously leaking onto sidewalk. Significant water wastage.',
    category: 'WATER_LEAKAGE',
    status: 'RESOLVED',
    priority: 'CRITICAL',
    locationName: 'Main Market Sector 7, Ward 6',
    coordinates: { lat: 28.6120, lng: 77.2050 },
    upvotesCount: 89,
    commentsCount: 14,
    images: ['https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=600&q=80'],
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date().toISOString(),
    reportedBy: { id: 'usr_3', name: 'Rajesh Kumar' },
    completionProof: {
      imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=600&q=80',
      notes: 'Main line joint replaced by Ward 6 repair squad.',
      resolvedAt: new Date().toISOString(),
    },
  },
  {
    id: 'rep_104',
    title: 'Overflowing Garbage Bin at Market Plaza',
    description: 'Waste management collection missed the scheduled pickup. Odor creating public issue.',
    category: 'GARBAGE',
    status: 'PENDING',
    priority: 'HIGH',
    locationName: 'Market Plaza, Ward 4',
    coordinates: { lat: 28.6160, lng: 77.2120 },
    upvotesCount: 27,
    commentsCount: 5,
    images: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80'],
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date().toISOString(),
    reportedBy: { id: 'usr_4', name: 'Sunita Patel' },
  },
];

export const ExplorePage: React.FC = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalAction, setAuthModalAction] = useState('');

  const triggerAuthPrompt = (actionName: string) => {
    setAuthModalAction(actionName);
    setAuthModalOpen(true);
  };

  const filteredReports = useMemo(() => {
    return MOCK_PUBLIC_REPORTS.filter((report) => {
      const matchesSearch =
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.locationName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'ALL' || report.category === selectedCategory;
      const matchesStatus = selectedStatus === 'ALL' || report.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchQuery, selectedCategory, selectedStatus]);

  return (
    <div className="space-y-8 pb-16">
      <AuthPromptModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        intentAction={authModalAction}
        actionDescription="Creating reports, voting on community issues, and saving bookmarks require an authenticated CivicConnect account."
      />

      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Public Municipal Incident Explorer
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Browse City Issues &amp; Fixes
          </h1>
          <p className="text-xs text-slate-400">
            Real-time public feed of active municipal reports, maintenance status, and community resolutions.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => triggerAuthPrompt('submit a new report')}
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Submit Issue Report
        </Button>
      </div>

      {/* Filter Controls Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <Input
              placeholder="Search reports by title, keyword, or ward..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" /> Grid Feed
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'map' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" /> Spatial Map
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
              selectedCategory === 'ALL'
                ? 'bg-indigo-600 border-indigo-500 text-white'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            All Categories
          </button>
          {Object.entries(CATEGORY_TOKENS).map(([key, token]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors border ${
                selectedCategory === key
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              {token.label}
            </button>
          ))}
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-4 text-xs font-semibold border-b border-slate-800 pb-2">
          {['ALL', 'PENDING', 'IN_PROGRESS', 'RESOLVED'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`pb-2 transition-colors border-b-2 capitalize ${
                selectedStatus === status
                  ? 'border-indigo-500 text-white font-bold'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              {status === 'ALL' ? 'All Statuses' : status.replace('_', ' ').toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'grid' ? (
        filteredReports.length === 0 ? (
          <EmptyState
            title="No Matching Reports Found"
            description="Try clearing your search query or adjusting your category filters."
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => {
              const categoryToken = CATEGORY_TOKENS[report.category] || CATEGORY_TOKENS.OTHER;
              const statusToken = STATUS_TOKENS[report.status] || STATUS_TOKENS.PENDING;

              return (
                <div
                  key={report.id}
                  className="rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-xl overflow-hidden space-y-4 flex flex-col justify-between hover:border-indigo-500/40 transition-colors group"
                >
                  <div>
                    {/* Image Preview */}
                    <div className="h-44 w-full bg-slate-950 relative overflow-hidden">
                      <img
                        src={report.images[0]}
                        alt={report.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${categoryToken.bg} ${categoryToken.color}`}>
                          {categoryToken.label}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase flex items-center gap-1.5 ${statusToken.bg} ${statusToken.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusToken.dot}`} />
                          {statusToken.label}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-base font-bold text-white font-display group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {report.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {report.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                        <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span className="truncate">{report.locationName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="px-5 pb-5 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => triggerAuthPrompt(`upvote "${report.title}"`)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{report.upvotesCount}</span>
                      </button>

                      <button
                        onClick={() => triggerAuthPrompt(`bookmark "${report.title}"`)}
                        className="p-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors"
                        title="Save Bookmark"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/reports/${report.id}`)}
                      rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl text-center space-y-4 relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
          <MapIcon className="w-12 h-12 text-indigo-400 animate-pulse" />
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-display">Interactive Spatial Map Explorer</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Displaying {filteredReports.length} geo-tagged public report markers across city wards.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center pt-2">
            {filteredReports.map((r) => (
              <button
                key={r.id}
                onClick={() => navigate(`/reports/${r.id}`)}
                className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-300 hover:border-indigo-500 hover:text-indigo-400 flex items-center gap-1.5 transition-colors"
              >
                <MapPin className="w-3 h-3 text-indigo-400" /> {r.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
