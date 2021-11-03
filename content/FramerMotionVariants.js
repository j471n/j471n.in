// it will pop the card
export const popUp = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

// Slide from the left animation

export const slideFromLeft = {
  hidden: { x: -200 },
  visible: {
    // opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
