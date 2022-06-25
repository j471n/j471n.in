import { useEffect } from "react";
import BlogLayout from "@layout/BlogLayout";
import { getPostFromSlug, getSlugs } from "@lib/posts";
import Metadata from "@components/MetaData";
import MDXComponents from "@components/MDXComponents";
import PageNotFound from "pages/404";

import { MDXRemote } from "next-mdx-remote";
import "highlight.js/styles/atom-one-dark.css";

export default function Post({ post, error }) {
  // Adding Views to the firebase database
  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${post.meta.slug}`, {
        method: "POST",
      });

    post != null && registerView();
  }, [post !== null && post.meta.slug]);

  if (error) return <PageNotFound />;

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
  const { post } = await getPostFromSlug(slug);

  if (post != null) {
    return {
      props: {
        error: false,
        post: {
          meta: post.meta,
          source: post.content,
          tableOfContents: post.tableOfContents,
        },
      },
    };
  } else {
    return {
      props: {
        error: true,
        post: null,
      },
    };
  }
}

export async function getStaticPaths() {
  const paths = getSlugs().map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}
