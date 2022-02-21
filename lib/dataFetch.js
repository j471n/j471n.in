import skills from "../content/skillsData";
import projects from "../content/projectData";
import certificates from "../content/certificatesData";
import socialMedia from "../content/socialMedia";
export function getSkills() {
  return skills;
}

export function getPinnedSkills() {
  return skills.filter((skill) => skill.pinned && skill);
}
export function getProjects() {
  return projects.reverse();
}
export function getPinnedProjects() {
  return projects.filter((project) => project.pinned && project).reverse();
}

export function getCertificates() {
  return certificates.reverse();
}
export function getPinnedCertificates() {
  return certificates
    .filter((certificate) => certificate.pinned && certificate)
    .reverse();
}

export function getSocialMedia() {
  return socialMedia;
}
