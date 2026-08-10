import React, { useState } from 'react';
import {
  Button,
  Input,
  Badge,
  Avatar,
  Modal,
  Drawer,
  Skeleton,
  EmptyState,
  ErrorState,
  useToast,
} from '@/components/ui';
import { CATEGORY_TOKENS, PRIORITY_TOKENS, STATUS_TOKENS, ROLE_TOKENS } from '@/shared/design-system/tokens';
import {
  Sparkles,
  Layers,
  Send,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
  Bell,
  Search,
  Check,
} from 'lucide-react';

export const DesignSystemShowcase: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const { showToast } = useToast();

  return (
    <div className="space-y-12 pb-24">
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 border border-indigo-500/20 backdrop-blur-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Phase 1 Foundation Layer
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            CivicConnect Design System
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Zero-legacy foundation built with Neo-Civic Kinetic Glass aesthetics, fluid animations, strict accessibility standards, and reusable component primitives.
          </p>
        </div>
      </div>

      {/* 1. Color & Role Tokens */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display flex items-center gap-2 border-b border-slate-800 pb-3">
          <Layers className="w-5 h-5 text-indigo-400" /> Color Tokens & Persona Matrix
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(ROLE_TOKENS).map(([role, token]) => (
            <div
              key={role}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-extrabold uppercase font-mono ${token.text}`}>
                  {role}
                </span>
                <Badge variant="primary" size="sm">
                  {token.label}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{token.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Status & Priority Badges */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display flex items-center gap-2 border-b border-slate-800 pb-3">
          <CheckCircle className="w-5 h-5 text-emerald-400" /> Status & Priority Badges
        </h2>
        <div className="flex flex-wrap gap-3 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          {Object.entries(STATUS_TOKENS).map(([status, token]) => (
            <div
              key={status}
              className={`px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-2 ${token.bg} ${token.color}`}
            >
              <span className={`w-2 h-2 rounded-full ${token.dot}`} />
              {token.label}
            </div>
          ))}
          {Object.entries(PRIORITY_TOKENS).map(([priority, token]) => (
            <div
              key={priority}
              className={`px-3 py-1.5 rounded-full border text-xs font-bold flex items-center gap-2 ${token.bg} ${token.color}`}
            >
              <span className={`w-2 h-2 rounded-full ${token.pulseBg}`} />
              {token.label}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Button Component System */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-3">
          Buttons & Actions
        </h2>
        <div className="flex flex-wrap items-center gap-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <Button variant="primary" leftIcon={<Send className="w-4 h-4" />}>
            Primary Action
          </Button>
          <Button variant="secondary" leftIcon={<Plus className="w-4 h-4" />}>
            Secondary Action
          </Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="danger" leftIcon={<Trash2 className="w-4 h-4" />}>
            Danger Action
          </Button>
          <Button variant="primary" isLoading={true}>
            Loading State
          </Button>
          <Button variant="secondary" disabled={true}>
            Disabled State
          </Button>
        </div>
      </section>

      {/* 4. Form Controls & Inputs */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-3">
          Form Controls & Inputs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <Input
            label="Standard Input"
            placeholder="Type issue title..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (e.target.value.length < 3) {
                setInputError('Title must be at least 3 characters');
              } else {
                setInputError('');
              }
            }}
            error={inputError}
            helperText="Enter a descriptive report title"
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Category Select
            </label>
            <select className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {Object.entries(CATEGORY_TOKENS).map(([key, cat]) => (
                <option key={key} value={key}>
                  {cat.label}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500">Select municipal issue category</p>
          </div>
        </div>
      </section>

      {/* 5. Avatars & Toast System */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-3">
          Avatars & Live Toast Triggers
        </h2>
        <div className="flex flex-wrap items-center justify-between gap-6 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <div className="flex items-center gap-4">
            <Avatar name="Aarav Sharma" size="sm" />
            <Avatar name="Priya Verma" size="md" />
            <Avatar name="Rajesh Kumar" size="lg" />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => showToast('Report Created Successfully', 'Your report has been submitted to Ward 4.', 'success')}
            >
              Success Toast
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => showToast('Action Forbidden', 'You do not have permission to access Admin console.', 'error')}
            >
              Error Toast
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => showToast('Maintenance Warning', 'System upgrade scheduled for 2 AM UTC.', 'warning')}
            >
              Warning Toast
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Modals & Drawers */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-3">
          Overlays (Modal & Drawer)
        </h2>
        <div className="flex gap-4 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <Button variant="primary" onClick={() => setModalOpen(true)}>
            Open Accessible Modal
          </Button>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
            Open Slide-Over Drawer
          </Button>
        </div>

        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Foundational Modal Component">
          <div className="space-y-4 text-xs text-slate-300">
            <p>
              This is a zero-dependency, accessible modal primitive built with Framer Motion spring transitions and ESC key handlers.
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={() => setModalOpen(false)}>
                Confirm Action
              </Button>
            </div>
          </div>
        </Modal>

        <Drawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Slide-Over Drawer">
          <div className="space-y-4 text-xs text-slate-300">
            <p>
              Useful for filters, detail views, and notifications. Supports ESC dismissal and backdrop click.
            </p>
          </div>
        </Drawer>
      </section>

      {/* 7. Skeleton & Empty / Error States */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display border-b border-slate-800 pb-3">
          Loading, Empty & Error States
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Skeleton */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-4">
            <div className="text-xs font-bold text-slate-400">Skeleton Placeholders</div>
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-full rounded-lg" />
            <Skeleton className="h-4 w-5/6 rounded-lg" />
            <div className="flex items-center gap-3 pt-2">
              <Skeleton className="w-10 h-10 rounded-full" />
              <Skeleton className="h-4 w-24 rounded-lg" />
            </div>
          </div>

          {/* Empty State */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <EmptyState
              title="No Reports Dispatched"
              description="There are currently no active work assignments in your queue."
            />
          </div>

          {/* Error State */}
          <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
            <ErrorState
              title="Failed to Load Data"
              message="Network timeout while connecting to server."
              onRetry={() => showToast('Retrying network connection...', '', 'info')}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
