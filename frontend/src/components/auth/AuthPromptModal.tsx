import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from '@/components/ui';
import { Lock, LogIn, UserPlus, Sparkles } from 'lucide-react';

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  actionDescription?: string;
  intentAction?: string;
}

export const AuthPromptModal: React.FC<AuthPromptModalProps> = ({
  isOpen,
  onClose,
  title = 'Authentication Required',
  actionDescription = 'You need a CivicConnect account to perform community actions.',
  intentAction,
}) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    onClose();
    navigate('/login');
  };

  const handleRegister = () => {
    onClose();
    navigate('/register');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-6 text-center sm:text-left py-2">
        <div className="flex items-center justify-center sm:justify-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Civic Account Required
            </div>
            <h3 className="text-base font-bold text-white font-display">
              {intentAction ? `Sign in to ${intentAction}` : 'Join CivicConnect Community'}
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800">
          {actionDescription}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1 justify-center"
            onClick={handleRegister}
            leftIcon={<UserPlus className="w-4 h-4" />}
          >
            Create Account
          </Button>
          <Button
            variant="primary"
            className="flex-1 justify-center"
            onClick={handleSignIn}
            leftIcon={<LogIn className="w-4 h-4" />}
          >
            Sign In Now
          </Button>
        </div>
      </div>
    </Modal>
  );
};
