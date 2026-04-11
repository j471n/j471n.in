import { IStaticPage } from "@lib/interface/sanity";
import MDXComponents from "@components/MDXComponents";
import { MDXRemote } from "next-mdx-remote";
import MetaData from "@components/MetaData";
import { PageData } from "@lib/types";
import PageHeader from "@components/PageHeader";

export default function StaticPage({
  metadata,
  page,
  showDescription = false,
}: {
  metadata: PageData;
  page: IStaticPage;
  showDescription?: boolean;
}) {
  return (
    <>
      <MetaData
        title={metadata.title}
        description={metadata.description}
        previewImage={metadata.image}
        keywords={metadata.keywords}
      />

      <PageHeader
        watermark={page.title.toLowerCase()}
        eyebrow={page.title}
        title={page.title}
        description={
          showDescription ? metadata.description || page.excerpt : page.excerpt
        }
        className="pb-16"
      >
        <div className="max-w-max font-barlow prose dark:prose-invert prose-sm sm:prose-base blog-container prose-pre:bg-white dark:prose-pre:bg-darkSecondary prose-pre:saturate-150 dark:prose-pre:saturate-100 marker:text-black dark:marker:text-white prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-gray-900 dark:prose-a:text-white prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-gray-900 dark:prose-code:text-gray-100 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400">
          <MDXRemote
            {...page.content}
            frontmatter={{
              slug: page.slug.current,
              excerpt: page.excerpt,
              title: page.title,
              date: page.publishedAt,
              keywords: page.keywords,
              image: page.mainImage.asset.url,
            }}
            components={MDXComponents}
          />
        </div>
      </PageHeader>
    </>
  );
}
