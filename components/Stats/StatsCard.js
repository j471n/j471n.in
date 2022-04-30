import { motion } from "framer-motion";
import { opacityVariant } from "../../content/FramerMotionVariants";

export default function StatsCard({ title, value }) {
  return (
    <motion.div
      className="bg-gray-100 hover:bg-gray-200 dark:bg-darkPrimary hover:dark:bg-darkSecondary flex flex-col justify-center py-4 px-7  rounded select-none border border-gray-300 dark:border-neutral-600 "
      variants={opacityVariant}
    >
      <h1 className="text-3xl my-2 font-bold dark:text-white">{value}</h1>
      <p className="text-base font-medium text-gray-500">{title}</p>
    </motion.div>
  );
}
