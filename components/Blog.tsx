import Link from "next/link";
import OgImage from "./OgImage";
import { getFormattedDate } from "@utils/date";
import { BlogType } from "@lib/types";

export default function Blog({ blog }: { blog: BlogType }) {
  return (
    <article className="card">
      <OgImage src={blog.image} alt={blog.title} />

      <div className="flex flex-col">
        <p className="text-gray-500 dark:text-dark-3 text-sm font-medium flex justify-between items-center">
          <span>{getFormattedDate(new Date(blog.date))}</span>
          <span>{blog.readingTime.text}</span>
        </p>
        <Link
          href={`/blogs/${blog.slug}`}
          className="mt-1 font-bold text-neutral-900 md:text-xl dark:text-neutral-200 hover:underline"
        >
          {blog.title}
        </Link>
        <p className="mt-3 text-sm  text-gray-600 dark:text-[#b5b7ba] truncate-3 mb-2">
          {blog.excerpt}
        </p>
      </div>
    </article>
  );
}
