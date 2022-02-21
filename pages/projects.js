import React from "react";
import Project from "../components/Project";
import CoverPage from "../components/CoverPage";
import LazyLoad from "react-lazyload";
import { getProjects } from "../lib/dataFetch";
import Metadata from "../components/MetaData";

export default function Projects({ projects }) {
  // const { response, loading } = useFetch("/project-list");

  return (
    <>
      <Metadata title="Projects ⚒️" />
      <div>
        <CoverPage
          title="Here are my "
          mainHeading="Projects"
          className="grid place-items-center"
        />

        <h3 className="title_of_page">Projects</h3>

        <section className="page_container">
          {projects &&
            projects.map((project) => {
              if (project.name === "" && project.githubURL === "") return null;

              return (
                <LazyLoad key={project.id} className="h-full w-full">
                  <Project key={project.id} project={project} />
                </LazyLoad>
              );
            })}
        </section>
      </div>
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
