import { motion } from "framer-motion";

export default function AnimatedLink({ variants, infinity, children }) {
  return (
    <motion.a
      initial="hidden"
      whileInView="visible"
      variants={variants}
      viewport={{ once: !infinity }}
    >
      {children}
    </motion.a>
  );
}
