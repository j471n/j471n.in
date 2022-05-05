import { useEffect, useState } from "react";
import { AvatarImage } from "../utils/utils";
import Image from "next/image";
import styles from "../styles/Blog.module.css";
import ShareOnSocialMedia from "../components/ShareOnSocialMedia";
import { FiPrinter } from "react-icons/fi";

export default function BlogLayout({ post, children }) {
  const [pageURL, setPageURL] = useState("");
  useEffect(() => {
    setPageURL(window.location.href);
  }, []);

  return (
    <>
      <section className="mt-[52px] md:mt-[72px] max-w-3xl relative mx-auto p-5 font-barlow prose dark:prose-invert">
        <h1
          style={{ marginBottom: "10px !important" }}
          className="text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white"
        >
          {post.meta.title}
        </h1>

        <div
          style={{ marginBottom: "0 !important" }}
          className="flex flex-col items-start justify-between md:flex-row md:items-center"
        >
          <div className="flex items-center">
            <Image
              alt="Jatin Sharma"
              height={30}
              width={30}
              src={AvatarImage}
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 font-medium">
              <span>Jatin Sharma</span>
              <span>•</span>
              <span>{post.meta.stringDate}</span>
            </p>
          </div>
        </div>
        <div
          className={` ${styles.blog} !w-full prose-sm  selection:bg-blue-100 selection:text-white-400 dark:text-neutral-400 my-2  font-medium prose-stone`}
        >
          {children}
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 print:hidden  sm:justify-between p-2 w-full">
          <h3
            style={{ margin: "0 !important" }}
            className="font-semibold text-xl dark:text-white"
          >
            Share on Social Media:
          </h3>
          <ShareOnSocialMedia
            className="flex gap-2 items-center flex-wrap w-fit"
            title={post.meta.title}
            url={pageURL}
            summary={post.meta.excerpt}
          >
            <div className="bg-blue-600 text-white w-[30px] h-[30px] grid place-items-center cursor-pointer rounded-full clickable_button scroll-mt-20">
              <FiPrinter className="" onClick={() => window.print()} />
            </div>
          </ShareOnSocialMedia>
        </div>
      </section>
    </>
  );
}
