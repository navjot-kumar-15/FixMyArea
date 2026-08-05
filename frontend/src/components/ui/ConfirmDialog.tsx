import React from 'react';
import { Modal } from './Modal';
import { Button, ButtonProps } from './Button';
import { AlertTriangle, CheckCircle, Info, ShieldAlert } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary' | 'success';
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) => {
  const icons = {
    danger: <ShieldAlert className="w-7 h-7 text-rose-500" />,
    warning: <AlertTriangle className="w-7 h-7 text-amber-500" />,
    primary: <Info className="w-7 h-7 text-indigo-500" />,
    success: <CheckCircle className="w-7 h-7 text-emerald-500" />,
  };

  const buttonVariants: Record<NonNullable<ConfirmDialogProps['variant']>, ButtonProps['variant']> = {
    danger: 'danger',
    warning: 'secondary',
    primary: 'primary',
    success: 'success',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="text-center space-y-4 pt-2">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto shadow-inner">
          {icons[variant]}
        </div>
        <div className="space-y-1.5">
          <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{title}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed px-4">{description}</p>
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-850">
          <Button variant="ghost" onClick={onClose} className="flex-1">
            {cancelLabel}
          </Button>
          <Button
            variant={buttonVariants[variant]}
            onClick={() => {
              onConfirm();
            }}
            isLoading={isLoading}
            className="flex-1 font-bold"
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
