import MDXComponents from "@components/MDXComponents";
import MetaData from "@components/MetaData";
import PageTop from "@components/PageTop";
import Support from "@components/Support";
import MDXContent from "@lib/MDXContent";
import { MDXRemote } from "next-mdx-remote";
import styles from "@styles/Blog.module.css";
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";
import { opacityVariant } from "@content/FramerMotionVariants";
import pageMeta from "@content/meta";

export default function About({ about }) {
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
          className={` ${styles.blog} blog-container prose-sm  3xl:prose-lg`}
        >
          <MDXRemote
            {...about.content}
            frontmatter={about.meta}
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
