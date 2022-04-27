import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function AnimatedButton({
  onClick,
  infinity,
  className,
  children,
  variants,
}) {
  const [ref, inView] = useInView();
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      if (infinity) {
        controls.start("hidden");
      }
    }
  }, [controls, inView]);

  return (
    <motion.button
      className={className}
      ref={ref}
      animate={controls}
      initial="hidden"
      onClick={onClick}
      variants={variants}
    >
      {children}
    </motion.button>
  );
}
