// import Link from "next/link";
// import { motion, useAnimation } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { cardFromRight, fromBottomVariant, fromLeftVariant, fromRightVariant } from "../content/FramerMotionVariants";
// import { useEffect } from "react";

export default function SocialIcon({ Icon, title, url }) {
  // const controls = useAnimation();
  // const [ref, inView] = useInView({
  //   threshold: 0.4,
  // });

  // useEffect(() => {
  //   if (inView) {
  //     controls.start("visible");
  //   } else {
  //     controls.start("hidden");
  //   }
  // }, [inView]);

  return (
    <a
      // ref={ref}
      // initial="hidden"
      // animate={controls}
      // variants={fromBottomVariant}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Icon className="icon" title={title} />
    </a>
  );
}
