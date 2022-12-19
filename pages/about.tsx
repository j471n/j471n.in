import MDXComponents from "@components/MDXComponents";
import MetaData from "@components/MetaData";
import PageTop from "@components/PageTop";
import Support from "@components/Support";
import MDXContent from "@lib/MDXContent";
import { MDXRemote } from "next-mdx-remote";
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";
import { opacityVariant } from "@content/FramerMotionVariants";
import pageMeta from "@content/meta";
import { PostType } from "@lib/types";

export default function About({ about }: { about: PostType }) {
  return (
    <>
      <MetaData
        title={pageMeta.about.title}
        description={pageMeta.about.description}
        previewImage={pageMeta.about.image}
        keywords={pageMeta.about.keywords}
      />

      <section className="pageTop">
        <PageTop pageTitle="About me"></PageTop>
        <AnimatedDiv
          variants={opacityVariant}
          className={`blog-container flex flex-col gap-3 text-gray-6  00`}
        >
          <MDXRemote
            {...about.source}
            frontmatter={{
              slug: about.meta.slug,
              excerpt: about.meta.excerpt,
              title: about.meta.title,
              date: about.meta.date,
              keywords: about.meta.keywords,
              image: about.meta.image,
            }}
            components={MDXComponents}
          />
        </AnimatedDiv>
        <Support />
      </section>
    </>
  );
}

export async function getStaticProps() {
  const { post: about } = await new MDXContent("static_pages").getPostFromSlug(
    "about"
  );

  return {
    props: {
      about,
    },
  };
}
