import siteConfig from "./siteConfig";

type AuthorInfo = {
  name: string;
  image: string;
  org: string | null;
  org_logo: string | null;
  org_url: string | null;
};

export function getAuthorData(org: string | null = null): AuthorInfo {
  switch (org) {
    case "documatic":
      return {
        name: siteConfig.person.name,
        image: siteConfig.person.profileImage,
        org: "Documatic",
        org_logo: "https://i.imgur.com/ZqBFtg1.png",
        org_url: "https://www.documatic.com/",
      };

    default:
      return {
        name: siteConfig.person.name,
        image: siteConfig.person.profileImage,
        org: null,
        org_logo: null,
        org_url: null,
      };
  }
}
