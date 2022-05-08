import React from "react";
import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

export default function PageNotFound() {
  const [seconds, setSeconds] = useState(5);

  const router = useRouter();

  function returnHomeTimer() {
    setTimeout(() => {
      if (seconds <= 0) {
        router.push("/");
      } else {
        setSeconds((seconds) => seconds - 1);
      }
    }, 1000);
  }
  
  useEffect(() => {
    returnHomeTimer();
  }, [returnHomeTimer]);

  return (
    <div className="min-h-screen min-w-screen flex gap-5 flex-col items-center justify-center">
      <div className="relative p-5 sm:w-1/2 -mt-20 sm:mt-0">
        <Image
          src="/img/cover/404.svg"
          width={903}
          height={561}
          alt="error 404"
          priority={true}
        ></Image>
      </div>

      <h1 className="dark:text-gray-300 font-bold">
        Returning Home in <span>{seconds}</span> seconds
      </h1>
    </div>
  );
}
