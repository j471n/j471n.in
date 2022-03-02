// import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { popUp } from "../content/FramerMotionVariants";

export default function SocialIcon({ Icon, title, url }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  if (inView) controls.start("visible");
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={popUp}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="icon" title={title} />
    </motion.div>
  );
}
