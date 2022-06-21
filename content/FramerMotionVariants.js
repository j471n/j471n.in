// it will pop the card
export const popUp = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    type: "spring",
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
      type: "spring",
      stiffness: 150,
    },
  },
};

export const popUpFromBottomForText = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
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
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      stiffness: 70,
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
  hidden: { x: "100vw", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      mass: 0.4,
      // damping: 10,
      stiffness: 100,
      // when: "beforeChildren",
      // staggerChildren: 0.6,
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      duration: 0.3,
      delay: 0.3,
      type: "spring",
      stiffness: 100,
    },
  },
};

export const bounceScale = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
      ease: "easeInOut",
    },
  },
};

/* Skills Animation */
export const skillHeader = {
  hidden: { x: 50 },
  visible: {
    x: 0,
    transition: {
      // duration: 0.1,
      // type: "spring",
      // stiffness: 70,
    },
  },
};

// top Navbar

export const fromLeftVariant = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      stiffness: 100,
    },
  },
};
export const fromRightVariant = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      stiffness: 100,
    },
  },
};
export const fromTopVariant = {
  hidden: { y: -100, opacity: 0 },
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

export const fromBottomVariantIcons = {
  hidden: { y: 50, opacity: 0 },
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

export const smallTextFromBottom = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1,
      type: "spring",
      stiffness: 70,
    },
  },
};

export const opacityVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2 } },
};

export const buttonsLinearVariant = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      velocity: 10,
    },
  },
};

export const hamFastFadeContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.1,
    },
  },
};

export const mobileNavItemSideways = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export const FadeContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0, staggerChildren: 0.1 },
  },
};

export const FadeContainerFromLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "linear" },
  },
};

export const FromRightContainer = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      stiffness: 100,
      delayChildren: 0,
      staggerChildren: 0.2,
    },
  },
};
