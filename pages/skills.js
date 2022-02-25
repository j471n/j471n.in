import Skill from "../components/Skill";
import LazyLoad from "react-lazyload";
import { getSkills } from "../lib/dataFetch";
import Metadata from "../components/MetaData";
import Image from "next/image";
import {MdKeyboardArrowDown} from "react-icons/md"
export default function Skills({ skills }) {
  return (
    <>
      <Metadata title="Skills 🤹" />

      <div className="dark:bg-darkPrimary">
        <section className="relative max-h-screen flex flex-col-reverse sm:flex-row items-center w-full py-5 ">
          <div className="w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-bungee-shade text-center mt-5 dark:text-zinc-100">
              Skills & Experience
            </h1>
          </div>
          <div className="relative w-full">
            <Image
              src="https://cutt.ly/VP1Jgf9"
              width={941}
              height={758}
              layout="responsive"
              alt="skills"
            />
          </div>
          <div className="hidden lg:flex justify-center absolute w-full -bottom-4 animate-bounce text-6xl text-black dark:text-gray-300">
            <MdKeyboardArrowDown
              className="cursor-pointer "
              onClick={() => (window.location.href = "#view")}
              alt="arrow"
            />
          </div>
        </section>

        <section id="view" className="page_container lg:mt-10">
          {skills.map((skill) => {
            return (
              <LazyLoad key={skill.id} className="h-full w-full">
                <Skill key={skill.id} data={skill} />
              </LazyLoad>
            );
          })}
        </section>
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
