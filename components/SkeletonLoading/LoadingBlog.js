import Head from "next/head";

export default function LoadingBlog() {
  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <div className="min-h-screen flex flex-col md:flex-row justify-center space-y-3 mx-auto  p-5">
        {/* left blog */}
        <div className="p-3 md:p-5 w-full flex-grow  bg-gray-200 dark:bg-darkSecondary rounded-md animate-pulse  dark:text-gray-100 space-y-2 h-full">
          <h1 className="w-full h-7 bg-gray-400 dark:bg-zinc-600 rounded-md animate-pulse "></h1>
          <h1 className="w-[80%] h-7 !m b-2 bg-gray-400 dark:bg-zinc-600 rounded-md animate-pulse "></h1>

          <div className="flex items-center space-x-4">
            <span className="w-10 h-10 bg-gray-400 dark:bg-zinc-600 rounded-full"></span>
            <span className="w-10 h-10 bg-gray-400 dark:bg-zinc-600 rounded-full"></span>
            <span className="w-10 h-10 bg-gray-400 dark:bg-zinc-600 rounded-full"></span>
            <span className="w-10 h-10 bg-gray-400 dark:bg-zinc-600 rounded-full"></span>
            <span className="w-10 h-10 bg-gray-400 dark:bg-zinc-600 rounded-full"></span>
            <span className="w-10 h-10 bg-gray-400 dark:bg-zinc-600 rounded-full"></span>
          </div>

          <div className="flex space-x-3">
            <span className="h-3 w-32 bg-gray-400 dark:bg-zinc-600 rounded-md animate-pulse "></span>
            <span className="h-3 w-32 bg-gray-400 dark:bg-zinc-600 rounded-md animate-pulse "></span>
          </div>

          <div className="flex flex-col space-y-3 !mt-5">
            <p className="rounded-md animate-pulse  w-full h-3 bg-gray-400 dark:bg-zinc-600 "></p>
            <p className="rounded-md animate-pulse  w-full h-3 bg-gray-400 dark:bg-zinc-600 "></p>
            <p className="rounded-md animate-pulse  w-[80%] h-3 bg-gray-400 dark:bg-zinc-600 "></p>
          </div>

          <div className="w-full h-44 !my-5 bg-gray-400 dark:bg-zinc-600 rounded-md animate-pulse  animate-pulse"></div>

          <div className="flex flex-col space-y-3">
            <p className="rounded-md animate-pulse  w-full h-3 bg-gray-400 dark:bg-zinc-600 "></p>
            <p className="rounded-md animate-pulse  w-full h-3 bg-gray-400 dark:bg-zinc-600 "></p>
            <p className="rounded-md animate-pulse  w-[80%] h-3 bg-gray-400 dark:bg-zinc-600 "></p>
          </div>
          <div className="w-full !my-5 h-32 bg-gray-400 dark:bg-zinc-600 rounded-md animate-pulse "></div>
        </div>

        {/* author and comments */}
        <div className="flex flex-col md:ml-5">
          <LoadingAuthor /> 
          {/* comments */}
          <Comment />
          <Comment className="ml-5" />
          <Comment className="ml-10" />
          <Comment />
        </div>
      </div>
    </>
  );
}

function Comment({ className }) {
  return (
    <div
      className={`rounded-md animate-pulse w-auto bg-gray-200 dark:bg-darkSecondary  my-1  ${className}`}
    >
      <div className="flex items-center space-x-3 m-5 overflow-hidden">
        <div className="h-14 w-14 bg-gray-400 dark:bg-zinc-600 rounded-full flex items-center relative space-x-2"></div>
        <div className="flex flex-col space-y-2 w-full">
          <p className="w-full rounded-md animate-pulse  h-3 bg-gray-400 dark:bg-zinc-600"></p>
          <p className="w-[50%] rounded-md animate-pulse  h-3  bg-gray-400 dark:bg-zinc-600"></p>
        </div>
      </div>
    </div>
  );
}

export function LoadingAuthor() {
  return (
    <div className="w-full md:w-96 h-80 md:h-96 bg-gray-200 dark:bg-darkSecondary  rounded-md animate-pulse  flex flex-col space-y-3 items-center">
      <div className="w-24 h-24 rounded-full mx-auto bg-gray-400 dark:bg-zinc-600 mt-5"></div>

      <h1 className="w-1/2 bg-gray-400 dark:bg-zinc-600 h-3   rounded-md animate-pulse  mt-2"></h1>

      <p className=" w-4/5 rounded-md animate-pulse  h-3 bg-gray-400 dark:bg-zinc-600"></p>
      <p className="w-3/5 rounded-md animate-pulse  h-3  bg-gray-400 dark:bg-zinc-600"></p>

      <button className="!mt-6 h-10 w-1/2 rounded-full bg-gray-400 dark:bg-zinc-600"></button>
    </div>
  );
}
