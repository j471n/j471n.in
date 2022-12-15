import { Variants } from "framer-motion";

export const popUp: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
    },
  },
};

// Slide from the Bottom animation

export const slideFromBottom: Variants = {
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

export const slideFromLeft: Variants = {
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

export const popUpFromBottomForText: Variants = {
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

export const pulseOpacity: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const headingFromLeft: Variants = {
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

export const inputSlideAnimation: Variants = {
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

export const fromBottomVariant: Variants = {
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

export const cardFromRight: Variants = {
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

export const homeEnterVariant: Variants = {
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

export const bounceScale: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      transition: "spring",
      mass: 0.4,
      damping: 8,
      ease: "easeInOut",
    },
  },
};

/* Skills Animation */
export const skillHeader: Variants = {
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

export const fromLeftVariant: Variants = {
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
export const fromRightVariant: Variants = {
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
export const fromTopVariant: Variants = {
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

export const fromBottomVariantIcons: Variants = {
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

export const smallTextFromBottom: Variants = {
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

export const opacityVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2 } },
};

export const buttonsLinearVariant: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      transition: "tween",
      velocity: 10,
    },
  },
};

export const hamFastFadeContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0,
      staggerChildren: 0.1,
    },
  },
};

export const mobileNavItemSideways: Variants = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export const FadeContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0, staggerChildren: 0.1 },
  },
};

export const FadeContainerFromLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "linear" },
  },
};

export const FromRightContainer: Variants = {
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

export const svgVariant: Variants = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: 4,
      ease: "easeInOut",
    },
  },
};
