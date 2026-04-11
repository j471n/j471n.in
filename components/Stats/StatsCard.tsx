import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 160, damping: 22 },
  },
};

export default function StatsCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="group flex flex-col justify-center p-5 bg-white dark:bg-darkPrimary hover:bg-gray-50 dark:hover:bg-black/20 transition-colors duration-200"
    >
      <p className="text-[10px] font-mono tracking-[0.35em] uppercase text-gray-500 dark:text-gray-500 mb-2">
        {title}
      </p>
      <div className="text-3xl font-black text-gray-900 dark:text-white leading-none">
        {value ?? (
          <div className="h-7 w-20 bg-gray-200 dark:bg-gray-800 animate-pulse" />
        )}
      </div>
    </motion.div>
  );
}
