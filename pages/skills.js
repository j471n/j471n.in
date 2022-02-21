import Skill from "../components/Skill";
import CoverPage from "../components/CoverPage";
import LazyLoad from "react-lazyload";
import { getSkills } from "../lib/dataFetch";

export default function Skills({ skills }) {
  return (
    <div className="dark:bg-darkPrimary">
      {/* <h3 className="title_of_page">Skills</h3> */}

      <CoverPage
        title="Let me show you my"
        mainHeading="Skills"
        className="grid place-items-center"
      />

      <section className="page_container">
        {skills.map((skill) => {
          return (
            <LazyLoad key={skill.id} className="h-full w-full">
              <Skill key={skill.id} data={skill} />
            </LazyLoad>
          );
        })}
      </section>
    </div>
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
