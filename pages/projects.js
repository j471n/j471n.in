import React from "react";
import Project from "../components/Project";

export default function Projects({ projects }) {
  // const { response, loading } = useFetch("/project-list");

  return (
    <div className="mt-3 md:mt-24">
      <h3 className="title_of_page">Projects</h3>

      {/* {loading ? (
        <Loading />
      ) : ( */}
      <section className="page_container">
        {projects &&
          projects.map((project) => {
            if (project.name === "" && project.githubURL === "") return null;
            return <Project key={project.id} project={project} />;
          })}
      </section>
      {/* )} */}
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
