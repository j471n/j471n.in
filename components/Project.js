import React, { useState } from "react";
import { BsGithub } from "react-icons/bs";
import { FcLink } from "react-icons/fc";
import { BiShareAlt } from "react-icons/bi";
import Image from "next/image";
import ShareOnSocialMedia from "./ShareOnSocialMedia";
import { AnimatePresence } from "framer-motion";
import {
  fromBottomVariant,
  opacityVariant,
  popUp,
  popUpFromBottomForText,
} from "../content/FramerMotionVariants";
import AnimatedDiv from "./FramerMotion/AnimatedDiv";
import AnimatedHeading from "./FramerMotion/AnimatedHeading";
import AnimatedText from "./FramerMotion/AnimatedText";

export default function Project({ project }) {
  // Sharing Project
  const [showShare, setShowShare] = useState(false);

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

  function displayShareIcons() {
    setShowShare(!showShare);
    setTimeout(() => {
      setShowShare(false);
    }, 7 * 1000);
  }

  return (
    <div className="relative h-full w-full break-words shadow ring-1 ring-gray-400 dark:ring-gray-600 transform duration-200 lg:hover:ring-4  rounded-xl flex flex-col">
      <AnimatePresence>
        {project.coverURL && (
          <div>
            <Image
              className="min-w-full rounded-tl-xl rounded-tr-xl cursor-pointer select-none"
              src={project.coverURL}
              alt={project.name}
              width={360}
              layout="responsive"
              height={200}
              placeholder="blur"
              blurDataURL={project.coverURL}
              quality={50}
            />
          </div>
        )}

        {project.name && (
          <div className="w-full p-2 capitalize select-none flex flex-col">
            {project.name && (
              <AnimatedHeading
                variants={opacityVariant}
                className="pb-1 font-bold text-md text-slate-600 dark:text-slate-300"
              >
                {project.name}
              </AnimatedHeading>
            )}
            {project.description && (
              <AnimatedText
                variants={opacityVariant}
                className="text-xs truncate-3 text-slate-500"
              >
                {project.description}
              </AnimatedText>
            )}
          </div>
        )}
      </AnimatePresence>

      <div className="relative overflow-hidden !mt-4 auto-row">
        {/* Tools used in project */}
        {project.tools && (
          <p
            className={`${
              showShare ? "invisible  scale-0" : "visible scale-100"
            } w-full select-none flex gap-3 flex-wrap justify-center items-center transition-all duration-150`}
          >
            {project.tools.map((tool) => {
              return (
                <AnimatedDiv variants={popUp} key={tool}>
                  <Image
                    title={tool}
                    src={`/img/skills/${tool}.webp`}
                    alt={tool}
                    width={30}
                    height={30}
                  />
                </AnimatedDiv>
              );
            })}
          </p>
        )}

        {/* ShareIcons */}
        <ShareOnSocialMedia
          className={`${
            showShare ? "visible scale-100" : "invisible scale-0"
          } absolute inset-0 flex items-center justify-between sm:justify-evenly transition-all duration-150 px-3`}
          title={project.name}
          url={project.previewURL || project.githubURL}
          summary={project.description}
          body={project.description}
          subject={project.name}
          handleShare={handleShare}
          cover_image={project.coverURL}
        />
      </div>

      <AnimatedDiv
        variants={popUpFromBottomForText}
        className=" right-0 left-0 bottom-0 p-2 w-full flex items-center auto-row"
      >
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
        <div title="Share" className="project_link" onClick={displayShareIcons}>
          <BiShareAlt className="text-lg" />
        </div>
      </AnimatedDiv>
    </div>
  );
}
