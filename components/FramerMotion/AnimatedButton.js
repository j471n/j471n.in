import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function AnimatedButton(props) {
  const [ref, inView] = useInView();
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      if (props.infinity) {
        controls.start("hidden");
      }
    }
  }, [controls, inView]);

  return (
    <motion.button
      ref={ref}
      animate={controls}
      initial="hidden"
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </motion.button>
  );
}
