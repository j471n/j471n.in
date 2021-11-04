import Skill from "../components/Skill";
import ScrollToTopButton from "../components/ScrollToTopButton";
import CoverPage from "../components/CoverPage";

export default function Skills({ skills }) {
  return (
    <div className="">
      {/* <h3 className="title_of_page">Skills</h3> */}

      <CoverPage title="Let me show you my" mainHeading="Skills" className="grid place-items-center"/>

      <section className="page_container">
        {skills.map((skill) => {
          return <Skill key={skill.id} data={skill} />;
        })}
      </section>
      <ScrollToTopButton />
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/skills");
  const skills = await res.json();
  console.log(skills);

  return {
    props: {
      skills,
    },
  };
}
