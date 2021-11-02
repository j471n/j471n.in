import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  AiOutlineProject,
  AiOutlinePhone,
  AiFillProject,
  AiFillPhone,
} from "react-icons/ai";
import { RiArticleLine, RiArticleFill } from "react-icons/ri";
import { BsBarChart, BsBarChartFill } from "react-icons/bs";
import { HiHome, HiOutlineHome } from "react-icons/hi";

function BottomNavbar({ data }) {
  const router = useRouter();
  const [routes, setRoutes] = useState({
    "/": false,
    "/skills": false,
    "/blogs": false,
    "/projects": false,
    "/contact": false,
  });

  const currentRoute = router.pathname;
  useEffect(() => {
    for (const route in routes) {
      routes[route] = false;
    }
    if (routes.hasOwnProperty(currentRoute)) {
      let obj = {};
      obj[currentRoute] = true;
      setRoutes({ ...routes, ...obj });
    } else {
      console.error("404 NOT FOUND");
    }
  }, [currentRoute]);
  return (
    <div className="fixed bg-white sm:hidden ring-2 w-full ring-purple-400 bottom-0  rounded-tl-2xl rounded-tr-2xl z-40">
      <div className="flex items-center p-4 justify-between transition-all duration-150">
        <Link href="/">
          {routes["/"] ? (
            <HiHome className="bottom_nav_icon" />
          ) : (
            <HiOutlineHome className="bottom_nav_icon" />
          )}
        </Link>
        <Link href="/skills">
          {routes["/skills"] ? (
            <BsBarChartFill className="bottom_nav_icon" />
          ) : (
            <BsBarChart className="bottom_nav_icon " />
          )}
        </Link>
        <Link href="/blogs">
          {routes["/blogs"] ? (
            <RiArticleFill className="bottom_nav_icon" />
          ) : (
            <RiArticleLine className="bottom_nav_icon" />
          )}
        </Link>
        <Link href="/projects">
          {routes["/projects"] ? (
            <AiFillProject className="bottom_nav_icon" />
          ) : (
            <AiOutlineProject className="bottom_nav_icon" />
          )}
        </Link>
        <Link href="/contact">
          {routes["/contact"] ? (
            <AiFillPhone className="bottom_nav_icon" />
          ) : (
            <AiOutlinePhone className="bottom_nav_icon" />
          )}
        </Link>
      </div>
    </div>
  );
}
export default BottomNavbar;

export async function getStaticProps(context) {
  const data = context.req;

  return {
    props: {
      data,
    },
  };
}
