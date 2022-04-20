import React from "react";
import Project from "../components/Project";
import { getProjects } from "../lib/dataFetch";
import Metadata from "../components/MetaData";
import { AnimatePresence } from "framer-motion";
import PageCover from "../components/Home/PageCover";

export default function Projects({ projects }) {
  return (
    <>
      <Metadata title="Projects ⚒️" />
      <>
        <PageCover
          imgSrc="/img/cover/projectCover.svg"
          pageTitle="Work & Projects"
          buttonText="View Recent Work"
          titleClass="text-yellow-500"
          buttonClass={"before:bg-yellow-700"}
          containerClass="from-yellow-50"
        />

        <div className="relative">
          <h1 className="absolute top-0 font-bold text-xl p-2 text-center w-full mt-5 text-slate-600 dark:text-slate-200">
            Recent Projects
          </h1>
          <section id="view" className="page_container pt-20">
            <AnimatePresence>
              {projects &&
                projects.map((project) => {
                  if (project.name === "" && project.githubURL === "")
                    return null;
                  return <Project key={project.id} project={project} />;
                })}
            </AnimatePresence>
          </section>
        </div>
      </>
    </>
  );
}

export async function getStaticProps() {
  const projects = getProjects();
  return {
    props: {
      projects,
    },
  };
}
