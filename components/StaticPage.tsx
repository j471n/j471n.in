import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";
import { IStaticPage } from "@lib/interface/sanity";
import MDXComponents from "@components/MDXComponents";
import { MDXRemote } from "next-mdx-remote";
import MetaData from "@components/MetaData";
import { PageData } from "@lib/types";
import PageTop from "@components/PageTop";
import { opacityVariant } from "@content/FramerMotionVariants";

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

      <section className="pageTop">
        <PageTop containerClass="mb-0" pageTitle={page.title}>
          {showDescription && (metadata.description || page.excerpt)}
        </PageTop>
        <AnimatedDiv
          variants={opacityVariant}
          className="max-w-full prose dark:prose-invert"
        >
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
        </AnimatedDiv>
      </section>
    </>
  );
}
