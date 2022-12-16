import { SocialPlatform } from "@lib/types";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";
import { FaDev } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { SiCodepen } from "react-icons/si";

const socialMedia: SocialPlatform[] = [
  {
    title: "Twitter",
    Icon: AiOutlineTwitter,
    url: "https://twitter.com/intent/follow?screen_name=j471n_",
  },
  {
    title: "LinkedIn",
    Icon: BsLinkedin,
    url: "https://www.linkedin.com/in/j471n/",
  },
  {
    title: "Github",
    Icon: BsGithub,
    url: "https://github.com/j471n",
  },
  {
    title: "Instagram",
    Icon: AiOutlineInstagram,
    url: "https://www.instagram.com/j471n_",
  },
  {
    title: "Dev.to",
    Icon: FaDev,
    url: "https://dev.to/j471n",
  },
  {
    title: "Codepen",
    Icon: SiCodepen,
    url: "https://codepen.io/j471n",
  },
  {
    title: "Facebook",
    Icon: BsFacebook,
    url: "https://www.facebook.com/ja7in/",
  },
  {
    title: "Mail",
    Icon: HiMail,
    url: "mailto:jatinsharma8669@gmail.com",
  },
];

export default socialMedia;
