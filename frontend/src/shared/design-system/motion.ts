import { Variants, Transition } from 'framer-motion';

export const springTransition: Transition = {
  type: 'spring',
  stiffness: 350,
  damping: 25,
};

export const smoothTransition: Transition = {
  duration: 0.35,
  ease: [0.16, 1, 0.3, 1],
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: smoothTransition },
  exit: { opacity: 0, transition: smoothTransition },
};

export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: springTransition },
  exit: { opacity: 0, scale: 0.95, transition: smoothTransition },
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: springTransition },
  exit: { opacity: 0, y: 16, transition: smoothTransition },
};

export const drawerVariants: Record<'right' | 'left' | 'bottom', Variants> = {
  right: {
    hidden: { x: '100%' },
    visible: { x: 0, transition: springTransition },
    exit: { x: '100%', transition: smoothTransition },
  },
  left: {
    hidden: { x: '-100%' },
    visible: { x: 0, transition: springTransition },
    exit: { x: '-100%', transition: smoothTransition },
  },
  bottom: {
    hidden: { y: '100%' },
    visible: { y: 0, transition: springTransition },
    exit: { y: '100%', transition: smoothTransition },
  },
};
