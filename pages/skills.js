import Skill from "../components/Skill";
import { getSkills } from "../lib/dataFetch";
import Metadata from "../components/MetaData";
import TopContainer from "../components/Home/TopContainer";
import Image from "next/image";
import AnimatedHeading from "../components/FramerMotion/AnimatedHeading";
import {
  fromRightVariant,
  smallTextFromBottom,
} from "../content/FramerMotionVariants";
import AnimatedDiv from "../components/FramerMotion/AnimatedDiv";

export default function Skills({ skills }) {
  return (
    <>
      <Metadata title="Skills 🤹" />

      <div className="dark:bg-darkPrimary">
        <TopContainer className=" from-blue-400 dark:from-[#444] dark:to-darkPrimary to-white ">
          <div className="w-full md:w-1/2 grid place-items-center">
            <AnimatedHeading
              variants={smallTextFromBottom}
              infinity={true}
              className="capitalize font-bold text-3xl sm:text-4xl lg:text-6xl 3xl:text-8xl text-blue-600 font-inter"
            >
              Skills & Experience
            </AnimatedHeading>
          </div>
          <AnimatedDiv
            variants={fromRightVariant}
            infinity={true}
            className="w-full md:w-1/2 grid place-items-center -mt-20"
          >
            <Image
              src="/img/cover/skillCard.svg"
              width={1354}
              height={1032}
              alt="skills"
              priority={true}
            ></Image>
          </AnimatedDiv>
        </TopContainer>

        <div id="view" className="page_container">
          {skills.map((skill) => {
            return (
              // <LazyLoad key={skill.id} className="h-full w-full">
              <Skill key={skill.id} data={skill} />
              // </LazyLoad>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const skills = getSkills();
  return {
    props: {
      skills,
    },
  };
}
