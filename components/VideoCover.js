import {
  homeEnterVariant,
  popUpFromBottomForText,
} from "../content/FramerMotionVariants";
import AnimatedDiv from "./FramerMotion/AnimatedDiv";
import AnimatedHeading from "./FramerMotion/AnimatedHeading";
import AnimatedText from "./FramerMotion/AnimatedText";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

export default function VideoCover({ videoUrl, title, buttonText, children }) {
  const router = useRouter();
  return (
    <div className="relative w-screen h-[85vh] md:h-[92vh]">
      <video
        className="w-full h-full"
        src={videoUrl}
        autoPlay
        muted
        loop
      ></video>

      <div className="absolute inset-0 bg-black text-white mix-blend-multiply flex flex-col items-center px-5 justify-center select-none">
        <AnimatePresence>
          <motion.div
            key={router.route}
            variants={homeEnterVariant}
            animate="visible"
            initial="hidden"
            exit="exit"
            className="relative"
          >
            <AnimatedHeading
              variants={popUpFromBottomForText}
              className="capitalize font-bold text-4xl sm:text-6xl 3xl:text-8xl"
            >
              {title}
            </AnimatedHeading>
            {children}

            <button
              className="capitalize text-base sm:text-2xl font-thin font-merriweather border-b-2 border-transparent hover:border-gray-100 py-1 cursor-pointer"
              onClick={() => (window.location.href = "#view")}
            >
              {buttonText}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
