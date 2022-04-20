import Skill from "../components/Skill";
import { getSkills } from "../lib/dataFetch";
import Metadata from "../components/MetaData";
import PageCover from "../components/Home/PageCover";

export default function Skills({ skills }) {
  return (
    <>
      <Metadata title="Skills 🤹" />

      <div className="dark:bg-darkPrimary">
        <PageCover
          imgSrc="/img/cover/skill.svg"
          pageTitle="Skills & Experience"
          titleClass="text-[#642994]"
          containerClass="from-[#642994]/50 to-white"
        />

        <div id="view" className="page_container">
          {skills.map((skill) => {
            return <Skill key={skill.id} data={skill} />;
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
