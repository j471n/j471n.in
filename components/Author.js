import Image from "next/image";
import { useState, useEffect } from "react";
import { BsInstagram, BsTwitter, BsGithub } from "react-icons/bs";
import socialMedia from "../content/socialMedia";
import SocialIcon from "./SocialIcon";

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
  console.log(author);

  return (
    <div className="max-w-xl mx-2 md:mx-auto md:w-full  bg-blue-200 relative py-4 ">
      {author && (
        <>
          <div className="flex flex-col space-y-3 items-center ">
            <Image
              src={author.profile_image}
              className="rounded-full"
              width={80}
              height={80}
            />
            <p className="font-medium text-2xl">{author.name}</p>
            <div>{author.summary}</div>
            {/* <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam,
              ut obcaecati veniam nam facilis laborum, accusantium consequuntur
              quidem alias possimus suscipit neque modi eos officia ea ipsum
              nobis expedita impedit. Deserunt, blanditiis inventore vero veniam
              enim dicta hic, quis rem earum laboriosam debitis praesentium at.
              Cupiditate expedita atque consectetur facere praesentium,
              molestiae dolor! Expedita natus fuga illo minus autem quod.
            </div> */}
          </div>
          <div className=" h-full relative mt-2 mx-3 flex justify-center">
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
            </div>
        </>
      )}
    </div>
  );
}
