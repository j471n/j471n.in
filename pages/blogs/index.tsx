import { AnimatePresence, motion } from "framer-motion";
import {
  FadeContainer,
  popUp,
  popUpFromBottomForText,
  searchBarSlideAnimation,
} from "@content/FramerMotionVariants";
import React, { useEffect, useRef, useState } from "react";

import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";
import { BiRss } from "react-icons/bi";
import Blog from "@components/Blog";
import { BlogPost } from "@lib/interface/sanity";
import { BsBookmark } from "react-icons/bs";
import { CgSearch } from "react-icons/cg";
import Link from "next/link";
import Metadata from "@components/MetaData";
import PageTop from "@components/PageTop";
import { debounce } from "@utils/functions";
import { getAllPostsMeta } from "@lib/sanityContent";
import pageMeta from "@content/meta";

export default function Blogs({ blogs }: { blogs: BlogPost[] }) {
  const [filteredBlogs, setFilteredBlogs] = useState([...blogs]);
  const searchRef = useRef<HTMLInputElement>(null!);

  /**
   * Handles search functionality with debounce.
   */
  const handleSearch = debounce((value: string) => {
    setFilteredBlogs(
      blogs.filter((post: BlogPost) =>
        post.title.toLowerCase().includes(value.trim().toLowerCase())
      )
    );
  }, 300);

  /**
   * Handles automatic search functionality when a specific keyboard shortcut is pressed.
   */
  function handleAutoSearch(e: any) {
    if (e.code === "Slash" && e.ctrlKey) {
      searchRef.current.focus();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleAutoSearch);
    return () => document.removeEventListener("keydown", handleAutoSearch);
  }, []);

  return (
    <>
      <Metadata
        title={pageMeta.blogs.title}
        description={pageMeta.blogs.description}
        previewImage={pageMeta.blogs.image}
        keywords={pageMeta.blogs.keywords}
      />

      <section className="pageTop flex flex-col gap-2">
        <PageTop pageTitle="Blogs">
          I've been writing online since 2021, mostly about web development and
          tech careers. In total, I've written {blogs.length} articles till now.
        </PageTop>

        <AnimatedDiv
          className="relative group w-0 mx-auto text-slate-400 dark:text-gray-300 bg-white dark:bg-darkSecondary rounded-md"
          variants={searchBarSlideAnimation}
        >
          <CgSearch className="ml-3 w-5 h-5 absolute top-[50%] -translate-y-1/2 z-10" />
          <input
            ref={searchRef}
            className="px-12  py-3 w-full  outline-none transition duration-200 bg-transparent font-medium font-inter lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm hover:ring-slate-400  dark:highlight-white/5 dark:hover:bg-darkSecondary/90 mx-auto flex relative  group focus:ring-slate-400"
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Press (CTRL + /) to search... "
          />
        </AnimatedDiv>

        <section className="relative py-5  flex flex-col gap-2 min-h-[50vh]">
          <AnimatePresence>
            {filteredBlogs.length != 0 ? (
              <>
                <AnimatedDiv
                  variants={FadeContainer}
                  className="flex items-center justify-between"
                >
                  <motion.h3
                    variants={popUpFromBottomForText}
                    className="text-left font-bold text-2xl sm:text-3xl my-5"
                  >
                    All Posts ({filteredBlogs.length})
                  </motion.h3>

                  <div className="flex items-center gap-2">
                    <Link href="/blogs/bookmark" legacyBehavior>
                      <motion.div variants={popUp}>
                        <BsBookmark
                          title="Bookmark"
                          className="text-2xl cursor-pointer"
                        />
                      </motion.div>
                    </Link>

                    <Link href="/rss" legacyBehavior>
                      <motion.div variants={popUp}>
                        <BiRss
                          title="RSS"
                          className="text-3xl cursor-pointer"
                        />
                      </motion.div>
                    </Link>
                  </div>
                </AnimatedDiv>

                <AnimatedDiv
                  variants={FadeContainer}
                  className="grid grid-cols-1 gap-4 mx-auto"
                >
                  {filteredBlogs.map((blog, index) => {
                    return <Blog key={index} blog={blog} />;
                  })}
                </AnimatedDiv>
              </>
            ) : (
              <div className="font-inter text-center font-medium dark:text-gray-400">
                No Result Found
              </div>
            )}
          </AnimatePresence>
        </section>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const results = await getAllPostsMeta();
  return {
    props: { blogs: results },
  };
}
