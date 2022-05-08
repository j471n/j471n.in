import { motion } from "framer-motion";

export default function AnimatedText({
  variants,
  className,
  children,
  infinity,
}) {
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !infinity }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.p>
  );
}
