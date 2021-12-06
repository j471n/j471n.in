import Image from "next/image";
import { useState, useEffect } from "react";
import { BsInstagram, BsTwitter, BsGithub, BsGlobe } from "react-icons/bs";
import socialMedia from "../content/socialMedia";
import SocialIcon from "./SocialIcon";
import { TiLocation } from "react-icons/ti";
import { RiUserFollowFill } from "react-icons/ri";

export default function Author({ followers }) {
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
    <div className="max-w-lg rounded-lg  mx-auto md:w-full overflow-hidden bg-blue-200 relative">
      {author && (
        <>
          <Image
            src="https://imgur.com/5uHsGPh.png"
            width={500}
            height={166}
            layout="responsive"
          />

          <div className="relative -mt-12 pb-4">
            <div className="flex flex-col space-y-2 items-center p-2">
              <div className="rounded-full w-24 h-24  p-2 bg-white shadow-xl">
                <Image
                  src={author.profile_image}
                  className="rounded-full"
                  width={80}
                  height={80}
                />
              </div>
              <p className="font-bold text-3xl ">{author.name}</p>

              <div className="flex items-center justify-between space-x-3 absolute top-10 w-full px-3 lg:px-5 py-3">
                <div
                  title="Location"
                  className="flex items-center justify-center text-xs lg:text-base font-medium space-x-1"
                >
                  <TiLocation className="text-gray-700 text-sm" />
                  <p>{author.location}</p>
                </div>
                <div
                  title="Followers"
                  className="flex items-center justify-center text-xs lg:text-base font-medium space-x-1"
                >
                  <RiUserFollowFill className="text-gray-700 text-sm" />
                  <p>{followers}</p>
                </div>
              </div>
              <div className="text-sm lg:text-base">{author.summary}</div>
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
              <button
                className="w-10/12 sm:w-1/2 mx-10 bg-yellow-400 text-black text-md  rounded-full py-1 clickable_button font-semibold"
                onClick={() => window.open("https://dev.to/j471n")}
              >
                Follow
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
