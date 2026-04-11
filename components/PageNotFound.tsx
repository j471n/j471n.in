import Link from "next/link";
import MetaData from "@components/MetaData";
import { motion } from "framer-motion";

export default function PageNotFound() {
  return (
    <>
      <MetaData
        title="404"
        suffix="Page Not Found"
        description="You are lost in Space !!!"
      />

      <div className="relative w-full min-h-screen pt-20 px-6 sm:px-8 lg:px-12 overflow-hidden flex items-center">
        {/* Watermark */}
        <div
          className="absolute -right-2 top-8 font-black select-none pointer-events-none leading-none tracking-tighter bg-gradient-to-b from-gray-300 to-gray-50 dark:from-[#232628] dark:to-darkPrimary bg-clip-text text-transparent"
          style={{ fontSize: "clamp(5rem, 20vw, 16rem)" }}
          aria-hidden="true"
        >
          404
        </div>

        <div className="relative mx-auto z-10 max-w-2xl space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-5 bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-500 dark:text-gray-500">
              Error — 404
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white"
          >
            Page not found.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="text-base text-gray-600 dark:text-gray-400 border-l-2 border-gray-300 dark:border-gray-700 pl-4 py-0.5"
          >
            You didn&apos;t break the internet, but I can&apos;t find what
            you&apos;re looking for. Visit the homepage to get back on track.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.22 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-mono text-[11px] tracking-[0.35em] uppercase transition-opacity hover:opacity-80"
            >
              Take me home
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
