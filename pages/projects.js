import React from "react";
import Project from "../components/Project";
import LazyLoad from "react-lazyload";
import { getProjects } from "../lib/dataFetch";
import Metadata from "../components/MetaData";
import VideoCover from "../components/VideoCover";

export default function Projects({ projects }) {
  // const { response, loading } = useFetch("/project-list");

  return (
    <>
      <Metadata title="Projects ⚒️" />
      <div>
        <VideoCover
          title="my Projects"
          buttonText="See my latest work"
          videoUrl="https://i.imgur.com/2cSaKIt.mp4"
        />
        <section id="view" className="page_container mt-10">
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
