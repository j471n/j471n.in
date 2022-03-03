import Interweave from "interweave";
import styles from "../../styles/Blog.module.css";
import { AiOutlineCalendar, AiOutlineLike, AiOutlineEye } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import ShareOnSocialMedia from "../../components/ShareOnSocialMedia";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Author from "../../components/Author";
import Comments from "../../components/Comments";
import { useRouter } from "next/router";
import Metadata from "../../components/MetaData";
import useFetchWithSWR from "../../hooks/useFetchWithSWR";
import LoadingBlog from "../../components/SkeletonLoading/LoadingBlog";

export default function Article() {
  const router = useRouter();
  const [scroll, setScroll] = useState(0);

  // Fetching the main blog content
  const { data, isLoading: isDataLoading } = useFetchWithSWR(
    "https://dev.to/api/articles/j471n/" + router.query.slug
  );

  // Fetching current Followers on dev.to/j471n
  const { data: followers, isLoading: isFollowersLoading } = useFetchWithSWR(
    process.env.NEXT_PUBLIC_PERSONAL_API + "/devto/followers"
  );

  // Fetching Comments for current Article
  const { data: comments, isLoading: isCommentsLoading } = useFetchWithSWR(
    `https://dev.to/api/comments?a_id=${data?.id}?sort=-created_at`
  );

  useEffect(() => {
    let progressBarHandler = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;

      setScroll(scroll);
    };

    window.addEventListener("scroll", progressBarHandler);
    return () => window.removeEventListener("scroll", progressBarHandler);
  });

  if (isDataLoading || isFollowersLoading || isCommentsLoading)
    return <LoadingBlog />;
  return (
    <>
      {!data.error ? (
        <>
          <Metadata title={data.title} />
          <div
            className="fixed top-0 left-0 z-50 w-full bg-purple-600 h-2 origin-top-left scale-0 transform duration-300"
            style={{ transform: `scale(${scroll}, 1)` }}
          />
          <div className="flex flex-col-reverse md:flex-row-reverse relative max-w-screen p-3 mb:p-5 pb-10 lg:px-10 gap-5 dark:bg-darkPrimary">
            <div className="flex flex-col relative mx-auto w-full md:max-w-sm font-exo dark:text-gray-100 print:hidden">
              <div className="p-0">
                <Author followers={followers?.followers_count} />
              </div>

              <Comments
                likes={data.public_reactions_count}
                comments={comments}
                comments_count={data.comments_count}
                articleId={data.id}
                articleAuthor={data.user}
              />
            </div>
            <div className="mx-auto p-3 md:p-5 w-full md:w-[60%] xl:w-[70%] 2xl:w-[80%] xl:p-8 bg-gray-200 rounded-md dark:bg-darkSecondary dark:text-gray-100 h-fit">
              <div className={styles.data_page}>
                <h1 className=" text-4xl font-bold mb-4">{data.title}</h1>
                <div className={styles.data_header}>
                  <div className="flex space-x-2">
                    <div className="flex items-center">
                      <AiOutlineCalendar />
                      <p className="text-xs ml-1 font-medium">
                        {new Date(Date.parse(data.published_at)).toDateString()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <BiTime />
                      <p className="text-xs ml-1 font-medium">
                        {data.reading_time_minutes} mins
                      </p>
                    </div>
                  </div>
                  <ShareOnSocialMedia
                    className={styles.socialMedia}
                    title={data.title}
                    url={data.url}
                    summary={data.description}
                    cover_image={data.cover_image}
                  />
                </div>
                <div className="flex items-center flex-wrap my-2 uppercase text-xs sm:text-base text-purple-500 dark:text-purple-400 font-bold space-x-1 md:space-x-3 select-none max-w-full print:hidden">
                  {data.tags?.map((tag) => {
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
              {data.cover_image && (
                <Image
                  src={data.cover_image}
                  className="w-full mx-auto rounded-md"
                  layout="responsive"
                  width={800}
                  height={336}
                  alt=""
                />
              )}
              <Interweave
                className={styles.dev_blog}
                content={data.body_html}
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
