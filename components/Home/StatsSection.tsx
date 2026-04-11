import { motion } from "framer-motion";
import { FiCode, FiUsers, FiCoffee, FiAward } from "react-icons/fi";
import siteConfig, { StatIconKey } from "@content/siteConfig";

const iconMap: Record<StatIconKey, typeof FiCode> = {
  code: FiCode,
  users: FiUsers,
  coffee: FiCoffee,
  award: FiAward,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function StatsSection() {
  return (
    <section className="py-20 sm:py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
      >
        {siteConfig.home.stats.map((stat) => {
          const Icon = iconMap[stat.icon];

          return (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-darkSecondary border-2 border-gray-100 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 group overflow-hidden"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-700 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 text-center space-y-3">
                {/* Icon */}
                <div className="inline-flex p-3 rounded-xl bg-gray-100 dark:bg-gray-900 group-hover:bg-gray-900 dark:group-hover:bg-white transition-all duration-300">
                  <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-gray-900 transition-colors duration-300" />
                </div>

                {/* Value */}
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {stat.description}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
