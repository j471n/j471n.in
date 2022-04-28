import { motion } from "framer-motion";

export default function AnimatedLink(props) {
  return (
    <motion.a
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !props.infinity }}
      ref={ref}
      {...props}
    />
  );
}
