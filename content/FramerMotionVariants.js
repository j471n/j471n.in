// it will pop the card
export const popUp = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    type: "spring",
    duration: 1,
  },
};

// Slide from the Bottom animation

export const slideFromBottom = {
  hidden: { y: 100, opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
    },
  },
};

// Slide from the left animation

export const slideFromLeft = {
  hidden: { x: -200, opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

export const popUpFromBottomForText = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
    },
  },
};

export const pulseOpacity = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const headingFromLeft = {
  hidden: { x: -200, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      stiffness: 70,
    },
  },
};

export const inputSlideAnimation = {
  hidden: { x: -200, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      // duration: 0.1,
      type: "spring",
      // stiffness: 70,
    },
  },
};

export const fromBottomVariant = {
  hidden: { y: 200, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      stiffness: 100,
    },
  },
};

export const cardFromRight = {
  hidden: { x: 100, opacity: 1 },
  visible: {
    x: 0,
    opacity: 1,
    // scale: 1,
    transition: {
      // duration: 0.1,
      type: "spring",
      // stiffness: 100,
    },
  },
};

export const homeEnterVariant = {
  hidden: { x: "100vw", opacity: 1 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
      when: "beforeChildren",
      staggerChildren: 0.4,
    },
  },
  exit: {
    x: "-100vw",
    opacity: 1,
  },
};
