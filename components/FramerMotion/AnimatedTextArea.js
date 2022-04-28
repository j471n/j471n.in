import { motion } from "framer-motion";

export default function AnimatedTextArea({
  infinity,
  className,
  variants,
  options,
  onChange,
}) {
  return (
    <motion.textarea
      whileInView="visible"
      viewport={{ once: !infinity }}
      variants={variants}
      className={className}
      onChange={onChange}
      {...options}
    />
  );
}
