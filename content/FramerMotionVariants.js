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
