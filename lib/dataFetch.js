import skills from "../content/skillsData";
import projects from "../content/projectData";
import certificates from "../content/certificatesData";
import socialMedia from "../content/socialMedia";
import FAQs from "../content/faqData";

export function getSkills() {
  // sort skills in reverse order
  return skills.sort((a, b) => b.level - a.level);
}

export function getPinnedSkills() {
  return skills.filter((skill) => skill.pinned);
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

export function getFAQs() {
  return FAQs;
}

export function getPinnedFAQs() {
  return FAQs.filter((faq) => faq.pinned);
}
