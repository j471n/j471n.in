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
      className="flex-col justify-center py-4 origin-center transform bg-white border border-transparent rounded-md shadow select-none px-7 dark:bg-darkSecondary dark:shadow-md hover:border-gray-400 dark:hover:border-neutral-600 group"
      variants={popUp}
    >
      <h1 className="my-2 text-3xl font-bold text-gray-600 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white">
        {value ?? (
          <div className="h-8 bg-gray-300 rounded-sm w-28 dark:bg-neutral-700 animate-pulse" />
        )}
      </h1>
      <p className="text-base font-medium text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white">
        {title}
      </p>
    </motion.div>
  );
}
