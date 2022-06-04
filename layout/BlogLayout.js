import { AvatarImage } from "../utils/utils";
import Image from "next/image";
import styles from "../styles/Blog.module.css";
import ShareOnSocialMedia from "../components/ShareOnSocialMedia";
import { FiPrinter } from "react-icons/fi";
import Newsletter from "../components/Newsletter";
import Link from "next/link";
import useWindowLocation from "@hooks/useWindowLocation";

export default function BlogLayout({ post, children }) {
  const { currentURL } = useWindowLocation();

  return (
    <>
      <section
        className="pageTop  p-5 sm:pt-10 w-full relative mx-auto font-barlow prose dark:prose-invert"
        style={{ maxWidth: "800px" }}
      >
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
    </>
  );
}
