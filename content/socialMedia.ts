import { SocialPlatform } from "@lib/types";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";
import { FaDev } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { SiCodepen } from "react-icons/si";
import siteConfig, { SocialIconKey } from "./siteConfig";

const iconMap: Record<SocialIconKey, SocialPlatform["Icon"]> = {
  twitter: AiOutlineTwitter,
  linkedin: BsLinkedin,
  github: BsGithub,
  instagram: AiOutlineInstagram,
  devto: FaDev,
  codepen: SiCodepen,
  facebook: BsFacebook,
  mail: HiMail,
};

const socialMedia: SocialPlatform[] = siteConfig.socialLinks.map(
  (socialLink) => ({
    title: socialLink.title,
    Icon: iconMap[socialLink.icon],
    url: socialLink.url,
  }),
);

export default socialMedia;
