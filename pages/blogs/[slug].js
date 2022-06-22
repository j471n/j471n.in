import { useEffect } from "react";
import BlogLayout from "@layout/BlogLayout";
import { getPostFromSlug, getSlugs } from "@lib/posts";
import Metadata from "@components/MetaData";
import MDXComponents from "@components/MDXComponents";

import { MDXRemote } from "next-mdx-remote";
import "highlight.js/styles/atom-one-dark.css";

export default function Post({ post }) {
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
    tableOfContents,
  } = await getPostFromSlug(slug);
  return {
    props: {
      post: {
        meta,
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
