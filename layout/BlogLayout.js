import { useEffect, useState } from "react";
import { AvatarImage } from "../utils/utils";
import Image from "next/image";
import styles from "../styles/Blog.module.css";
import ShareOnSocialMedia from "../components/ShareOnSocialMedia";
import { FiPrinter } from "react-icons/fi";
import Newsletter from "../components/Newsletter";

export default function BlogLayout({ post, children }) {
  const [pageURL, setPageURL] = useState("");
  useEffect(() => {
    setPageURL(window.location.href);
  }, []);

  return (
    <>
      <section className="mt-[52px] md:mt-[72px] max-w-3xl relative mx-auto p-5 font-barlow prose dark:prose-invert">
        {/* <div className="my-4">
          <Image
            alt={post.meta.title}
            height={420}
            width={1000}
            src={post.meta.image}
            objectFit="contain"
            layout="responsive"
            className="rounded-md"
          />
        </div> */}
        <h1
          style={{ marginBottom: "10px !important" }}
          className="text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white"
        >
          {post.meta.title}
        </h1>

        <div
          style={{ marginBottom: "0 !important" }}
          className="flex items-center !w-full"
        >
          <div className="flex items-center gap-2 w-full">
            <div className="relative w-10 h-10 sm:w-8 sm:h-8">
              <Image
                alt="Jatin Sharma"
                height={30}
                width={30}
                src={AvatarImage}
                layout="responsive"
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between w-full">
              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 font-medium !my-0">
                <span>Jatin Sharma</span>
                <span>•</span>
                <span>{post.meta.stringDate}</span>
              </p>

              {/* { text: '3 min read', minutes: 2.955, time: 177300, words: 591 } */}
              <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2 font-medium !my-0">
                <span>{post.readingTime.text}</span>
                <span>•</span>
                <span>{post.readingTime.words} words</span>
              </p>
            </div>
          </div>
        </div>

        <div
          className={` ${styles.blog} !w-full prose-sm  selection:bg-blue-100 selection:text-white-400 dark:text-neutral-400 my-2  font-medium prose-stone`}
        >
          {children}
        </div>

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
            url={pageURL}
            summary={post.meta.excerpt}
            cover_image={post.meta.image}
          >
            <div className="bg-gray-700 text-white p-2 rounded-full cursor-pointer">
              <FiPrinter className="w-4 h-4" onClick={() => window.print()} />
            </div>
          </ShareOnSocialMedia>
        </div>
      </section>
    </>
  );
}
