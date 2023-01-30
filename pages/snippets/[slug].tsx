import Metadata from "@components/MetaData";
import MDXComponents from "@components/MDXComponents";
import PageNotFound from "pages/404";
import MDXContent from "@lib/MDXContent";
import { MDXRemote } from "next-mdx-remote";
import { GetStaticPropsContext } from "next";
import { PostType } from "@lib/types";
import SnippetLayout from "@layout/SnippetLayout";
import pageMeta from "@content/meta";

export default function SnippetPage({
  snippet,
  error,
}: {
  snippet: PostType;
  error: boolean;
}) {
  if (error) return <PageNotFound />;

  return (
    <>
      <Metadata
        title={snippet.meta.title}
        suffix="Jatin Sharma"
        description={snippet.meta.excerpt}
        previewImage={pageMeta.snippets.image}
        keywords={pageMeta.snippets.keywords}
      />

      <SnippetLayout snippet={snippet}>
        <MDXRemote
          {...snippet.source}
          frontmatter={{
            slug: snippet.meta.slug,
            excerpt: snippet.meta.excerpt,
            title: snippet.meta.title,
            date: snippet.meta.date,
            keywords: snippet.meta.keywords,
            image: snippet.meta.image,
          }}
          components={MDXComponents}
        />
      </SnippetLayout>
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
  const { post: snippet } = await new MDXContent("snippets").getPostFromSlug(
    slug
  );

  if (snippet != null) {
    return {
      props: {
        error: false,
        snippet,
      },
    };
  } else {
    return {
      props: {
        error: true,
        snippet: null,
      },
    };
  }
}

export async function getStaticPaths() {
  const paths = new MDXContent("snippets")
    .getSlugs()
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}
