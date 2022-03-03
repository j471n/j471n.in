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
        {/* <CoverPage
          title="Here are my "
          mainHeading="Projects"
          className="grid place-items-center"
        /> */}
        .
        <div className="relative w-screen h-[85vh]">
          <video
            className="w-full h-full"
            src="https://i.imgur.com/2cSaKIt.mp4"
            autoPlay
            muted
            loop
          ></video>

          <div className="absolute inset-0 bg-black text-white mix-blend-multiply flex flex-col items-center justify-center select-none">
            <p class="capitalize font-bold text-6xl">my Projects</p>
            <p
              class="capitalize text-2xl font-thin font-merriweather border-b-2 border-transparent hover:border-gray-100 p-2 cursor-pointer"
              onClick={() => (window.location.href = "#view")}
            >
              See my latest work
            </p>
          </div>
        </div>
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
