import { motion } from "framer-motion";
import { opacityVariant, popUp } from "../../content/FramerMotionVariants";
import * as WindowsAnimation from "@lib/windowsAnimation";
import { useDarkMode } from "@context/darkModeContext";
export default function StatsCard({ title, value }) {
  const { isDarkMode } = useDarkMode();
  return (
    <motion.div
      onMouseMove={(e) => WindowsAnimation.showHoverAnimation(e, isDarkMode)}
      onMouseLeave={(e) => WindowsAnimation.removeHoverAnimation(e)}  
      className="bg-gray-50 hover:bg-gray-200 dark:bg-darkPrimary hover:dark:bg-darkSecondary flex flex-col justify-center py-4 px-7  rounded select-none border border-gray-300 dark:border-neutral-600 transform origin-center"
      variants={popUp}
    >
      <h1 className="text-3xl my-2 font-bold dark:text-white pointer-events-none">{value}</h1>
      <p className="text-base font-medium text-gray-500 pointer-events-none">{title}</p>
    </motion.div>
  );
}
