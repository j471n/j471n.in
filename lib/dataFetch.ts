import skills from "@content/skillsData";
import projects from "@content/projectData";

export function getSkills() {
  // sort skills in reverse order
  return skills.sort((a, b) => b.level - a.level);
}

export function getPinnedSkills() {
  return skills.filter((skill) => skill.pinned);
}
export function getProjects() {
  return projects;
}

