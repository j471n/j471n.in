import { popUpFromBottomForText } from "../../content/FramerMotionVariants";
import projectData from "../../content/projectData";
import { HomeHeading } from "../../pages";
import AnimatedDiv from "../FramerMotion/AnimatedDiv";
import Image from "next/image";
import AnimatedHeading from "../FramerMotion/AnimatedHeading";
import AnimatedText from "../FramerMotion/AnimatedText";
import ExploreMoreButton from "../Buttons/ExploreMoreButton";
export default function ProjectSection() {
  return (
    <section>
      <HomeHeading title="Projects 📂" />
      <div className="home-section-container no-scrollbar">
        {projectData.map((project) => {
          if (!project.pinned) return null;

          return (
            <div
              key={project.id}
              className="home-content-section no-scrollbar rounded-lg flex flex-col justify-start hover-slide-animation"
              onClick={() => window.open(project.githubURL)}
            >
              <AnimatedDiv variants={popUpFromBottomForText}>
                <Image
                  className="rounded-xl mb-2"
                  width={360}
                  height={200}
                  src={project.coverURL}
                  alt={project.name}
                  layout="responsive"
                  objectFit="contain"
                  quality={50}
                />
              </AnimatedDiv>
              <AnimatedHeading
                variants={popUpFromBottomForText}
                className="capitalize my-2 mt-4 font-bold md:font-extrabold text-sm md:text-base dark:text-slate-300 text-slate-600 border-purple-600 truncate"
              >
                {project.name}
              </AnimatedHeading>
              <AnimatedText
                variants={popUpFromBottomForText}
                className="text-xs sm:text-sm truncate-3 text-slate-400 font-medium"
              >
                {project.description}
              </AnimatedText>
            </div>
          );
        })}
        <ExploreMoreButton link="/projects" />
      </div>
    </section>
  );
}
