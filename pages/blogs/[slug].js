import Interweave from "interweave";
import styles from "../../styles/Blog.module.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import ShareOnSocialMedia from "../../components/ShareOnSocialMedia";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Metadata from "../../components/MetaData";
import PageNotFound from "../404";
import { FiPrinter } from "react-icons/fi";

export default function Article({ article, error }) {
  const router = useRouter();
  const [scroll, setScroll] = useState(0);

  const progressBarHandler = () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight}`;

    setScroll(scroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", progressBarHandler);
    return () => window.removeEventListener("scroll", progressBarHandler);
  }, [progressBarHandler]);

  if (error) return <PageNotFound />;
  return (
    <>
      <Metadata title={article?.title} />
      <div
        className="!fixed left-0 w-full h-1 bg-purple-600 origin-top-left  transform duration-300 top-[52px] sm:top-[72px]"
        style={{
          transform: `scale(${scroll},1)`,
          zIndex: 1000,
        }}
      />
      {article?.body_html && (
        <div className=" dark:bg-darkPrimary mt-[52px] sm:mt-[72px] !mx-auto p-3 md:pb-5 pb-10 z-10">
          <div className="mx-auto p-3 md:p-5 w-full xl:w-[70%] 2xl:w-[75%] xl:p-8 bg-indigo-100 rounded-md dark:bg-darkSecondary dark:!text-gray-100 h-fit">
            <div className={styles.data_page}>
              <h1 className=" text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                {article?.title}
            </h1>
              <div className={styles.data_header}>
                <div className="flex space-x-2">
                  <div className="flex items-center">
                    <AiOutlineCalendar />
                    <p className="text-xs ml-1 font-medium">
                      {new Date(
                        Date.parse(article?.published_at)
                      ).toDateString()}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <BiTime />
                    <p className="text-xs ml-1 font-medium">
                      {article?.reading_time_minutes} mins
                    </p>
                  </div>
                </div>
                <ShareOnSocialMedia
                  className={styles.socialMedia}
                  title={article?.title}
                  url={article?.url}
                  summary={article?.description}
                  cover_image={article?.cover_image}
                >
                  <div className="bg-indigo-600 text-white w-[30px] h-[30px] grid place-items-center cursor-pointer rounded-full clickable_button">
                    <FiPrinter className="" onClick={() => window.print()} />
                  </div>
                </ShareOnSocialMedia>
              </div>
              <div className="flex items-center flex-wrap my-2 uppercase text-xs sm:text-base text-purple-700 dark:text-purple-400 font-bold gap-[2px] md:gap-3 select-none max-w-full print:hidden">
                {article?.tags.map((tag) => {
                  return (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  );
                })}
              </div>
            </div>
            {article?.cover_image && (
              <div>
                <Image
                  src={article?.cover_image}
                  className="w-full mx-auto rounded-md"
                  layout="responsive"
                  width={800}
                  height={336}
                  alt={article?.title}
                  placeholder="blur"
                  blurDataURL={article?.cover_image}
                />
              </div>
            )}

            <article
              className="
              mx-auto
              prose
              prose-sm
              md:prose-base 
              lg:prose-lg 
              xl:prose-lg 
              3xl:prose-xl
              dark:prose-invert
              selection:bg-slate-700
              selection:text-purple-400
              dark:text-white
              my-5
              
          
            "
            >
              <Interweave
                // className={`mx-auto prose prose-sm md:prose-base lg:prose-lg xl:prose-lg 3xl:prose-xl prose-img:!rounded-xl font-inter font-[500] prose-img:mx-auto dark:prose-invert ${styles.dev_blog}`}
                className={styles.dev_blog}
                content={article?.body_html}
              />
            </article>
          </div>
        </div>
      )}
    </>
  );
}

export async function getStaticPaths() {
  const blogs = await fetch("https://dev.to/api/articles/me", {
    headers: {
      "api-key": process.env.NEXT_PUBLIC_BLOGS_API,
    },
  }).then((res) => res.json());

  const paths = blogs.map((blog) => {
    return {
      params: { slug: blog.slug },
    };
  });

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const { slug } = await context?.params;
  const article = await fetch("https://dev.to/api/articles/j471n/" + slug).then(
    (res) => res.json()
  );

  if (article.type_of === "article") {
    return {
      props: { article, error: false },
      revalidate: 30 * 60,
    };
  }

  return {
    props: { article, error: true },
    revalidate: 30 * 60,
  };
}
