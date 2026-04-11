import React from "react";
import Project from "@components/Project";
import Metadata from "@components/MetaData";
import PageHeader from "@components/PageHeader";
import pageMeta from "@content/meta";
import { getProjects } from "@lib/supabase";
import { ProjectType } from "@lib/types";
import CreateAnIssue from "@components/CreateAnIssue";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function Projects({
  projects,
  error,
}: {
  projects: ProjectType[];
  error: boolean;
}) {
  if (error) return <CreateAnIssue />;

  const visible = projects.filter(
    (p) => !(p.name === "" && p.githubURL === ""),
  );

  return (
    <>
      <Metadata
        title={pageMeta.projects.title}
        description={pageMeta.projects.description}
        previewImage={pageMeta.projects.image}
        keywords={pageMeta.projects.keywords}
      />

      <PageHeader
        watermark="work"
        eyebrow="Projects — 001"
        title="Projects"
        description={`I've built various projects ranging from simple experiments to complex applications. ${visible.length}+ projects and counting.`}
        className="pb-24"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {visible.map((project, index) => (
            <Project
              key={project.id}
              project={project}
              featured={index === 0}
            />
          ))}
        </motion.div>
      </PageHeader>
    </>
  );
}

export async function getStaticProps() {
  const { projects, error } = await getProjects();
  return {
    props: {
      projects,
      error,
    },
    revalidate: 60,
  };
}
