import Link from "next/link";
import OgImage from "./OgImage";
import useLocalStorage from "@hooks/useBookmarkBlogs";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

export default function Blog({ blog }) {
  const [bookmarkedBlogs, addToBookmark, removeFromBookmark] = useLocalStorage(
    "blogs",
    []
  );

  // check if the article is already bookmarked or not
  const isAlreadyBookmarked = bookmarkedBlogs
    .map((bookmarkedBlog) => bookmarkedBlog.slug === blog.slug)
    .includes(true);

  return (
    <div className="flex flex-col p-2 gap-2 bg-white dark:bg-darkSecondary rounded-xl shadow group ">
      <OgImage src={blog.image} alt={blog.title} />
      <div className="flex flex-col p-2 gap-2 w-fit flex-shrink">
        <div className={`relative w-full flex flex-col gap-1 `}>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="font-bold text-neutral-900 dark:text-neutral-200">
              {blog.title}
            </h1>
          </div>
          <p className="text-gray-500 text-xs flex justify-between items-center">
            <span>{blog.stringDate}</span>
            <span>{blog.readingTime.text}</span>
          </p>

          <p className="text-sm  text-gray-600 dark:text-gray-400 truncate-2">
            {blog.excerpt}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto m-2">
        <Link passHref href={`/blogs/${blog.slug}`}>
          <a
            href={`/blogs/${blog.slug}`}
            className="px-4 py-2 rounded bg-black text-white w-fit text-xs transition-all active:scale-90 hover:bg-gray-200 hover:text-black font-medium"
          >
            Read more
          </a>
        </Link>

        <button
          title="Save for Later"
          className="transition active:scale-75"
          onClick={() => {
            isAlreadyBookmarked
              ? removeFromBookmark(blog.slug)
              : addToBookmark(blog);
          }}
        >
          {isAlreadyBookmarked ? (
            <BsBookmarkFill className="w-6 h-6" />
          ) : (
            <BsBookmark className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
