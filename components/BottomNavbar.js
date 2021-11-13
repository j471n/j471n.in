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
import BottomNavLink from "./BottomNavLink";

const initialRouteState = {
  home: false,
  skills: false,
  blogs: false,
  projects: false,
  contact: false,
};

function BottomNavbar() {
  const router = useRouter();
  const [routes, setRoutes] = useState(initialRouteState);

  const currentRoute = router.pathname.slice(1);
  useEffect(() => {
    // setRoutes(initialRouteState);
    for (let route in routes) {
      routes[route] = false;
    }
    if (currentRoute === "") {
      setRoutes({ ...routes, ...{ home: true } });
    } else if (routes.hasOwnProperty(currentRoute)) {
      console.log("true");
      let obj = {};
      obj[currentRoute] = true;
      setRoutes({ ...routes, ...obj });
    } else {
      console.error("404 NOT FOUND");
    }
  }, [currentRoute]);
  console.log(routes);

  return (
    <div className="fixed bg-white sm:hidden ring-2 w-full ring-purple-400 bottom-0  rounded-tl-2xl rounded-tr-2xl z-40">
      {/* Bottom NavBar Links */}
      <div className="flex items-center px-4 py-2 justify-between transition-all duration-150">
        {/* Home Icon */}
        <BottomNavLink
          Icon={routes.home ? HiHome : HiOutlineHome}
          info={routes.home && { title: "home", active: true }}
          href="/"
        />
        {/* Skill Icon */}
        <BottomNavLink
          Icon={routes.skills ? BsBarChartFill : BsBarChart}
          info={routes.skills && { title: "Skills", active: true }}
          href="/skills"
        />

        {/* Blogs Icon */}
        <BottomNavLink
          Icon={routes.blogs ? RiArticleFill : RiArticleLine}
          info={routes.blogs && { title: "Blogs", active: true }}
          href="/blogs"
        />
        {/* Projects Icon */}
        <BottomNavLink
          Icon={routes.projects ? AiFillProject : AiOutlineProject}
          info={routes.projects && { title: "projects", active: true }}
          href="/projects"
        />
        {/* Contact Icon */}
        <BottomNavLink
          Icon={routes.contact ? AiFillPhone : AiOutlinePhone}
          info={routes.contact && { title: "contact", active: true }}
          href="/contact"
        />
      </div>
    </div>
  );
}
export default BottomNavbar;
