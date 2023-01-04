import Link from "next/link";
import { getFormattedDate } from "@utils/date";
import { BlogType } from "@lib/types";
import Image from "next/image";
import { homeProfileImage } from "@utils/utils";

export default function Blog({ blog }: { blog: BlogType }) {
  return (
    <article className="bg-white dark:bg-darkSecondary rounded-2xl p-2 flex flex-col sm:flex-row items-center w-ull sm:w-[95%] mx-auto gap-2 md:gap-7 shadow-md md:shadow-lg">
      <div className="w-full">
        <Image
          title={blog.title}
          alt={blog.title}
          src={blog.image}
          width={1200}
          height={630}
          blurDataURL={blog.image}
          quality={25}
          className="transition-all duration-300 backdrop-blur-xl rounded-xl my-auto"
        />
      </div>

      <div className="flex flex-col mt-2 sm:mt-0 w-full px-2 pb-2 sm:p-1 lg:py-5 md:pr-5 h-full">
        <Link
          href={`/blogs/${blog.slug}`}
          className=" font-bold text-neutral-900 md:text-xl dark:text-neutral-200 hover:underline"
        >
          {blog.title}
        </Link>
        <p className="mt-3 text-sm sm:text-xs md:text-sm  text-gray-600 dark:text-[#b5b7ba] line-clamp-3 sm:line-clamp-2 md:line-clamp-4 mb-2">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex font-barlow gap-3 items-center z-10">
            <div className="w-[30px]">
              <Image
                alt="Jatin Sharma"
                height={933}
                width={933}
                src={homeProfileImage}
                className="rounded-full !m-0 h-full"
              />
            </div>
            <div className="flex flex-col">
              <Link href="/about" className="font-bold text-sm hover:underline">
                Jatin Sharma
              </Link>
              <span className="text-xs">
                {getFormattedDate(new Date(blog.date))}
              </span>
            </div>
          </div>
          <p className="text-gray-500 dark:text-dark-3 text-xs md:text-sm font-medium flex justify-between items-center">
            <span>{blog.readingTime.text}</span>
          </p>
        </div>
      </div>
    </article>
  );
}
