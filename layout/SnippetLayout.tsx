import { ISnippet } from "@lib/interface/sanity";
import Image from "next/image";
import { getFormattedDate } from "@utils/date";
import { motion } from "framer-motion";
import ScrollProgressBar from "@components/ScrollProgressBar";

export default function SnippetLayout({
  snippet,
  children,
}: {
  snippet: ISnippet;
  children: JSX.Element;
}) {
  return (
    <div className="relative mt-[44px] md:mt-[60px]">
      <ScrollProgressBar />

      {/* Page wrapper */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 xl:px-0 pb-20">
        {/* Header */}
        <header className="pt-10 pb-8 border-b border-gray-200 dark:border-neutral-700 space-y-5">
          {/* Language badge */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <div className="flex items-center gap-2 border border-gray-200 dark:border-neutral-700 px-2.5 py-1.5">
              <div className="relative w-4 h-4 flex-shrink-0">
                <Image
                  fill
                  alt={snippet.language.name}
                  src={snippet.language.image.asset.url}
                  className="object-contain"
                />
              </div>
              <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-gray-500 dark:text-gray-400">
                {snippet.language.name}
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight"
          >
            {snippet.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 border-l-2 border-gray-300 dark:border-gray-700 pl-4"
          >
            {snippet.excerpt}
          </motion.p>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.16 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-500 dark:text-gray-500">
              {getFormattedDate(new Date(snippet.publishedAt))}
            </span>
            <span className="text-gray-300 dark:text-gray-700">·</span>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-500 dark:text-gray-500">
              {snippet.readingTime.text}
            </span>
          </motion.div>
        </header>

        {/* MDX Content */}
        <div className="mt-10 max-w-full font-barlow prose-typography">
          {children}
        </div>
      </div>
    </div>
  );
}
