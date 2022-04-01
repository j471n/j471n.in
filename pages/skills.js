import Skill from "../components/Skill";
import LazyLoad from "react-lazyload";
import { getSkills } from "../lib/dataFetch";
import Metadata from "../components/MetaData";
import VideoCover from "../components/VideoCover";
import { motion } from "framer-motion";

export default function Skills({ skills }) {
  return (
    <>
      <Metadata title="Skills 🤹" />

      <div className="dark:bg-darkPrimary">
        <VideoCover
          title="Skills & Experience"
          // buttonText="view in details"
          videoUrl="https://imgur.com/GoHeE7r.mp4"
        />

        <motion.section
          id="view"
          className="page_container pt-10"
          // transition={{ when: "beforeChildren", staggerChildren: 0.4 }}
        >
          {skills.map((skill) => {
            return (
              // <LazyLoad key={skill.id} className="h-full w-full">
              <Skill key={skill.id} data={skill} />
              // </LazyLoad>
            );
          })}
        </motion.section>
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
