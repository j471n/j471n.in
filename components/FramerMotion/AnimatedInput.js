import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function AnimatedInput({
  infinity,
  className,
  variants,
  options,
  onChange,
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
    <motion.input
      animate={controls}
      ref={ref}
      variants={variants}
      className={className}
      onChange={onChange}
      {...options}
    />
  );
}
