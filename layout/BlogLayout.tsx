import { BlogPost } from "@lib/interface/sanity";
import { FiPrinter } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import ScrollProgressBar from "@components/ScrollProgressBar";
import TableOfContents from "@components/TableOfContents";
import { getFormattedDate } from "@utils/date";
import { motion } from "framer-motion";

export default function BlogLayout({
  post,
  children,
}: {
  post: BlogPost;
  children: JSX.Element | string;
}) {
  return (
    <div className="relative mt-[44px] md:mt-[60px]">
      <ScrollProgressBar />
      <TableOfContents tableOfContents={post.tableOfContents} />

      {/* Page wrapper */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 xl:px-0 pb-20">
        {/* Article header */}
        <header className="pt-10 pb-8 border-b border-gray-200 dark:border-gray-800 space-y-6">
          {/* Tags / org badge */}
          {post.organization && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-800 px-2.5 py-1">
                <div className="relative w-4 h-4 overflow-hidden">
                  <Image
                    fill
                    alt={post.organization.name}
                    src={post.organization.image.asset.url}
                    className="object-contain"
                  />
                </div>
                <Link
                  href={post.organization.website}
                  className="font-mono text-[10px] tracking-[0.35em] uppercase text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {post.organization.name}
                </Link>
              </div>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight"
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed border-l-2 border-gray-300 dark:border-gray-700 pl-4"
          >
            {post.excerpt}
          </motion.p>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.16 }}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
                <Image
                  fill
                  alt={post.author.name}
                  src={post.author.image.asset.url}
                  className="object-cover"
                />
              </div>
              <div>
                <Link
                  href="/about"
                  className="text-sm font-semibold text-gray-900 dark:text-white hover:underline"
                >
                  {post.author.name}
                </Link>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-500 dark:text-gray-500">
                  {getFormattedDate(new Date(post.publishedAt))}
                </p>
              </div>
            </div>

            {/* Reading stats + print */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-500 dark:text-gray-500">
                {post.readingTime.text}
              </span>
              <span className="text-gray-300 dark:text-gray-700">·</span>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gray-500 dark:text-gray-500">
                {post.readingTime.words} words
              </span>
              <button
                title="Print"
                onClick={() => window.print()}
                className="ml-1 w-7 h-7 flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-colors print:hidden"
              >
                <FiPrinter className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </header>

        {/* MDX body */}
        <div className="mt-10 max-w-full font-barlow prose dark:prose-invert sm:prose-lg blog-container prose-pre:bg-white dark:prose-pre:bg-darkSecondary prose-pre:saturate-150 dark:prose-pre:saturate-100 marker:text-black dark:marker:text-white prose-img:mx-auto prose-img:rounded-md prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-gray-900 dark:prose-a:text-white prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400">
          {children}
        </div>
      </div>
    </div>
  );
}
