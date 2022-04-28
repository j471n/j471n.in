import { opacityVariant } from "../../content/FramerMotionVariants";
import skillsData from "../../content/skillsData";
import { HomeHeading } from "../../pages";
import AnimatedDiv from "../FramerMotion/AnimatedDiv";
import Image from "next/image";
import AnimatedText from "../FramerMotion/AnimatedText";
import ExploreMoreButton from "../Buttons/ExploreMoreButton";

export default function SkillSection() {
  return (
    <section>
      <HomeHeading title="My Top ⚡kills" />

      <div className="snap-center flex gap-2 overflow-x-scroll no-scrollbar p-5 md:px-10">
        {skillsData.map((skill) => {
          if (!skill.pinned) return null;
          return (
            <div
              title={skill.name}
              key={skill.id}
              className="home-content-section flex items-center justify-between overflow-hidden  before:absolute before:h-full before:w-20 before:bg-purple-600 before:-right-4 before:-z-10 before:rotate-[20deg] before:scale-y-150 before:top-4 hover:before:scale-[7]   before:duration-500 "
            >
              <AnimatedDiv
                variants={opacityVariant}
                className="flex items-center gap-2"
              >
                <div className="relative w-10 h-10">
                  <Image
                    width={50}
                    height={50}
                    alt={skill.name}
                    src={`/${skill.icon}`}
                    quality={50}
                  />
                </div>

                <p className="uppercase font-bold text-sm sm:text-base">
                  {skill.name}
                </p>
              </AnimatedDiv>
              <AnimatedText
                variants={opacityVariant}
                className="uppercase font-bold text-lg border-t-[3px] border-purple-100 text-purple-300 z-10"
              >
                {skill.level}
              </AnimatedText>
            </div>
          );
        })}
        <ExploreMoreButton link="/skills" />
      </div>
    </section>
  );
}
