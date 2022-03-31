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
      className="max-w-md mx-auto flex flex-col px-4 py-3 shadow shadow-zinc-400 rounded-lg ring-gray-400 dark:ring-gray-600 dark:bg-darkSecondary h-full border-t-4 border-purple-600 hover-slide-animation before:!bg-purple-900"
      ref={ref}
      variants={pulseOpacity}
      initial="hidden"
      animate={controls}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="inline-flex">
            <Image
              title={data.name}
              src={`/${data.icon}`}
              alt={data.name}
              width={40}
              height={40}
            />
          </div>
          <h2 className="font-semibold capitalize w-fit text-slate-600 dark:text-zinc-400">
            {data.name}
          </h2>
        </div>
        <div className="w-12 h-12 font-bold">
          <CircularProgressbar
            value={data.level}
            text={`${data.level}%`}
            strokeWidth={10}
            styles={buildStyles({
              trailColor: "#d6d6d6",
              pathColor: "#9333ea",
              textColor: "#9333ea",
              textSize: "24px",
            })}
          />
        </div>
      </div>
      <div className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400">
        <p className="border-t-2 border-gray-200 mt-2 pt-2 truncate-3 ">
          {data.about}
        </p>
        <span
          className="underline cursor-pointer hover:text-purple-400 "
          onClick={() => window.open(data.url)}
        >
          Read more
        </span>
      </div>
    </motion.div>
  );
}

export default Skill;
