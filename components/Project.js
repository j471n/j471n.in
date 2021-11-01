import React, { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { FcLink } from "react-icons/fc";
import { BiShareAlt } from "react-icons/bi";
import Image from "next/image";

export default function Project({ project }) {
  // Sharing Project

  const [shareSupported, setShareSupported] = useState(false);

  useEffect(() => {
    navigator.share ? setShareSupported(true) : setShareSupported(false);
  }, []);

  async function handleShare() {
    const image = await fetch(project.coverURL);
    const blob = await image.blob();
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });
    if (window.navigator.share) {
      window.navigator
        .share({
          title: project.name,
          text: project.desc || "",
          url: project.previewURL || project.githubURL,
          files: [file],
        })
        .then(() => {
          console.log("Thanks for sharing! Project");
        })
        .catch(console.error);
    }
  }

  return (
    <div className="relative sm:pb-[15%] h-full w-full break-words shadow ring-1 ring-gray-400 lg:hover:ring-2 rounded-xl">
      {project.coverURL && (
        <Image
          className="min-w-full rounded-tl-xl rounded-tr-xl cursor-pointer"
          src={project.coverURL}
          alt={project.name}
          width={360}
          layout="responsive"
          height={200}
        />
      )}

      {project.name && (
        <div className="w-full p-2 capitalize select-all">
          {project.name && (
            <h4 className="pb-1 font-bold text-lg">{project.name}</h4>
          )}
          {project.description && (
            <p className="text-xs pb-1">{project.description}</p>
          )}
          {project.tools && (
            <p className="w-full mt-2 select-none flex gap-2 justify-center items-center">
              {project.tools.map((tool) => {
                return (
                  <Image
                    key={tool}
                    title={tool}
                    src={`/img/skills/${tool}.webp`}
                    alt={tool}
                    width={30}
                    height={30}
                  />
                );
              })}
            </p>
          )}
        </div>
      )}

      <div className="sm:absolute right-0 left-0 bottom-0 p-2 w-full flex items-center ">
        {project.githubURL && (
          <a
            title="Github"
            href={project.githubURL}
            target="blank"
            className="project_link"
          >
            <BsGithub className="text-lg text-center" />
          </a>
        )}
        {project.previewURL && (
          <a
            title="Visit"
            href={project.previewURL}
            target="blank"
            className="project_link"
          >
            <FcLink className="text-lg" />
          </a>
        )}
        {shareSupported && (
          <div title="Share" className="project_link" onClick={handleShare}>
            <BiShareAlt className="text-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
