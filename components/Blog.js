import Link from "next/link";
import useLocalStorage from "@hooks/useBookmarkBlogs";
import { motion, AnimatePresence } from "framer-motion";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import OgImage from "./OgImage";

export default function Blog({ blog }) {
  const { isAlreadyBookmarked, addToBookmark, removeFromBookmark } =
    useLocalStorage("blogs", []);

  const [bookmarkModal, setBookmarkModal] = useState({ show: false, text: "" });

  useEffect(() => {
    if (bookmarkModal.text != "") {
      setTimeout(() => {
        setBookmarkModal({ show: false, text: "" });
      }, 2000);
    }
  }, [bookmarkModal]);

  function handleBookmark() {
    if (isAlreadyBookmarked(blog.slug)) {
      removeFromBookmark(blog.slug);
      setBookmarkModal({ show: true, text: "Removed from Bookmarks" });
    } else {
      addToBookmark(blog);
      setBookmarkModal({ show: true, text: "Added to Bookmarks" });
    }
  }

  return (
    <article className="card">
      <OgImage src={blog.image} alt={blog.title} />

      <div className="flex flex-col">
        <p className="text-gray-500 text-sm font-medium flex justify-between items-center">
          <span>{blog.stringDate}</span>
          <span>{blog.readingTime.text}</span>
        </p>
        <h1 className="mt-1 font-bold text-neutral-900 dark:text-neutral-200">
          {blog.title}
        </h1>
        <p className="mt-3 text-sm  text-gray-600 dark:text-gray-400 truncate-3">
          {blog.excerpt}
        </p>

        <div className="relative mt-4 flex items-center justify-between overflow-hidden">
          <Link passHref href={`/blogs/${blog.slug}`}>
            <a
              href={`/blogs/${blog.slug}`}
              className="px-5 md:px-6 py-2 md:py-2.5 rounded-full bg-black hover:bg-neutral-900 text-white w-fit text-xs transition-all active:scale-95 font-medium select-none"
            >
              Read more
            </a>
          </Link>

          <button
            title="Save for Later"
            className="transition active:scale-75"
            onClick={handleBookmark}
          >
            {isAlreadyBookmarked(blog.slug) ? (
              <BsBookmarkFill className="w-6 h-6" />
            ) : (
              <BsBookmark className="w-6 h-6" />
            )}
          </button>

          <AnimatePresence>
            {bookmarkModal.show && (
              <motion.p
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, right: -100 },
                  visible: { right: 40, opacity: 1 },
                }}
                className="absolute px-2 py-1 text-[10px] bg-black text-white"
              >
                {bookmarkModal.text}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}
