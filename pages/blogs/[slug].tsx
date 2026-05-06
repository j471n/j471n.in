import { getAllSlugs, getPostFromSlug } from "@lib/sanityContent";

import BlogLayout from "@layout/BlogLayout";
import { BlogPost } from "@lib/interface/sanity";
import { GetStaticPropsContext } from "next";
import MDXComponents from "@components/MDXComponents";
import { MDXRemote } from "next-mdx-remote";
import Metadata from "@components/MetaData";
import PageNotFound from "@components/PageNotFound";
import { useEffect } from "react";
import { TIME_IN_SECONDS } from "@utils/utils";

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
        keywords={post.keywords ?? ""}
      />

      <BlogLayout post={post}>
        <MDXRemote
          {...post.content}
          frontmatter={{
            slug: post.slug.current,
            excerpt: post.excerpt,
            title: post.title,
            date: post.publishedAt,
            keywords: post.keywords ?? "",
            image: post.mainImage.asset.url,
          }}
          components={MDXComponents}
        />
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
  const post = await getPostFromSlug(slug);

  if (post != null) {
    return {
      props: {
        error: false,
        post,
      },
      revalidate: TIME_IN_SECONDS.SIX_HOURS,
    };
  } else {
    return {
      props: {
        error: true,
        post: null,
      },
      revalidate: TIME_IN_SECONDS.SIX_HOURS,
    };
  }
}

export async function getStaticPaths() {
  const slugs = await getAllSlugs({
    type: "post",
  });
  const paths = slugs.map((slug: any) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
}
