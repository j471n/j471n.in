import Skill from "../components/Skill";

export default function Skills({ skills }) {
  return (
    <>
      <h3 className="title_of_page">Skills</h3>

      <section className="page_container">
        {skills.map((skill) => {
          return <Skill key={skill.id} data={skill} />;
        })}
      </section>
    </>
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