import Image from "next/image";
import { TiLocation } from "react-icons/ti";
import { RiUserFollowFill } from "react-icons/ri";
import useFetchWithSWR from "../hooks/useFetchWithSWR";
import { LoadingAuthor } from "./SkeletonLoading/LoadingBlog";
import { AvatarImage } from "../utils/utils";

export default function Author({ followers }) {
  const { data: author, isLoading } = useFetchWithSWR(
    "https://dev.to/api/users/495014"
  );

  if (isLoading) return <LoadingAuthor />;
  return (
    <div className="max-w-lg rounded-lg  mx-auto md:w-full overflow-hidden bg-blue-200 dark:bg-darkSecondary relative">
      {author && (
        <>
          <div>
            <Image
              src="https://imgur.com/5uHsGPh.png"
              width={500}
              height={166}
              layout="responsive"
              alt="Cover Image for Profile"
            />
          </div>

          <div className="relative -mt-12 pb-4">
            <div className="flex flex-col space-y-2 items-center p-2">
              <div className="rounded-full w-24 h-24  p-2 bg-white shadow-xl">
                <Image
                  src={AvatarImage}
                  className="rounded-full"
                  width={80}
                  height={80}
                  layout="responsive"
                  alt="avatar Image"
                />
              </div>
              <p className="font-bold text-3xl ">{author.name}</p>

              <div className="flex items-center justify-between space-x-3 absolute top-10 w-full px-3 lg:px-5 py-3">
                <div
                  title="Location"
                  className="flex items-center justify-center text-xs lg:text-base font-medium space-x-1"
                >
                  <TiLocation className="text-gray-700 dark:text-gray-100 text-sm" />
                  <p>{author.location}</p>
                </div>
                <div
                  title="Followers"
                  className="flex items-center justify-center text-xs lg:text-base font-medium space-x-1"
                >
                  <RiUserFollowFill className="text-gray-700 dark:text-gray-100 text-sm" />
                  <p>{followers}</p>
                </div>
              </div>
              <div className="text-sm lg:text-base text-center px-4 !mb-4">{author.summary}</div>
              <button
                className="w-10/12 sm:w-1/2 mx-10 bg-yellow-400 text-black text-md rounded-full py-2 clickable_button font-semibold"
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
