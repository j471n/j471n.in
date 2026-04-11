import { motion } from "framer-motion";
import { ISnippet } from "@lib/interface/sanity";
import Metadata from "@components/MetaData";
import PageHeader from "@components/PageHeader";
import SnippetCard from "@components/SnippetCard";
import { getAllSnippetsMeta } from "@lib/sanityContent";
import pageMeta from "@content/meta";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export default function Snippets({ snippets }: { snippets: ISnippet[] }) {
  return (
    <>
      <Metadata
        title={pageMeta.snippets.title}
        description={pageMeta.snippets.description}
        previewImage={pageMeta.snippets.image}
        keywords={pageMeta.snippets.keywords}
      />

      <PageHeader
        watermark="snippets"
        eyebrow="Snippets — 001"
        title="Code Snippets"
        description={`A collection of reusable code snippets I've saved over time. ${snippets.length} snippets available.`}
        className="pb-24"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 dark:bg-neutral-700 border border-gray-200 dark:border-neutral-700"
        >
          {snippets.map((snippet, index) => (
            <SnippetCard key={index} snippet={snippet} />
          ))}
        </motion.div>
      </PageHeader>
    </>
  );
}

export async function getStaticProps() {
  const snippets = await getAllSnippetsMeta();

  return {
    props: { snippets },
    revalidate: 60,
  };
}
