import { motion } from "framer-motion";

export default function AnimatedInput({
  infinity,
  className,
  variants,
  options,
  onChange,
}) {
  return (
    <motion.input
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !infinity }}
      variants={variants}
      className={className}
      onChange={onChange}
      {...options}
    />
  );
}
