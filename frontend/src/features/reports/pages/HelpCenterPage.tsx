import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { HelpCircle, Search, Mail, MessageSquare, PhoneCall, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';

export const HelpCenterPage: React.FC = () => {
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Your support request has been submitted to City Care team.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div className="text-center space-y-3 pt-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center mx-auto">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          How can we help you today?
        </h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Search our platform knowledge base or send a direct inquiry to municipal support.
        </p>
      </div>

      <Card glass className="p-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h3>
          <div className="space-y-3">
            {[
              {
                q: 'How do I check the status of my reported issue?',
                a: 'Navigate to "My Reports" from the left sidebar to view real-time status updates (Pending, In Progress, Resolved).',
              },
              {
                q: 'What should I do in case of an emergency electrical hazard?',
                a: 'For immediate life-threatening emergencies, please call 911 or your local emergency dispatch center immediately.',
              },
              {
                q: 'Can I upload photo proof after submitting?',
                a: 'Field workers and admins can upload completion photos directly onto the report detail page.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-1.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{faq.q}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card glass>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" /> Send Direct Inquiry to Municipal Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <Input label="Subject" placeholder="e.g. Issue status update request" />
            <Textarea label="Message Details" rows={4} placeholder="Describe your question or feedback..." />
            <div className="flex justify-end">
              <Button type="submit" variant="primary">
                Submit Support Request
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
