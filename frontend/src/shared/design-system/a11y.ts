export const FOCUS_RING_CLASSES =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900';

export const SR_ONLY_CLASSES = 'sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-2 focus:bg-indigo-600 focus:text-white';

export const buildAriaProps = (label?: string, descriptionId?: string, isInvalid?: boolean) => {
  return {
    'aria-label': label,
    'aria-describedby': descriptionId,
    'aria-invalid': isInvalid ? true : undefined,
  };
};
