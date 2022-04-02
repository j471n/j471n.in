import Image from "next/image";
import {
  popUpFromBottomForText,
  popUp,
  fromLeftVariant,
  fromRightVariant,
} from "../content/FramerMotionVariants";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AnimatedDiv from "./FramerMotion/AnimatedDiv";

function Skill({ data }) {
  const fromRight = {
    hidden: { x: 30, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        stiffness: 50,
      },
    },
  };
  const fromLeft = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        stiffness: 50,
      },
    },
  };

  return (
    <div className="max-w-md mx-auto flex flex-col px-4 py-3 shadow shadow-zinc-400 rounded-lg ring-gray-400 dark:ring-gray-600 dark:bg-darkSecondary h-full border-t-4 border-purple-600 hover-slide-animation before:!bg-purple-900">
      <div className="flex items-center justify-between">
        <AnimatedDiv
          variants={fromLeft}
          infinity={true}
          className="flex items-center space-x-3"
        >
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
        </AnimatedDiv>
        <AnimatedDiv
          variants={fromRight}
          infinity={true}
          className="w-12 h-12 font-bold"
        >
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
        </AnimatedDiv>
      </div>
      <AnimatedDiv
        variants={popUpFromBottomForText}
        infinity={true}
        className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400"
      >
        <p className="border-t-2 border-gray-200 mt-2 pt-2 truncate-3 ">
          {data.about}
        </p>
        <span
          className="underline cursor-pointer hover:text-purple-400 "
          onClick={() => window.open(data.url)}
        >
          Read more
        </span>
      </AnimatedDiv>
    </div>
  );
}

export default Skill;
