import Interweave from "interweave";
import styles from "../../styles/Blog.module.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import ShareOnSocialMedia from "../../components/ShareOnSocialMedia";
import Image from "next/image";
import Author from "../../components/Author";
import Comments from "../../components/Comments";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Article() {
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const slug = router.query.slug;

  useEffect(() => {
    fetch(`https://dev.to/api/articles/j471n/${slug}`)
      .then((res) => res.json())
      .then((data) => setArticle(data))
      .catch((err) => console.error(err));
  }, [slug]);

  return (
    <>
      {article && (
        <>
          <div className="flex flex-col  md:flex row relative lg:max-w-[70%] mx-auto">
            <div className={styles.article_page}>
              <h1 className="text-2xl font-bold mb-1">{article.title}</h1>
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
                <ShareOnSocialMedia className={styles.socialMedia} />
              </div>
              <div className="flex items-center my-2">
                {article.tags?.map((tag) => {
                  return (
                    <p key={tag} className={styles.tag}>
                      #{tag}
                    </p>
                  );
                })}
              </div>

              <div>
                {article.cover_image && (
                  <Image
                    src={article.cover_image}
                    className="w-full"
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

// Getting Params and returning it
// export async function getStaticPaths() {
//   const res = await fetch("https://dev.to/api/articles/me?per_page=1000", {
//     headers: {
//       "api-key": process.env.NEXT_PUBLIC_BLOGS_API,
//     },
//   });
//   const blogs = await res.json();

//   const paths = blogs.map((blog) => {
//     return {
//       params: { slug: blog.slug.toString() },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// }

// Server Ssluge Rendering of data
// export async function getServerSideProps(context) {
//   const sl = context.params.sl;
//   const res = await fetch("https://dev.to/api/articles/j471n/" + sl);
//   const article = await res.json();

//   return {
//     props: {
//       article: article || {},
//     },
//   };
// }

// export async function getStaticProps(context) {
//   const slug = context.params.slug.toString();
//   const res = await fetch("https://dev.to/api/articles/j471n/" + slug);
//   const article = await res.json();

//   return {
//     props: {
//       article: article || {},
//       slug,
//     },
//   };
// }
