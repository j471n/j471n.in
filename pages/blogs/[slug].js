import { useCallback, useEffect, useState } from "react";
import BlogLayout from "@layout/BlogLayout";
import { getPostFromSlug, getSlugs } from "@lib/posts";
import Metadata from "@components/MetaData";
import MDXComponents from "@components/MDXComponents";

import { MDXRemote } from "next-mdx-remote";
import "highlight.js/styles/atom-one-dark.css";

export default function Post({ post }) {
  const [scroll, setScroll] = useState(0);

  const progressBarHandler = useCallback(() => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scroll = `${totalScroll / windowHeight}`;

    setScroll(scroll);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", progressBarHandler);
    return () => window.removeEventListener("scroll", progressBarHandler);
  }, [progressBarHandler]);

  // Adding Views to the firebase database
  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${post.meta.slug}`, {
        method: "POST",
      });

    registerView();
  }, [post.meta.slug]);

  return (
    <>
      <Metadata
        title={post.meta.title}
        description={post.meta.excerpt}
        previewImage={post.meta.image}
      />
      <div
        className="!fixed left-0 w-full h-1 bg-black dark:bg-white origin-top-left  transform duration-300  top-[44px] sm:top-[63.5px] md:top-[60px]"
        style={{
          transform: `scale(${scroll},1)`,
          zIndex: 1000,
        }}
      />
      <BlogLayout post={post}>
        <MDXRemote
          {...post.source}
          frontmatter={post.meta}
          components={MDXComponents}
        />
      </BlogLayout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
const {
    content: source,
    meta,
    readingTime,
    tableOfContents,
  } = await getPostFromSlug(slug);
  return {
    props: {
      post: {
        meta,
        readingTime,
        source,
        tableOfContents,
      },
    },
  };
}

export async function getStaticPaths() {
  const paths = getSlugs().map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}
