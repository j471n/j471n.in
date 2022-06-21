import { AvatarImage } from "../utils/utils";
import Image from "next/image";
import styles from "../styles/Blog.module.css";
import ShareOnSocialMedia from "../components/ShareOnSocialMedia";
import { FiPrinter } from "react-icons/fi";
import Newsletter from "../components/Newsletter";
import Link from "next/link";
import useWindowLocation from "@hooks/useWindowLocation";
import ScrollProgressBar from "@components/ScrollProgressBar";
import { stringToSlug } from "@lib/toc";
import { useState } from "react";
import { lockScroll } from "@utils/functions";
import useWindowSize from "@hooks/useWindowSize";
import { motion, AnimatePresence } from "framer-motion";
import {
  FadeContainer,
  FadeContainerFromLeft,
  fromBottomVariant,
  FromRightContainer,
  hamFastFadeContainer,
  mobileNavItemSideways,
  opacityVariant,
  popUpFromBottomForText,
  slideFromLeft,
} from "@content/FramerMotionVariants";

export default function BlogLayout({ post, children }) {
  const { currentURL } = useWindowLocation();
  const [isTOCActive, setIsTOCActive] = useState(false);
  const size = useWindowSize();

  return (
    <section className="mt-[44px] md:mt-[60px]  relative !overflow-hidden">
      {/* TOC */}
      <div
        className={`fixed h-full ${
          isTOCActive
            ? "left-0 opacity-100 top-[44px] md:top-[100px]"
            : "-left-[100%] opacity-0"
        } md:left-0 md:opacity-100 md:max-w-[35%] lg:max-w-[30%]  transition-all duration-500 flex flex-col gap-1 pb-28 overflow-y-scroll p-10 md:p-14 h-screen fixed w-full font-barlow bg-darkWhite dark:bg-darkPrimary text-neutral-800 dark:text-gray-200  mb-10 z-50 `}
      >
        <motion.h2
          variants={popUpFromBottomForText}
          whileInView="visible"
          initial="hidden"
          exit="hidden"
          className="font-bold text-xl md:text-2xl -ml-[5px] md:-ml-[6px]"
        >
          Table of Contents
        </motion.h2>

        <motion.div
          variants={FadeContainer}
          whileInView="visible"
          initial="hidden"
          exit="hidden"
          className="flex flex-col border-l-2 border-neutral-500"
        >
          {post.tableOfContents.map((content) => {
            return (
              <Link href={`#${stringToSlug(content.heading)}`} passHref>
                <motion.a
                  variants={popUpFromBottomForText}
                  className={`relative px-2 py-0.5 md:py-1 hover:bg-white dark:hover:bg-darkSecondary rounded-tr-md rounded-br-md md:truncate text-neutral-700 dark:text-neutral-200 font-medium ${
                    content.level != 0 && " border-l-2 border-neutral-500 "
                  }`}
                  style={{ marginLeft: `${content.level * 15}px` }}
                  key={content.heading}
                  href={`#${stringToSlug(content.heading)}`}
                  onClick={() => {
                    size.width < 768 && lockScroll() && setIsTOCActive(false);
                  }}
                >
                  {content.heading}
                </motion.a>
              </Link>
            );
          })}
        </motion.div>
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

        <div className="flex items-center !w-full">
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
              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 font-medium !my-0">
                <span>Jatin Sharma</span>
                <span>•</span>
                <span>{post.meta.stringDate}</span>
              </p>

              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 font-medium !my-0">
                <span>{post.readingTime.text}</span>
                <span>•</span>
                <span>{post.readingTime.words} words</span>
              </p>
            </div>
          </div>
        </div>

        <div
          className={` ${styles.blog} !w-full prose-sm  selection:bg-blue-100 selection:text-white-400 dark:text-neutral-400 my-5 font-medium prose-stone`}
        >
          {children}
        </div>

        <Newsletter />

        <Link
          href={`https://github.com/j471n/j471n.in/edit/main/posts/${post.meta.slug}.mdx`}
          passHref
        >
          <a
            href={`https://github.com/j471n/j471n.in/edit/main/posts/${post.meta.slug}.mdx`}
            className="dark:text-white my-10"
          >
            Edit on Github
          </a>
        </Link>

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
