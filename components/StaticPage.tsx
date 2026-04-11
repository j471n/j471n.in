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
        <div className="max-w-max font-barlow prose-typography">
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
