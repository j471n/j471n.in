import Blog from "../Blog";
import { BlogPost } from "@lib/interface/sanity";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import siteConfig from "@content/siteConfig";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function BlogsSection({ blogs }: { blogs: BlogPost[] }) {
  const { blogsSection } = siteConfig.home;

  return (
    <section className="py-20 sm:py-24 relative overflow-hidden">
      {/* Section number watermark */}
      <div
        className="absolute -right-2 top-6 font-black select-none pointer-events-none leading-none tracking-tighter bg-gradient-to-b from-gray-200 to-gray-50 dark:from-[#232628] dark:to-darkPrimary bg-clip-text text-transparent"
        style={{ fontSize: "clamp(5rem, 16vw, 13rem)" }}
        aria-hidden="true"
      >
        03
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
        <div className="space-y-3 max-w-xl">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3"
          >
            <div className="h-px w-5 bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase text-gray-400 dark:text-gray-600">
              {blogsSection.eyebrow}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white"
          >
            {blogsSection.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base text-gray-600 dark:text-gray-400 border-l-2 border-gray-300 dark:border-gray-700 pl-4 py-0.5"
          >
            {blogsSection.description}
          </motion.p>
        </div>

        {/* Article count + CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="flex flex-col items-start lg:items-end gap-3 flex-shrink-0"
        >
          <div className="flex items-end gap-2">
            <span className="text-5xl sm:text-6xl font-black text-gray-900 dark:text-white leading-none">
              {blogs.length}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-2">
              Articles
            </span>
          </div>
          <Link
            href="/blogs"
            className="group inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {blogsSection.ctaLabel}
            <FiArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* ── Divider ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-2"
      >
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        <span className="font-mono text-[9px] tracking-[0.4em] uppercase text-gray-300 dark:text-gray-700">
          Recent Posts
        </span>
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
      </motion.div>

      {/* ── Blog list ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col"
      >
        {blogs.map((blog, index) => (
          <Blog key={`home-blog-${index}`} blog={blog} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
