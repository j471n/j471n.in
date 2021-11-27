import Interweave from "interweave";
import styles from "../../styles/Blog.module.css";
import { AiOutlineCalendar, AiFillCopy } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import ShareOnSocialMedia from "../../components/ShareOnSocialMedia";
import Image from "next/image";
import Author from "../../components/Author";
import Comments from "../../components/Comments";
import { useRouter } from "next/router";

export default function Article({ article, comments, followers }) {
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
              <Author followers={followers} />
            </div>
          </div>
          <Comments
            comments={comments}
            articleId={article.id}
            articleAuthor={article.user}
          />
        </>
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
