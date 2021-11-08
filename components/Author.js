import Image from "next/image";
import { useState, useEffect } from "react";
import { BsInstagram, BsTwitter, BsGithub, BsGlobe } from "react-icons/bs";
import socialMedia from "../content/socialMedia";
import SocialIcon from "./SocialIcon";
import { TiLocation } from "react-icons/ti";
export default function Author() {
  const [author, setAuthor] = useState(null);

  async function api() {
    const response = await fetch("https://dev.to/api/users/495014");
    const data = await response.json();
    setAuthor(data);
  }
  useEffect(() => {
    api();
  }, []);

  return (
    <div className="max-w-xl mx-2 sm:mx-auto md:w-full  bg-blue-200 relative p-2 ">
      {author && (
        <>
          <div className="flex flex-col space-y-2 items-center ">
            <Image
              src={author.profile_image}
              className="rounded-full"
              width={80}
              height={80}
            />
            <p className="font-medium text-2xl">{author.name}</p>

            <div className="text-sm sm:text-base">{author.summary}</div>
          </div>
          <div className="flex items-center justify-center text-xs sm:text-base font-medium space-x-1">
            <TiLocation className="text-gray-700 sm:text-lg" />
            <p>{author.location}</p>
          </div>
          <div className=" h-full relative mt-2 mx-3 flex flex-col items-center">
            <div className="flex items-center justify-center">
              <SocialIcon
                title="Github"
                Icon={BsGithub}
                url={socialMedia.github}
              />
              <SocialIcon
                Icon={BsInstagram}
                title="Instagram"
                url={socialMedia.instagram}
              />
              <SocialIcon
                Icon={BsTwitter}
                title="Twitter"
                url={socialMedia.twitter}
              />

              {author.website_url && (
                <SocialIcon
                  Icon={BsGlobe}
                  title="Website"
                  url={author.website_url}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
