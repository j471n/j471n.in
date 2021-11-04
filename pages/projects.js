import React from "react";
import Project from "../components/Project";
import CoverPage from "../components/CoverPage";
import LazyLoad from "react-lazyload";

export default function Projects({ projects }) {
  // const { response, loading } = useFetch("/project-list");

  return (
    <div className="">
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
  );
}

export async function getStaticProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/project-list");
  const projects = await res.json();

  return {
    props: {
      projects,
    },
  };
}
