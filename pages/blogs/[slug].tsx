import { getAllPostSlugs, getPostFromSlug } from "@lib/sanityContent";

import BlogLayout from "@layout/BlogLayout";
import { BlogPost } from "@lib/interface/sanity";
import { GetStaticPropsContext } from "next";
import Metadata from "@components/MetaData";
import PageNotFound from "pages/404";
import { PortableText } from "@portabletext/react";
import { useEffect } from "react";
// import {} from "next-mdx-remote"

import { MDXRemote } from "next-mdx-remote";

// import { PostType } from "@lib/types";

import MDXComponents from "@components/MDXComponents";
import { toHTML } from "@portabletext/to-html";

// import sanityClient from "@lib/sanityClient";

export default function Post({
  post,
  error,
}: {
  post: BlogPost;
  error: boolean;
}) {
  // Adding Views to the supabase database
  useEffect(() => {
    const registerView = () =>
      fetch(`/api/views/${post.slug.current}`, {
        method: "POST",
      });

    post != null && registerView();
  }, [post]);

  if (error) return <PageNotFound />;

  return (
    <>
      <Metadata
        title={post.title}
        suffix="Jatin Sharma"
        description={post.excerpt}
        previewImage={post.mainImage.asset.url}
        // keywords={post.meta.keywords}
      />

      <BlogLayout post={post}>
        {/* <MDXRemote
          {...renderBlock()}
          frontmatter={{
            slug: post.slug.current,
            excerpt: post.excerpt,
            title: post.title,
            date: post.publishedAt,
            // keywords: post.meta.keywords,
            image: post.mainImage.asset.url,
          }}
          components={MDXComponents}
        /> */}
        {/* <>{toHTML(post.body)}</> */}

        <PortableText value={post.body} />
      </BlogLayout>
    </>
  );
}

type StaticProps = GetStaticPropsContext & {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: StaticProps) {
  const { slug } = params;
  // const { post } = await new MDXContent("posts").getPostFromSlug(slug);
  const post = await getPostFromSlug(slug);
  console.log("🚀 ~ file: [slug].tsx:71 ~ post:", post);

  if (post != null) {
    return {
      props: {
        error: false,
        post,
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
  const slugs = await getAllPostSlugs();
  console.log("🚀 ~ file: [slug].tsx:88 ~ slugs:", slugs);

  const paths = slugs.map((slug: any) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}
