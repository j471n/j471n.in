import { BlogCardAnimation } from "@content/FramerMotionVariants";
import { BlogPost } from "@lib/interface/sanity";
import Image from "next/image";
import Link from "next/link";
import { getFormattedDate } from "@utils/date";
import { motion } from "framer-motion";
import { useRef } from "react";

// import { FrontMatter } from "@lib/types";

export default function Blog({
  blog,
  animate = false,
}: {
  blog: BlogPost;
  animate?: boolean;
}) {
  const blogRef = useRef(null);
  // const author = getAuthorData(blog.org);

  return (
    <motion.article
      ref={blogRef}
      variants={BlogCardAnimation}
      initial={animate && "hidden"}
      whileInView={animate ? "visible" : ""}
      viewport={{ once: true }}
      className="bg-white dark:bg-darkSecondary rounded-2xl p-2 flex flex-col sm:flex-row items-center w-ull sm:w-[95%] mx-auto gap-2 md:gap-7 shadow-md md:shadow-lg"
    >
      <div className="w-full">
        <Image
          title={blog.title}
          alt={blog.title}
          src={blog.mainImage.asset.url}
          width={1200}
          height={630}
          blurDataURL={blog.mainImage.asset.url}
          quality={25}
          className="my-auto transition-all duration-300 backdrop-blur-xl rounded-xl"
        />
      </div>

      <div className="flex flex-col w-full h-full px-2 pb-2 mt-2 sm:mt-0 sm:p-1 lg:py-5 md:pr-5">
        <Link
          href={`/blogs/${blog.slug.current}`}
          className="font-bold text-neutral-900 md:text-xl dark:text-neutral-200 hover:underline"
        >
          {blog.title}
        </Link>
        <p className="mt-3 text-sm sm:text-xs md:text-sm  text-gray-600 dark:text-[#b5b7ba] line-clamp-3 sm:line-clamp-2 md:line-clamp-4 mb-2">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="z-10 flex items-center gap-3 font-barlow">
            <div className="w-[30px]">
              <Image
                alt={
                  blog.organization ? blog.organization.name : blog.author.name
                }
                height={933}
                width={933}
                src={
                  blog.organization
                    ? blog.organization.image.asset.url
                    : blog.author.image.asset.url
                }
                className="rounded-full !m-0 h-full"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center text-sm gap-1">
                <Link
                  href="/about"
                  className="text-sm font-medium hover:underline"
                >
                  {blog.author.name}
                </Link>
                {blog.organization && (
                  <span>
                    for{" "}
                    <Link
                      href={blog.organization.website}
                      className="font-medium hover:underline"
                    >
                      {blog.organization.name}
                    </Link>
                  </span>
                )}
              </div>
              <span className="text-xs">
                {getFormattedDate(new Date(blog.publishedAt))}
              </span>
            </div>
          </div>
          <p className="flex items-center justify-between text-xs font-medium text-gray-500 dark:text-dark-3 md:text-sm">
            {/* <span>{blog.readingTime.text}</span> */}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
