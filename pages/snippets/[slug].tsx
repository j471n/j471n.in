import { getAllSlugs, getSnippetFromSlug } from "@lib/sanityContent";

import { GetStaticPropsContext } from "next";
import { ISnippet } from "@lib/interface/sanity";
import MDXComponents from "@components/MDXComponents";
import { MDXRemote } from "next-mdx-remote";
import Metadata from "@components/MetaData";
import PageNotFound from "@components/PageNotFound";
import SnippetLayout from "@layout/SnippetLayout";
import pageMeta from "@content/meta";
import { TIME_IN_SECONDS } from "@utils/utils";

export default function SnippetPage({
  snippet,
  error,
}: {
  snippet: ISnippet;
  error: boolean;
}) {
  if (error) return <PageNotFound />;

  return (
    <>
      <Metadata
        title={snippet.title}
        suffix="Jatin Sharma"
        description={snippet.excerpt}
        previewImage={pageMeta.snippets.image}
        keywords={pageMeta.snippets.keywords}
      />

      <SnippetLayout snippet={snippet}>
        <MDXRemote
          {...snippet.content}
          frontmatter={{
            slug: snippet.slug.current,
            excerpt: snippet.excerpt,
            title: snippet.title,
            date: snippet.publishedAt,
            image: pageMeta.snippets.image,
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

  const snippet = await getSnippetFromSlug(slug);

  if (snippet != null) {
    return {
      props: {
        error: false,
        snippet,
      },
      revalidate: TIME_IN_SECONDS.ONE_DAY,
    };
  } else {
    return {
      props: {
        error: true,
        snippet: null,
      },
      revalidate: TIME_IN_SECONDS.ONE_DAY,
    };
  }
}

export async function getStaticPaths() {
  const slugs = await getAllSlugs({
    type: "snippet",
  });
  const paths = slugs.map((slug: any) => ({ params: { slug } }));

  return {
    paths,
    fallback: "blocking",
  };
}
