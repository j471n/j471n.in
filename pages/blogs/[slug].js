import Interweave from "interweave";
import styles from "../../styles/Blog.module.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import ShareOnSocialMedia from "../../components/ShareOnSocialMedia";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Author from "../../components/Author";
import Comments from "../../components/Comments";
import { useRouter } from "next/router";
import Metadata from "../../components/MetaData";

export default function Article({ article, comments, followers }) {
  const router = useRouter();
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    function getScrollPercentage() {
      var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      setProgressWidth(parseInt(scrolled));
    }

    window.addEventListener("scroll", getScrollPercentage);
    return () => {
      window.removeEventListener("scroll", getScrollPercentage);
    };
  }, []);

  return (
    <>
      {!article.error ? (
        <>
          <Metadata title={article.title} />
          <div
            style={{ width: `${progressWidth}%` }}
            className="h-2 bg-purple-600 dark:bg-purple-400  transition-all duration-200 ease-linear fixed top-0 z-50 print:hidden"
          ></div>
          <div className="flex flex-col-reverse md:flex-row-reverse relative max-w-screen p-3 mb:p-5 mb-10 lg:px-10 gap-5 dark:bg-darkPrimary">
            <div className="flex flex-col relative mx-auto w-full md:max-w-sm font-exo dark:text-gray-100 print:hidden">
              <div className="p-0">
                <Author followers={followers} />
              </div>

              <Comments
                comments={comments}
                articleId={article.id}
                articleAuthor={article.user}
              />
            </div>
            <div className="mx-auto p-3 md:p-5 w-full md:w-[60%] xl:w-[70%] 2xl:w-[80%] xl:p-8 bg-gray-200 rounded-md dark:bg-darkSecondary dark:text-gray-100 h-fit">
              <div className={styles.article_page}>
                <h1 className=" text-4xl font-bold mb-4">{article.title}</h1>
                <div className={styles.article_header}>
                  <div className="flex space-x-2">
                    <div className="flex items-center">
                      <AiOutlineCalendar />
                      <p className="text-xs ml-1 font-medium">
                        {new Date(
                          Date.parse(article.published_at)
                        ).toDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <BiTime />
                      <p className="text-xs ml-1 font-medium">
                        {article.reading_time_minutes} mins
                      </p>
                    </div>
                  </div>
                  <ShareOnSocialMedia
                    className={styles.socialMedia}
                    title={article.title}
                    url={article.url}
                    summary={article.description}
                    cover_image={article.cover_image}
                  />
                </div>
                <div className="flex items-center flex-wrap my-2 uppercase text-xs sm:text-base text-purple-500 dark:text-purple-400 font-bold space-x-1 md:space-x-3 select-none max-w-full print:hidden">
                  {article.tags?.map((tag) => {
                    return (
                      <span
                        key={tag}
                        className={styles.tag}
                        onClick={() => router.push(`/blogs?tag=${tag}`)}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
              {article.cover_image && (
                <Image
                  src={article.cover_image}
                  className="w-full mx-auto rounded-md"
                  layout="responsive"
                  width={800}
                  height={336}
                  alt=""
                />
              )}
              <Interweave
                className={styles.dev_blog}
                content={article.body_html}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="absolute w-full h-[90%] grid place-items-center">
          <div className="flex flex-col space-y-2 items-center">
            <p className="font-bold text-2xl">404 NOT FOUND</p>

            <Link href="/" class="">
              <p className="bg-purple-500 px-5 py-2 font-medium rounded-xl cursor-pointer">
                Home
              </p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  // Getting slug from query
  const slug = context.query.slug;

  // Promises for article and followers
  const [article, followers] = await Promise.all([
    fetch("https://dev.to/api/articles/j471n/" + slug).then((res) =>
      res.json()
    ),

    fetch(process.env.NEXT_PUBLIC_PERSONAL_API + "/devto/followers").then(
      (res) => res.json()
    ),
  ]);

  // Fetching the comments of current slug
  const comments = await fetch(
    `https://dev.to/api/comments?a_id=${article.id}?sort=-created_at`
  ).then((res) => res.json());

  return {
    props: {
      article,
      comments,
      followers: followers.followers_count,
    },
  };
}
