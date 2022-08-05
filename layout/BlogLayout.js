import { AvatarImage } from "../utils/utils";
import Image from "next/image";
import styles from "../styles/Blog.module.css";
import ShareOnSocialMedia from "../components/ShareOnSocialMedia";
import { FiPrinter } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import Newsletter from "../components/Newsletter";
import Link from "next/link";
import useWindowLocation from "@hooks/useWindowLocation";
import ScrollProgressBar from "@components/ScrollProgressBar";
import { stringToSlug } from "@lib/toc";
import { useState, useEffect } from "react";
import { lockScroll, removeScrollLock } from "@utils/functions";
import useWindowSize from "@hooks/useWindowSize";
import { FadeContainer, opacityVariant } from "@content/FramerMotionVariants";
import AnimatedHeading from "@components/FramerMotion/AnimatedHeading";
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";
import useBookmarkBlogs from "@hooks/useBookmarkBlogs";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import useScrollPercentage from "@hooks/useScrollPercentage";

export default function BlogLayout({ post, children }) {
  const { currentURL } = useWindowLocation();
  const [isTOCActive, setIsTOCActive] = useState(false);
  const [alreadyBookmarked, setAlreadyBookmarked] = useState(false);

  const scrollPercentage = useScrollPercentage();

  const size = useWindowSize();

  const { isAlreadyBookmarked, addToBookmark, removeFromBookmark } =
    useBookmarkBlogs("blogs", []);

  useEffect(() => {
    // In Case user exists from mobile to desktop then remove the scroll lock and TOC active to false
    if (size.width > 768) {
      removeScrollLock();
      setIsTOCActive(false);
    }
  }, [size]);

  useEffect(() => {
    setAlreadyBookmarked(isAlreadyBookmarked(post.meta.slug));
  }, [isAlreadyBookmarked, post.meta.slug]);

  return (
    <section className="mt-[44px] md:mt-[60px]  relative !overflow-hidden">
      {/* TOC */}
      <div
        className={`fixed h-full ${
          isTOCActive
            ? "left-0 opacity-100 top-[44px] md:top-[60px]"
            : "-left-full opacity-0"
        } ${
          scrollPercentage > 95 ? "xl:-left-full" : "xl:left-0"
        } md:left-0 md:opacity-100 md:max-w-[35%] lg:max-w-[30%]  transition-all duration-500 flex flex-col gap-1 !pb-[100px] overflow-y-scroll p-10 md:p-14 h-screen fixed w-full font-barlow bg-darkWhite dark:bg-darkPrimary text-neutral-800 dark:text-gray-200 z-50 `}
      >
        <AnimatedHeading
          variants={opacityVariant}
          className="font-bold text-xl md:text-2xl -ml-[5px] md:-ml-[6px]"
        >
          Table of Contents
        </AnimatedHeading>

        <AnimatedDiv
          variants={FadeContainer}
          className="flex flex-col relative before:absolute before:left-0 before:h-full before:w-[1.5px] before:bg-neutral-500"
        >
          {post.tableOfContents.map((content) => {
            return (
              <Link
                key={content.heading}
                href={`#${stringToSlug(content.heading)}`}
                passHref
              >
                <a
                  className="relative overflow-hidden hover:bg-darkSecondary px-2 py-0.5 md:py-1 rounded-tr-md rounded-br-md md:truncate text-neutral-700 hover:text-white  dark:text-neutral-200 font-medium border-l-2 border-neutral-500 dark:hover:border-white"
                  style={{ marginLeft: `${content.level * 15}px` }}
                  key={content.heading}
                  onClick={() => {
                    if (size.width < 768) {
                      lockScroll();
                      setIsTOCActive(false);
                    }
                    setIsTOCActive(false);
                    removeScrollLock();
                  }}
                >
                  {content.heading}
                </a>
              </Link>
            );
          })}
        </AnimatedDiv>
      </div>

      <button
        onClick={() => {
          setIsTOCActive(!isTOCActive);
          lockScroll();
        }}
        className="md:hidden w-full py-2 font-medium bg-black dark:bg-white text-white dark:text-black fixed bottom-0 outline-none z-50"
      >
        Table of Contents
      </button>

      {/* Blog Content */}
      <section
        className="p-5 sm:pt-10 relative font-barlow prose dark:prose-invert md:ml-[35%] lg:ml-[30%]"
        style={{ maxWidth: "800px", opacity: isTOCActive && "0.3" }}
      >
        <ScrollProgressBar />
        <h1 className="text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.meta.title}
        </h1>

        <div className="flex items-center !w-full text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2 w-full">
            <div className="relative grid">
              <Image
                alt="Jatin Sharma"
                height={30}
                width={30}
                src={AvatarImage}
                layout="fixed"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between w-full">
              <p className="text-sm  flex items-center gap-2 font-medium !my-0">
                <span>Jatin Sharma</span>
                <span>•</span>
                <span>{post.meta.stringDate}</span>
              </p>

              <p className="text-sm  flex items-center gap-2 font-medium !my-0">
                <span>{post.meta.readingTime.text}</span>
                <span>•</span>
                <span>{post.meta.readingTime.words} words</span>
              </p>
            </div>
          </div>

          <div className="flex gap-2 ml-4">
            <Link
              href={`https://github.com/j471n/j471n.in/edit/main/posts/${post.meta.slug}.mdx`}
              passHref
            >
              <a
                title="Edit on Github"
                target="_blank"
                rel="noopener noreferrer"
                className="transition active:scale-75 select-none"
              >
                <TbEdit className="w-7 h-7 text-gray-700 dark:text-gray-300 " />
              </a>
            </Link>
            <button
              title="Save for Later"
              className="transition active:scale-75"
              onClick={() => {
                alreadyBookmarked
                  ? removeFromBookmark(post.meta.slug)
                  : addToBookmark(post.meta);
              }}
            >
              {alreadyBookmarked ? (
                <BsBookmarkFill className="w-6 h-6 " />
              ) : (
                <BsBookmark className="w-6 h-6 " />
              )}
            </button>
          </div>
        </div>

        <AnimatedDiv
          variants={opacityVariant}
          className={` ${styles.blog} blog-container prose-sm prose-stone`}
        >
          {children}
        </AnimatedDiv>
        <Newsletter />
        <div className="w-full flex flex-col items-center gap-4 my-10 print:hidden">
          <h3
            style={{ margin: "0" }}
            className="font-semibold text-xl dark:text-white"
          >
            Share on Social Media:
          </h3>
          <ShareOnSocialMedia
            className="flex gap-2 items-center flex-wrap w-fit"
            title={post.meta.title}
            url={currentURL}
            summary={post.meta.excerpt}
            cover_image={post.meta.image}
          >
            <div className="bg-gray-700 text-white p-2 rounded-full cursor-pointer">
              <FiPrinter className="w-4 h-4" onClick={() => window.print()} />
            </div>
          </ShareOnSocialMedia>
        </div>
      </section>
    </section>
  );
}
