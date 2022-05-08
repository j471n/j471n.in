import { BsGithub, BsFillEyeFill } from "react-icons/bs";
import { BiShareAlt } from "react-icons/bi";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  hamFastFadeContainer,
  popUp,
  popUpFromBottomForText,
} from "../content/FramerMotionVariants";
import AnimatedHeading from "./FramerMotion/AnimatedHeading";
import AnimatedText from "./FramerMotion/AnimatedText";
import useShare from "../hooks/useShare";

export default function Project({ project }) {
  const { isShareSupported } = useShare();

  async function handleShare() {
    const image = fetch(project.coverURL, { mode: "no-cors" }).then((image) =>
      image.blob()
    );
    const file = new File([image], "image.jpg", { type: "image/jpeg" });
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
    <div className="relative flex items-center gap-2 w-full">
      <div className="flex flex-col gap-1 w-full">
        <AnimatedHeading
          variants={popUpFromBottomForText}
          className="font-bold sm:text-xl capitalize text-neutral-900 dark:text-neutral-200"
        >
          {project.name}
        </AnimatedHeading>
        <AnimatedText
          variants={popUpFromBottomForText}
          className="font-medium text-sm  text-gray-400 dark:text-neutral-400 sm:text-base"
        >
          {project.description}
        </AnimatedText>

        <AnimatePresence>
          {project.tools && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={hamFastFadeContainer}
              viewport={{ once: true }}
              className="w-full select-none flex gap-3 flex-wrap justify-start items-center transition-all duration-150 mt-1"
            >
              {project.tools.map((tool) => {
                return (
                  <motion.div variants={popUp} key={tool}>
                    <Image
                      title={tool}
                      src={`/img/skills/${tool}.webp`}
                      alt={tool}
                      width={20}
                      height={20}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={hamFastFadeContainer}
        viewport={{ once: true }}
        className="flex flex-col"
      >
        {isShareSupported && (
          <motion.div
            variants={popUp}
            title="Share"
            className="project_link"
            onClick={handleShare}
          >
            <BiShareAlt className="text-lg" />
          </motion.div>
        )}
        {project.githubURL && (
          <motion.a
            variants={popUp}
            title="Github"
            href={project.githubURL}
            target="blank"
            className="project_link"
          >
            <BsGithub className="text-lg text-center" />
          </motion.a>
        )}
        {project.previewURL && (
          <motion.a
            variants={popUp}
            title="Visit"
            href={project.previewURL}
            target="blank"
            className="project_link"
          >
            <BsFillEyeFill className="text-lg" />
          </motion.a>
        )}
      </motion.div>
    </div>
  );
}
