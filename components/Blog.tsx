import { BlogCardAnimation } from "@content/FramerMotionVariants";
import { BlogPost } from "@lib/interface/sanity";
import Image from "next/image";
import Link from "next/link";
import { getFormattedDate } from "@utils/date";
import { motion } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function Blog({
  blog,
  animate = false,
}: {
  blog: BlogPost;
  animate?: boolean;
}) {
  const blogRef = useRef(null);

  return (
    <motion.article
      ref={blogRef}
      variants={BlogCardAnimation}
      initial={animate && "hidden"}
      whileInView={animate ? "visible" : ""}
      viewport={{ once: true }}
      className="group relative bg-white dark:bg-darkSecondary rounded-3xl overflow-hidden border-2 border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 shadow-lg hover:shadow-2xl"
    >
      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Image Section */}
        <Link
          href={`/blogs/${blog.slug.current}`}
          className="relative aspect-[16/10] rounded-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/5 to-gray-900/20 dark:from-white/5 dark:to-white/20 z-10 group-hover:opacity-0 transition-opacity duration-300" />
          <Image
            title={blog.title}
            alt={blog.title}
            src={blog.mainImage.asset.url}
            fill
            blurDataURL={blog.mainImage.asset.url}
            quality={90}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Content Section */}
        <div className="flex flex-col justify-between py-2">
          <div className="space-y-4">
            {/* Title */}
            <Link href={`/blogs/${blog.slug.current}`}>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors line-clamp-2">
                {blog.title}
              </h3>
            </Link>

            {/* Excerpt */}
            <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
              {blog.excerpt}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            {/* Author Info */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-800">
                <Image
                  alt={
                    blog.organization
                      ? blog.organization.name
                      : blog.author.name
                  }
                  fill
                  src={
                    blog.organization
                      ? blog.organization.image.asset.url
                      : blog.author.image.asset.url
                  }
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-sm">
                  <Link
                    href="/about"
                    className="font-semibold text-gray-900 dark:text-white hover:underline"
                  >
                    {blog.author.name}
                  </Link>
                  {blog.organization && (
                    <>
                      <span className="text-gray-400">•</span>
                      <Link
                        href={blog.organization.website}
                        className="font-medium text-gray-600 dark:text-gray-400 hover:underline"
                      >
                        {blog.organization.name}
                      </Link>
                    </>
                  )}
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {getFormattedDate(new Date(blog.publishedAt))}
                </span>
              </div>
            </div>

            {/* Read More Button */}
            <Link
              href={`/blogs/${blog.slug.current}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all active:scale-95 group/btn"
            >
              <span>Read</span>
              <FiArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
