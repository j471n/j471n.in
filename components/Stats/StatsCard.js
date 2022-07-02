import { motion } from "framer-motion";
import { popUp } from "../../content/FramerMotionVariants";
import { useDarkMode } from "@context/darkModeContext";
export default function StatsCard({ title, value }) {
  return (
    <motion.div
      className="flex-col justify-center py-4 px-7 rounded-md select-none transform origin-center  bg-white dark:bg-darkSecondary shadow dark:shadow-md border border-transparent hover:border-gray-400 dark:hover:border-neutral-600 group"
      variants={popUp}
    >
      <h1 className="text-3xl my-2 font-bold text-gray-600 dark:text-gray-300 group-hover:text-black  dark:group-hover:text-white">
        {value}
      </h1>
      <p className="text-base font-medium text-gray-500 group-hover:text-black  dark:group-hover:text-white">
        {title}
      </p>
    </motion.div>
  );
}
