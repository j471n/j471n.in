import { AnimatePresence } from "framer-motion";
import { FadeContainer } from "@content/FramerMotionVariants";
import Metadata from "@components/MetaData";
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv";
import PageTop from "@components/PageTop";
import MDXContent from "@lib/MDXContent";
import pageMeta from "@content/meta";
import SnippetCard from "@components/SnippetCard";

export default function Snippets({ snippets }: { snippets: any[] }) {
  return (
    <>
      <Metadata
        title={pageMeta.snippets.title}
        description={pageMeta.snippets.description}
        previewImage={pageMeta.snippets.image}
        keywords={pageMeta.snippets.keywords}
      />

      <section className="pageTop flex flex-col gap-2">
        <PageTop pageTitle={pageMeta.snippets.title}>
          {pageMeta.snippets.description}
        </PageTop>

        <section className="relative flex flex-col gap-2 min-h-[50vh]">
          <AnimatedDiv
            variants={FadeContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
          >
            <AnimatePresence>
              {snippets.map((snippet, index) => {
                return <SnippetCard key={index} snippet={snippet} />;
              })}
            </AnimatePresence>
          </AnimatedDiv>
        </section>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const snippets = new MDXContent("snippets").getAllPosts();

  return {
    props: { snippets },
  };
}
