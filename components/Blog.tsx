import { BlogPost } from "@lib/interface/sanity";
import Image from "next/image";
import Link from "next/link";
import { getFormattedDate } from "@utils/date";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 20 },
  },
};

export default function Blog({
  blog,
  animate = false,
  index,
}: {
  blog: BlogPost;
  animate?: boolean;
  index?: number;
}) {
  return (
    <motion.article
      variants={cardVariants}
      initial={animate ? "hidden" : false}
      whileInView={animate ? "visible" : undefined}
      viewport={{ once: true }}
      className="group relative border-b border-gray-100 dark:border-gray-800 last:border-0"
    >
      {/* Left accent bar */}
      <div className="absolute left-0 inset-y-0 w-0.5 bg-gray-900 dark:bg-white origin-center scale-y-0 group-hover:scale-y-100 transition-transform duration-200 rounded-sm" />

      <Link
        href={`/blogs/${blog.slug.current}`}
        className="flex items-center gap-4 sm:gap-6 py-6 pl-4 pr-2 hover:bg-gray-50/70 dark:hover:bg-gray-900/20 transition-colors duration-150 rounded-r-xl"
      >
        {/* Article index */}
        {index !== undefined && (
          <span className="text-[10px] font-mono text-gray-300 dark:text-gray-700 w-5 flex-shrink-0 select-none self-start mt-1.5">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-2">
          <h3 className="font-bold text-lg leading-snug text-gray-900 dark:text-white line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            {blog.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-500 line-clamp-2 leading-relaxed hidden sm:block">
            {blog.excerpt}
          </p>
          {/* Meta row */}
          <div className="flex items-center gap-2 pt-0.5 flex-wrap">
            <div className="relative w-4 h-4 rounded-full overflow-hidden flex-shrink-0">
              <Image
                alt={blog.author.name}
                fill
                src={
                  blog.organization
                    ? blog.organization.image.asset.url
                    : blog.author.image.asset.url
                }
                className="object-cover"
              />
            </div>
            <span className="text-[11px] font-mono text-gray-400 dark:text-gray-600">
              {blog.author.name}
            </span>
            {blog.organization && (
              <>
                <span className="text-gray-200 dark:text-gray-800">·</span>
                <span className="text-[11px] font-mono text-gray-400 dark:text-gray-600">
                  {blog.organization.name}
                </span>
              </>
            )}
            <span className="text-gray-200 dark:text-gray-800">·</span>
            <span className="text-[11px] font-mono text-gray-400 dark:text-gray-600">
              {getFormattedDate(new Date(blog.publishedAt))}
            </span>
          </div>
        </div>

        {/* Thumbnail — grayscale at rest, color on hover */}
        {/* <div className="relative w-20 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 dark:border-gray-800 shadow-sm">
          <Image
            title={blog.title}
            alt={blog.title}
            src={blog.mainImage.asset.url}
            fill
            quality={80}
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div> */}

        {/* Arrow */}
        <FiArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0 hidden sm:block" />
      </Link>
    </motion.article>
  );
}
