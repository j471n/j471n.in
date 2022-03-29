import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function AnimatedText({
  variants,
  className,
  children,
}) {
  const [ref, inView] = useInView();
  return (
    <motion.p
      ref={ref}
      animate={inView && "visible"}
      initial="hidden"
      variants={variants}
      className={className}
    >
      {children}
    </motion.p>
  );
}
