import { motion } from "framer-motion";

export default function AnimatedHeading({
  variants,
  className,
  children,
  infinity,
}) {
  return (
    <motion.h1
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !infinity }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.h1>
  );
}
