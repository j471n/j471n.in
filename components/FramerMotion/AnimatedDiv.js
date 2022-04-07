import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function AnimatedDiv({
  variants,
  className,
  children,
  infinity,
  style,
}) {
  const [ref, inView] = useInView({
    threshold: 0.4,
  });
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
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
