export const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
  }),
};

export const overlayVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export const progressVariants = {
  enter: {
    scaleX: 0,
    opacity: 0,
  },
  center: {
    scaleX: 1,
    opacity: 1,
  },
  exit: {
    scaleX: 0,
    opacity: 0,
  },
};
