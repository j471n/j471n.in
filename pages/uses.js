import MetaData from "../components/MetaData";

import { getPostFromSlug } from "../lib/posts";
import { MDXRemote } from "next-mdx-remote";
import "highlight.js/styles/atom-one-dark.css";

import MDXComponents from "../components/MDXComponents";
import PageTop from "../components/PageTop";
import styles from "../styles/Uses.module.css";

export default function Uses({ post }) {
  return (
    <>
      <MetaData title={post.meta.title} />

      <section className="pageTop font-inter">
        <PageTop pageTitle={post.meta.title}>{post.meta.excerpt}</PageTop>

        <div
          className={`${styles.uses} !w-full  selection:bg-blue-300 dark:selection:bg-blue-900 selection:text-white-400 dark:text-neutral-400 my-2 font-medium`}
        >
          <MDXRemote
            {...post.source}
            frontmatter={post.meta}
            components={MDXComponents}
          />
          <p> Last Update on {post.meta.stringDate}</p>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const { content: source, meta } = await getPostFromSlug("/page/uses", true);
  return {
    props: {
      post: {
        meta,
        source,
      },
    },
  };
}
