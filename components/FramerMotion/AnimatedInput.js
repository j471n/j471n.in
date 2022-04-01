import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function AnimatedInput(props) {
  const [ref, inView] = useInView({
    threshold: 0.4,
  });
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

  return <motion.input animate={controls} ref={ref} {...props} />;
}
