import Interweave from "interweave";
import styles from "../../styles/Blog.module.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import ShareOnSocialMedia from "../../components/ShareOnSocialMedia";
import Image from "next/image";
import Author from "../../components/Author";
import Comments from "../../components/Comments";
export default function Article({ article }) {
  return (
    <>
      <div className="flex flex-col  md:flex row relative">
        <div className={styles.article_page}>
          <h1 className="text-2xl font-bold mb-1">{article.title}</h1>
          <div className={styles.article_header}>
            <div className="flex space-x-2">
              <div className="flex items-center">
                <AiOutlineCalendar />
                <p className="text-xs ml-1 font-medium">
                  {new Date(Date.parse(article.published_at)).toDateString()}
                </p>
              </div>
              <div className="flex items-center">
                <BiTime />
                <p className="text-xs ml-1 font-medium">
                  {article.reading_time_minutes} mins
                </p>
              </div>
            </div>
            <ShareOnSocialMedia className={styles.socialMedia} />
          </div>
          <div className="flex ">
            {article.tags.map((tag) => {
              return (
                <p key={tag} className={styles.tag}>
                  #{tag}
                </p>
              );
            })}
          </div>

          <div>
            <Image
              className="w-full"
              src={article.cover_image}
              width={800}
              height={336}
            />
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
      <Comments articleId={871488 || article.id} />
    </>
  );
}

// Getting Params and returning it
export async function getStaticPaths() {
  const res = await fetch("https://dev.to/api/articles/me?per_page=1000", {
    headers: {
      "api-key": process.env.NEXT_PUBLIC_BLOGS_API,
    },
  });
  const blogs = await res.json();

  const paths = blogs.map((blog) => {
    return {
      params: { slug: blog.slug.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

// Server Side Rendering of data
export async function getStaticProps(context) {
  const slug = context.params.slug;
  const res = await fetch("https://dev.to/api/articles/j471n/" + slug);
  const article = await res.json();

  return {
    props: {
      article,
    },
  };
}
