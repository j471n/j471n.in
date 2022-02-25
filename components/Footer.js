import Image from "next/image";
import socialMedia from "../content/socialMedia";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs";
import { FiLinkedin } from "react-icons/fi";
import SocialIcon from "../components/SocialIcon";
export default function Footer() {
  return (
    <footer className=" flex flex-col space-y-4 bg-gray-100 dark:bg-zinc-800 dark:text-white px-4 py-8 pb-24 sm:pb-8">
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 md:grid-rows-1 place-items-center">
        <div className="flex items-center space-x-2 sm:space-x-8">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-violet-100">
            <Image
              src="https://imgur.com/3P7K4v2.png"
              width={50}
              height={50}
              alt="Profile Image"
            />
          </div>
          <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
            <li className="font-bold lg:hover:underline text-xs sm:text-base text-gray-500">
              <a rel="noopener noreferrer" href="/">
                Jatin Sharma
              </a>
            </li>
          </ul>
        </div>

        <p className="text-center text-gray-500 font-medium text-sm sm:text-base col-span-2 md:col-span-1 row-start-2 md:row-start-auto">
          &copy; {new Date().getFullYear()},{" "}
          <a className="select-none hover:text-black dark:hover:text-white" rel="noopener noreferrer" href="/">
            Jatin Sharma
          </a>
        </p>

        <ul className="flex flex-wrap space-x-4 !m-0 sm:space-x-7">
          <li>
            <a rel="noopener noreferrer" href="#">
              <SocialIcon
                Icon={BsTwitter}
                title="Twitter"
                url={socialMedia.twitter}
              />
            </a>
          </li>
          <li>
            <a rel="noopener noreferrer" href="#">
              <SocialIcon
                Icon={BsGithub}
                title="Github"
                url={socialMedia.github}
              />
            </a>
          </li>
          <li>
            <a rel="noopener noreferrer" href="#">
              <SocialIcon
                Icon={FiLinkedin}
                title="LinkedIn"
                url={socialMedia.linkedIn}
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

{
  /* <footer className="w-full relative p-4 dark:bg-darkPrimary dark:text-gray-100 pb-24 -mt-24 sm:-mt-10 font-medium text-xs sm:text-base text-center z-40 print:hidden">
      <p>Made with ❤️ by Jatin Sharma</p>
    </footer> */
}

// flex items-center justify-between
