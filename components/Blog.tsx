import Link from "next/link";
import useLocalStorage from "@hooks/useBookmarkBlogs";
import { motion } from "framer-motion";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import OgImage from "./OgImage";
import { getFormattedDate } from "@utils/date";
import { BlogType } from "@lib/types";

export default function Blog({ blog }: { blog: BlogType }) {
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

      <div className="flex flex-col  h-[95%]">
        <p className="text-gray-500 dark:text-dark-3 text-sm font-medium flex justify-between items-center">
          <span>{getFormattedDate(new Date(blog.date))}</span>
          <span>{blog.readingTime.text}</span>
        </p>
        <h1 className="mt-1 font-bold text-neutral-900 dark:text-neutral-200">
          {blog.title}
        </h1>
        <p className="mt-3 text-sm  text-gray-600 dark:text-[#b5b7ba] truncate-3 mb-2">
          {blog.excerpt}
        </p>

        <div className="relative mt-auto flex items-center justify-between ">
          <Link
            href={`/blogs/${blog.slug}`}
            className="px-5 md:px-6 py-2 md:py-2.5 rounded-lg bg-black hover:bg-neutral-900 text-white w-fit text-xs transition-all active:scale-95 font-medium select-none hover:-translate-y-1"
          >
            Read more
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

            {bookmarkModal.show && (
              <motion.p
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { right: 0, opacity: 0 },
                  visible: { right: 40, opacity: 1 },
                }}
                className="absolute px-2 py-1 text-[10px] bg-black text-white"
              >
                {bookmarkModal.text}
              </motion.p>
            )}
        </div>
      </div>
    </article>
  );
}
