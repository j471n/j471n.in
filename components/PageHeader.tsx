import React from "react";
import { motion } from "framer-motion";

interface PageHeaderProps {
  /** Large background watermark text, e.g. "about" or "/uses" */
  watermark: string;
  /** Mono eyebrow label above the title, e.g. "Profile — 001" */
  eyebrow: string;
  /** Page title rendered as h1 */
  title: string;
  /** Description rendered with left-border accent below the title */
  description: string;
  /** Content rendered inside the max-w-7xl container below the header */
  children?: React.ReactNode;
  /** Extra classes on the outermost wrapper — use for padding overrides */
  className?: string;
}

export default function PageHeader({
  watermark,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: PageHeaderProps) {
  return (
    <div
      className={`relative w-full pt-20 px-6 sm:px-8 lg:px-12 overflow-hidden ${className}`}
    >
      {/* Watermark */}
      <div
        className="absolute -right-2 top-8 font-black select-none pointer-events-none leading-none tracking-tighter bg-gradient-to-b from-gray-300 to-gray-50 dark:from-[#232628] dark:to-darkPrimary bg-clip-text text-transparent"
        style={{ fontSize: "clamp(5rem, 16vw, 13rem)" }}
        aria-hidden="true"
      >
        {watermark}
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="space-y-4 mb-12 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-5 bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-500 dark:text-gray-500">
              {eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="text-base text-gray-600 dark:text-gray-400 border-l-2 border-gray-300 dark:border-gray-700 pl-4 py-0.5"
          >
            {description}
          </motion.p>
        </div>

        {children}
      </div>
    </div>
  );
}
