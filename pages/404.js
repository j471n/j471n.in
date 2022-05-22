import React from "react";
import Link from "next/link";
import MetaData from "@components/MetaData";

export default function PageNotFound() {
  return (
    <>
      <MetaData title="404 -" description="You are lost in Space !!!" />
      <section className="pageTop flex flex-col gap-5 md:pt-20">
        <h1 className="font-bold font-barlow text-3xl md:text-5xl uppercase dark:text-white">
          Stay calm and don't freak out!!
        </h1>
        <p className="font-inter text-gray-500 dark:text-gray-400/70">
          Looks like you've found the doorway to the great nothing. You didn't
          break the internet, but I can't find what you are looking for. Please
          visit my <b>Homepage</b> to get where you need to go.
        </p>

        <Link href="/" passHref>
          <div className="p-3 w-full xs:max-w-[200px] xs:mx-0 sm:p-3 font-bold mx-auto bg-gray-200 dark:bg-darkSecondary text-center rounded-md text-black dark:text-white select-none">
            Take me there!
          </div>
        </Link>
      </section>
    </>
  );
}
