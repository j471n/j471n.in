import Head from "next/head";

export default function LoadingBlog() {
  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <div className="min-h-screen flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 mx-auto  p-3 mt-[52px] sm:mt-[72px]">
        {/* left blog */}
        <div className="p-3 md:p-5 w-full flex-grow  bg-gray-200 dark:bg-darkSecondary rounded-md animate-pulse dark:text-gray-100 space-y-2 h-full">
          <h1 className="w-full h-7 bg-gray-400 dark:bg-zinc-600 rounded-md animate-pulse "></h1>
          <h1 className="w-[80%] h-7 !m b-2 bg-gray-400 dark:bg-zinc-600 rounded-md animate-pulse "></h1>

          <div className="flex items-center space-x-2">
            <p className="w-[30%] md:w-[20%] h-3 bg-gray-400 dark:bg-zinc-600 animate-pulse rounded-md"></p>
            <p className="w-[30%] md:w-[20%] h-3 bg-gray-400 dark:bg-zinc-600 animate-pulse rounded-md"></p>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="w-7 h-7 md:w-10 md:h-10 bg-gray-400 animate-pulse dark:bg-zinc-600 rounded-full"></span>
            <span className="w-7 h-7 md:w-10 md:h-10 bg-gray-400 animate-pulse dark:bg-zinc-600 rounded-full"></span>
            <span className="w-7 h-7 md:w-10 md:h-10 bg-gray-400 animate-pulse dark:bg-zinc-600 rounded-full"></span>
            <span className="w-7 h-7 md:w-10 md:h-10 bg-gray-400 animate-pulse dark:bg-zinc-600 rounded-full"></span>
            <span className="w-7 h-7 md:w-10 md:h-10 bg-gray-400 animate-pulse dark:bg-zinc-600 rounded-full"></span>
            <span className="w-7 h-7 md:w-10 md:h-10 bg-gray-400 animate-pulse dark:bg-zinc-600 rounded-full"></span>
          </div>

          <div className="flex items-center space-x-2">
            <p className="w-[30%] md:w-[20%] h-3 animate-pulse bg-gray-400 dark:bg-zinc-600 rounded-md"></p>
            <p className="w-[30%] md:w-[20%] h-3 animate-pulse bg-gray-400 dark:bg-zinc-600 rounded-md"></p>
            <p className="w-[30%] md:w-[20%] h-3 animate-pulse bg-gray-400 dark:bg-zinc-600 rounded-md"></p>
            <p className="w-[30%] md:w-[20%] h-3 animate-pulse bg-gray-400 dark:bg-zinc-600 rounded-md"></p>
          </div>

          <div className="w-full h-44 md:h-60 !my-5 bg-gray-400 dark:bg-zinc-600 rounded-md animate-pulse"></div>

          <div className="flex flex-col gap-3">
            <p className="rounded-md animate-pulse  w-full h-3 bg-gray-400 dark:bg-zinc-600 "></p>
            <p className="rounded-md animate-pulse  w-full h-3 bg-gray-400 dark:bg-zinc-600 "></p>
            <p className="rounded-md animate-pulse  w-[80%] h-3 bg-gray-400 dark:bg-zinc-600 "></p>
          </div>
          <div className="w-full !my-5 h-32 bg-gray-400 dark:bg-zinc-600 rounded-md animate-pulse "></div>
        </div>

        {/* author and comments */}
        <div className="flex flex-col md:ml-4">
          <LoadingAuthor />
          {/* comments */}
          <CommentsLoading />
        </div>
      </div>
    </>
  );
}

function Comment() {
  return (
    <div className="rounded-md animate-pulse w-auto bg-gray-200 dark:bg-darkSecondary  my-1">
      <div className="flex items-center m-5 overflow-hidden gap-2">
        <div className="!h-10 !w-10 bg-gray-400 dark:bg-zinc-600 rounded-full flex items-center gap-2 relative"></div>
        <div className="flex flex-col space-y-2 w-full">
          <p className="w-full rounded-md animate-pulse h-3 bg-gray-400 dark:bg-zinc-600"></p>
          <p className="w-[50%] rounded-md animate-pulse h-3  bg-gray-400 dark:bg-zinc-600"></p>
        </div>
      </div>
    </div>
  );
}

export function CommentsLoading() {
  return (
    <div className="flex flex-col mt-2">
      <div className="flex items-center my-3 rounded-md shadow overflow-hidden">
        <div className="flex flex-col items-center w-1/2  bg-zinc-100  dark:bg-darkSecondary dark:text-white py-4 first:border-r-2 dark:border-zinc-600">
          <h1 className="h-10 w-10 bg-gray-300 dark:bg-zinc-600 rounded-md animate-pulse"></h1>
          <div className="flex items-center gap-2 mt-2 text-md w-3/4">
            <p className="w-full h-3 bg-gray-300 dark:bg-zinc-600 rounded-md animate-pulse"></p>
          </div>
        </div>
        <div className="flex flex-col items-center w-1/2  bg-zinc-100  dark:bg-darkSecondary dark:text-white py-4 first:border-r-2 dark:border-zinc-600">
          <h1 className="h-10 w-10 bg-gray-300 dark:bg-zinc-600 rounded-md animate-pulse"></h1>
          <div className="flex items-center gap-2 mt-2 text-md w-3/4">
            <p className="w-full h-3 bg-gray-300 dark:bg-zinc-600 rounded-md animate-pulse"></p>
          </div>
        </div>
      </div>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
}

export function LoadingAuthor() {
  return (
    <div className="w-full md:w-96 h-80 bg-gray-200 dark:bg-darkSecondary  rounded-md animate-pulse  flex flex-col space-y-3 items-center justify-center">
      <div className="w-24 h-24 rounded-full mx-auto bg-gray-400 dark:bg-zinc-600 "></div>

      <h1 className="w-1/2 bg-gray-400 dark:bg-zinc-600 h-3   rounded-md animate-pulse  mt-2"></h1>

      <p className=" w-4/5 rounded-md animate-pulse  h-3 bg-gray-400 dark:bg-zinc-600"></p>
      <p className="w-3/5 rounded-md animate-pulse  h-3  bg-gray-400 dark:bg-zinc-600"></p>

      <button className="!mt-6 h-10 w-1/2 rounded-full bg-gray-400 dark:bg-zinc-600"></button>
    </div>
  );
}
