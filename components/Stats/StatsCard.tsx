import { motion } from "framer-motion";
import { popUp } from "../../content/FramerMotionVariants";

export default function StatsCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <motion.div
      className="flex-col justify-center py-4 px-7 rounded-md select-none transform origin-center  bg-white dark:bg-darkSecondary shadow dark:shadow-md border border-transparent hover:border-gray-400 dark:hover:border-neutral-600 group"
      variants={popUp}
    >
      <h1 className="text-3xl my-2 font-bold text-gray-600 dark:text-gray-200 group-hover:text-black  dark:group-hover:text-white">
        {value ?? (
          <div className="w-28 h-8 rounded-sm bg-gray-300 dark:bg-neutral-700 animate-pulse" />
        )}
      </h1>
      <p className="text-base font-medium text-gray-600 dark:text-gray-400 group-hover:text-black  dark:group-hover:text-white">
        {title}
      </p>
    </motion.div>
  );
}
