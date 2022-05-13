import { useState, useRef } from "react";
import Blog from "../../components/Blog";
import { AnimatePresence } from "framer-motion";
import {
  fromLeftVariant,
  opacityVariant,
} from "../../content/FramerMotionVariants";
import Metadata from "../../components/MetaData";
import AnimatedHeading from "../../components/FramerMotion/AnimatedHeading";
import AnimatedText from "../../components/FramerMotion/AnimatedText";
import { getAllPosts } from "../../lib/posts";
import { motion } from "framer-motion";
import { pagePreviewImage } from "../../utils/utils";

export default function Blogs({ blogs }) {
  const [filteredBlogs, setFilteredBlogs] = useState([...blogs]);
  const searchInputRef = useRef();

  function handleSearch(e) {
    e.preventDefault();

    if (searchInputRef.current.value.trim() === "") {
      return setFilteredBlogs([...blogs]);
    }
    setFilteredBlogs(() =>
      searchInputRef.current.value
        ? filteredBlogs.filter((blog) =>
            blog.title
              .toLowerCase()
              .includes(searchInputRef.current.value.trim().toLowerCase())
          )
        : []
    );
  }

  return (
    <>
      <Metadata
        title="Blogs -"
        description={
          "I've been writing online since 2021, mostly about web development and tech careers. In total, I've written {blogs.length} articles till now."
        }
        previewImage={pagePreviewImage.blogs}
      />

      <section className="mt-[52px] md:t-[72px] max-w-4xl 2xl:max-w-5xl 3xl:max-w-7xl relative mx-auto py-5 px-2 flex flex-col gap-2 text-neutral-900 dark:text-neutral-200 font-inter pb-10">
        <div className="w-full flex flex-col px-2 py-5 gap-3 select-none">
          <AnimatedHeading
            variants={fromLeftVariant}
            className="text-6xl font-bold"
          >
            Blogs
          </AnimatedHeading>
          <AnimatedText
            variants={opacityVariant}
            className="font-medium text-lg"
          >
            I've been writing online since 2021, mostly about web development
            and tech careers. In total, I've written {blogs.length} articles
            till now.
          </AnimatedText>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={opacityVariant}
          className="px-2"
        >
          <button
            type="button"
            id="view"
            className="w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 px-2 py-1.5 shadow-sm hover:ring-slate-300 dark:bg-darkSecondary dark:highlight-white/5 dark:hover:bg-darkSecondary/90 mx-auto mt-4 flex relative"
            onClick={() => searchInputRef.current.focus()}
          >
            <svg
              width="24"
              height="24"
              fill="none"
              aria-hidden="true"
              className="mr-3 flex-none"
            >
              <path
                d="m19 19-3.5-3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <circle
                cx="11"
                cy="11"
                r="6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></circle>
            </svg>
            <input
              className="px-5 text-slate-400  py-2 w-full  outline-none transition duration-200 bg-transparent font-medium font-inter"
              type="search"
              ref={searchInputRef}
              placeholder="Search articles..."
              onChange={handleSearch}
            />
          </button>
        </motion.div>

        <section className="relative py-5 px-2 flex flex-col gap-2 min-h-[50vh]">
          <AnimatePresence>
            {filteredBlogs.length != 0 ? (
              <>
                <AnimatedHeading
                  variants={opacityVariant}
                  className="text-left font-bold text-3xl my-5"
                >
                  All Posts ({filteredBlogs.length})
                </AnimatedHeading>
                {filteredBlogs.map((blog, index) => {
                  return <Blog key={index} blog={blog} />;
                })}
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
  const blogs = getAllPosts();
  return {
    props: { blogs },
  };
}
