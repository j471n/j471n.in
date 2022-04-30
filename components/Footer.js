import Image from "next/image";
import Link from "next/link";
import socialMedia from "../content/socialMedia";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { FiLinkedin } from "react-icons/fi";
import SocialIcon from "../components/SocialIcon";
import AnimatedText from "./FramerMotion/AnimatedText";
import AnimatedDiv from "./FramerMotion/AnimatedDiv";
import {
  fromBottomVariant,
  fromLeftVariant,
  fromRightVariant,
} from "../content/FramerMotionVariants";
import { AvatarImage } from "../utils/utils";

export default function Footer() {
  return (
    <footer className="flex flex-col space-y-4 bg-gray-100 dark:bg-zinc-800 dark:text-white p-4 sm:pb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 md:grid-rows-1 place-items-center">
        <AnimatedDiv
          className="flex items-center gap-2"
          variants={fromLeftVariant}
        >
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-violet-100 overflow-hidden">
            <Image
              src={AvatarImage}
              width={50}
              height={50}
              alt="Profile Image"
            />
          </div>
          <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
            <li className="font-bold lg:hover:underline text-xs sm:text-base text-gray-500">
              <Link rel="noopener noreferrer" href="/">
                Jatin Sharma
              </Link>
            </li>
          </ul>
        </AnimatedDiv>

        <AnimatedText
          variants={fromBottomVariant}
          className="text-center text-gray-500 font-medium text-sm sm:text-base col-span-2 md:col-span-1 row-start-2 md:row-start-auto"
        >
          &copy; {new Date().getFullYear()},{" "}
          <Link
            className="select-none hover:text-black dark:hover:text-white"
            rel="noopener noreferrer"
            href="/"
          >
            Jatin Sharma
          </Link>
        </AnimatedText>

        <AnimatedDiv variants={fromRightVariant}>
          <ul className="flex flex-wrap space-x-4 !m-0 sm:space-x-7">
            <li>
              <SocialIcon
                Icon={BsTwitter}
                title="Twitter"
                url={socialMedia.twitter}
              />
            </li>
            <li>
              <SocialIcon
                Icon={BsGithub}
                title="Github"
                url={socialMedia.github}
              />
            </li>
            <li>
              <SocialIcon
                Icon={FiLinkedin}
                title="LinkedIn"
                url={socialMedia.linkedIn}
              />
            </li>
          </ul>
        </AnimatedDiv>
      </div>
    </footer>
  );
}
