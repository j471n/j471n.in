import Interweave from "interweave";
import styles from "../../styles/Blog.module.css";
import { AiOutlineCalendar, AiFillCopy } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import ShareOnSocialMedia from "../../components/ShareOnSocialMedia";
import Image from "next/image";
import Author from "../../components/Author";
import Comments from "../../components/Comments";
import { useRouter } from "next/router";

export default function Article({ article }) {
  const router = useRouter();
  return (
    <>
      {article && (
        <>
          <div className="flex flex-col  md:flex row relative lg:max-w-[70%] mx-auto font-exo">
            <div className={styles.article_page}>
              <h1 className=" text-4xl font-bold mb-1">{article.title}</h1>
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
              <div className="flex items-center my-2 uppercase text-xs sm:text-base text-purple-500 font-bold space-x-3 select-none">
                {article.tags?.map((tag) => {
                  return (
                    <p
                      key={tag}
                      className={styles.tag}
                      onClick={() => router.push(`/blogs?tag=${tag}`)}
                    >
                      {tag}
                    </p>
                  );
                })}
              </div>

              <div className="mx-auto p-3 md:p-5 xl:p-8 bg-gray-200 rounded-md">
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
            <div className={styles.article_sidebar}>
              <Author />
            </div>
          </div>
          <Comments articleId={article.id} articleAuthor={article.user} />
        </>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const res = await fetch("https://dev.to/api/articles/j471n/" + slug);
  const article = await res.json();

  return {
    props: {
      article,
      slug,
    },
  };
}
