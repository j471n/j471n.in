import Image from "next/image";
import { useState, useEffect } from "react";
import { BsInstagram, BsTwitter, BsGithub, BsGlobe } from "react-icons/bs";
import socialMedia from "../content/socialMedia";
import SocialIcon from "./SocialIcon";
import { TiLocation } from "react-icons/ti";

const perPage = 1000;

export default function Author() {
  const [author, setAuthor] = useState(null);
  const [followers, setFollowers] = useState([]);

  async function api() {
    const response = await fetch("https://dev.to/api/users/495014");
    const data = await response.json();
    setAuthor(data);
  }

  /**
   * @param {number} page
   */
  // function getFollowersPage(page) {
  //   // const params = { per_page: perPage, page };
  //   // const headers = { "api-key": process.env.NEXT_PUBLIC_API_URL };
  //   const data = fetch("https://dev.to/api/followers/users", {
  //     // params,
  //     per_page: perPage,
  //     mode: "no-cors",
  //     page,
  //     // headers,
  //     headers: { "api-key": process.env.NEXT_PUBLIC_BLOGS_API },
  //   })
  //     // .then((res) => res.json())
  //     .then((res) => console.log(res));

  //   // .then((data) => console.log(data));

  //   return data;
  // }

  // async function getFollowers() {
  //   let numReturned = perPage;
  //   let page = 1;
  //   const totalFollowers = [];
  //   while (numReturned === perPage) {
  //     const followers = await getFollowersPage(page);
  //     totalFollowers.push(...followers);

  //     console.log(followers);
  //     numReturned = followers.length;
  //     page++;
  //   }
  //   return totalFollowers;
  // }

  useEffect(() => {
    api();
    // setFollowers(() => getFollowers());
  }, []);

  return (
    <div className="max-w-lg mx-3 rounded-lg lg:rounded-3xl sm:mx-auto md:w-full overflow-hidden bg-blue-200 relative">
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

              <div className="flex items-center justify-center text-xs sm:text-base font-medium space-x-1">
                <TiLocation className="text-gray-700 sm:text-lg" />
                <p>{author.location}</p>
              </div>
              <div className="text-sm sm:text-base">{author.summary}</div>
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
                className="w-10/12 sm:w-1/2 mx-10 bg-yellow-400 text-black text-xl rounded-full py-1 clickable_button"
                onClick={() => window.open("https://dev.to/j471n")}
              >
                Follow
              </button>
            </div>

            {/* <div>
            <p>Followers {followers.length}</p> 
          </div> */}
          </div>
        </>
      )}
    </div>
  );
}
