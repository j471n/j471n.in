import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { slideFromBottom, pulseOpacity } from "../content/FramerMotionVariants";
import { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Skill({ data }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      className="max-w-md mx-auto flex flex-col px-4 py-3 shadow shadow-zinc-400 rounded-lg ring-gray-400 dark:ring-gray-600 dark:bg-darkSecondary lg:hover:ring-4 h-full"
      ref={ref}
      variants={pulseOpacity}
      initial="hidden"
      animate={controls}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            title={data.name}
            src={`/${data.icon}`}
            alt={data.name}
            width={40}
            height={40}
          />
          <h2 className="font-semibold capitalize w-fit">{data.name}</h2>
        </div>
        <div className="w-12 h-12 font-bold">
          <CircularProgressbar
            value={data.level}
            text={`${data.level}%`}
            strokeWidth={10}
            styles={buildStyles({
              // textColor: "black",
              trailColor: "#d6d6d6",
              pathColor: "#6E81E8",
              textColor: "#6E81E8",
              textSize: "24px",
            })}
          />
        </div>
      </div>
      <div>
        <p className="text-xs sm:text-sm border-t-2 border-gray-200 mt-2 pt-2">
          {data.about}
        </p>
      </div>
    </motion.div>
  );
}

export default Skill;
