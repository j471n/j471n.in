// it will pop the card
export const popUp = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 1,
    ease: "easeInOut",
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
  visible: { opacity: 1, y: 0 },
};
